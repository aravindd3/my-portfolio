"use client";

import { useState } from "react";
import { FileDown, Menu, X } from "lucide-react";
import { Button } from "@astryxdesign/core/Button";
import { Drawer, DrawerHeader } from "@astryxdesign/core/Drawer";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Layout, LayoutContent, LayoutFooter } from "@astryxdesign/core/Layout";
import { Link } from "@astryxdesign/core/Link";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

export interface NavItem {
  label: string;
  href: string;
}

interface MobileNavDrawerProps {
  items: readonly NavItem[];
  fullName: string;
  systemId: string;
  statusBanner: string;
  resumePdfUrl: string;
  university: string;
  location: string;
}

export function MobileNavDrawer({
  items,
  fullName,
  systemId,
  statusBanner,
  resumePdfUrl,
  university,
  location,
}: MobileNavDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        tooltip="Navigation menu"
        variant="secondary"
        size="sm"
        icon={<Icon icon={isOpen ? X : Menu} size="sm" />}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        onClick={() => setIsOpen((prev) => !prev)}
      />

      <Drawer
        id="mobile-nav-drawer"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        label="Mobile section navigation"
        side="end"
        width={320}
        className="border-l border-hairline"
      >
        <Layout
          header={
            <DrawerHeader
              title={fullName}
              subtitle={systemId}
              onOpenChange={setIsOpen}
              hasDivider
            />
          }
          content={
            <LayoutContent>
              <VStack gap={5}>
                <HStack
                  gap={2}
                  vAlign="center"
                  className="rounded-lg border border-hairline bg-elevated px-3 py-2.5"
                >
                  <StatusDot
                    variant="success"
                    isPulsing
                    label={statusBanner}
                  />
                  <Text
                    type="code"
                    size="xsm"
                    className="font-mono text-xs leading-snug text-signal"
                  >
                    {statusBanner}
                  </Text>
                </HStack>

                <VStack as="nav" aria-label="Mobile navigation" gap={1}>
                  <VStack as="ul" gap={1} className="m-0 list-none p-0">
                    {items.map((item, idx) => (
                      <HStack as="li" key={item.href}>
                        <Link
                          href={item.href}
                          color="primary"
                          isStandalone
                          display="block"
                          data-autofocus={idx === 0 ? "true" : undefined}
                          onClick={() => setIsOpen(false)}
                          className="w-full rounded-lg border border-transparent px-3 py-2.5 font-sans text-sm font-medium text-primary transition-colors hover:border-hairline hover:bg-elevated hover:text-copper"
                        >
                          {item.label}
                        </Link>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </VStack>
            </LayoutContent>
          }
          footer={
            <LayoutFooter hasDivider>
              <VStack gap={3} className="w-full">
                <Button
                  label="Resume PDF"
                  href={resumePdfUrl}
                  as="a"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  width="100%"
                  icon={<Icon icon={FileDown} size="sm" />}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-xs"
                />
                <Text
                  type="supporting"
                  size="xsm"
                  color="secondary"
                  className="font-mono text-[11px] text-muted"
                >
                  {university} · {location}
                </Text>
              </VStack>
            </LayoutFooter>
          }
        />
      </Drawer>
    </>
  );
}
