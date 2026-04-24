import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { View } from "react-native";

import { AppShell } from "@/components/AppShell";
import { InfoCard } from "@/components/InfoCard";
import { LobbyJoinCard } from "@/components/LobbyJoinCard";
import { PlayerList } from "@/components/PlayerList";
import { layoutStyles } from "@/components/styles/layoutStyles";
import { lobbyStyles } from "@/components/styles/lobbyStyles";
import { api } from "@/convex/_generated/api";
import { getOrCreateStoredIdentity, readStoredIdentity } from "@/lib/identity";

export default function LobbyScreen() {
  const lobbyState = useQuery(api.lobby.getLobbyState);
  const joinLobby = useMutation(api.lobby.joinLobby);
  const reconnectPlayer = useMutation(api.lobby.reconnectPlayer);

  const [draftName, setDraftName] = useState("");
  const [identityKey, setIdentityKey] = useState<string | null>(() => readStoredIdentity()?.key ?? null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    const identity = getOrCreateStoredIdentity();
    setIdentityKey(identity.key);

    void reconnectPlayer({ identityKey: identity.key }).catch(() => {
      setErrorMessage("Stored player identity found, but reconnecting failed.");
    });
  }, [reconnectPlayer]);

  const currentPlayer = lobbyState?.players.find((player) => player.identityKey === identityKey) ?? null;
  const hasJoined = currentPlayer !== null;
  const draftNameValue = draftName.length > 0 ? draftName : currentPlayer?.name ?? "";

  async function handleJoin() {
    const trimmedName = draftNameValue.trim();
    if (trimmedName.length < 2) {
      setErrorMessage("Choose a name with at least 2 characters.");
      return;
    }

    const identity = getOrCreateStoredIdentity();
    setIdentityKey(identity.key);
    setIsJoining(true);
    setErrorMessage(null);

    try {
      await joinLobby({ identityKey: identity.key, name: trimmedName });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to join the lobby.");
    } finally {
      setIsJoining(false);
    }
  }

  async function handleReconnect() {
    const identity = getOrCreateStoredIdentity();
    setIdentityKey(identity.key);
    setErrorMessage(null);

    try {
      await reconnectPlayer({ identityKey: identity.key });
    } catch {
      setErrorMessage("Reconnect failed. Try joining again.");
    }
  }

  return (
    <AppShell
      currentRoute="/lobby"
      description="Track who is in the shared lobby, who still needs a team assignment, and who can reconnect from the same browser without creating an account."
      eyebrow="Manhunt"
      title="Lobby"
    >
      <View style={lobbyStyles.grid}>
        <View style={lobbyStyles.topRow}>
          <LobbyJoinCard
            draftName={draftNameValue}
            errorMessage={errorMessage}
            hasJoined={hasJoined}
            identityStatus={identityKey ? "ready" : "missing"}
            isJoining={isJoining}
            onChangeDraftName={setDraftName}
            onJoin={() => {
              void handleJoin();
            }}
            onReconnect={() => {
              void handleReconnect();
            }}
          />
        </View>
        <PlayerList currentIdentityKey={identityKey} players={lobbyState?.players ?? []} />
        <View style={lobbyStyles.grid}>
          <InfoCard
            body="Every player begins as unassigned so the host can sort people into hiders or seekers later without forcing a choice during join."
            title="Team assignment"
          />
          <InfoCard
            body="The browser stores an anonymous identity locally and Convex uses it to reconnect this device to the same player entry after a refresh or disconnect."
            title="Reconnect behavior"
          />
        </View>
      </View>
    </AppShell>
  );
}