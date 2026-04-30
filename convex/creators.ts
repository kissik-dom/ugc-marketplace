import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.category) {
      return await ctx.db
        .query("creators")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .take(50);
    }
    return await ctx.db.query("creators").order("desc").take(50);
  },
});

export const get = query({
  args: { id: v.id("creators") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    // Check if already seeded
    const existing = await ctx.db.query("creators").first();
    if (existing) return "Already seeded";

    const categories = ["Fashion", "Tech", "Beauty", "Fitness", "Food", "Travel", "Gaming", "Music"];
    const names = [
      "Luna Star", "Nova Echo", "Aria Voice", "Kissi Rose", "Zara Night",
      "Phoenix Blaze", "Ivy Luxe", "Storm Cloud", "Crystal Wave", "Ruby Shine",
      "Jade Moon", "Ember Fox", "Sage Wind", "Pearl Dawn", "Violet Ray",
      "Azure Sky", "Coral Sun", "Maple Leaf", "Onyx Dark", "Opal Light",
    ];

    for (let i = 0; i < 20; i++) {
      await ctx.db.insert("creators", {
        name: names[i],
        handle: names[i].toLowerCase().replace(" ", ""),
        bio: `AI creator specializing in ${categories[i % categories.length]} content. Ready for your next campaign.`,
        category: categories[i % categories.length],
        rating: 4.2 + Math.random() * 0.8,
        completedJobs: Math.floor(50 + Math.random() * 500),
        hourlyRate: Math.floor(25 + Math.random() * 200),
        skills: [categories[i % categories.length], "Content Creation", "Social Media", "Photography"],
        isAI: true,
        isVerified: Math.random() > 0.3,
        portfolioUrls: [],
        createdAt: Date.now() - Math.floor(Math.random() * 30 * 86400000),
      });
    }
    return "Seeded 20 creators";
  },
});

export const categories = query({
  args: {},
  handler: async () => {
    return [
      { name: "Fashion", count: "24.3K", emoji: "👗" },
      { name: "Tech", count: "18.7K", emoji: "💻" },
      { name: "Beauty", count: "31.2K", emoji: "💄" },
      { name: "Fitness", count: "15.8K", emoji: "💪" },
      { name: "Food", count: "22.1K", emoji: "🍕" },
      { name: "Travel", count: "19.4K", emoji: "✈️" },
      { name: "Gaming", count: "27.6K", emoji: "🎮" },
      { name: "Music", count: "16.9K", emoji: "🎵" },
    ];
  },
});
