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

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

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
  | "instagram"
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
  instagram: InstagramIcon as unknown as ComponentType<SVGProps<SVGSVGElement>>,
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
