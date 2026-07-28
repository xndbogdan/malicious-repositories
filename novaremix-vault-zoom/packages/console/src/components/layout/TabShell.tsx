import * as Tabs from "@radix-ui/react-tabs";
import { BarChart3, BookOpen, FlaskConical, Gamepad2, Landmark } from "lucide-react";
import type { ReactNode } from "react";

const ITEMS = [
  { id: "play", label: "Try It", icon: Gamepad2 },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "markets", label: "Markets", icon: Landmark },
  { id: "review", label: "Review", icon: FlaskConical },
  { id: "learn", label: "Learn", icon: BookOpen },
] as const;

export type TabId = (typeof ITEMS)[number]["id"];

export function TabShell({
  play,
  analytics,
  markets,
  review,
  learn,
}: {
  play: ReactNode;
  analytics: ReactNode;
  markets: ReactNode;
  review: ReactNode;
  learn: ReactNode;
}) {
  const panels: Record<TabId, ReactNode> = { play, analytics, markets, review, learn };

  return (
    <Tabs.Root defaultValue="play" className="tabs-root">
      <Tabs.List className="tabs">
        {ITEMS.map(({ id, label, icon: Icon }) => (
          <Tabs.Trigger key={id} value={id} className="tab">
            <Icon size={16} />
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {ITEMS.map(({ id }) => (
        <Tabs.Content key={id} value={id} className="view">
          {panels[id]}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
