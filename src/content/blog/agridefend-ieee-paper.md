---
title: "Turning a Duct-Taped Box Into an IEEE Paper"
description: "The AgriDefend prototype is held together with gaffer tape. The paper about it has to survive peer review. Writing the second taught me what the first was actually doing."
pubDate: 2026-08-03
heroImage: "/images/blog/agridefend-prototype.jpg"
tags: ["research", "writing", "agridefend", "edge-ai"]
draft: false
---
That photo is the real AgriDefend prototype. Black 3D-printed case, four legs that push into the soil, a window on top for the camera, and two strips of tape holding the lid on. It has spent weeks in the dirt, and it works.

This month I've been turning it into a paper for **IEEE ICCE 2027**, the International Conference on Consumer Electronics. The submission deadline is August 15. The limit is six pages.

## What the paper actually claims

Writing an abstract forces you to say what you built in about 150 words, with no room for the parts you're excited about but can't back up. Here's where I landed:

- Most field crop monitors sense **one thing**. Either a camera looks at leaves, or a probe reads the soil. Stress that starts underground stays invisible until it shows up above it.
- AgriDefend fuses both. A **MobileNetV2** CNN reads canopy images. A **Random Forest** reads trends from a single soil probe: moisture, the rate of change in pH and N, P, K, and belowground CO₂ compared to ambient air. A small logistic-regression model combines the two into a five-class health prediction.
- All of it runs on a Raspberry Pi 5. No cloud, no cell signal.
- In a controlled greenhouse drought trial with wild radish, the fused model hit **87% accuracy** at **1.4 seconds** per prediction using INT8 TensorFlow Lite, and the soil signals moved about **four days** before the plants visibly wilted.
- The bill of materials is **$205**, roughly a fifth of comparable commercial nodes.

## The hardest part was deciding what to cut

I had way more material than six pages. The Modbus bridge alone could fill two. I'd also run field deployments at 21 Acres Farm and Hawthorn Farms, which I care about a lot, but those were messier and less controlled than the greenhouse trial.

I built the paper around the greenhouse results, because that's where I could make clean claims, and kept the field work short, as evidence that the hardware survives outside. Picking one result to stand on made every other section easier to write.

## "Consumer electronics" changed the framing

I first wrote this as an agriculture paper. ICCE is a consumer electronics venue, and reviewers there care whether a regular person could buy, build, or use the thing. That pushed me to lead with the $205 price and the offline design, and to include a full bill of materials table. In an ag journal, those details would sit in a supplement.

The same research can be two different papers depending on who reads it. I'm also preparing a version for the Climate Change AI workshop at NeurIPS (deadline August 29), where the pitch leans toward food security in places with no connectivity.

## One rule I kept

I set a hard rule for the drafting process: **no number goes in the paper unless it traces back to a result file.** Anything I didn't have yet stayed as a visible `PLACEHOLDER` in the LaTeX until I did. It slows things down, but it means every number in the abstract above has a script behind it.

The code is public at [github.com/nikhilvincentv/crop-stress-detection](https://github.com/nikhilvincentv/crop-stress-detection). The tape is staying on the prototype for now.
