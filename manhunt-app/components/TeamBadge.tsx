import { Text, View } from "react-native";

import { lobbyStyles } from "@/components/styles/lobbyStyles";
import { colors } from "@/components/styles/tokens";

type TeamBadgeProps = {
  team: "hiders" | "seekers" | "unassigned";
};

const teamColors = {
  hiders: colors.hiders,
  seekers: colors.seekers,
  unassigned: colors.unassigned,
};

export function TeamBadge({ team }: TeamBadgeProps) {
  return (
    <View style={[lobbyStyles.teamBadge, { backgroundColor: teamColors[team] }]}> 
      <Text style={lobbyStyles.teamBadgeText}>{team}</Text>
    </View>
  );
}