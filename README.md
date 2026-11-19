# Germán Verón · Product Manager & Product Owner

Personal portfolio focused on **applied AI for product**: five products and workflows I designed and built, plus my experience in fintech and e-commerce (Personal Pay, Mercado Libre).

**Live site: [germanveron.com](https://germanveron.com)** · available in [Spanish](https://germanveron.com/es/) and [English](https://germanveron.com/en/).

## Applied AI cases

| Case | What it is |
|---|---|
| Travel Log | Installable web app (PWA) with a 3D globe, maps and travel stats |
| Play Store Review Finder | Download any Google Play app's reviews to Excel, with a weekly sync |
| PM Interview Practice | Practice product interview questions and get AI feedback |
| Bug prioritization agent | AI agent that prioritizes Jira bugs (1–5), alerts the PM and is measured with evals |
| Weekly AI review report | n8n workflow that classifies reviews with an LLM and emails the opportunities |

## How it's built

- [Astro](https://astro.build) static site, no UI framework; vanilla TypeScript for the interactive parts.
- Built with **Claude Code**, using a design skill for the visual direction.
- All copy lives in `src/content/es.ts` and `src/content/en.ts`, separate from the components.
- Each case has its own page: `src/pages/[lang]/[case].astro`.

## Run locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Deploy

The included `Dockerfile` builds the site and serves it with nginx on port 80, ready for EasyPanel or any Docker host.
