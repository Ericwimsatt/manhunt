import { StyleSheet } from "react-native";

import { colors, radius, spacing, typography } from "./tokens";

export const lobbyStyles = StyleSheet.create({
  grid: {
    gap: spacing.lg,
  },
  topRow: {
    gap: spacing.lg,
  },
  joinCard: {
    gap: spacing.md,
  },
  joinHeader: {
    gap: spacing.xs,
  },
  sectionLabel: {
    fontSize: typography.eyebrow,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: colors.accent,
  },
  sectionTitle: {
    fontSize: typography.title,
    fontWeight: "700",
    color: colors.text,
  },
  mutedText: {
    fontSize: typography.bodySmall,
    lineHeight: 20,
    color: colors.textMuted,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panelMuted,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.body,
    color: colors.text,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  button: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  buttonSecondary: {
    backgroundColor: colors.panelMuted,
    borderColor: colors.border,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonLabel: {
    color: colors.panel,
    fontSize: typography.bodySmall,
    fontWeight: "700",
  },
  buttonSecondaryLabel: {
    color: colors.text,
  },
  notice: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panelMuted,
    padding: spacing.md,
  },
  noticeError: {
    borderColor: colors.seekers,
  },
  noticeText: {
    color: colors.text,
    fontSize: typography.bodySmall,
    lineHeight: 20,
  },
  playerList: {
    gap: spacing.sm,
  },
  playerRow: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panelMuted,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  playerMeta: {
    flex: 1,
    gap: spacing.xs,
  },
  playerNameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  playerName: {
    fontSize: typography.body,
    fontWeight: "700",
    color: colors.text,
  },
  currentPlayerPill: {
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  currentPlayerLabel: {
    color: colors.panel,
    fontSize: typography.eyebrow,
    fontWeight: "700",
  },
  metaLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    alignItems: "center",
  },
  statusText: {
    fontSize: typography.bodySmall,
    color: colors.textMuted,
  },
  teamBadge: {
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  teamBadgeText: {
    color: colors.panel,
    fontSize: typography.eyebrow,
    fontWeight: "800",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  emptyState: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: "center",
    gap: spacing.xs,
  },
});