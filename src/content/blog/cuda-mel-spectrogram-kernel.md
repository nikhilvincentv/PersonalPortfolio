---
title: "I Wrote a CUDA Kernel Because torchaudio Was Launching 10 of Them"
description: "Computing a log-mel spectrogram on a 3-second cough took 60 microseconds on a GPU that was 95% idle. Fusing the pipeline into fewer kernels got it to 21."
pubDate: 2026-07-06
heroImage: "/images/blog/cuda-mel-speedup.jpg"
tags: ["cuda", "gpu", "audio", "ml"]
draft: false
---
Every audio model I've built starts with the same step. You take a waveform, slice it into overlapping frames, run an FFT on each one, and squash the result onto the mel scale so it looks more like how ears hear. That's a log-mel spectrogram. My cough screening work runs on them, and so does nearly every keyword-spotting model out there.

I'd always treated that step as free. Then I profiled it.

On an NVIDIA GB10 (the chip inside the DGX Spark), `torchaudio.transforms.MelSpectrogram` took about **60.8 µs** for a 3.5-second clip. That sounds fast until you open Nsight Compute and see the GPU sitting at roughly 5% SM and memory utilization. torchaudio runs the pipeline as **10 separate kernel launches**: pad, frame, window, FFT, magnitude, mel matmul, log, and a few more. Each one writes its output to global memory so the next one can read it back. For a short clip, the math takes almost no time. Launching kernels and shuffling intermediates around eats the budget.

## What I changed

I kept cuFFT for the FFT itself, because I wasn't going to beat it. Everything after the FFT went into **one fused kernel**, with one thread block per frame:

1. Threads compute `|FFT|²` for every frequency bin and write it to **shared memory** instead of DRAM.
2. After a barrier, each thread takes one or more mel filters and computes a dot product, applies `log(x + ε)`, and writes a single output value.

The second trick came from staring at what a mel filter looks like. Each one is a small triangle. Most of the filterbank matrix is zeros, so a dense matmul spends most of its time multiplying by nothing. I stored each filter as a start bin plus its handful of nonzero weights (CSR-style) and only looped over those.

## The numbers

| implementation | kernel launches | 3.5 s clip |
|---|---|---|
| torchaudio GPU | 10 | 60.8 µs |
| my naive version (cuFFT + cuBLAS) | 7 | 30.0 µs |
| **fused** | **4** | **21.2 µs** |

That's about **2.9× faster** than torchaudio on that clip, and the speedup held between 2.9× and 3.1× from 0.5 s clips up to 10 s clips. librosa on the CPU took 781 µs for the same input. The output matches torchaudio to a max absolute error around 2×10⁻⁵, which I checked across every config before I trusted any timing.

Benchmarking honestly took longer than writing the kernel. I used 20 warmup runs, then 100 timed runs with CUDA events and a sync after each one, and I cached cuFFT plans for both my code and torchaudio so neither side got charged for plan creation.

## What I took from it

The kernel only reaches 60% occupancy and still uses about 5% of the hardware. I could have spent a week tuning that, and it wouldn't have mattered, because the workload is bound by launch overhead. Cutting launches from 10 to 4 and skipping two round trips through DRAM is where the whole gain came from. I wouldn't have known that without the profiler. My first guess was that the FFT was the slow part, and I'd have been wrong.

The code, benchmarks, and a 2-page technical note are on GitHub: [cuda-mel-spectrogram](https://github.com/nikhilvincentv/cuda-mel-spectrogram).
