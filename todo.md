# Aravind V S — Engineering Portfolio Implementation Checklist (`todo.md`)

> **Source Specifications:** [AGENTS.md](./AGENTS.md), [Docs/design_system.md](./Docs/design_system.md), and [Docs/portfolio_context.md](./Docs/portfolio_context.md) *(Note: `Docs/plan.md` was not present in the repository; phased execution steps below are derived directly from `AGENTS.md`, the `Docs/` specifications, Meta Astryx docs, and project task requirements).*
> **UI System:** Powered by **Meta Astryx** (`meta/astryx` — `@astryxdesign/core`, `@astryxdesign/theme-neutral`, `@stylexjs/stylex`, `@astryxdesign/cli`) customized to the *Precision Datasheet & Modern Hardware Lab* dark palette. Always consult `npm.cmd run astryx -- component <Name>` / `docs <topic>` when building Tasks 2–6.
> **Execution Rule:** Execute **one self-contained task per session**. Do not advance to the next task until all verification boxes for the current task are checked `[x]`, `todo.md` is updated, and changes are committed cleanly on `main`.

---

## Task 1: Environment Setup, Agent Skills & Safe Next.js Scaffolding
- [x] Rename specification files in `Docs/` to `Docs/design_system.md` and `Docs/portfolio_context.md` so internal doc paths match project references.
- [x] Install official skills into `.agents/skills/`:
  - [x] `frontend-design` (from `anthropics/skills`)
  - [x] `web-design-guidelines` (from `vercel-labs/agent-skills`)
  - [x] `react-best-practices` (from `vercel-labs/agent-skills`)
  - [x] `skill-creator` (from `openai/skills`)
  - [x] `astryx` (from `meta/astryx` / `@astryxdesign/cli`)
- [x] Create `.agents/rules/hardware-aesthetic.md` encoding the *Precision Datasheet & Modern Hardware Lab* rules, Astryx integration rules, and doc references pointing to `Docs/design_system.md` and `Docs/portfolio_context.md`.
- [x] Safely scaffold Next.js (App Router, TypeScript, Tailwind CSS v4, ESLint, `--src-dir`) into a temporary directory (`$env:TEMP\aravind-next-init`, Windows equivalent of `/tmp/aravind-next-init`) and install `lucide-react`.
- [x] Install Meta Astryx packages (`@astryxdesign/core`, `@astryxdesign/theme-neutral`, `@stylexjs/stylex`, and devDependency `@astryxdesign/cli`), add `"astryx"` script in `package.json`, and run `astryx init --agent-docs-path AGENTS.md --features agents`.
- [x] Copy generated Next.js scaffold files into workspace root without overwriting `AGENTS.md`, `todo.md`, `res_maiinn.pdf`, or `Docs/`.
- [x] Merge Next.js `.gitignore` rules with root `.gitignore`, keeping `Docs/` ignored while anchoring `/docs/` so `public/docs/Aravind_VS_Resume.pdf` remains tracked for deployment.
- [x] Copy `res_maiinn.pdf` from workspace root to `public/docs/Aravind_VS_Resume.pdf`.
- [x] Verify Git repository is on branch `main`, `AGENTS.md`, `todo.md`, and `Docs/` are intact, and `npm.cmd run lint` + `npm.cmd run build` pass on the base scaffold.
- [x] Commit Task 1 (and Astryx skill/plan integration) cleanly on `main`.

---

## Task 2: Design System Tokens (`globals.css`), Astryx Theme (`providers.tsx`), Typography (`layout.tsx`) & Data Layer (`src/data/portfolio.ts`)
- [ ] Configure `src/app/globals.css` per `Docs/design_system.md` and Astryx Tailwind v4 layer rules:
  - [ ] Pre-declare `@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;` on line 1 before `@import "tailwindcss";`, `@import "@astryxdesign/core/reset.css";`, `@import "@astryxdesign/core/astryx.css";`, and `@import "@astryxdesign/theme-neutral/theme.css";`.
  - [ ] Define Tailwind v4 `@theme inline` color/font token mappings (`bg-canvas`, `bg-surface`, `bg-elevated`, `text-primary`, `text-secondary`, `text-muted`, `copper`, `signal`, `bus`, `hairline`, `font-display`, `font-sans`, `font-mono`) and exact `:root` datasheet variables (`#0B0F14`, `#111720`, `#17202B`, `rgba(17, 23, 32, 0.84)`, `#F1F5F9`, `#94A3B8`, `#64748B`, `#E5A93C`, `#10B981`, `#38BDF8`, `#1E293B`, `rgba(229, 169, 60, 0.48)`).
  - [ ] Configure `24px` radial dot-grid background on `body`, smooth scroll on `html`, copper `*:focus-visible` outline (`2px solid var(--accent-copper)`, `outline-offset: 3px`), and `@media (prefers-reduced-motion: reduce)`.
