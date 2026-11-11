import { Button } from "@astryxdesign/core/Button";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { PROFILE_DATA } from "@/data/portfolio";
import { AppIcon } from "./AppIcon";
import { MobileNavDrawer, type NavItem } from "./MobileNavDrawer";

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const shortStatus = PROFILE_DATA.statusBanner.split(" · ")[0];

  return (
    <HStack
      as="header"
      className="sticky top-0 z-40 w-full border-b border-hairline bg-[var(--bg-glass)] backdrop-blur-md"
    >
      <Link
        href="#main-content"
        color="accent"
        isStandalone
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:border focus:border-[var(--border-active)] focus:bg-elevated focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-copper"
      >
        Skip to main content
      </Link>

      <HStack
        as="nav"
        aria-label="Primary navigation"
        hAlign="between"
        vAlign="center"
        gap={4}
        className="mx-auto w-full max-w-6xl px-5 py-3.5 md:px-12"
      >
        <HStack gap={3} vAlign="center" className="min-w-0">
          <Link
            href="#top"
            color="primary"
            isStandalone
            display="block"
            className="shrink-0 no-underline"
          >
            <HStack as="span" gap={2} vAlign="center">
              <Text
                type="code"
                weight="semibold"
                className="rounded border border-[var(--border-active)] bg-elevated px-2 py-0.5 font-mono text-xs tracking-wider text-copper"
              >
                [{PROFILE_DATA.monogram}]
              </Text>
              <Text
                type="large"
                weight="semibold"
                color="primary"
                className="font-display text-base font-semibold tracking-tight text-primary"
              >
                {PROFILE_DATA.fullName}
              </Text>
            </HStack>
          </Link>

          <HStack
            gap={2}
            vAlign="center"
            className="hidden shrink-0 rounded-full border border-hairline bg-elevated px-3 py-1 xl:flex"
          >
            <StatusDot
              variant="success"
              isPulsing
              label={PROFILE_DATA.statusBanner}
            />
            <Text
              type="code"
              size="xsm"
              className="font-mono text-xs text-signal"
            >
              {shortStatus}
            </Text>
          </HStack>
        </HStack>

        <HStack gap={5} vAlign="center" className="shrink-0">
          <HStack
            as="ul"
            gap={5}
            vAlign="center"
            className="m-0 hidden list-none p-0 lg:flex"
          >
            {NAV_ITEMS.map((item) => (
              <HStack as="li" key={item.href}>
                <Link
                  href={item.href}
                  color="secondary"
                  isStandalone
                  className="whitespace-nowrap font-sans text-sm font-medium text-secondary transition-colors hover:text-copper"
                >
                  {item.label}
                </Link>
              </HStack>
            ))}
          </HStack>

          <HStack className="hidden md:flex">
            <Button
              label="Resume PDF"
              href={PROFILE_DATA.resumePdfUrl}
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
              icon={<AppIcon name="file-down" size="sm" />}
              className="font-mono text-xs"
            />
          </HStack>

          <HStack className="lg:hidden">
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
    </HStack>
  );
}
