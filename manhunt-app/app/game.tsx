import { AppShell } from "@/components/AppShell";
import { InfoCard } from "@/components/InfoCard";

export default function GameScreen() {
  return (
    <AppShell
      currentRoute="/game"
      description="This page will hold live in-game information once the host starts the round."
      eyebrow="Manhunt"
      title="Game"
    >
      <InfoCard
        body="Use this route for active objective updates, timers, or map clues."
        title="In-game information"
      />
    </AppShell>
  );
}