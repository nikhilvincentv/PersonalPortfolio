---
title: "AgriDefend: Crop Stress Detection & Edge AI"
student_names: "Nikhil Vincent"
grade: 11
year: 2026
category: "Food Security"
tags: ["edge-ml", "sensors", "agriculture", "tflite", "random-forest"]
summary: "A $205 offline device that reads both the soil and the leaves to warn farmers about crop stress about 4 days before plants visibly wilt. Field-tested on working farms. Provisional patent filed May 2, 2026."
hero_image: "/images/agridefend-hardware.png"
gallery:
  - "/images/agridefend-hardware.png"
  - "/images/agridefend-hardware.jpeg"
  - "/images/resume/agridefend-field.png"
links:
  - label: "AgriDefend Website"
    url: "https://agridefend.org"
  - label: "Crop Stress Detection GitHub"
    url: "https://github.com/nikhilvincentv/crop-stress-detection"
  - label: "AgriSafe App GitHub"
    url: "https://github.com/Quantum535/AgriSafe-App"
featured: true
---
AgriDefend is a small device that sits in a field and watches for crop stress before you can see it. A camera reads the leaves, a soil probe reads what's happening at the roots, and an AI model on a Raspberry Pi combines the two. Everything runs on the device. No cloud, no cell signal, no subscription.

**Headline results:** **87% accuracy** across five crop-health classes, an early warning about **4 days** before visible wilting, **1.4-second** predictions on the device, and a full parts cost of **$205**, about a fifth of comparable commercial sensors.

**Patent:** *AgriDefend: Hardware Bridge + Multimodal Edge AI for Early Crop Stress Detection*, provisional application **64/055,521**, filed **May 2, 2026**.

Click any section below for the full details.

<details>
<summary>Field testing on real farms</summary>

AgriDefend has been deployed outdoors on working farms, including **21 Acres Farm** and **Hawthorn Farms**, alongside the controlled greenhouse trial. The field units taught us things a lab never would:

- **Enclosure:** morning dew condensed inside a sealed case from day-night temperature swings. We re-sealed it and added a vent with a hydrophobic membrane so pressure could equalize without letting water in.
- **Power:** on cold mornings the solar and battery setup sagged below what the datasheet suggested. A low-voltage cutoff now skips a reading instead of logging bad data, and sampling leans on midday hours.
- **Connectivity:** signal at Hawthorn Farms was much weaker than at 21 Acres. Readings queue on the device and upload when a connection comes back, with timestamps logged at capture time.
- **Sensor checks:** soil readings were compared against a King Conservation District soil-lab assay, which came in within a 12–15% error margin, consistent with the ±15% tolerance of low-cost probes.

[Full write-up: what breaks when you put a sensor in a field](/blog/agridefend-field-testing).

</details>

<details>
<summary>Results in detail</summary>

**Greenhouse drought trial:** 3,165 wild radish images, one node per pot across 10 pots, tracked for 7 days after the final watering. Ground truth came from expert visual scoring plus gravimetric soil-moisture measurements.

| Model | Accuracy |
|---|---|
| Camera only (CNN) | 78% |
| Soil only (Random Forest) | 75% |
| **Fused (both)** | **87%** |

- R² = 0.88, MAE = 0.05
- **92% precision on the Healthy class**, so the device rarely cries wolf
- The 9-point gain from fusion is bigger than the gap between the two branches, which means the soil and the camera catch different things

**Early warning:** the soil branch flagged rising CO₂ and a growing moisture deficit around **day 3.5**. The camera didn't see visible wilting until around **day 7.5**.

**Speed on the device** (same input, 50 runs):

| Setup | Time per prediction |
|---|---|
| Cloud endpoint | 3.5 s |
| Raspberry Pi 4, full precision | 2.8 s |
| **Raspberry Pi 5, INT8 TensorFlow Lite** | **1.4 s** |

**Generalization check:** on 54,303 lab images across 14 plant species (PlantVillage), the fused model reached 99.7%. These are curated lab photos, so we report them separately from the field result.

</details>

<details>
<summary>How the AI works</summary>

- **Camera branch:** a MobileNetV2 network classifies leaf images into Healthy, Water Stress, Nutrient Deficient, pH Imbalance, or Disease.
- **Soil branch:** a Random Forest (200 trees) reads trends every 5 minutes: moisture, how fast pH, nitrogen, phosphorus, and potassium are changing, and **belowground CO₂ minus ambient CO₂**, which tracks root activity.
- **Fusion:** a small logistic-regression model combines both. We kept it simple on purpose. It can't overfit a small field dataset, adds almost no latency, and shows which input drove each alert.
- **Trend features:** cheap soil sensors are noisy (NPK error up to ±15%), so the model looks at slopes over time instead of single readings.

</details>

<details>
<summary>Hardware and cost ($205)</summary>

| Part | Cost |
|---|---|
| Raspberry Pi 5 | $60 |
| Arducam camera | $25 |
| RS-485 7-in-1 soil sensor | $75 |
| MH-Z19C CO₂ sensor | $20 |
| ADS1115 + MAX485 bridge chips | $10 |
| 3D-printed case | $15 |
| **Total** | **$205** |

The **ADS1115 + MAX485 bridge** lets a Raspberry Pi talk to farm-grade RS-485 Modbus soil sensors. It's part of the patent filing. [Full write-up: the Modbus bridge](/blog/raspberry-pi-modbus-bridge).

</details>

<details>
<summary>Works fully offline</summary>

The Pi runs its own Wi-Fi hotspot. A farmer's phone connects straight to the device, with no router, SIM card, or account, and a React Native app shows live predictions and soil trends from a local API. Every node is self-contained, so there's no central server to fail. A grower could set up five nodes for less than the price of one commercial unit.

</details>

<details>
<summary>Papers and recognition</summary>

- Paper prepared for **IEEE ICCE 2027** (International Conference on Consumer Electronics). [How the paper came together](/blog/agridefend-ieee-paper).
- Version prepared for the **Climate Change AI workshop at NeurIPS 2026**
- Provisional patent **64/055,521**

**Next steps:** more open-field sites, more crop species, and direct plant measurements like leaf water potential.

</details>