- [ ] Create `src/app/providers.tsx` (`"use client"`) + custom Astryx datasheet dark theme (via `defineTheme` extending/overriding Astryx semantic tokens to match `Docs/design_system.md` dark palette) wrapping `<Theme>` (dark mode) and `<LinkProvider component={Link}>` with `next/link`.
- [ ] Configure `src/app/layout.tsx`:
  - [ ] Import `./globals.css` FIRST so the CSS `@layer` cascade order holds, and wrap children in `<Providers>`.
  - [ ] Load `Space Grotesk` (`500`, `600`, `700`), `Plus Jakarta Sans` (`400`, `500`, `600`), and `JetBrains Mono` (`400`, `500`, `600`) via `next/font/google` with `display: "swap"` bound to `--font-space-grotesk`, `--font-plus-jakarta`, and `--font-jetbrains-mono`.
  - [ ] Set complete SEO & OpenGraph metadata positioning Aravind V S strictly as an Embedded Systems, Hardware Design, PCB Layout, and Firmware Engineer.
- [ ] Create `src/data/portfolio.ts` implementing all strict TypeScript types/interfaces from `Docs/portfolio_context.md` Section 7 (`ProtocolId`, `ProfileData`, `ProtocolItem`, `SkillItem`, `SkillCategory`, `ProjectItem`, `ExperienceItem`, `EducationData`).
- [ ] Populate 100% verified resume & profile data (`PROFILE_DATA`, `PROTOCOLS`, `SKILL_CATEGORIES`, `PROJECTS`, `EXPERIENCES`, `EDUCATION_DATA`) with exact dates, part numbers, `C / Embedded C` (`Tier 1 · Primary Focus` copper highlight), `Python` (`Tier 3 · Project Exposure`, `isDeemphasized: true`), and zero synthetic metrics or AI/ML framing.
- [ ] Verify `npx.cmd tsc --noEmit`, `npm.cmd run lint`, and `npm.cmd run build` pass with zero errors.
- [ ] Commit Task 2 cleanly on `main`.

---

## Task 3: Navigation Bar (`Navbar.tsx`) & Hero Datasheet Section (`HeroSection.tsx`)
- [ ] Inspect Astryx component APIs via `npm.cmd run astryx -- component Button Card Drawer Heading Link Stack StatusDot Token Text` (and `TopNav` / `Divider` / `Grid`) before coding.
- [ ] Create sticky glassmorphic `src/components/Navbar.tsx` using Astryx primitives (`HStack`, `Link`, `Button`, `StatusDot`, `Drawer` / mobile nav):
  - [ ] Include `[AV]` monospace monogram badge, live status pill (`StatusDot` + `--accent-signal`), section anchor links (`Capabilities`, `Projects`, `Experience`, `Education`, `Contact`), and Resume PDF CTA (`/docs/Aravind_VS_Resume.pdf`).
  - [ ] Isolate mobile navigation drawer interactivity in a clean leaf client control with full keyboard accessibility (`Escape` close, focus ring, `aria-expanded`).
- [ ] Create `src/components/HeroSection.tsx` using Astryx layout & typography primitives (`Section`, `Grid`, `Stack`, `Heading`, `Text`, `Button`, `Card`, `Token`, `StatusDot`) customized with datasheet hairlines:
  - [ ] Build 12-column asymmetric desktop grid (`lg:grid-cols-12`: 7 columns left for name `h1`, headline ribbon tags, approved bio copy, and primary/secondary CTAs; 5 columns right for the IC Quick-Spec Card).
  - [ ] Build the right-hand IC Quick-Spec Card with top bar (`SYS_ID: AVS-ECE-2027 // REV 1.0` + emerald `ERC: PASS` indicator), corner `+` fiducial markers, 2×2 metric grid (`8.49 / 10`, `KiCad 10.0`, `8 Buses`, `C / Emb. C`), and the 6 Core Experience Pillars read strictly from `src/data/portfolio.ts`.
