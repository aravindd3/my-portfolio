"use client";

import { useEffect, useState } from "react";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { PROFILE_DATA } from "@/data/portfolio";
import { AppIcon } from "./AppIcon";
import { MobileNavDrawer, type NavItem } from "./MobileNavDrawer";
import { NavbarLinks } from "./NavbarLinks";

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      rafId = 0;
      // Hide during initial name display area; reveal once scrolled down
      setIsVisible(window.scrollY >= 120);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(handleScroll);
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <HStack
      as="header"
      className={`fixed inset-x-0 top-0 z-40 w-full px-4 pt-3 pb-2 transition-all duration-500 ease-out md:px-8 md:pt-4 ${
        isVisible
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 -translate-y-4"
      }`}
    >
      <Link
        href="#main-content"
        color="accent"
        isStandalone
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:border focus:border-[var(--border-active)] focus:bg-elevated focus:px-3.5 focus:py-2 focus:font-mono focus:text-xs focus:text-copper"
      >
        Skip to main content
      </Link>

      <HStack
        as="nav"
        aria-label="Primary navigation"
        hAlign="between"
        vAlign="center"
        className="mx-auto w-full max-w-5xl items-center"
      >
        {/* Monogram / Home link on left */}
        <Link
          href="#top"
          label="Back to top"
          isStandalone
          display="block"
          className="group shrink-0 rounded-full no-underline focus-visible:outline-offset-2"
        >
          <HStack
            as="span"
            hAlign="center"
            vAlign="center"
            gap={2}
            className="rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-xs text-secondary/80 backdrop-blur-md transition-all duration-200 group-hover:border-copper/50 group-hover:text-copper"
          >
            <AppIcon name="cpu" size="xsm" color="inherit" />
            <HStack as="span" className="font-semibold tracking-wider text-white group-hover:text-copper">
              {PROFILE_DATA.monogram}
            </HStack>
          </HStack>
        </Link>

        {/* Desktop Navigation: Minimalist Wavy Line Menu */}
        <NavbarLinks items={NAV_ITEMS} />

        {/* Mobile Navigation Drawer Trigger */}
        <HStack vAlign="center" gap={3} className="lg:hidden">
          <MobileNavDrawer
            items={NAV_ITEMS}
            fullName={PROFILE_DATA.fullName}
            systemId={PROFILE_DATA.systemId}
            statusBanner={PROFILE_DATA.statusBanner}
            resumePdfUrl={PROFILE_DATA.resumePdfUrl}
            university={PROFILE_DATA.university}
            location={PROFILE_DATA.location}
          />
        </HStack>
      </HStack>
    </HStack>
  );
}
