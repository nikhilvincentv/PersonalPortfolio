---
title: "Respiratory Audio Classification Study"
student_names: "Nikhil Vincent"
grade: 11
year: 2026
category: "Machine Learning"
tags: ["augmentation", "ablation", "yamnet", "wav2vec", "audio", "pytorch"]
summary: "A controlled ablation study evaluating augmentation strategies and pretrained embedding choices for low-sample respiratory audio classification."
hero_image: "/images/project-research.jpg"
gallery:
  - "/images/project-research.jpg"
featured: false
---
This project evaluates augmentation strategies for low-sample respiratory audio classification in a controlled, ablation-style experimental framework.

The study compares pretrained embeddings — **YAMNet vs. wav2vec 2.0** — for downstream classifier performance, and analyzes precision, recall, and model stability across multiple training runs with varying dataset compositions.

Key methodology:
- Designed controlled experimental study with baseline and augmented datasets
- Conducted ablation-style comparisons to isolate variable impact
- Measured precision, recall, and stability across repeated training runs
- Documented findings in a formal technical write-up with reproducibility in mind
