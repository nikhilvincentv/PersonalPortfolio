# Nikhil Vincent's portfolio

This is the source for [nikhilvincent.dev](https://nikhilvincent.dev/), where I keep my projects, research, write-ups and awards in one place.

## What's on the site

- **Projects:** AgriDefend, CoughSense, AidMap, ViceVersa and a few others
- **Research:** soil respiration modeling and a small-data respiratory audio study
- **Blog:** write-ups of what broke, what I fixed and what I'd change
- **Achievements and leadership:** awards, competitions and the community work I organize

## Code for the projects

- [AgriDefend](https://github.com/nikhilvincentv/crop-stress-detection)
- [CoughSense](https://github.com/nikhilvincentv/Cough-Mobile-App)
- [CUDA mel spectrogram kernel](https://github.com/nikhilvincentv/cuda-mel-spectrogram)
- [Community Compass](https://github.com/nikhilvincentv/CommunityApp)
- [AIsle](https://github.com/nikhilvincentv/cadence-wedding)
- [ViceVersa provider app](https://github.com/nikhilvincentv/care-sync-provider-viceversa)

## How it's built

The site uses Astro with MDX and is hosted on Netlify. Everything on the site lives in `src/content/` as markdown files: `projects`, `research`, `blog`, `achievements` and `leadership`. Images are in `public/images/`. Content can also be edited through Decap CMS at `/admin`, which needs Netlify Identity and Git Gateway turned on.

## Run it locally

```bash
npm install
npm run dev
```

Netlify builds with `npm run build` and publishes the `dist/` folder.
