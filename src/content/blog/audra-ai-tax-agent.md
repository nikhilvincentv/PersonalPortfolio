---
title: "Building an AI Accountant in a Weekend (With a Human Who Signs)"
description: "Audra connects to a seller's bank, sorts every transaction, finds deductions, and drafts a Schedule C. A licensed preparer still has to sign. That second part was the whole point."
pubDate: 2026-07-13
heroImage: "/images/blog/audra-taxes.jpg"
tags: ["hackathon", "fintech", "ai", "startup"]
draft: false
---
Online sellers have a tax problem that nobody warns them about. You start flipping sneakers or running a small Shopify store, money starts coming in from five platforms, and suddenly you owe self-employment tax on income you never tracked. Hiring an accountant costs more than a lot of these sellers make in a quarter. Doing it yourself means a spreadsheet and a lot of guessing.

That was the pitch behind **Audra**, which I built for a tax hackathon this month. The one-line version: your AI accountant, backed by a real one.

## How it works

You connect a bank account through [Plaid](https://plaid.com/docs/sandbox/). Audra pulls every transaction and runs it through a categorizer that sorts business from personal, tags likely deductions (shipping supplies, platform fees, a share of your phone bill), and flags anything strange, like a $900 charge that doesn't match anything else in your history. From there it drafts a Schedule C and walks you through the findings.

Then the draft goes to a licensed Enrolled Agent, who reviews it and signs. There's also an audit-defense chat where you can ask why a deduction was taken and get an answer tied to the specific transaction.

The stack was small on purpose. A Node/Express server holds the Plaid SDK, the frontend is a single HTML file, and the AI layer calls Gemini 2.0 Flash.

## The decision I'm proudest of

Audra works with no API key at all. If there's no model available, it falls back to a deterministic rule-based categorizer. I treated that fallback as the floor, for two reasons.

The first was practical. Hackathon Wi-Fi fails, API quotas run out, and a demo that dies on stage is worse than no demo. The second reason mattered more. Taxes are a domain where a confident wrong answer costs someone real money. Having rules as the floor meant I could always compare what the model said against what a boring, predictable system said. When they disagreed, that disagreement became a flag for the human reviewer instead of a silent guess.

## Why there's a human in the loop

I could have pitched Audra as "AI files your taxes." Judges might have liked it more. But I don't think a model should sign a tax return, and I don't think a seller should trust one that does. A real return gets filed under a licensed preparer's PTIN. Designing around that from day one shaped everything: the AI does the tedious sorting, and a person with a license takes responsibility for the result.

Everything in the demo runs on Plaid's sandbox with fake money. Nothing in it is tax advice. But the flow is real, and you can click through it end to end in about two minutes.

The harder question came after the hackathon: how do you get a stranger to connect their bank account to software made by a 17-year-old? I'll write about that one separately, because the answer surprised me.
