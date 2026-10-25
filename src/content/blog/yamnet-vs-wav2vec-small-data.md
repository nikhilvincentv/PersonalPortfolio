---
title: "YAMNet vs. wav2vec 2.0 When You Only Have a Few Hundred Coughs"
description: "With a small respiratory dataset, one lucky training run can fool you. I compared two pretrained audio models across repeated runs, and the steadier one won."
pubDate: 2026-09-07
heroImage: "/images/blog/coughsense-clinic-phone.jpg"
tags: ["ml", "audio", "research", "health"]
draft: false
---
Big audio datasets have hundreds of thousands of clips. Mine didn't. Every cough recording in CoughSense came from a real person who agreed to be recorded, often in a clinic like the one in that photo. That kind of data is worth a lot, and there's never enough of it.

With so few samples, training a model from scratch isn't realistic. The usual move is to borrow a model someone else trained on a huge amount of audio, run your clips through it, and train a small classifier on the embeddings that come out. The question is which model to borrow from. I tested two.

## The two candidates

**[YAMNet](https://www.tensorflow.org/hub/tutorials/yamnet)** is a compact model from Google trained to recognize 521 everyday sound classes, from dogs barking to sirens. Coughing is one of them. It's small, fast, and runs fine on a phone.

**[wav2vec 2.0](https://huggingface.co/docs/transformers/model_doc/wav2vec2)** is a much larger model from Meta, trained on speech with a self-supervised objective. It learned to model raw audio without labels, so its embeddings capture fine detail in how a sound is shaped over time.

On paper, YAMNet looks like the obvious pick. It already knows what a cough is.

## How I compared them

With a small dataset, one training run means almost nothing. Shuffle the data differently, and a model can look great or terrible by luck. So I set up the comparison like an ablation:

1. Same clips, same train/test splits, same classifier on top. The only thing that changed was which embedding went in.
2. Each setup was trained **many times** with different random seeds, and I looked at the spread of results, not just the best one.
3. I ran it with and without data augmentation, since augmentation is the other standard trick for small datasets.

I tracked precision and recall, but I paid the most attention to recall. In a screening tool, a missed concerning cough is the worse mistake. A false alarm costs someone a doctor's visit. A miss costs them the warning.

## What I found

**wav2vec 2.0 was more stable.** Across repeated runs, its results moved around a lot less. YAMNet sometimes matched it on a good run, but its bad runs were noticeably worse. With small data, I'll take a model that's reliably decent over one that's occasionally great.

**Targeted augmentation helped recall.** Adding carefully chosen, slightly altered copies of the training coughs improved how many concerning coughs the model caught. The goal was to keep the changes realistic, the kinds of differences you'd actually hear between two phones in two rooms, instead of distorting the cough into something no microphone would record.

**Knowing what a cough is didn't help as much as I expected.** YAMNet's training taught it to tell a cough from a door slam. My task was telling one cough from another. That's a much finer distinction, and my best guess is that wav2vec's more detailed representation of the audio carries more of it.

## What I'd tell someone starting out

If your dataset is small, don't trust one run. Train each setup several times, report the spread, and pick the option with the fewest bad surprises. A single impressive number from a single run is easy to get and hard to reproduce, and I'd rather find that out on my laptop than in a clinic.

The original CoughSense demo is on [YouTube](https://www.youtube.com/watch?v=FJy52pClssQ), and I wrote about [what I'd change about the whole project](/blog/coughsense-what-id-change) a few weeks after this.
