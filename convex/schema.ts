import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  creators: defineTable({
    name: v.string(),
    handle: v.string(),
    avatarUrl: v.optional(v.string()),
    bio: v.string(),
    category: v.string(),
    rating: v.number(),
    completedJobs: v.number(),
    hourlyRate: v.number(),
    skills: v.array(v.string()),
    isAI: v.boolean(),
    isVerified: v.boolean(),
    portfolioUrls: v.array(v.string()),
    createdAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_rating", ["rating"]),
  campaigns: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    budget: v.number(),
    status: v.string(),
    category: v.string(),
    applicationsCount: v.number(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId", "createdAt"])
    .index("by_status", ["status"]),
  applications: defineTable({
    campaignId: v.id("campaigns"),
    creatorId: v.id("creators"),
    message: v.string(),
    status: v.string(),
    createdAt: v.number(),
  })
    .index("by_campaign", ["campaignId"]),
  bookmarks: defineTable({
    userId: v.id("users"),
    creatorId: v.id("creators"),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"]),
});

export default schema;
