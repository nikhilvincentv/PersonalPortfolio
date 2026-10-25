---
title: "The Photographer Is an Hour Late: Building AIsle at the Divergent Hackathon"
description: "Wedding apps store your vendor list. None of them know that a late photographer means hair and makeup has to move. We built one that does."
pubDate: 2026-07-20
heroImage: "/images/blog/aisle-cascade.jpg"
tags: ["hackathon", "ai", "product", "teamwork"]
draft: false
---
None of the three of us were planning a wedding when we picked this idea. Cleo Balaranjith, Sidhu Chakravarthy, and I went into the Divergent Hackathon wanting a problem where AI did something a spreadsheet couldn't. Wedding planning kept coming up because everyone has watched someone they love go through it.

The numbers are a little absurd. A typical wedding involves around eighteen vendors and a hundred and fifty guests, with deposits, contracts, and deadlines spread across email threads and a camera roll. Couples who want help can hire a planner, but a good one runs three to ten thousand dollars on top of a wedding that already averages about thirty-five thousand.

## The gap we went after

Apps like The Knot, Zola, and plain Google Sheets do a fine job of **storing** things. They hold your vendor list, your budget, your Pinterest board. What they can't do is notice that two of those things depend on each other.

Here's the scenario we built the whole demo around. The photographer moves from 10:00 to 11:00. In any existing app, that's one changed cell. In real life it means hair and makeup has to shift, transportation has to shift, the reception timeline has to be rebuilt, and someone has to tell the family that photos moved. Today, the couple does all of that by sending ten texts.

**AIsle Plan** treats the wedding as a graph of dependencies. Change one node, and it walks the graph, works out what else has to move, and drafts the messages. We called it relational intelligence on the slide, which sounds fancier than "it knows what depends on what."

## My part

I took the technical slides and ran the live demo, which meant I also owned the scariest two and a half minutes of the pitch. A few things I learned about demoing something with an AI model in it:

- **Build an offline mode.** AIsle runs with zero configuration. Add an API key and it calls a live model through any OpenAI-compatible endpoint. Leave it out and it uses a built-in offline mode.
- **Seed your demo accounts.** Late in the build, new accounts came up empty and our search index (Typesense) threw an offline error on Vercel. The fix was to seed every new account with realistic mock data and sync the index on startup. A blank dashboard kills a demo faster than a bug does.
- **Put the demo right after the promise.** Our slide 6 claimed the cascade. The demo came right after it and proved it live. Judges don't have to take your word for anything if the next thing they see is the thing working.

## What I'd do differently

I'd test the cascade logic against stranger inputs earlier, like two vendors moving at once. Next hackathon I want the core logic locked by the end of day one, so everything after that can go into polish and rehearsal.

Working with Cleo and Sidhu was the best part. Cleo opened and closed the pitch, Sidhu owned the business side, and I got to stay in the code. A good split like that is rarer than a good idea.
