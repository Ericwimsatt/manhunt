import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const teamValidator = v.union(
  v.literal("hiders"),
  v.literal("seekers"),
  v.literal("unassigned"),
);

export default defineSchema({
  games: defineTable({
    key: v.string(),
    title: v.string(),
    status: v.union(v.literal("lobby"), v.literal("active"), v.literal("ended")),
  }).index("by_key", ["key"]),
  players: defineTable({
    gameId: v.id("games"),
    identityKey: v.string(),
    name: v.string(),
    team: teamValidator,
    status: v.union(v.literal("connected"), v.literal("disconnected")),
    lastSeenAt: v.number(),
  })
    .index("by_gameId", ["gameId"])
    .index("by_gameId_and_identityKey", ["gameId", "identityKey"]),
});