- [ ] Verify responsive layout at `375px` and `1440px`, semantic landmarks, contrast, and `npm.cmd run lint` + `npm.cmd run build`.
- [ ] Commit Task 3 cleanly on `main`.

---

## Task 4: Interactive Communication Protocols Ribbon & Capability Matrix (`HardwareSpecsMatrix.tsx`)
- [ ] Inspect Astryx component APIs (`ToggleButton`, `ToggleButtonGroup`, `Token`, `Badge`, `Card`, `Grid`, `List`, `MetadataList`) via `npm.cmd run astryx -- component ...`.
- [ ] Create `src/components/HardwareSpecsMatrix.tsx` (isolating `"use client"` strictly for interactive protocol filter controls):
  - [ ] Render the interactive 8-protocol strip (`UART`, `SPI`, `I²C`, `I²S`, `CAN`, `LoRa`, `Bluetooth`, `NFC / RFID`) using Astryx interactive selection/card controls with `font-mono` protocol names, bus type tags (`--accent-bus`), hardware context descriptions, active selection styling (`--border-active`), `[All Protocols]` reset button, and `View Matching Projects ↓` quick jump link.
  - [ ] Render the 6-category Hardware & Firmware Capability Matrix sourced from `SKILL_CATEGORIES` in `src/data/portfolio.ts`.
  - [ ] Display explicit experience tier `Token`s (`Tier 1 · Primary Focus` copper highlight for `C / Embedded C`, `Tier 2 · Applied`, `Tier 3 · Foundational`, visually de-emphasized `Tier 3 · Project Exposure` for `Python`, and `Core Hardware`), with zero percentage skill bars (keeping `Badge` strictly for counts per Astryx rules).
- [ ] Verify zero horizontal overflow on `375px` screens (`flex-wrap`), keyboard accessibility (`aria-pressed`), and `npm.cmd run lint` + `npm.cmd run build`.
- [ ] Commit Task 4 cleanly on `main`.

---

## Task 5: Featured Engineering Projects Showcase (`ProjectsShowcase.tsx`) & Protocol Filter Wiring
- [ ] Inspect Astryx `Card`, `ClickableCard`, `Token`, `StatusDot`, `Button`, `Link`, and `Divider` docs via `npm.cmd run astryx -- component ...`.
- [ ] Create `src/components/ProjectsShowcase.tsx` rendering all 4 verified hardware projects (`PRJ-01` through `PRJ-04`) from `PROJECTS`:
  - [ ] Render datasheet card header (`PRJ-0X` ID, primary focus category, dates with pulsing `StatusDot` / `--accent-signal` indicator when `isOngoing: true`, and corner `+` fiducials).
  - [ ] Render inset System Signal Chain strip (`bg-[var(--bg-elevated)]`) with `flex-wrap` monospace nodes connected by copper `→` arrows (`→` inline on desktop, clean wrapping/stacking on mobile without overflow).
  - [ ] Render verified engineering bullets, silkscreen `Token` tech tags, matching protocol badges, and conditional link footer (omitting buttons when optional URLs like `githubUrl`, `schematicPdfUrl`, `pcbImageUrl` are absent—no dead `#` links).
- [ ] Wire shared `activeProtocolId` client state between `HardwareSpecsMatrix.tsx` and `ProjectsShowcase.tsx` via a minimal client portfolio workspace wrapper (keeping static sections Server Components) so clicking a protocol filters/highlights matching projects and supports `[All Protocols]` reset.
- [ ] Verify interactive protocol-to-project highlighting, zero layout shift/overflow at `375px` and `1440px`, and `npm.cmd run lint` + `npm.cmd run build`.
- [ ] Commit Task 5 cleanly on `main`.

---

