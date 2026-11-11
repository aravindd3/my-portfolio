"use client";

import type { ComponentType, SVGProps } from "react";
import {
  Award,
  Briefcase,
  Cpu,
  ExternalLink,
  FileDown,
  FolderGit2,
  GraduationCap,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { Icon } from "@astryxdesign/core/Icon";

export type AppIconName =
  | "award"
  | "briefcase"
  | "cpu"
  | "external-link"
  | "file-down"
  | "folder-git"
  | "graduation-cap"
  | "mail"
  | "phone"
  | "users";

const ICON_MAP: Record<AppIconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  award: Award,
  briefcase: Briefcase,
  cpu: Cpu,
  "external-link": ExternalLink,
  "file-down": FileDown,
  "folder-git": FolderGit2,
  "graduation-cap": GraduationCap,
  mail: Mail,
  phone: Phone,
  users: Users,
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
