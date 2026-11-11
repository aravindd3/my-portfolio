# Project Rules & Context (`GEMINI.md` / `AGENTS.md`)

This file provides always-on architectural, execution, and content constraints for [Google Antigravity IDE](https://antigravity.google/docs/rules/) (`GEMINI.md`) and compatible coding agents following the [AGENTS.md](https://agents.md/) specification.

## 1. Project Overview
You are building the personal engineering portfolio website for **Aravind V S**, an Electronics & Communication Engineering undergraduate (`2023 – May 2027`, `CGPA: 8.49/10`) at **VIT-AP University, Amaravati, India**, specializing in **Embedded Systems, Embedded Hardware, Firmware Development, PCB Design (KiCad 10.0), and Wireless Communication**.

Always read and obey the companion specification files in the repository root before writing any code:
- `plan.md` — Phased execution steps, non-empty directory Next.js scaffolding, Git initialization, and official skill installation commands.
- `design_system.md` — Color tokens, Tailwind v4 `@theme inline` mapping, typography, PCB/datasheet layout rules, and interaction guidelines.
- `portfolio_context.md` — Verified resume data, project technical details, skill hierarchy, and exact TypeScript interfaces for `src/data/portfolio.ts`.

## 2. Mandatory Skill Activation Before UI Coding
Before scaffolding or styling any frontend components, ensure the official skills in `.agents/skills/` are installed (using the fault-tolerant script in `plan.md`) and loaded per [Google Antigravity Agent Skills Docs](https://antigravity.google/docs/skills/):
1. **Anthropic Frontend Design (`frontend-design`):** Source: [anthropics/skills](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md). Follow its token-plan workflow to avoid generic AI templates and SaaS clichés.
2. **Vercel Web Design Guidelines (`web-design-guidelines`):** Source: [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md). Audit semantic landmarks, keyboard navigation, focus states, mobile responsiveness (`375px` to `1440px`), and WCAG AA typography contrast.
3. **Vercel React & Next.js Best Practices (`react-best-practices`):** Source: [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/AGENTS.md). Keep components server-rendered by default (`Server Components`) and isolate client interactivity (`"use client"`) strictly to leaf components (e.g., protocol filter state, copy-to-clipboard button, mobile drawer).
4. **OpenAI Portable Agent Format (`skill-creator` / `AGENTS.md`):** Source: [openai/skills](https://github.com/openai/skills/blob/main/skills/.system/skill-creator/SKILL.md) and [AGENTS.md](https://agents.md/). Always keep `AGENTS.md` and `GEMINI.md` identical at the repository root.
5. **Meta Astryx Design System (`astryx` / `meta/astryx`):** Source: [meta/astryx](https://github.com/meta/astryx) (`@astryxdesign/core`, `@astryxdesign/theme-neutral`, `@astryxdesign/cli`). Activated via `.agents/skills/astryx/SKILL.md` and the managed `<!-- ASTRYX:START -->` section below; query `npm run astryx -- component <Name>` and `npm run astryx -- docs <topic>` before building UI components, while mapping Astryx theme tokens to the *Precision Datasheet & Modern Hardware Lab* dark palette in `Docs/design_system.md`.

## 3. Non-Negotiable Content & Positioning Rules
1. **Hardware & Firmware First (Not AI/ML):** Position Aravind strictly as an **Embedded Systems, Hardware Design, and Firmware Engineer**. Never frame him as an AI/ML engineer, data scientist, or full-stack web developer.
2. **Programming Language Priority:** Highlight **C / Embedded C** as his primary language (`Tier 1`). Include `Java` (academic/OOP), `Kotlin` (Android companion app development), and `SQL / MySQL` (basic). List `Python` strictly as secondary project exposure (`Project Exposure · Testing / Scripting; not a primary focus`).
3. **Communication Protocols Prominence:** Give visual prominence to his hands-on embedded communication protocols: `UART`, `SPI`, `I²C`, `I²S`, `CAN`, `LoRa`, `Bluetooth`, and `NFC`. Wire these protocols to interactive project filtering so clicking a protocol badge highlights the projects that use it.
4. **100% Grounded Resume Facts:** Never invent fake metrics, unmentioned companies, or synthetic percentage skill bars (e.g., never write `C: 90%` or `KiCad: 85%`). Every project, date (`ECG Monitoring System: 07/2026 – Present`, `LoRa Voice Comm System: 12/2025 – 03/2026`, `Maven Silicon Internship: 05/2025 – 07/2025`, `Smart Suitcase: 09/2024 – 12/2024`, `IETE Student's Forum: 07/2024 – Present`), and hardware part number (`ESP32-WROOM-32`, `STM32F407 Discovery Board`, `Arduino Uno R3`, `Raspberry Pi 3 B+`, `SX1278`, `INMP441`, `MAX98357A`) must match `portfolio_context.md`.
5. **Single Source of Truth (`src/data/portfolio.ts`):** Store all portfolio copy, project arrays, protocol definitions, and external URLs in `src/data/portfolio.ts` using the strict TypeScript interfaces defined in `portfolio_context.md` Section 7. UI components must never hardcode resume strings.

## 4. Technical & Deployment Guardrails
- **Non-Empty Directory Workaround:** Because the workspace root already contains `.md` specification files and `res_maiinn.pdf`, **never** run `npx create-next-app@latest .` directly in the root directory (it will abort due to conflicting files). Scaffold into `/tmp/aravind-next-init` and copy the generated files into the workspace root as detailed in `plan.md`.
- **Tailwind CSS v4 & Astryx Layer Compatibility:** Pre-declare `@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;` at the very top of `src/app/globals.css` before `@import "tailwindcss";` and `@astryxdesign/core` / `@astryxdesign/theme-neutral` CSS imports, then define the `Docs/design_system.md` `:root` / `@theme inline` tokens below. Do not mix conflicting Tailwind v3 `tailwind.config.js` syntax if Tailwind v4 is installed.
- **Git & Manual Vercel Handoff:** Initialize the local Git repository (`git init`, `.gitignore`, clean commits on `main`). **Do NOT run `vercel deploy` or pause for Vercel CLI authentication.** Ensure `npm run lint` and `npm run build` pass with zero errors so Aravind can push to GitHub and deploy via Vercel's web dashboard on the first try.

<!-- ASTRYX:START -->
Astryx v0.7.13 · 174 components
CLI: run every command as `npx astryx <cmd>` (shown below as `astryx ...`).

SETUP (once, in app entry e.g. main.tsx) — without these, components render unstyled:
  import "@astryxdesign/core/reset.css";
  import "@astryxdesign/core/astryx.css";

WORKFLOW — start every page from a template, never from scratch:
1. `astryx build "<idea>"` — names the template to scaffold from and the parts it lacks.
2. `astryx template <name> <path>` — scaffold it; keep its frame, gap and padding; replace the content.
3. `astryx template <Block>` for parts it lacks; `astryx component <Name>` to read props before using one.
Changing an existing page? Keep it: skip step 2 and add blocks/components inside its sections.
Before you deliver a build, run `astryx doctor --built <dir>`; don't deliver it if it fails.

RULES:
- No <div> — components handle all layout and spacing.
- Read `astryx docs layout` before changing a template's frame.
- Dense data = rows (Table, List/Item), not Card-wrapped lists. Badge = counts only.
- Style with component props first, then Tailwind utilities backed by tokens. No raw hex/px.
- Palettes and custom colors go through the theme, never :root overrides. Run `astryx theme add <slug>` to import; `theme eject <slug>` only forks source. See `astryx docs theme`.
- SELF-CHECK: re-read the file; replace any style={{…}}, raw <div>/<span>, imported .css/@apply, or hardcoded/arbitrary value (bg-[#fff], p-[13px]) with the component or a token-backed utility.

`astryx help` lists every command. Key ones beyond the workflow:
  search "<query>"   find any component / hook / doc / template
  discover <words>   integrations you could add
  docs <topic>       getting-started, principles, tokens, theme … (`astryx docs` lists all)
  docs cli           commands and API reference
  docs authoring     build an integration package, and every field it holds
  upgrade --from <old version> --apply   run after a dependency bump
<!-- ASTRYX:END -->
