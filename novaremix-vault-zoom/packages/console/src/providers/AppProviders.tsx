import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const client = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
});

export function AppProviders({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
