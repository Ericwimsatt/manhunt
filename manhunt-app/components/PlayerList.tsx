import { Text, View } from "react-native";

import { TeamBadge } from "@/components/TeamBadge";
import { layoutStyles } from "@/components/styles/layoutStyles";
import { lobbyStyles } from "@/components/styles/lobbyStyles";

type PlayerListProps = {
  players: Array<{
    id: string;
    identityKey: string;
    name: string;
    team: "hiders" | "seekers" | "unassigned";
    status: "connected" | "disconnected";
  }>;
  currentIdentityKey: string | null;
};

export function PlayerList({ players, currentIdentityKey }: PlayerListProps) {
  return (
    <View style={layoutStyles.card}>
      <Text style={layoutStyles.cardTitle}>Players in the lobby</Text>
      {players.length === 0 ? (
        <View style={lobbyStyles.emptyState}>
          <Text style={layoutStyles.cardTitle}>No one has joined yet.</Text>
          <Text style={lobbyStyles.mutedText}>Join from the panel above to create the first player entry.</Text>
        </View>
      ) : (
        <View style={lobbyStyles.playerList}>
          {players.map((player) => {
            const isCurrentPlayer = currentIdentityKey === player.identityKey;

            return (
              <View key={player.id} style={lobbyStyles.playerRow}>
                <View style={lobbyStyles.playerMeta}>
                  <View style={lobbyStyles.playerNameRow}>
                    <Text style={lobbyStyles.playerName}>{player.name}</Text>
                    {isCurrentPlayer ? (
                      <View style={lobbyStyles.currentPlayerPill}>
                        <Text style={lobbyStyles.currentPlayerLabel}>You</Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={lobbyStyles.metaLine}>
                    <Text style={lobbyStyles.statusText}>Status: {player.status}</Text>
                    <Text style={lobbyStyles.statusText}>Host assigns teams from here later.</Text>
                  </View>
                </View>
                <TeamBadge team={player.team} />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}