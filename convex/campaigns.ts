import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return await ctx.db
      .query("campaigns")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(20);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    budget: v.number(),
    category: v.string(),
  },
  returns: v.id("campaigns"),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db.insert("campaigns", {
      userId,
      title: args.title,
      description: args.description,
      budget: args.budget,
      status: "active",
      category: args.category,
      applicationsCount: 0,
      createdAt: Date.now(),
    });
  },
});
