"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { LayerProvider } from "@astryxdesign/core/Layer";
import { LinkProvider } from "@astryxdesign/core/Link";
import { Theme } from "@astryxdesign/core/theme";
import { defaultThemeSlug, themes } from "../astryx-themes";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Theme theme={themes[defaultThemeSlug]} mode="dark">
      <LayerProvider>
        <LinkProvider component={Link}>{children}</LinkProvider>
      </LayerProvider>
    </Theme>
  );
}
