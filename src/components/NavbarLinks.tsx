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
      gap={6}
      vAlign="center"
      className="m-0 hidden list-none items-center p-0 lg:flex"
    >
      {items.map((item) => {
        const isActive = activeHref === item.href;
        return (
          <HStack as="li" key={item.href} className="relative">
            <Link
              href={item.href}
              color="primary"
              isStandalone
              aria-current={isActive ? "location" : undefined}
              className={`group relative inline-flex flex-col items-center py-1 font-mono text-xs uppercase tracking-[0.18em] no-underline transition-colors duration-200 focus-visible:outline-offset-4 ${
                isActive
                  ? "font-semibold text-white"
                  : "font-medium text-secondary/70 hover:text-white"
              }`}
            >
              <Text as="span" type="inherit" color="inherit">
                {item.label}
              </Text>

              {/* Mehmet Burak Erman Wavy Menu Line Effect */}
              <HStack
                as="span"
                aria-hidden="true"
                className={`pointer-events-none absolute -bottom-1.5 left-0 h-[7px] w-full overflow-hidden transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <svg
                  className="h-full w-[200%] shrink-0 text-copper animate-wavy-glide"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0 4 Q 5 0, 10 4 T 20 4 T 30 4 T 40 4 T 50 4 T 60 4 T 70 4 T 80 4 T 90 4 T 100 4 T 110 4 T 120 4 T 130 4 T 140 4 T 150 4 T 160 4 T 170 4 T 180 4 T 190 4 T 200 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </HStack>
            </Link>
          </HStack>
        );
      })}
    </HStack>
  );
}
