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
  return (
    <HStack
      as="header"
      className="pointer-events-none fixed inset-x-0 top-0 z-40 w-full px-4 pt-4 pb-1 md:px-6 md:pt-5"
    >
      <Link
        href="#main-content"
        color="accent"
        isStandalone
        className="pointer-events-auto sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:border focus:border-[var(--border-active)] focus:bg-elevated focus:px-3.5 focus:py-2 focus:font-mono focus:text-xs focus:text-copper"
      >
        Skip to main content
      </Link>

      <HStack
        as="nav"
        aria-label="Primary navigation"
        hAlign="center"
        vAlign="center"
        className="frosted-glass-nav pointer-events-auto relative mx-auto w-fit rounded-full px-2 py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
      >
        {/* Mobile Navigation Capsule: Home CPU Icon + Drawer */}
        <HStack vAlign="center" gap={3} className="px-2 py-0.5 lg:hidden">
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
              className="size-7 rounded-full bg-white/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 group-hover:scale-[1.04] group-hover:bg-copper group-hover:text-canvas"
            >
              <AppIcon name="cpu" size="sm" color="inherit" />
            </HStack>
          </Link>
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

        {/* Desktop Navigation: Tabs Only */}
        <NavbarLinks items={NAV_ITEMS} />
      </HStack>
    </HStack>
  );
}
