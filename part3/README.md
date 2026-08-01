# Breezy: Multi Page Rebuild (Part 3)

A 3 page rebuild of the Breezy site, written in React with React Router for
navigation and Vite as the build tool. Hosted on GitHub Pages with automatic
deployments through GitHub Actions, and FAQ content managed in a real WordPress site.

- **Live URL:** https://gabrielzurc10.github.io/breezy/
- **Pages:** Home (`/`), Pricing (`/pricing`), About and FAQ (`/about`)
- **New feature:** Air Match™, a short quiz that recommends a pricing tier (question 6)

## The stack in plain terms

Dependencies are kept to a minimum on purpose. The site uses three packages at runtime
(`react`, `react-dom`, `react-router-dom`) plus Vite, the tool that compiles the code
for the browser.

## Running locally

```bash
npm install
npm run dev       # dev server at localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

---

## The Six Questions

### 1. Hosting: where and why

**GitHub Pages, deployed by GitHub Actions.** The site builds to static files, and
GitHub Pages serves them for free through Fastly's global CDN with HTTPS included.
Reasons for the choice:

- **One platform for everything.** The code, the issue history, the deployment
  pipeline, and the hosting all live in the same repository. There is no second
  service to configure or keep in sync.
- **The pipeline is code.** `.github/workflows/deploy.yml` defines the entire release
  process: push to main, the workflow installs dependencies, builds, and publishes.
  Anyone reviewing the repo can read exactly how the site ships, and the Actions tab
  shows the history of every deployment.
- **Free with no practical limits for a site this size**, and rollback is as simple as
  reverting a commit, which triggers a fresh deployment of the previous state.

Two honest trade offs, both accounted for: GitHub Pages cannot set custom response
headers (covered under Security), and it has no built in support for client side
routing, which the build handles by shipping a `404.html` copy of the app so deep
links like `/pricing` still load.

### 2. Content management: WordPress

**The FAQ section is managed in a real WordPress site** (a free WordPress.com site). 
Each published post is one FAQ entry: the post title is the
question and the post body is the answer. A content editor works entirely inside
WordPress, the editing screens most non technical people already know. Publishing a
post, editing one, or deleting one changes the FAQ section on the next page load, with
no developer involved.

The site fetches the posts through the public WordPress.com REST API at
load time (`src/content/index.jsx`). Two safeguards matter:

- **The CMS can never take the site down.** If WordPress is unreachable or returns
  nothing usable, the site silently renders the FAQ content bundled in the repo.
- **CMS content is always treated as plain text.** Titles and bodies are parsed and
  stripped of markup before rendering, so nothing an editor pastes into WordPress can
  inject code into the site.

The rest of the copy (pricing tiers, features, testimonials, headlines) lives in JSON
files in `src/content/`, so changing a price is a one line edit through GitHub's web
editor, which auto deploys on save. **What would make this better:** move those
sections into WordPress the same way the FAQs work (custom post types for tiers and
testimonials), so every piece of content is editable in one place; add a webhook so
WordPress publishes trigger a rebuild; and on a paid WordPress plan, replace the per
section endpoints with one custom endpoint shaped exactly like the bundled JSON.

### 3. Security

- **It is a static site.** No application server, no database, no login, so the most
  common attack categories (SQL injection, session hijacking, brute forcing an admin
  page) do not apply. The only admin surface is WordPress itself, which WordPress.com
  operates and patches.
- **CMS content is sanitized.** Everything fetched from WordPress is reduced to plain
  text before rendering, and React escapes all rendered text by default. The codebase
  never uses the React escape hatch that bypasses this protection.
- **Dependencies are minimal and mainstream** (three runtime packages), which keeps
  the supply chain small and auditable.

For a production deployment: GitHub Pages cannot set custom response headers, so the
standard security headers (`Content-Security-Policy`, `X-Frame-Options`,
`X-Content-Type-Options`, `Referrer-Policy`) would require moving to a host that
supports headers as configuration. Beyond that:
a real newsletter backend with rate limiting, bot protection, and confirm by email
signup.

### 4. Code maintenance

- **The folder layout tells the story.** `src/pages/` has one file per page. Pages
  are assembled from sections in `src/components/`, one file per section with its CSS
  next to it. All copy is in `src/content/`. `App.jsx` wires the routes and reading
  it first gives the full picture in minutes.
- **Plain CSS with shared design tokens** (`src/styles/global.css`) ported from the
  original site. No CSS framework to learn.
- **Standard React throughout:** context for content and toasts, lifted state for the
  quiz to cards connection, hooks for the observer and page metadata.

### 5. Performance

- **Self hosted fonts.** The two typefaces load from the site itself as variable
  fonts (about 75KB total for every weight) with `font-display: swap`, removing the
  Google Fonts round trip that was the original site's largest render blocking cost.
- **No heavy libraries and no image weight.** 
- **Long lived caching.** Build outputs have content hashed filenames, so browsers
  and the CDN cache them indefinitely and repeat visits download almost nothing.
- **Animations are cheap.** Only movement and fading.

### 6. New feature: the Air Match™ pricing quiz

**What it is:** four quick questions on the Pricing page. At the end it recommends
one of the three tiers, explains why in a sentence, then scrolls to and highlights
that tier's card with a "Your Air Match" badge.

**Why this feature:** three pricing tiers with humorous feature lists are genuinely
hard to choose between. Notably, the site's own "How It Works" section promises a
quiz as step 1 and the original site never delivers one. The feature completes a
promise the product was already making, and it turns the pricing page from reading
three columns and guessing into answering four questions and getting a recommendation.

**How it works:** each answer adds points toward one of the tiers and the highest
score wins. On a tie the cheaper tier wins, a deliberate choice: recommending the
more expensive option on a tie undermines trust. The quiz and the pricing cards read
from the same content source, so a price change can never make them disagree. The
recommendation flows from the quiz to the cards through standard React data flow, as
a prop from the shared parent page. There is a progress indicator, a back button, and
a restart button.

**With more time:** remember the result for returning visitors, feed the quiz answers
into the newsletter signup, track where people drop off, and let visitors get their
result by email once the newsletter has a backend.
