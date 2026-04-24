import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const sharedLobbyKey = "main-lobby";

export const getLobbyState = query({
  args: {},
  handler: async (ctx) => {
    const lobby = await ctx.db
      .query("games")
      .withIndex("by_key", (query) => query.eq("key", sharedLobbyKey))
      .unique();

    if (!lobby) {
      return {
        lobby: null,
        players: [],
      };
    }

    const players = await ctx.db
      .query("players")
      .withIndex("by_gameId", (query) => query.eq("gameId", lobby._id))
      .order("asc")
      .take(100);

    return {
      lobby: {
        id: lobby._id,
        key: lobby.key,
        title: lobby.title,
        status: lobby.status,
      },
      players: players.map((player) => ({
        id: player._id,
        identityKey: player.identityKey,
        name: player.name,
        team: player.team,
        status: player.status,
        lastSeenAt: player.lastSeenAt,
      })),
    };
  },
});

export const joinLobby = mutation({
  args: {
    identityKey: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const trimmedName = args.name.trim();
    if (trimmedName.length < 2) {
      throw new Error("Name must be at least 2 characters.");
    }

    if (trimmedName.length > 24) {
      throw new Error("Name must be 24 characters or fewer.");
    }

    const now = Date.now();
    let lobby = await ctx.db
      .query("games")
      .withIndex("by_key", (query) => query.eq("key", sharedLobbyKey))
      .unique();

    if (!lobby) {
      const lobbyId = await ctx.db.insert("games", {
        key: sharedLobbyKey,
        title: "Manhunt Lobby",
        status: "lobby",
      });

      lobby = await ctx.db.get(lobbyId);
      if (!lobby) {
        throw new Error("Failed to create the lobby.");
      }
    }

    const existingPlayer = await ctx.db
      .query("players")
      .withIndex("by_gameId_and_identityKey", (query) =>
        query.eq("gameId", lobby._id).eq("identityKey", args.identityKey),
      )
      .unique();

    if (existingPlayer) {
      await ctx.db.patch(existingPlayer._id, {
        name: trimmedName,
        status: "connected",
        lastSeenAt: now,
      });

      return {
        playerId: existingPlayer._id,
        rejoined: true,
      };
    }

    const playerId = await ctx.db.insert("players", {
      gameId: lobby._id,
      identityKey: args.identityKey,
      name: trimmedName,
      team: "unassigned",
      status: "connected",
      lastSeenAt: now,
    });

    return {
      playerId,
      rejoined: false,
    };
  },
});

export const reconnectPlayer = mutation({
  args: {
    identityKey: v.string(),
  },
  handler: async (ctx, args) => {
    const lobby = await ctx.db
      .query("games")
      .withIndex("by_key", (query) => query.eq("key", sharedLobbyKey))
      .unique();

    if (!lobby) {
      return { rejoined: false, player: null };
    }

    const player = await ctx.db
      .query("players")
      .withIndex("by_gameId_and_identityKey", (query) =>
        query.eq("gameId", lobby._id).eq("identityKey", args.identityKey),
      )
      .unique();

    if (!player) {
      return { rejoined: false, player: null };
    }

    await ctx.db.patch(player._id, {
      status: "connected",
      lastSeenAt: Date.now(),
    });

    return {
      rejoined: true,
      player: {
        id: player._id,
        identityKey: player.identityKey,
        name: player.name,
        team: player.team,
        status: "connected" as const,
      },
    };
  },
});

export const disconnectPlayer = mutation({
  args: {
    identityKey: v.string(),
  },
  handler: async (ctx, args) => {
    const lobby = await ctx.db
      .query("games")
      .withIndex("by_key", (query) => query.eq("key", sharedLobbyKey))
      .unique();

    if (!lobby) {
      return null;
    }

    const player = await ctx.db
      .query("players")
      .withIndex("by_gameId_and_identityKey", (query) =>
        query.eq("gameId", lobby._id).eq("identityKey", args.identityKey),
      )
      .unique();

    if (!player) {
      return null;
    }

    await ctx.db.patch(player._id, {
      status: "disconnected",
      lastSeenAt: Date.now(),
    });

    return null;
  },
});