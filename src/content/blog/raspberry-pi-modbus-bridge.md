---
title: "Getting a Raspberry Pi to Talk to a Farm-Grade Soil Sensor"
description: "The best cheap soil probe I could find speaks RS-485 Modbus. The Pi doesn't. Here's the small bridge board that fixed that, and the UART fight it started."
pubDate: 2026-07-27
heroImage: "/images/blog/agridefend-enclosure.jpg"
tags: ["hardware", "raspberry-pi", "agriculture", "agridefend"]
draft: false
---
If you want to measure soil for a crop stress project, the hobby sensors are tempting. A capacitive moisture probe costs a few dollars and plugs straight into a breadboard. The problem is that moisture alone tells you very little. For AgriDefend I wanted pH, nitrogen, phosphorus, potassium, temperature, and conductivity too, from one probe sitting in one spot.

The probes that do all of that are built for farms and greenhouses, and they speak **RS-485 Modbus RTU**. That's an industrial protocol from the 1970s that still runs half the equipment on earth. A Raspberry Pi has no idea what to do with it.

## The bridge

RS-485 sends data as a voltage difference between two wires, A and B, which is why it survives long cable runs and electrical noise out in a field. The Pi's UART speaks plain 3.3 V TTL serial. You need something in between.

That something is a **MAX485**, a chip that costs about as much as a candy bar. Here's how I wired it on the Pi 5:

| MAX485 pin | Pi pin | What it does |
|---|---|---|
| RO | GPIO15 (UART RX) | data coming back from the sensor |
| DI | GPIO14 (UART TX) | data going out to the sensor |
| DE + RE | GPIO18 | tied together; one pin flips between talking and listening |
| A / B | sensor | the RS-485 pair |

RS-485 is half-duplex. Only one side talks at a time, so before every request the Pi pulls GPIO18 high to transmit, sends the Modbus query, then drops it low to listen for the reply. Get that timing wrong and you'll read back your own request or nothing at all.

Next to it sits an **ADS1115**, a 16-bit analog-to-digital converter. The Pi has no analog inputs, so the ADS1115 reads the capacitive moisture probe and hands the value over I²C at address `0x48`. It shares that bus with a BME680 for air temperature, humidity, and pressure at `0x77`. If you're building something similar, run `i2cdetect -y 1` before you write any code. Seeing both addresses show up saves you from debugging software that was never the problem.

## The UART fight

Then I added a CO₂ sensor, the MH-Z19C. Belowground CO₂ compared to ambient air works as a rough proxy for soil respiration, which turned out to matter a lot for early stress detection. It also talks over UART. So does the MAX485. Both wanted UART0.

You have two options here. You can bit-bang the RS-485 line in software, which works until timing gets tight. Or you can enable a second hardware UART. The Pi 5 has extras that are switched off by default. One line in `/boot/firmware/config.txt` does it:

```ini
dtoverlay=uart2
```

The CO₂ sensor moved to GPIO4 and GPIO5 as `/dev/ttyAMA2`, the soil probe kept UART0, and they stopped stepping on each other. One more trap: the MH-Z19C needs **5 V**, not 3.3 V. On 3.3 V it powers on and returns garbage, which is worse than failing outright.

## Why bother

The ADS1115 and MAX485 together came to about $10. That little bridge lets a consumer board read farm-grade sensors, and it's a big part of why the full AgriDefend unit costs around $205 instead of the roughly $1,000 that comparable commercial nodes run. It's also one of the pieces covered in our provisional patent.

The full wiring guide, with every pin, is in the [crop-stress-detection repo](https://github.com/nikhilvincentv/crop-stress-detection) under `RASPBERRY_PI_DEPLOYMENT.md`.
