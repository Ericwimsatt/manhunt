import { Text, View } from "react-native";

import { layoutStyles } from "@/components/styles/layoutStyles";

type InfoCardProps = {
  title: string;
  body: string;
};

export function InfoCard({ title, body }: InfoCardProps) {
  return (
    <View style={layoutStyles.card}>
      <Text style={layoutStyles.cardTitle}>{title}</Text>
      <Text style={layoutStyles.cardBody}>{body}</Text>
    </View>
  );
}