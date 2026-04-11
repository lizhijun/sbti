# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

SBTI (Silly Behavioral Type Indicator) — a multilingual personality test site. 32 questions, 27 personality types, 15 dimensions across 5 facet groups. Built with Next.js 15 App Router, Tailwind CSS v4, TypeScript, Supabase (rankings), deployed on Vercel.

## Commands

```bash
pnpm install          # install dependencies
pnpm dev              # dev server at localhost:3000
pnpm build            # production build (also type-checks)
pnpm lint             # next lint
```

No test framework is configured.

## Architecture

### i18n (dual-layer system)

Two separate translation layers coexist:

- **Flat-key client-side** (`lib/i18n/{zh,en,ja,ko}.ts`): Used via `useDictionary()` hook and `t(locale, key, replacements?)`. zh-TW falls back to zh. Keys are dot-separated strings like `"quiz.progress"`.
- **Structured server-side** (`dictionaries/{zh,en,ja,ko,zh-TW}.ts`): Async-loaded via `getDictionary(locale)`. Returns a typed `Dictionary` object. zh-TW has its own dictionary.

5 locales: `zh` (default), `en`, `ja`, `ko`, `zh-TW`. Constants in `lib/i18n/index.ts`.

### URL routing & locale middleware

- `middleware.ts` handles locale detection: bare paths (`/test`) rewrite to `/zh/test`; paths with default locale prefix (`/zh/test`) redirect to `/test`; non-default locales (`/en/test`) pass through.
- All pages live under `app/[locale]/`. Use `localePath(locale, path)` helper to generate locale-aware URLs.
- `LocaleLink` component wraps Next.js `Link` with automatic locale prefix.

### Scoring algorithm (`lib/scoring.ts`)

1. Sum answers per dimension (S1-S3, E1-E3, A1-A3, Ac1-Ac3, So1-So3)
2. Convert to levels: <=3 -> L, =4 -> M, >=5 -> H
3. Euclidean distance match against 25 normal type patterns
4. Special overrides: "yes" to drink question -> DRUNK type; best match < 60% -> HHHH type

### Data files

- `lib/questions.ts` — 32 regular questions + 2 drink-branch questions, each mapped to a dimension
- `lib/types.ts` — 27 personality types with codes (4-letter, e.g., "CTRL", "CHAO") and patterns
- `lib/dimensions.ts` — 15 dimension codes with H/M/L explanations

### Supabase

- Table `sbti_rankings` with RLS (anonymous insert, public read)
- API routes: `GET /api/rankings`, `POST /api/rankings/submit`
- Results cached client-side in localStorage key `sbti:result-snapshot:v1`
- Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Theme

Light/dark mode via `.dark` class on `<html>`. Persisted in `localStorage` key `sbti-theme`. Inline script in root layout prevents FOUC. Theme context provided by `components/Providers.tsx`.

### Styling

Tailwind CSS v4 with PostCSS plugin. Custom theme variables defined in `@theme` block in `app/globals.css` (--color-beige, --color-dark-bg, --color-dark-card, --font-display). All styles are inline Tailwind classes, no CSS modules.

## Adding a new locale

1. Create `lib/i18n/{lang}.ts` (flat key-value pairs)
2. Create `dictionaries/{lang}.ts` (structured `Dictionary` export)
3. Add to `LOCALES` array and `LOCALE_INFO` in `lib/i18n/index.ts`
4. Add flat dict import to `flatDictionaries` map in `lib/i18n/index.ts`
5. Add async loader to `structuredDictionaries` map in `lib/i18n/index.ts`
6. Add entries to `HTML_LANG_MAP`, `HREFLANG_MAP`, `OG_LOCALE_MAP`, `LOCALE_LABELS`
7. Add `HTML_LANG_MAP` entry in `middleware.ts` as well (duplicated there)

## Path alias

`@/*` maps to the project root (not `src/`).
