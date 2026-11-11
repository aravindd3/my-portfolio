"use client";

import type { ComponentType, SVGProps } from "react";
import { Cpu, ExternalLink, FileDown, FolderGit2, Mail } from "lucide-react";
import { Icon } from "@astryxdesign/core/Icon";

export type AppIconName =
  | "cpu"
  | "external-link"
  | "file-down"
  | "folder-git"
  | "mail";

const ICON_MAP: Record<AppIconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  cpu: Cpu,
  "external-link": ExternalLink,
  "file-down": FileDown,
  "folder-git": FolderGit2,
  mail: Mail,
};

interface AppIconProps {
  name: AppIconName;
  size?: "xsm" | "sm" | "md" | "lg";
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "disabled"
    | "accent"
    | "info"
    | "success"
    | "error"
    | "warning"
    | "inherit";
  label?: string;
  className?: string;
}

export function AppIcon({ name, size, color, label, className }: AppIconProps) {
  return (
    <Icon
      icon={ICON_MAP[name]}
      size={size}
      color={color}
      label={label}
      className={className}
    />
  );
}
