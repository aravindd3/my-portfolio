"use client";

import { useEffect, useState } from "react";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
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
              className={`frosted-glass-nav-link relative rounded-full px-3 py-1.5 font-sans text-sm whitespace-nowrap no-underline transition-all duration-200 focus-visible:outline-offset-2 ${
                isActive
                  ? "font-semibold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                  : "font-medium text-primary/65 hover:text-white"
              }`}
            >
              <HStack as="span" gap={1.5} vAlign="center">
                <Text type="inherit" color="inherit">
                  {item.label}
                </Text>
                {isActive && (
                  <HStack
                    as="span"
                    aria-hidden="true"
                    className="size-1 rounded-full bg-bus shadow-[0_0_8px_var(--accent-bus)]"
                  />
                )}
              </HStack>
            </Link>
          </HStack>
        );
      })}
    </HStack>
  );
}
