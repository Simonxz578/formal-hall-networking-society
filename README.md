# Formal Hall Networking Society website

This repository contains the lightweight static website for the Formal Hall Networking Society. The site records the society’s founding chapter in Cambridge, its leadership, and the 2025–2026 event archive.

The website is deliberately built with only HTML, CSS and vanilla JavaScript. It has no package manager, build step, framework, database or back end.

The live GitHub Pages site is:

<https://simonxz578.github.io/formal-hall-networking-society/>

## Local preview

From the repository root, run:

```bash
python3 -m http.server 8000
```

Then open:

<http://localhost:8000>

Use a local server rather than opening `index.html` directly. This makes relative paths behave in the same way as they do on GitHub Pages.

## Project structure

```text
.
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── favicon.svg
│       ├── founders/
│       │   ├── junwei-wang-frank.jpg
│       │   └── xiang-zhang-simon.jpg
│       └── archive/
│           └── 2025-2026/
│               ├── 2025-10-21-hughes-hall-diwali-formal.jpg
│               ├── 2025-11-04-hughes-hall-networking-formal.jpg
│               ├── 2026-01-01-founding-year-gathering.jpg
│               ├── 2026-02-18-founding-year-gathering.jpg
│               ├── 2026-03-03-caius-networking-formal.jpg
│               ├── 2026-05-08-lucy-cavendish-formal.jpg
│               ├── 2026-05-26-hughes-hall-thank-you-formal.jpg
│               └── responsive/
│                   ├── [matching]-720.jpg
│                   └── [matching]-1200.jpg
└── README.md
```

The main page sections are maintained in `index.html`. Visual design and responsive rules are in `assets/css/styles.css`. The small script in `assets/js/main.js` enhances the mobile navigation, active navigation state, footer year and accessible image lightbox.

Without JavaScript, the content and image links remain available and the mobile navigation remains visible.

## GitHub Pages deployment

This is a root-level static site. No compilation is required.

For branch-based GitHub Pages deployment, the repository should be configured under **Settings → Pages** with:

- Source: **Deploy from a branch**
- Branch: the repository’s publishing branch, normally `main`
- Folder: `/(root)`

After a change is merged into the configured publishing branch, GitHub Pages publishes the files from the repository root. Deployment status appears in the repository’s **Actions** or **Environments** area, depending on the Pages configuration.

Do not add a build system solely for deployment. Keep `index.html` at the repository root and preserve the relative `assets/...` paths.

## Founder portraits

Store approved founder portraits in:

```text
assets/images/founders/
```

Current portrait paths are:

```text
assets/images/founders/xiang-zhang-simon.jpg
assets/images/founders/junwei-wang-frank.jpg
```

The source also contains clearly marked comments for the two pending biographies. Add only text approved by the people or committee concerned.

## Event photograph organisation

Create one folder for each academic year:

```text
assets/images/archive/YYYY-YYYY/
```

Use descriptive, lower-case, hyphenated filenames. For dated events, use:

```text
YYYY-MM-DD-short-event-name.jpg
```

Examples:

```text
2026-05-08-lucy-cavendish-formal.jpg
2026-05-26-hughes-hall-thank-you-formal.jpg
```

For an undated contextual photograph, use the most precise confirmed date without guessing. If only the month is known, a filename such as `2027-02-founding-year-gathering.jpg` is acceptable.

Do not rename, overwrite or delete the high-resolution source photographs. Keep archival originals outside the website repository and publish separate web-sized copies here.

## Recommended image preparation

For event photographs:

- 2,000–2,400 pixels on the longest edge is normally sufficient.
- Use JPEG quality of roughly 80–88 for photographic images.
- Aim for approximately 1.5 MB or less where this can be achieved without visible degradation.
- Convert wide-gamut photographs to sRGB, or preserve a valid embedded colour profile.
- Remove GPS, EXIF and other private metadata from the web copy.
- Preserve the original aspect ratio.
- Create 720px and 1,200px responsive variants in the year’s `responsive/` folder.
- Reference those variants with `srcset` and `sizes`, while keeping the full web image as the lightbox link.

For founder portraits:

- A 2:3 portrait at about 1,200 × 1,800 pixels is suitable.
- Keep the subject’s face comfortably within the frame at narrow widths.
- Avoid aggressive compression or automatic face crops.

For an optional dedicated social-sharing image:

