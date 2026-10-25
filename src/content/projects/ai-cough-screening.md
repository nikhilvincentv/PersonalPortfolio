---
title: "CoughSense: AI Cough & Respiratory Screening"
student_names: "Nikhil Vincent"
grade: 11
year: 2025
category: "Healthcare ML"
tags: ["audio", "deep-learning", "yamnet", "wav2vec", "react-native"]
summary: "A phone app and deep learning model that screens cough recordings for respiratory disease. 88.6% balanced accuracy on 2,046 PCR-labeled patients, tested with consenting patients at a community clinic."
hero_image: "/images/viceversa-landing.jpeg"
gallery:
  - "/images/viceversa-landing.jpeg"
  - "/images/resume/ai-cough-1.png"
  - "/images/resume/ai-cough-2.png"
links:
  - label: "CoughSense GitHub"
    url: "https://github.com/nikhilvincentv/Cough-Mobile-App"
  - label: "Demo Video"
    url: "https://www.youtube.com/watch?v=FJy52pClssQ"
featured: true
---
CoughSense lets someone cough into a phone and get a screening estimate for respiratory disease in about a second. A React Native app guides the recording, a backend sends the audio to a PyTorch model, and the app shows a probability with a confidence band. It is a screening tool, not a diagnosis.

**Headline result:** the V4 model reaches **88.6% balanced accuracy** (AUC 0.908) on **2,046 PCR-labeled patients** from the Coswara dataset, using 5-fold cross-validation. It has 2.74M parameters and runs in about 128 ms on a CPU.

Click any section below for the full details.

<details>
<summary>Model results (V4)</summary>

| Metric | Score |
|---|---|
| Balanced accuracy | **88.6% ± 0.9%** |
| Macro-AUC | **0.908** |
| Macro-F1 | **0.883** |
| Calibration error (ECE) | **0.07** |
| Model size | 2.74M parameters |
| CPU inference | ~128 ms |

Benchmarked on 2,046 Coswara patients: 1,389 healthy and 657 PCR-confirmed COVID-19, in 5-fold cross-validation. The model went through 10 training iterations to get here.

</details>

<details>
<summary>How the model works</summary>

CoughSense uses a **dual-branch CNN + Transformer** design:

- The cough waveform (16 kHz mono) is turned into **three mel spectrograms** at different resolutions (fine, medium, coarse) and stacked like the color channels of an image.
- A **CNN branch** (ResNet with squeeze-and-excitation) picks up short, local sound patterns.
- A **Transformer branch** (ViT-style patches with a 3-layer encoder) looks at the whole clip for longer-range structure.
- A learned **attention gate** decides how much to trust each branch for each clip.

Two training tricks target the hardest problem in cough AI, which is that models trained on one dataset fall apart on another (published work shows AUC dropping from 0.82 to 0.53 across datasets):

- **Domain-adversarial training.** A second head tries to guess which dataset a clip came from, and a gradient-reversal layer trains the main model to make that guess impossible. That pushes it toward features that are about the cough, not the recording setup.
- **Class-balanced supervised contrastive loss.** Each disease class gets its own temperature, so the rare COVID-19 class gets pushed apart from the others the hardest.

</details>

<details>
<summary>Data</summary>

| Dataset | Source | Healthy | COVID-19 | Bronchitis |
|---|---|---|---|---|
| Coswara | IISc Bangalore | 1,414 | 658 | |
| CoughVID | EPFL | | ~1,010 | 2,590 |

About **5,672 recordings** across 2 datasets and 3 conditions. Targeted augmentation (6× for the rare COVID-19 class, 2× for the others) brings training to about 12,000 samples.

</details>

<details>
<summary>What I learned along the way</summary>

- **Silence was hiding the signal.** Pretrained speech models expect 30-second clips, so a 2-second cough gets padded with about 90% silence. Restricting the pooling window to where the cough actually is added **5.1 points** of balanced accuracy. [Full write-up](/blog/coughsense-silence-problem).
- **Stability beats one lucky run.** Comparing YAMNet and wav2vec 2.0 embeddings across many repeated runs, wav2vec 2.0 was more stable, and targeted augmentation improved recall. [Full write-up](/blog/yamnet-vs-wav2vec-small-data).
- **The recording screen is part of the model.** Each recording step names one sound, a time window (for example, "Deep Cough, 4 to 8 seconds"), and an exact instruction. [Full write-up](/blog/coughsense-recording-screen).
- **Faster features.** I wrote a fused CUDA kernel that computes log-mel spectrograms about 3× faster than torchaudio on short clips. [Full write-up](/blog/cuda-mel-spectrogram-kernel).

</details>

<details>
<summary>Clinic testing and consent</summary>

I tested the prototype with patients at a community clinic. Every participant gave consent before recording, and I documented the consent procedure in writing. Faces are blurred in every photo I share from those sessions.

The clinic showed me things a dataset can't: phones held at different distances, background noise in a busy room, and people who have never been asked to cough on command. [What I'd change after testing](/blog/coughsense-what-id-change).

</details>

<details>
<summary>App and system architecture</summary>

```
Mobile app (React Native / Expo)
  └─► API (Express.js, HTTPS + JWT)
        ├─► ML service (Flask + PyTorch, CoughSense V4)
        ├─► Clerk (sign-in)
        └─► Upstash Redis (rate limit: 20 requests/min)
```

- Guided multi-step recording with a progress bar
- Results in real time, with a demo mode that runs without the backend
- Accounts handled by Clerk, so the app never stores passwords

</details>
