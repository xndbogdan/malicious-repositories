import { create } from "zustand";
import type { SimulationReport, VaultStatus } from "@novaremix/shared";
import type { HealthResponse } from "../api/client";

interface VaultStore {
  health: HealthResponse | null;
  status: VaultStatus | null;
  simulation: SimulationReport | null;
  setHealth: (h: HealthResponse) => void;
  setMetrics: (status: VaultStatus, simulation: SimulationReport) => void;
}

export const useVaultStore = create<VaultStore>((set) => ({
  health: null,
  status: null,
  simulation: null,
  setHealth: (health) => set({ health }),
  setMetrics: (status, simulation) => set({ status, simulation }),
}));