- Use a real society photograph, not an artificial replacement.
- A 1,200 × 630 pixel crop is a common Open Graph size.
- Update the `og:image`, `og:image:width`, `og:image:height` and `og:image:alt` metadata together.

## How to add an event

1. Confirm the date, title, college or venue, theme, guest and description with a reliable committee record.
2. Prepare and save the approved web photographs in the correct academic-year folder.
3. In `index.html`, copy one complete `<li class="archive-item">` inside the relevant `.archive-list`.
4. Update the `<time datetime="YYYY-MM-DD">` value and visible date.
5. Give the event heading a unique `id` and update the article’s `aria-labelledby` value.
6. Include only confirmed fields in the event `<dl class="event-details">`.
7. Add each image as a normal link to the full web image with `data-lightbox-item`. This keeps it usable when JavaScript is unavailable.
8. Add meaningful `alt` text and a factual `<figcaption>`.
9. Use `loading="lazy"` and `decoding="async"` for photographs below the fold.
10. Add accurate intrinsic `width` and `height` attributes.
11. Remove or update the nearby `TODO(archive)` comment only when the missing information has been supplied.

The lightbox automatically includes links marked with `data-lightbox-item`; no JavaScript change is needed for ordinary additions.

If an event has no photograph, retain a clearly worded missing-record note rather than adding stock photography, an AI-generated image or an unrelated photograph.

## How to add a new academic-year archive

1. Create a folder such as:

   ```text
   assets/images/archive/2026-2027/
   ```

2. Add a new archive section in `index.html` with a unique section `id`.
3. Use an `<h2>` for the archive title and an ordered list for chronological events.
4. Copy the semantic event pattern used in the 2025–2026 archive.
5. Add or adjust the navigation link only if the navigation remains concise and readable.
6. Preserve the earlier archive rather than replacing it.
7. Test all image links, keyboard interactions and responsive layouts before opening a pull request.

## Factual and institutional safeguards

The site is a society record, not an official University or college publication.

- Do not claim official University of Cambridge or college affiliation, endorsement or partnership without explicit evidence and permission.
- Do not use University or college crests as decorative branding.
- Do not invent biographies, guests, attendance figures, quotations, sponsorships or event outcomes.
- Treat college and venue names as factual event references only.
- Keep the independence notice visible.
- Use British English throughout.

Known content still awaiting confirmation or supply is marked with HTML comments in `index.html`. At present this includes both short biographies and fuller descriptions for the five archive entries.

## Accessibility requirements

When updating the page:

- Keep one `<h1>` and preserve the logical heading order.
- Use `<time>` for event dates and `<figure>`/`<figcaption>` for archive photographs.
- Write alt text that describes visible, relevant context without guessing identities.
- Use empty alt text only for genuinely decorative images.
- Keep keyboard focus styles visible.
- Test the mobile menu, lightbox close button, Escape key and arrow-key navigation.
- Keep gallery links functional without JavaScript.
- Respect `prefers-reduced-motion`.
- Do not introduce low-contrast gold body text.

## Verify paths and changes

Start the local server, then check every navigation link and gallery image in the browser. In the browser developer tools:

- Confirm the Console contains no errors.
- Confirm the Network panel contains no `404` responses.
- Check the page at approximately 375, 768, 1024 and 1440 pixels wide.
- Confirm there is no horizontal scrolling.
- Test with JavaScript disabled.

These commands provide a quick path inventory:

```bash
rg -n '(src|srcset|href)="assets/' index.html
find assets -type f | sort
```

Review the actual local asset attributes shown by the first command against the file inventory shown by the second. Remember that filenames and paths are case-sensitive on GitHub Pages even if they appear to work on a case-insensitive local filesystem.

## Branch and pull-request workflow

Create a focused branch before editing:

```bash
git switch main
git pull --ff-only
git switch -c feature/short-description
```

Review and commit the work:

```bash
git status
git diff --check
git add index.html assets README.md
git commit -m "Describe the website update"
```

Push the branch:

```bash
git push -u origin feature/short-description
```

Open a pull request into the publishing branch. The pull-request description should state:

- what content and design changed;
- which photographs were added;
- which facts remain missing or provisional;
- which accessibility and responsive checks were completed;
- whether the local console and Network panel were clean.

Future committees should continue updating the existing HTML, CSS and JavaScript files rather than replacing this architecture with a framework or build tool.
