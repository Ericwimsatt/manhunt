import { useRouter } from "expo-router";
import { PropsWithChildren } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { layoutStyles } from "@/components/styles/layoutStyles";

const navLinks = [
  { href: "/lobby", label: "Lobby" },
  { href: "/game", label: "Game" },
  { href: "/rules", label: "Rules" },
  { href: "/player", label: "Player" },
] as const;

type AppShellProps = PropsWithChildren<{
  currentRoute: "/lobby" | "/game" | "/rules" | "/player";
  eyebrow: string;
  title: string;
  description: string;
}>;

export function AppShell({
  children,
  currentRoute,
  eyebrow,
  title,
  description,
}: AppShellProps) {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={layoutStyles.screenContent} style={layoutStyles.screen}>
      <View style={layoutStyles.shell}>
        <View style={layoutStyles.hero}>
          <Text style={layoutStyles.heroEyebrow}>{eyebrow}</Text>
          <Text style={layoutStyles.heroTitle}>{title}</Text>
          <Text style={layoutStyles.heroBody}>{description}</Text>
          <View style={layoutStyles.navRow}>
            {navLinks.map((link) => {
              const isActive = link.href === currentRoute;

              return (
                <Pressable
                  key={link.href}
                  onPress={() => router.push(link.href)}
                  style={
                    isActive
                      ? [layoutStyles.navButton, layoutStyles.navButtonActive]
                      : layoutStyles.navButton
                  }
                >
                  <Text
                    style={
                      isActive
                        ? [layoutStyles.navButtonLabel, layoutStyles.navButtonLabelActive]
                        : layoutStyles.navButtonLabel
                    }
                  >
                    {link.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        {children}
      </View>
    </ScrollView>
  );
}