---
title: "The Most Important Screen in My Cough App Has One Button"
description: "A screening model can only be as good as the recording you feed it. So the CoughSense record screen tells you exactly how to cough, for how long, and how many times."
pubDate: 2026-08-10
heroImage: "/images/blog/coughsense-app-record.jpg"
tags: ["ml", "audio", "design", "health"]
draft: false
---
When people picture a health app built on machine learning, they picture the model. I did too, for a while. Then I started thinking about what actually reaches the model, and I realized the recording was as likely to fail as the model was.

That screenshot is the screen that fixed it. It's one step of a four-step flow, and it does one job: get a clean, consistent cough recording out of someone who has never done this before.

## What "record a cough" leaves out

A button that just says "Record cough" sounds clear. It isn't. Left alone, one person gives a single polite cough, another coughs ten times, one holds the phone at arm's length, another holds it against their chin, and someone starts talking halfway through to ask if it's working.

If all of those recordings go into the same model, it has no way to know which differences come from the person's lungs and which come from how they held the phone. If I want the model to learn the difference between a healthy cough and a concerning one, everything else about the recording has to stay as boring and repeatable as I can make it.

## What the screen says now

Look at the card in the screenshot:

- **A name for the step: "Deep Cough."** Each step asks for one specific sound, so the model compares like with like.
- **A time range: 4 to 8 seconds.** Long enough to capture several coughs, short enough that people don't drift into talking. It also keeps the clip close to the length the audio models expect, which matters more than you'd think. I wrote about what happens when a clip is too short in [The Problem With Whisper and a 3-Second Cough](/blog/coughsense-silence-problem).
- **An exact instruction: "Cough deeply 3–5 times from your chest, with full effort."** "From your chest" stops throat-clearing. "Full effort" stops the polite cough. "3–5 times" gives the model several examples per clip without letting it run long.
- **A progress bar.** "25% Complete" tells you this is a short, finite task. People are much more patient with step one of four than with a screen that might go on forever.
- **One big button.** Nothing else to tap, nothing to misread.

## Consent comes before the button

Before anyone reaches this screen, they've already agreed to be recorded and been told what the recording is for. When I tested CoughSense in a community clinic, consent was a written procedure, not a checkbox I added at the end. Every photo I share from those sessions has faces blurred, including the one on my [first CoughSense post](/blog/coughsense-silence-problem).

It feels like paperwork, but it's part of the design. A cough recording is health data. People are trusting you with something about their body, and they should know exactly where it goes before they tap anything.

## What I took from it

It's easy to spend weeks squeezing accuracy out of a model and forget about the card with four lines of text that decides what the model hears. When your input comes from people, the interface is part of your data pipeline. Design it like one.
