---
title: "The Data Was the Hard Part of Community Compass"
description: "We built a map of local food banks, housing help, and youth programs. Writing the app took weeks. Getting the addresses onto the right spot of the map took longer."
pubDate: 2026-08-31
heroImage: "/images/blog/community-compass.jpg"
tags: ["civic-tech", "data", "react", "tsa"]
draft: false
---
Community Compass started from a simple observation. If you need help in your area, like a food bank, rental assistance, or a free coding program, the information exists. It's just scattered across outdated city pages, Facebook groups, and flyers on a bulletin board. The people who need it most have the least time to dig.

So our team built one place for it: a searchable, mapped directory of local resources, with a way for organizers to add new ones. We built it for TSA, and it became one of the bigger apps I've worked on.

## The stack

- **React 19 + Vite** on the frontend, with Tailwind and Framer Motion
- **React-Leaflet** with OpenStreetMap tiles, so the map works without a paid API key
- **Neon** serverless Postgres for the data
- **Python serverless functions** on Vercel for the backend, mostly because Python made the text cleanup and Gemini calls easy
- **Clerk** for sign-in, so we never stored a password ourselves

We also put real effort into accessibility: a high-contrast mode, larger text options, and a `Ctrl+K` command palette so you can get around without a mouse. When the people using your app might be stressed, tired, or on an old phone, those features stop being optional.

## Where the time actually went

I expected the UI to be the hard part. It wasn't. The hard part was the data.

Resource listings come in every format you can imagine. One spreadsheet has the address in a single cell, another splits it into four columns, and a third just says "behind the library." Phone numbers come in five formats. Some organizations have three locations under one name.

The project folder tells the story better than I can. Look at the file names: `csv_import_guide.md`, `geocode_resources.py`, `fix_coords.py`, `fix_db.py`, `check_gaps.py`. Each of those exists because something broke. Geocoding turns an address into map coordinates, and an ambiguous address can land a pin in the wrong place. So we needed a script to find pins that landed somewhere impossible. Then another to fill in records that were missing fields.

## What I'd tell another team

**Budget at least as much time for the data as for the app.** A beautiful map with a food bank pinned three towns over is worse than a plain list, because someone might actually drive there.

**Show the source and the date.** Every listing should say where the information came from and when someone last checked it. Resources close, hours change, and phone numbers get reassigned. Being honest about how old the data is builds more trust than pretending it's always current.

**Make it easy to report a mistake.** The people using a directory know more about their neighborhood than any dataset does. We built the contributor flow so a local organizer can add or fix a listing without going through us.

This was a team project, and I'm grateful to everyone who stuck through all those cleanup scripts. Community Compass taught me that civic tech is mostly about getting the details right. The software just has to stay out of the way.
