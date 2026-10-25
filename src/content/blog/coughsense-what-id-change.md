---
title: "Going Back to CoughSense With Everything I Learned This Summer"
description: "My cough screening tool was the first serious ML project I built. After a summer of CUDA kernels, research papers, and real users, here's what I'd change."
pubDate: 2026-09-21
heroImage: "/images/blog/coughsense-clinic-2.jpg"
tags: ["ml", "audio", "health", "reflection"]
draft: false
---
The photo above is from a community clinic where I tested my cough screening prototype. Someone coughs into a phone, the app turns the recording into an embedding with a pretrained audio model, and a classifier gives a screening estimate with a confidence band. People's faces are blurred because they're real patients who agreed to help.

I built most of that over the past year. Now that school has started again and summer's projects are wrapping up, I keep coming back to it with fresh eyes. Here's what I'd change.

## 1. Fix the front end before the model

Earlier this year I found that [Whisper was averaging in about 90% silence](/blog/coughsense-silence-problem) on short cough clips. Restricting the pooling window was worth 5.1 points of balanced accuracy, more than any model change I tried.

This summer I [wrote a CUDA kernel](/blog/cuda-mel-spectrogram-kernel) that computes log-mel spectrograms about 3× faster than torchaudio on short clips. Both experiences point the same way. The step that turns sound into numbers matters more than I gave it credit for, and it's worth looking at before reaching for a bigger model.

If I rebuilt CoughSense today, I'd start by measuring exactly what the model sees: how much of each clip is cough, how much is room noise, and how much is padding.

## 2. Write the success criteria down first

This summer I started writing my success criteria down before running an experiment, and it stopped me from fooling myself more than once. CoughSense never had that. When an augmentation bumped recall on a run, it was easy to keep it without asking whether the bump would survive a rerun.

Next time, before an experiment I'd write down which metric counts, how many repeated runs, and what improvement would be worth keeping. Then I'd stick to it.

## 3. Treat the clinic visit as the real test

Clinic testing showed me things a dataset never would. Phones get held at different distances. A busy room adds background noise. Nobody coughs the same way twice. The [AgriDefend field deployment](/blog/agridefend-field-testing) taught me the same lesson with a sensor: the lab is a rehearsal.

I'd plan for that from day one, with a short checklist for each recording (distance, environment, device) so I could later tell whether errors come from the model or the setting.

## 4. Be clear about what it isn't

CoughSense is a screening prototype, not a diagnosis, and every screen of the app should say so. Building Audra with a licensed preparer in the loop made me think harder about this. When a mistake costs someone their health or their money, the honest design puts a qualified person between the model and the decision.

## Still worth building

I'm not starting over. The core idea holds: a phone microphone is everywhere, and a cheap first check that tells someone "get this looked at" could matter a lot where a doctor is far away. I just know how to build it better now.

The original demo is on [YouTube](https://www.youtube.com/watch?v=FJy52pClssQ) if you want to see where it started.
