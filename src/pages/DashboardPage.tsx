import { useMutation, useQuery } from "convex/react";
import {
  Bookmark,
  Briefcase,
  Filter,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "../../convex/_generated/api";

function CreatorCard({ creator }: { creator: any }) {
  return (
    <div className="bg-[#12121A] rounded-xl border border-[rgba(255,255,255,0.06)] p-4 hover:border-[#FFB59A]/30 transition-all group">
      <div className="flex items-start gap-3">
        <div className="size-12 rounded-xl bg-gradient-to-br from-[#FFB59A]/20 to-[#E09A7A]/20 border border-[#FFB59A]/20 flex items-center justify-center shrink-0">
          <span className="text-lg font-bold text-[#FFB59A]">{creator.name.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-sm truncate">{creator.name}</h3>
            {creator.isVerified && <span className="text-[#FFB59A] text-xs">✓</span>}
            {creator.isAI && (
              <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#FFB59A]/10 text-[#FFB59A] font-medium">AI</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">@{creator.handle}</p>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-[#1A1A24] text-muted-foreground hover:text-[#FFB59A] transition-colors opacity-0 group-hover:opacity-100">
          <Bookmark className="size-4" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{creator.bio}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {creator.skills.slice(0, 3).map((s: string) => (
          <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-[#1A1A24] text-muted-foreground">{s}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-1">
          <Star className="size-3 text-[#FFD700] fill-[#FFD700]" />
          <span className="text-xs font-medium">{creator.rating.toFixed(1)}</span>
          <span className="text-[10px] text-muted-foreground">({creator.completedJobs} jobs)</span>
        </div>
        <span className="text-sm font-semibold text-[#FFB59A]">${creator.hourlyRate}/hr</span>
      </div>
      <Button className="w-full mt-3 bg-[#FFB59A] hover:bg-[#E09A7A] text-[#0A0A0F] text-xs h-8 font-semibold">
        Hire Creator
      </Button>
    </div>
  );
}

export function DashboardPage() {
  const creators = useQuery(api.creators.list, {}) || [];
  const categories = useQuery(api.creators.categories) || [];
  const seedCreators = useMutation(api.creators.seed);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Auto-seed on first visit
  useEffect(() => {
    if (creators.length === 0) {
      seedCreators().catch(() => {});
    }
  }, [creators.length, seedCreators]);

  const filtered = creators.filter((c) => {
    if (selectedCategory && c.category !== selectedCategory) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.bio.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="size-6 text-[#FFB59A]" /> Creator Marketplace
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Browse 100K+ AI creators for your next campaign</p>
        </div>
        <Button className="bg-[#FFB59A] hover:bg-[#E09A7A] text-[#0A0A0F] font-semibold">
          <Briefcase className="size-4 mr-1.5" /> New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Creators", value: "100K+", icon: Users, color: "#FFB59A" },
          { label: "Active Campaigns", value: "2.4K", icon: Briefcase, color: "#C4A1FF" },
          { label: "Avg Rating", value: "4.8", icon: Star, color: "#FFD700" },
          { label: "Trending", value: "+12%", icon: TrendingUp, color: "#00D4AA" },
        ].map((s) => (
          <div key={s.label} className="bg-[#12121A] rounded-xl border border-[rgba(255,255,255,0.06)] p-4">
            <div className="flex items-center gap-2 mb-1">
              <s.icon className="size-4" style={{ color: s.color }} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <span className="text-xl font-bold">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creators by name, skill, or category..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#12121A] rounded-xl border border-[rgba(255,255,255,0.08)] text-sm outline-none focus:border-[#FFB59A]/40 placeholder:text-muted-foreground"
          />
        </div>
        <Button variant="outline" className="border-[rgba(255,255,255,0.08)] hover:bg-[#1A1A24]">
          <Filter className="size-4 mr-1.5" /> Filter
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            !selectedCategory ? "bg-[#FFB59A] text-[#0A0A0F]" : "bg-[#1A1A24] text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.name ? "bg-[#FFB59A] text-[#0A0A0F]" : "bg-[#1A1A24] text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.emoji} {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* Creator Grid */}
      {filtered.length === 0 ? (
        <div className="bg-[#12121A] rounded-xl border border-[rgba(255,255,255,0.06)] p-12 text-center">
          <Sparkles className="size-8 text-[#FFB59A] mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Loading creators...</h3>
          <p className="text-muted-foreground text-sm">AI creators are being generated for your marketplace.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((creator) => (
            <CreatorCard key={creator._id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  );
}
