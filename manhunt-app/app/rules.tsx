import { AppShell } from "@/components/AppShell";
import { InfoCard } from "@/components/InfoCard";

export default function RulesScreen() {
  return (
    <AppShell
      currentRoute="/rules"
      description="Keep the game rules easy to skim from any device before the round begins."
      eyebrow="Manhunt"
      title="Rules"
    >
      <InfoCard
        body="Add the round setup, boundaries, win conditions, and how hiders and seekers should use the app. The shared shell keeps this page visually aligned with the lobby."
        title="Rulebook placeholder"
      />
    </AppShell>
  );
}