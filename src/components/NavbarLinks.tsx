"use client";

import { useEffect, useState } from "react";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import type { NavItem } from "./MobileNavDrawer";

interface NavbarLinksProps {
  items: readonly NavItem[];
}

export function NavbarLinks({ items }: NavbarLinksProps) {
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const sectionIds = items.map((item) => item.href.replace(/^#/, ""));

    let rafId = 0;
    const updateActiveSection = () => {
      rafId = 0;

      // Clear active pill when near the very top Hero viewport
      if (window.scrollY < 140) {
        setActiveHref(null);
        return;
      }

      // If scrolled to the very bottom, highlight the final section (Contact)
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (nearBottom && items.length > 0) {
        setActiveHref(items[items.length - 1].href);
        return;
      }

      const probeY = window.innerHeight * 0.32;
      let currentActive: string | null = null;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY) {
          currentActive = `#${id}`;
        }
      }

      setActiveHref(currentActive);
    };

    const onScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <HStack
      as="ul"
      gap={1}
      vAlign="center"
      className="m-0 hidden list-none p-0 lg:flex"
    >
      {items.map((item) => {
        const isActive = activeHref === item.href;
        return (
          <HStack as="li" key={item.href}>
            <Link
              href={item.href}
              color="primary"
              isStandalone
              aria-current={isActive ? "location" : undefined}
              className={`frosted-glass-nav-link rounded-full border px-3.5 py-2 font-sans text-sm font-medium whitespace-nowrap no-underline transition-all duration-300 focus-visible:outline-offset-2 ${
                isActive
                  ? "border-white/25 bg-white/15 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_0_18px_rgba(56,189,248,0.16)]"
                  : "border-transparent text-primary/75 hover:bg-white/10 hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          </HStack>
        );
      })}
    </HStack>
  );
}