## Task 6: Experience Timeline, Education/Certs, Contact Footer & Final Build Audit
- [ ] Create `src/components/ExperienceTimeline.tsx` using Astryx primitives (`Section`, `Stack`, `Card`, `Heading`, `Text`, `Token`, `Divider`) rendering `Maven Silicon` (`EXP-01`, `05/2025 – 07/2025`, `Remote`) and `IETE Student's Forum (ISF)` (`EXP-02`, `07/2024 – Present · VIT-AP University`) from `EXPERIENCES`.
- [ ] Create `src/components/EducationAndCerts.tsx` using Astryx primitives rendering VIT-AP University B.Tech ECE (`2023 – 2027`, `Expected Graduation: May 2027`, `CGPA: 8.49 / 10`), 7 coursework pills, and Udemy `Microcontroller Embedded C Programming` certification from `EDUCATION_DATA`.
- [ ] Create `src/components/ContactFooter.tsx` using Astryx primitives (`Button`, `Link`, `StatusDot`, `Toast` / copy feedback) featuring one-click copy email (`aravindvs2005@gmail.com`) with `COPIED: aravindvs2005@gmail.com` emerald check feedback for `2500ms`, `mailto:` link, `tel:+918848441097`, clean direct LinkedIn URL (`linkedin.com/in/aravind-vs-43619a339`), GitHub (`github.com/aravindd3`), and Resume PDF download (`/docs/Aravind_VS_Resume.pdf`).
- [ ] Assemble all sections cleanly in `src/app/page.tsx` with consistent `max-w-6xl` layout, `py-14 md:py-20` spacing, and `1px solid var(--border-hairline)` section dividers with `+` fiducials.
- [ ] Audit against `.agents/skills/` (`astryx`, `frontend-design`, `web-design-guidelines`, `react-best-practices`): run `npm.cmd run astryx -- doctor` (and check built output if applicable), verify semantic landmarks, focus states, reduced motion, WCAG AA contrast, zero hardcoded resume strings, and `375px`–`1440px` responsiveness.
- [ ] Run `npx.cmd tsc --noEmit`, `npm.cmd run lint`, and `npm.cmd run build` with zero errors.
- [ ] Create final clean Git commit on `main`.

---

## Session Handoff Log
<!-- Append one entry at the end of each completed task session -->

### Session 1 — Task 1 (2026-11-12)
- **Completed Task:** Task 1: Environment Setup, Agent Skills & Safe Next.js Scaffolding
- **Files Created/Modified:**
  - Renamed `Docs/` files to `Docs/design_system.md` and `Docs/portfolio_context.md`
  - Created `todo.md`
  - Installed `.agents/skills/{frontend-design,web-design-guidelines,react-best-practices,skill-creator}`
  - Created `.agents/rules/hardware-aesthetic.md`
  - Scaffolded Next.js `16.4.6` (App Router, TypeScript, Tailwind CSS `4.3.3`, ESLint, `src/`) + installed `lucide-react` (`package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `next-env.d.ts`, `README.md`, `src/app/*`, `public/*`)
  - Copied `res_maiinn.pdf` to `public/docs/Aravind_VS_Resume.pdf`
  - Updated `.gitignore` (keeping `/Docs/` and `/docs/` ignored while tracking `public/docs/Aravind_VS_Resume.pdf`)
- **Verification Result:** `npx.cmd tsc --noEmit`, `npm.cmd run lint`, and `npm.cmd run build` all exited `0`; `AGENTS.md`, `todo.md`, `res_maiinn.pdf`, and `Docs/` verified intact.
- **Next Task to Run:** Task 2: Design System Tokens (`globals.css`), Astryx Theme (`providers.tsx`), Typography (`layout.tsx`) & Data Layer (`src/data/portfolio.ts`)

### Session 1 Follow-up — Meta Astryx Skill & UI Library Integration (2026-11-12)
- **Action:** Installed `meta/astryx` packages (`@astryxdesign/core@^0.7.13`, `@astryxdesign/theme-neutral@^0.7.13`, `@stylexjs/stylex@^0.19.1`, devDependency `@astryxdesign/cli@^0.7.13`) and generated `.agents/skills/astryx/SKILL.md`.
- **Plan & Rule Updates:**
  - Ran `astryx init --agent-docs-path AGENTS.md --features agents` to append the managed `<!-- ASTRYX:START -->` block to `AGENTS.md` without creating `GEMINI.md`.
  - Added `"astryx"` script to `package.json` (`node node_modules/@astryxdesign/cli/clients/cli/bin/astryx.mjs`).
  - Documented Astryx component workflow, `@layer` CSS cascade ordering, and custom dark theme integration in `AGENTS.md`, `.agents/rules/hardware-aesthetic.md`, `Docs/design_system.md`, and Tasks 2–6 of `todo.md`.
- **Next Task to Run:** Task 2: Design System Tokens (`globals.css`), Astryx Theme (`providers.tsx`), Typography (`layout.tsx`) & Data Layer (`src/data/portfolio.ts`)
