import { AppShell } from "@/components/AppShell";
import { InfoCard } from "@/components/InfoCard";

export default function PlayerScreen() {
  return (
    <AppShell
      currentRoute="/player"
      description="This page will become the player-specific view for identity, role, and personal round details."
      eyebrow="Manhunt"
      title="Player"
    >
      <InfoCard
        body="Use this route for a player summary, device-linked identity details, and future private information that should not live in the shared lobby."
        title="Player view placeholder"
      />
    </AppShell>
  );
}