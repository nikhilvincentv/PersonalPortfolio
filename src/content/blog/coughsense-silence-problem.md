---
title: "The Problem With Whisper and a 3-Second Cough"
description: "Whisper wants 30 seconds of audio. A cough clip barely gives it 3. Here's what happens to the other 27, and why fixing it was worth 5 points of accuracy."
pubDate: 2026-06-24
heroImage: "/images/blog-coughsense-spectrogram.jpg"
tags: ["ml", "audio", "research"]
draft: false
---
I spent a good chunk of last year trying to get a model to tell the difference between a normal cough and one that might mean something's wrong with your lungs. Along the way I ran into a problem that had nothing to do with the disease and everything to do with how the model I was using was built in the first place.

Whisper, the speech model I was borrowing embeddings from, expects 30 seconds of audio. That's just how it was trained — every clip gets padded or trimmed to fit that window. A cough recording is nothing like that. Someone coughs, it's over. You get a clip that's 1 to 4 seconds long if you're lucky enough to have trimmed it well.

So what happens when you feed a 2-second cough into a model built for 30-second clips? Whisper doesn't complain. It just pads the rest with silence and processes the whole thing anyway. Which means when I pulled the final embedding — the vector I was actually going to feed into my classifier — I was averaging across roughly 1500 tokens, and something like 1350 of them represented dead air. Call it 90% waste, give or take depending on the clip.

I didn't catch this right away. My first models were mediocre, and my instinct was to blame the data — not enough samples, noisy labels, the usual suspects. It took a while before I actually visualized what the embeddings looked like frame by frame and realized the model was, in a sense, listening politely to nothing for most of the clip. The cough itself was a small spike of signal drowned out by a much larger pool of silence.

The fix ended up being simple once I saw the problem clearly: stop pooling across the whole sequence. I restricted the pooling window to roughly the first 200 tokens — enough to cover where the actual cough sound lived, based on looking at a bunch of clips manually — and threw out the rest instead of letting it dilute the average.

That one change added 5.1 points of balanced accuracy. Nothing else I tried that month came close. Not new features, not different classifiers, not more data augmentation. Just refusing to let silence vote on the answer.

The lesson I took from this, and the reason I'm writing it down, is that pretrained models carry assumptions from whatever they were trained on, and those assumptions don't always transfer. Whisper is extremely good at what it does. It just wasn't built with 2-second cough clips in mind, and it will not tell you that. You have to go looking for the mismatch yourself.
