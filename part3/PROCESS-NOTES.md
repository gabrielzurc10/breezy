# Part 3: Process Notes

Tools: Claude Code as the AI assistant, Vite, React 19, React Router 7, a free
WordPress.com site as the content backend, GitHub Actions for deployment. The full
unedited AI conversation is included with this submission.

## Decisions before code

The stack and platform decisions were made against both the assessment requirements
and the role description, before any code was written:

- **React with React Router and Vite, nothing on top.** The role centers on React,
  and the goal was the smallest possible framework surface: three runtime packages
  and one build tool. The trade off of a client rendered app (no static HTML per
  page) is owned in the README rather than hidden.
- **GitHub Pages with the pipeline as code.** The repository, the deployment
  workflow, and the hosting live in one place, and the release process is a readable
  YAML file instead of dashboard configuration.
- **A real CMS integration, not a described one.** The FAQ section is backed by an
  actual free WordPress.com site through its public REST API. An editor changes posts
  in WordPress and the site reflects it. The bundled JSON content remains as a silent
  fallback, so the CMS is an enhancement rather than a dependency.
- **The Air Match quiz** as the new feature, chosen because the original site's own
  "How It Works" section promises a quiz it never delivers.

## Build order

1. Scaffold with the GitHub Pages base path and SPA fallback handled from the start
2. Design tokens, self hosted variable fonts, and the content layer including the
   WordPress integration
3. Shared layout: routing, sticky header, mobile menu, footer, toast, page metadata
4. The three pages, with the Part 2 timeline redesign carried over and the quiz
   recommendation flowing to the pricing cards as lifted state
5. The GitHub Actions workflow

## Verification

Each page was checked in the browser during development: navigation between pages,
deep links, the quiz through to a recommendation and card highlight, the FAQ
accordion, form validation states, and the responsive breakpoints. The WordPress
integration was verified in both directions: with the API reachable the site renders
WordPress content, and with unusable content it falls back to the bundled entries
without errors. The WordPress placeholder post is filtered explicitly so a fresh site
cannot leak "Hello World!" into the FAQ.

## Where AI helped and how it was checked

Claude Code generated the components and configuration against the decisions above,
and carried forward the verified work from Parts 1 and 2 (the navigation fix and the
timeline redesign). Its output was reviewed the same way any collaborator's would be:
built locally, rendered, and clicked through before committing. One concrete example
of the review loop catching something: a fresh WordPress site's default placeholder
post would have replaced all five bundled FAQs with a single "Hello World!" entry,
which was caught by testing against the real API before the first deployment and
fixed with an explicit filter.
