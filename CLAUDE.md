# Portfolio — how this repository works

This is an [Astro](https://astro.build) site, published to GitHub Pages by the
workflow in `.github/workflows/deploy.yml` on every push to `main`. There is no
`index.html` to edit: the page is generated.

## Adding or updating a project

**One project is one file**: `src/content/projects/<slug>.mdx`. The slug is the
URL, so `lap-time-simulator.mdx` is served at `/projects/lap-time-simulator/`.

```yaml
---
title: "Lap Time Simulator"
subtitle: "Modular Vehicle Development Platform · Python · React · WebGL"
category: personal          # personal · fs · pro · uni
order: 1                    # sort position within the category
tags:
  - "Python"
badge: "Grade: 10/10"       # optional
visibility: listed          # listed · unlisted · hidden
repo: https://github.com/aniolescofet13/lap-time   # optional
---
```

- `visibility`
  - `listed` — on the portfolio.
  - `unlisted` — off the portfolio, but its own page exists for a direct link.
    That page carries `noindex`, so it stays out of search engines.
  - `hidden` — not published at all.
- Every project that is not hidden has its own page, `/projects/<slug>/`, the
  link to send for a single project. That page has no menu and no link back
  to the portfolio, on purpose: whoever gets the link sees that project only.
  Do not add navigation to it.
- `repo` is independent of visibility. The GitHub icon appears on the card by
  itself when the repository is public: the build asks GitHub, and the site
  rebuilds every six hours, so making a repo public is all it takes. A private
  repo shows no icon.
- The label on the card (`PP — 01` …) is **computed** from the project's
  position among the listed ones, so hiding a project never leaves a gap. Do not
  try to set it.
- The category counts on the tabs are computed too.

The schema is in `src/content.config.ts`. A field it rejects fails the build,
which is the point: a bad value never reaches the live site.

## Writing the body

Markdown, plus three components. **They need no `import` line**; they are
provided to every project.

```mdx
**Lead-in sentence.** The paragraph continues in plain Markdown.

<Slider items={[
  { "type": "image", "src": "LapTime/P9 - Web Run.png", "alt": "What it shows", "shot": true },
  { "type": "video", "src": "/LapTime/walkthrough.mp4", "poster": "/LapTime/walkthrough-poster.jpg", "title": "…" },
  { "type": "youtube", "src": "https://www.youtube.com/embed/VIDEO_ID", "title": "…" }
]} />

<Pdf src="/Docs/Report.pdf" title="Report title" />

<Note>Small print under a slider, such as a licence credit.</Note>
```

- Every image needs an `alt` that says what it shows.
- Add `"shot": true` for a **dark** screenshot (an app UI). It frames the image on
  a dark slide; without it a dark image looks like a hole in the light page.
  Leave it off for light figures and diagrams.
- Keep the voice of the existing cards: a bold lead-in, then the mechanism.

## Where files go

| What | Where | How it is referenced |
|---|---|---|
| Images | `src/assets/<Project>/` | relative to `src/assets`: `"LapTime/P9 - Web Run.png"` |
| Video, video posters | `public/<Project>/` | from the site root: `"/LapTime/walkthrough.mp4"` |
| PDFs | `public/Docs/` | `"/Docs/Report.pdf"` |

Images under `src/assets` are resized and converted to WebP at build time: the
slide gets a small version and the lightbox a larger one, fetched only when it
is opened. **Put the full-resolution original there**; do not pre-shrink it.

Anything under `public/` is served as-is, so keep videos reasonable. They load
with `preload="none"`, so they do not slow the page, but whoever plays one
downloads all of it.

## Checking a change

```bash
npm install      # first time only
npm run build    # must finish without errors
npm run dev      # preview at http://localhost:4321
```

A missing image or an invalid front-matter field stops the build with a message
naming the file. Fix it there.

## The editor at /admin

`/admin/` is Sveltia CMS. It edits the same files and commits to `main`. Its
configuration is `public/admin/config.yml`. If you add a front-matter field to
the schema, declare it there too, so the editor shows it and writes it back on
save.

## Do not

- Recreate an `index.html` at the root, or edit anything in `dist/`. Both are
  ignored; the site is built from `src/`.
- Commit `node_modules/` or `dist/` (they are in `.gitignore`).
- Commit the private working files listed in `.gitignore`.
