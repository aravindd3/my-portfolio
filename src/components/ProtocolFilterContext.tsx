"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { ProtocolId } from "@/data/portfolio";

interface ProtocolFilterContextValue {
  activeProtocolId: ProtocolId | null;
  setActiveProtocolId: (id: ProtocolId | null) => void;
  toggleProtocol: (id: ProtocolId) => void;
}

const ProtocolFilterContext = createContext<ProtocolFilterContextValue | null>(
  null,
);

export function ProtocolFilterProvider({ children }: { children: ReactNode }) {
  const [activeProtocolId, setActiveProtocolId] = useState<ProtocolId | null>(
    null,
  );

  const toggleProtocol = useCallback((id: ProtocolId) => {
    setActiveProtocolId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <ProtocolFilterContext.Provider
      value={{ activeProtocolId, setActiveProtocolId, toggleProtocol }}
    >
      {children}
    </ProtocolFilterContext.Provider>
  );
}

export function useOptionalProtocolFilter(): ProtocolFilterContextValue | null {
  return useContext(ProtocolFilterContext);
}

export function useProtocolFilter(): ProtocolFilterContextValue {
  const ctx = useContext(ProtocolFilterContext);
  if (!ctx) {
    throw new Error(
      "useProtocolFilter must be used within a ProtocolFilterProvider",
    );
  }
  return ctx;
}
