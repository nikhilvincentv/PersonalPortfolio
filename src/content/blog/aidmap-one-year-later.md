---
title: "AidMap, One Year Later"
description: "A year ago this week, our team took second at EMP Hackfest with a disaster-response map. Here's what holds up, what doesn't, and what I'd build now."
pubDate: 2026-09-14
heroImage: "/images/blog/aidmap-map.jpg"
tags: ["hackathon", "civic-tech", "reflection", "maps"]
draft: false
---
In September 2025, our team built [AidMap](https://devpost.com/software/aidmap-3rovk8) at EMP Hackfest and took second place. It's been a year, so I reopened the code to see how it holds up.

## What we built

AidMap had two sides. The public side was a map where anyone could submit a request: what they needed, where, and how urgent it was. The responder side was a dashboard for the people coordinating supplies. They could see requests as pins, filter them, switch to a heatmap to spot clusters, and track what had been delivered.

The map in that screenshot is the request view. Red pins are active requests, green are fulfilled, yellow are pending. You can also switch between map styles, including a dark mode for responders working at night.

## What holds up

**The two-sided design.** Splitting the app into a "need help" side and a "giving help" side was the right call. They're different people under very different kinds of stress, and trying to serve both on one screen would have made it worse for each.

**Priority as a first-class field.** Every request had an urgency level from the start. In a disaster, a first-come-first-served list is a bad way to run things. We got that part right.

**Free, open maps.** We built the map in Python with Folium, which runs on Leaflet and open map tiles instead of a paid API. There was never a key to run out of or a bill to worry about. I've used open tiles on almost every map project since.

**A cooldown on requests.** We stored each submission and checked whether the same user had already asked recently, so one person couldn't flood the map. It was one of the features we were proudest of, and it was harder to get right than it sounds.

## What doesn't

Looking at it now, AidMap was a demo of a disaster tool, and it would struggle in a real disaster. A few things jump out:

- **It assumed internet.** During real disasters, cell networks go down first. A request form that needs a live connection fails exactly when people need it. If I rebuilt it, I'd make it offline-first: queue the request on the phone and send it whenever any connection comes back. That's the same pattern I ended up using later in [AgriDefend](/blog/raspberry-pi-modbus-bridge).
- **It stored everything in JSON files.** That was fine for a weekend and a demo. With thousands of people submitting at once, a few flat files would turn into the bottleneck, and two requests saving at the same moment could overwrite each other. A real database was the first thing I'd add.
- **"Use current location" is a lot to ask.** Some people won't share their location with an app they've never heard of, and some shouldn't have to. A typed landmark or a nearby intersection should have been a first-class option.

## What changed in me

A year ago I measured a project by how many features it had at the demo. Now I think about what happens when the network drops, when the data is wrong, or when a real person uses it on a bad day. Most of what I've built since, from AgriDefend's offline design to the fallbacks in Audra and AIsle, comes back to the questions AidMap didn't ask.

The code is still up on [GitHub](https://github.com/thesaucemantv/AidMap). It's rough, and I'm still proud of it.
