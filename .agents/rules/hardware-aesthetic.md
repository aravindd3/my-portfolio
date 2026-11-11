# Hardware Aesthetic & Positioning Rules (`hardware-aesthetic.md`)

Always follow these UI, typography, and engineering-positioning constraints when designing or modifying files in this repository. For complete specifications, refer to [Docs/design_system.md](../../Docs/design_system.md) and [Docs/portfolio_context.md](../../Docs/portfolio_context.md).

## 1. Visual Direction: Precision Datasheet & Modern Hardware Lab
- **Surface & Lighting:** Matte solder-mask obsidian canvas (`#0B0F14`) with a subtle `24px` schematic dot grid, charcoal IC surfaces (`#111720`), elevated daughterboard containers (`#17202B`), and `1px` structural hairline borders (`#1E293B`).
- **Instrument Accents:**
  - **ENIG Copper/Gold (`#E5A93C`):** Primary CTAs, energized border highlights, Tier 1 C/Embedded C badge, and keyboard `:focus-visible` outlines.
  - **Oscilloscope Signal Emerald (`#10B981`):** Live status indicators (`Ongoing`, `ERC: PASS`, clipboard confirmation).
  - **Logic Analyzer Cyan (`#38BDF8`):** Embedded communication bus tags (`UART`, `SPI`, `I²C`, `I²S`, `CAN`, `LoRa`, `Bluetooth`, `NFC / RFID`).
- **Tactile Hardware Details:** Use monospace IC silkscreen tags (`JetBrains Mono`), corner `+` PCB fiducial markers on key datasheet blocks, and responsive signal-chain flow strips (`flex-wrap` with copper `→` connectors).

## 2. Strict Anti-Cliché & Anti-Pattern Guardrails
- **No Generic AI Gradients:** Never use purple/indigo/magenta/neon gradients or flashy cyberpunk glows.
- **No Synthetic Percentage Bars:** Never render arbitrary skill progress bars (e.g., `C: 85%`, `KiCad: 90%`). Use structured capability matrices with explicit experience tier badges.
- **No Scroll-Jacking or Particle Noise:** Keep motion restrained (`200ms ease-out` hover elevation) and respect `@media (prefers-reduced-motion: reduce)`.
- **Zero Horizontal Overflow:** Wrap all protocol ribbons, signal-chain strips, and tag rows cleanly (`flex-wrap`) from `375px` mobile through `1440px` desktop.

## 3. Domain Positioning & Grounded Data Rules
- **Hardware & Firmware First:** Position Aravind V S strictly as an **Embedded Systems, Hardware Design, PCB Layout (KiCad 10.0), and Firmware Engineer** — never as an AI/ML engineer, data scientist, or general web developer.
- **Language Hierarchy:** Highlight **C / Embedded C** (`Tier 1 · Primary Focus`) with the copper highlight badge; keep **Python** strictly secondary (`Tier 3 · Project Exposure`, visually de-emphasized).
- **Single Source of Truth:** All resume facts, dates, part numbers, and links must originate strictly from `src/data/portfolio.ts` synchronized with [Docs/portfolio_context.md](../../Docs/portfolio_context.md). Never fabricate metrics or dead `#` links.
