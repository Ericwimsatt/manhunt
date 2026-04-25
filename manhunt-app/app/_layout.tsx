import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AppProviders } from "@/components/AppProviders";

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#f3efe5" },
        }}
      />
    </AppProviders>
  );
}
