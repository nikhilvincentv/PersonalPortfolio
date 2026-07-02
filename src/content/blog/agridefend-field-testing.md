---
title: "What Actually Breaks When You Put a Sensor In a Field"
description: "The PCB worked fine on my desk. Then we bolted it to a post at 21 Acres Farm and found out what a lab bench doesn't tell you."
pubDate: 2026-06-26
heroImage: "/images/blog-agridefend-field.jpg"
tags: ["hardware", "agriculture", "engineering"]
draft: false
---
Everything about the AgriDefend sensor worked on my desk. Power drew where it should, the soil and atmospheric readings came back clean, the board didn't overheat, the whole thing looked ready. Then we took it out to 21 Acres Farm, mounted it, and within a couple of weeks I understood why every hardware person tells you the lab means almost nothing.

The first thing that failed wasn't the electronics. It was the enclosure. I'd assumed a basic weatherproof case would hold up, but morning dew condensing inside a sealed box is a different problem than rain hitting it from outside. Moisture built up on the inside of the case from temperature swings between night and day, and I found beads of water sitting near the connectors on one of our early checks. Nothing shorted out, but it was close enough that I redid the sealing and added a small vent with a hydrophobic membrane so pressure could equalize without letting liquid water in.

Power was the second surprise. On my desk the board ran off a bench supply that never wavered. In the field it ran off a small solar setup with a battery buffer, and battery behavior in cold mornings is not what I expected — voltage sagged more than the datasheet implied once temperatures dropped, which meant a couple of early-morning readings came back garbled or missing entirely. I ended up adding a low-voltage cutoff so the board would rather skip a reading than log garbage, and adjusted the sampling schedule to lean more heavily on midday and afternoon windows when the battery was healthier.

Connectivity was the most annoying one, honestly, because it wasn't really a hardware problem. We deployed a second unit at Hawthorn Farms, and the signal strength there was noticeably worse than at 21 Acres — different terrain, more obstruction between the sensor and wherever it needed to send data. Readings would queue up locally and then dump all at once whenever a connection finally came through, which is fine functionally but made the data harder to reason about at first, since timestamps clustered strangely if I wasn't careful about how I logged them.

None of these were exotic problems. They were the kind of thing you'd expect if you thought about it in advance, and I mostly hadn't, because a controlled bench test doesn't ask the same questions a field does. What I'd tell anyone building a sensor for outdoor deployment is that the electronics are usually the easy part. Enclosures, power under real conditions, and connectivity across uneven terrain are where the actual engineering happens, and you mostly find out by putting the thing outside and waiting to see what goes wrong.
