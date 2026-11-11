"use client";

import type { ReactNode } from "react";
import { ProtocolFilterProvider } from "./ProtocolFilterContext";

interface PortfolioWorkspaceProps {
  children: ReactNode;
}

export function PortfolioWorkspace({ children }: PortfolioWorkspaceProps) {
  return <ProtocolFilterProvider>{children}</ProtocolFilterProvider>;
}
