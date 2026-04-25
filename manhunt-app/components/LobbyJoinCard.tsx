import { Pressable, Text, TextInput, View } from "react-native";

import { layoutStyles } from "@/components/styles/layoutStyles";
import { lobbyStyles } from "@/components/styles/lobbyStyles";

type LobbyJoinCardProps = {
  draftName: string;
  hasJoined: boolean;
  isJoining: boolean;
  errorMessage: string | null;
  identityStatus: "missing" | "ready";
  onChangeDraftName: (value: string) => void;
  onJoin: () => void;
  onReconnect: () => void;
};

export function LobbyJoinCard({
  draftName,
  hasJoined,
  isJoining,
  errorMessage,
  identityStatus,
  onChangeDraftName,
  onJoin,
  onReconnect,
}: LobbyJoinCardProps) {
  const joinDisabled = isJoining || draftName.trim().length < 2 || identityStatus !== "ready";

  return (
    <View style={[layoutStyles.card, lobbyStyles.joinCard]}>
      <View style={lobbyStyles.joinHeader}>
        <Text style={lobbyStyles.sectionLabel}>Join the game</Text>
        <Text style={lobbyStyles.sectionTitle}>Choose a name and enter the lobby.</Text>
        <Text style={lobbyStyles.mutedText}>
          No account required. This browser keeps your anonymous device identity so refreshes reconnect you as the same player.
        </Text>
      </View>

      <TextInput
        autoCapitalize="words"
        autoCorrect={false}
        maxLength={24}
        onChangeText={onChangeDraftName}
        placeholder="Scout Rowan"
        style={lobbyStyles.input}
        value={draftName}
      />

      <View style={lobbyStyles.buttonRow}>
        <Pressable
          onPress={onJoin}
          style={joinDisabled ? [lobbyStyles.button, lobbyStyles.buttonDisabled] : lobbyStyles.button}
        >
          <Text style={lobbyStyles.buttonLabel}>{isJoining ? "Joining..." : hasJoined ? "Update name" : "Join lobby"}</Text>
        </Pressable>
        {hasJoined ? (
          <Pressable onPress={onReconnect} style={[lobbyStyles.button, lobbyStyles.buttonSecondary]}>
            <Text style={[lobbyStyles.buttonLabel, lobbyStyles.buttonSecondaryLabel]}>Reconnect now</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={errorMessage ? [lobbyStyles.notice, lobbyStyles.noticeError] : lobbyStyles.notice}>
        <Text style={lobbyStyles.noticeText}>
          {errorMessage ??
            (hasJoined
              ? "This device is already linked to your player entry. Refreshing the page should rejoin the same session."
              : "You will appear as unassigned until a host moves you to hiders or seekers.")}
        </Text>
      </View>
    </View>
  );
}