import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { AppIcon, type AppIconName } from "./AppIcon";

interface SectionHeaderProps {
  headingId: string;
  eyebrow: string;
  icon: AppIconName;
  title: string;
  subtitle: string;
}

export function SectionHeader({
  headingId,
  eyebrow,
  icon,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <VStack
      gap={4}
      hAlign="center"
      className="mx-auto max-w-2xl min-w-0 text-center"
    >
      <HStack
        gap={2}
        vAlign="center"
        className="text-copper/90 select-none"
      >
        <AppIcon name={icon} size="xsm" color="accent" />
        <Text
          type="code"
          size="xsm"
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-copper/90"
        >
          {eyebrow}
        </Text>
      </HStack>

      <Heading
        id={headingId}
        level={2}
        justify="center"
        className="text-center font-display text-[clamp(1.75rem,3.4vw,2.375rem)] font-semibold leading-[1.14] tracking-[-0.025em] text-primary"
      >
        {title}
      </Heading>

      <Text
        type="body"
        as="p"
        color="secondary"
        justify="center"
        className="max-w-[54ch] text-center text-[0.9375rem] leading-[1.65] text-secondary md:text-base"
      >
        {subtitle}
      </Text>
    </VStack>
  );
}
