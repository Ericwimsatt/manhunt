import { Link } from "expo-router";
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
                <Link href={link.href} key={link.href} asChild>
                  <Pressable style={[layoutStyles.navButton, isActive && layoutStyles.navButtonActive]}>
                    <Text
                      style={[
                        layoutStyles.navButtonLabel,
                        isActive && layoutStyles.navButtonLabelActive,
                      ]}
                    >
                      {link.label}
                    </Text>
                  </Pressable>
                </Link>
              );
            })}
          </View>
        </View>
        {children}
      </View>
    </ScrollView>
  );
}