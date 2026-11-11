"use client";

import type { ComponentType, SVGProps } from "react";
import {
  ArrowRight,
  ArrowUp,
  Award,
  Briefcase,
  CircuitBoard,
  Cpu,
  ExternalLink,
  FileDown,
  FolderGit2,
  GraduationCap,
  Layers,
  Mail,
  Phone,
  Radio,
  Terminal,
  Users,
  Wrench,
} from "lucide-react";
import { Icon } from "@astryxdesign/core/Icon";

export type AppIconName =
  | "arrow-right"
  | "arrow-up"
  | "award"
  | "briefcase"
  | "circuit-board"
  | "cpu"
  | "external-link"
  | "file-down"
  | "folder-git"
  | "graduation-cap"
  | "layers"
  | "mail"
  | "phone"
  | "radio"
  | "terminal"
  | "users"
  | "wrench";

const ICON_MAP: Record<AppIconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  award: Award,
  briefcase: Briefcase,
  "circuit-board": CircuitBoard,
  cpu: Cpu,
  "external-link": ExternalLink,
  "file-down": FileDown,
  "folder-git": FolderGit2,
  "graduation-cap": GraduationCap,
  layers: Layers,
  mail: Mail,
  phone: Phone,
  radio: Radio,
  terminal: Terminal,
  users: Users,
  wrench: Wrench,
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
