Animations changes overview

- Card hover micro-interactions: lift and slight scale on hover for tactile feedback.
- Scroll reveal for project cards: fade-in / slide-in as cards enter the viewport.
- Button micro-animation: subtle pulse on hover for CTA-like feedback.
- Minimal fullscreen transition for hero image on project detail: click to enter fullscreen, click again or press Escape to exit with smooth transition.
- Reduced-motion accessibility: respect user preference to disable motion when reduced-motion is enabled.
- In-card details: a small Details toggle to preview project descriptions without navigating away.
- Parallax touch / tilt: added gentle tilt on hover for depth, with safe fallbacks on mobile.

What changed (code-level summary)
- CSS: new hover, reveal, pulse, and fullscreen styles. Added reduced-motion guards.
- JS:
  - IntersectionObserver for scroll reveal on .reveal elements.
  - Click-to-fullscreen on hero images in the project detail view.
  - In-card Details toggle to preview summaries without navigation.
- Content: added Local Business Finder project; updated cough project to reference cough app GitHub.
- Docs: new docs/animations.md describing patterns, rationale, and test steps.

How to test locally (high level)
- Run the site and visit /projects. Hover over cards to see tilt/lift. Scroll to trigger reveal animations.
- Open a project detail, click the hero image to enter fullscreen (press Escape to exit).
- Use system preference for reduced motion to confirm animations are reduced or disabled.
- Try the in-card Details toggle to preview the summary without navigating away.

Notes
- If you want to tweak timing, easing, or introduce additional patterns (e.g., more pronounced parallax on desktop, or mobile-friendly tap-to-activate reveals), I can adjust the CSS/JS accordingly.

Preview/Status
- This doc is intended to accompany the animation changes and serve as a reference for reviewers.
