import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { PROFILE_DATA } from "@/data/portfolio";
import { AppIcon } from "./AppIcon";
import { MobileNavDrawer, type NavItem } from "./MobileNavDrawer";
import { NavbarAsciiName } from "./NavbarAsciiName";
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
        hAlign="between"
        vAlign="center"
        gap={3}
        className="frosted-glass-nav pointer-events-auto mx-auto w-full max-w-md rounded-full p-1.5 md:w-fit md:max-w-none lg:gap-4 lg:pr-2.5"
      >
        <HStack gap={2} vAlign="center" className="shrink-0 pl-1">
          <Link
            href="#top"
            label={`${PROFILE_DATA.fullName} — Back to top`}
            isStandalone
            display="block"
            className="group shrink-0 rounded-full no-underline focus-visible:outline-offset-2"
          >
            <HStack
              as="span"
              gap={2}
              vAlign="center"
              className="transition-opacity duration-200 group-hover:opacity-90"
            >
              <HStack
                as="span"
                hAlign="center"
                vAlign="center"
                className="size-8 rounded-full bg-white/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 group-hover:scale-[1.04] group-hover:bg-copper group-hover:text-canvas"
              >
                <AppIcon name="cpu" size="sm" color="inherit" />
              </HStack>

              <NavbarAsciiName name={PROFILE_DATA.fullName} />
            </HStack>
          </Link>
        </HStack>

        <HStack
          as="span"
          aria-hidden="true"
          className="hidden h-5 w-px bg-white/15 lg:flex"
        />

        <NavbarLinks items={NAV_ITEMS} />

        <HStack className="shrink-0 lg:hidden">
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
