import { StyleSheet } from "react-native";

import { colors, radius, spacing, typography } from "./tokens";

export const layoutStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  screenContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: "center",
  },
  shell: {
    width: "100%",
    maxWidth: 1080,
    gap: spacing.lg,
  },
  hero: {
    backgroundColor: colors.panel,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    gap: spacing.md,
  },
  heroEyebrow: {
    fontSize: typography.eyebrow,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: colors.accent,
  },
  heroTitle: {
    fontSize: typography.hero,
    lineHeight: 42,
    fontWeight: "800",
    color: colors.text,
  },
  heroBody: {
    maxWidth: 680,
    fontSize: typography.body,
    lineHeight: 24,
    color: colors.textMuted,
  },
  navRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  navButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panelMuted,
  },
  navButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  navButtonLabel: {
    fontSize: typography.bodySmall,
    fontWeight: "700",
    color: colors.text,
  },
  navButtonLabelActive: {
    color: colors.panel,
  },
  card: {
    backgroundColor: colors.panel,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  cardTitle: {
    fontSize: typography.title,
    fontWeight: "700",
    color: colors.text,
  },
  cardBody: {
    fontSize: typography.body,
    lineHeight: 24,
    color: colors.textMuted,
  },
});