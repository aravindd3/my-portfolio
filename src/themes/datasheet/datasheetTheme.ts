import { defineTheme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";

export const datasheetTheme = defineTheme({
  name: "datasheet",
  extends: neutralTheme,
  typography: {
    body: {
      family: "var(--font-plus-jakarta)",
      fallbacks: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    heading: {
      family: "var(--font-space-grotesk)",
      fallbacks: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    code: {
      family: "var(--font-jetbrains-mono)",
      fallbacks: "ui-monospace, monospace",
    },
  },
  motion: {
    character: "crisp",
  },
  tokens: {
    // Primary ENIG Copper / Gold accent
    "--color-accent": ["#E5A93C", "#E5A93C"],
    "--color-accent-muted": ["rgba(229, 169, 60, 0.12)", "rgba(229, 169, 60, 0.12)"],
    "--color-on-accent": ["#0B0F14", "#0B0F14"],
    "--color-text-accent": ["#E5A93C", "#E5A93C"],
    "--color-icon-accent": ["#E5A93C", "#E5A93C"],

    // Solder-mask obsidian & carbon glass surfaces
    "--color-background-body": ["transparent", "transparent"],
    "--color-background-surface": ["#0B0E14", "#0B0E14"],
    "--color-background-card": ["#0B0E14", "#0B0E14"],
    "--color-background-popover": ["#11161F", "#11161F"],
    "--color-background-muted": ["#0E131B", "#0E131B"],
    "--color-background-inverted": ["#F1F5F9", "#F1F5F9"],
    "--color-neutral": ["rgba(148, 163, 184, 0.10)", "rgba(148, 163, 184, 0.10)"],
    "--color-overlay": ["rgba(6, 9, 13, 0.82)", "rgba(6, 9, 13, 0.82)"],
    "--color-overlay-hover": ["rgba(241, 245, 249, 0.05)", "rgba(241, 245, 249, 0.05)"],
    "--color-overlay-pressed": ["rgba(241, 245, 249, 0.10)", "rgba(241, 245, 249, 0.10)"],

    // Silkscreen white & brushed aluminum slate typography
    "--color-text-primary": ["#F1F5F9", "#F1F5F9"],
    "--color-text-secondary": ["#94A3B8", "#94A3B8"],
    "--color-text-disabled": ["#64748B", "#64748B"],
    "--color-icon-primary": ["#F1F5F9", "#F1F5F9"],
    "--color-icon-secondary": ["#94A3B8", "#94A3B8"],
    "--color-icon-disabled": ["#64748B", "#64748B"],

    // Hairline & energized trace borders
    "--color-border": ["#1B222E", "#1B222E"],
    "--color-border-emphasized": ["rgba(229, 169, 60, 0.48)", "rgba(229, 169, 60, 0.48)"],

    // Oscilloscope emerald (success/live) & logic analyzer cyan (bus/info)
    "--color-success": ["#10B981", "#10B981"],
    "--color-success-muted": ["rgba(16, 185, 129, 0.12)", "rgba(16, 185, 129, 0.12)"],
    "--color-on-success": ["#0B0F14", "#0B0F14"],
    "--color-text-success": ["#10B981", "#10B981"],
    "--color-icon-success": ["#10B981", "#10B981"],
    "--color-border-success": ["#10B981", "#10B981"],

    "--color-info": ["#38BDF8", "#38BDF8"],
    "--color-info-muted": ["rgba(56, 189, 248, 0.12)", "rgba(56, 189, 248, 0.12)"],
    "--color-on-info": ["#0B0F14", "#0B0F14"],
    "--color-text-info": ["#38BDF8", "#38BDF8"],
    "--color-icon-info": ["#38BDF8", "#38BDF8"],
    "--color-border-info": ["#38BDF8", "#38BDF8"],

    "--color-warning": ["#E5A93C", "#E5A93C"],
    "--color-warning-muted": ["rgba(229, 169, 60, 0.12)", "rgba(229, 169, 60, 0.12)"],
    "--color-on-warning": ["#0B0F14", "#0B0F14"],
    "--color-text-warning": ["#E5A93C", "#E5A93C"],
    "--color-icon-warning": ["#E5A93C", "#E5A93C"],
    "--color-border-warning": ["#E5A93C", "#E5A93C"],

    // Semantic hue tokens aligned to instrument accents
    "--color-background-cyan": ["rgba(56, 189, 248, 0.12)", "rgba(56, 189, 248, 0.12)"],
    "--color-border-cyan": ["rgba(56, 189, 248, 0.35)", "rgba(56, 189, 248, 0.35)"],
    "--color-text-cyan": ["#38BDF8", "#38BDF8"],
    "--color-icon-cyan": ["#38BDF8", "#38BDF8"],

    "--color-background-green": ["rgba(16, 185, 129, 0.12)", "rgba(16, 185, 129, 0.12)"],
    "--color-border-green": ["rgba(16, 185, 129, 0.35)", "rgba(16, 185, 129, 0.35)"],
    "--color-text-green": ["#10B981", "#10B981"],
    "--color-icon-green": ["#10B981", "#10B981"],

    "--color-background-yellow": ["rgba(229, 169, 60, 0.12)", "rgba(229, 169, 60, 0.12)"],
    "--color-border-yellow": ["rgba(229, 169, 60, 0.48)", "rgba(229, 169, 60, 0.48)"],
    "--color-text-yellow": ["#E5A93C", "#E5A93C"],
    "--color-icon-yellow": ["#E5A93C", "#E5A93C"],

    // Focus ring, inset focus shadows & geometry tokens
    "--focus-outline-width": "2px",
    "--focus-outline-style": "solid",
    "--focus-outline-color": "#E5A93C",
    "--focus-outline-offset": "3px",
    "--shadow-inset-hover": "inset 0px 0px 0px 2px rgba(229, 169, 60, 0.25)",
    "--shadow-inset-selected": "inset 0px 0px 0px 2px rgba(229, 169, 60, 0.48)",
    "--shadow-inset-success": "inset 0px 0px 0px 2px rgba(16, 185, 129, 0.35)",
    "--shadow-inset-warning": "inset 0px 0px 0px 2px rgba(229, 169, 60, 0.35)",
    "--radius-inner": "6px",
    "--radius-element": "10px",
    "--radius-container": "16px",
  },
});
