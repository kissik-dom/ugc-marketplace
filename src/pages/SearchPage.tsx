import {
  ArrowRight,
  Filter,
  Search,
  SlidersHorizontal,
  Star,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CATEGORIES = ["All", "Fashion", "Photography", "Video", "Music", "Writing", "Design", "Marketing", "Tech"];
const PRICE_RANGES = ["Any", "$0-50/hr", "$50-100/hr", "$100-200/hr", "$200+/hr"];
const RATINGS = ["Any", "4.5+", "4.0+", "3.5+"];

interface SearchResult {
  id: string;
  name: string;
  handle: string;
  category: string;
  rating: number;
  completedJobs: number;
  hourlyRate: number;
  skills: string[];
  isAI: boolean;
  isVerified: boolean;
  bio: string;
}

const ALL_CREATORS: SearchResult[] = [
  { id: "1", name: "Luna Creative", handle: "luna_c", category: "Fashion", rating: 4.9, completedJobs: 48, hourlyRate: 85, skills: ["Photography", "Styling", "Reels", "Branding"], isAI: true, isVerified: true, bio: "Fashion content creator specializing in luxury brands and editorial shoots" },
  { id: "2", name: "AfroShot Studios", handle: "afroshot", category: "Photography", rating: 4.8, completedJobs: 72, hourlyRate: 120, skills: ["Portrait", "Product", "Drone", "Event"], isAI: false, isVerified: true, bio: "Professional photography studio covering portraits, products, and aerial" },
  { id: "3", name: "Beat Machine", handle: "beat_m", category: "Music", rating: 4.7, completedJobs: 35, hourlyRate: 65, skills: ["Beat Making", "Mixing", "Audio Engineering"], isAI: true, isVerified: false, bio: "AI-powered music production and beat creation" },
  { id: "4", name: "Visual Story", handle: "v_story", category: "Video", rating: 4.9, completedJobs: 91, hourlyRate: 150, skills: ["Videography", "Editing", "Motion Graphics", "Color Grade"], isAI: false, isVerified: true, bio: "Award-winning videographer with focus on cinematic storytelling" },
  { id: "5", name: "Copy Queen", handle: "copyq", category: "Writing", rating: 4.6, completedJobs: 56, hourlyRate: 55, skills: ["Copywriting", "SEO", "Script Writing", "Blog"], isAI: true, isVerified: true, bio: "Compelling copy that converts. SEO-optimized content for any platform" },
  { id: "6", name: "Design Pro", handle: "designpro", category: "Design", rating: 4.8, completedJobs: 44, hourlyRate: 95, skills: ["UI/UX", "Branding", "Logo", "Print"], isAI: false, isVerified: true, bio: "Full-service design studio for digital and print" },
  { id: "7", name: "Social Guru", handle: "social_g", category: "Marketing", rating: 4.5, completedJobs: 38, hourlyRate: 75, skills: ["Social Media", "Strategy", "Analytics", "Ads"], isAI: true, isVerified: false, bio: "Social media management and growth strategies" },
  { id: "8", name: "Code Artist", handle: "code_art", category: "Tech", rating: 4.7, completedJobs: 29, hourlyRate: 130, skills: ["Web Dev", "React", "API", "Mobile"], isAI: false, isVerified: true, bio: "Full-stack developer building beautiful, performant web applications" },
  { id: "9", name: "Pixel Perfect", handle: "pixel_p", category: "Design", rating: 4.4, completedJobs: 22, hourlyRate: 70, skills: ["Illustration", "Icon", "Animation"], isAI: true, isVerified: false, bio: "Digital illustration and custom icon sets" },
  { id: "10", name: "Sound Wave", handle: "soundw", category: "Music", rating: 4.6, completedJobs: 41, hourlyRate: 80, skills: ["Podcast", "Voice Over", "Sound Design"], isAI: false, isVerified: true, bio: "Professional audio production for podcasts and voice-over" },
];

const RECENT_SEARCHES = ["fashion creator", "video editor", "beat maker", "SEO writer", "drone photographer"];

export function SearchPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState("Any");
  const [ratingFilter, setRatingFilter] = useState("Any");

  const filtered = ALL_CREATORS.filter((c) => {
    const matchesSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) || c.bio.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "All" || c.category === activeCategory;
    const matchesRating = ratingFilter === "Any" || c.rating >= parseFloat(ratingFilter.replace("+", ""));
    return matchesSearch && matchesCat && matchesRating;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
        <Search className="size-6 text-[#FFB59A]" /> Search
      </h1>
      <p className="text-muted-foreground text-sm mb-6">Find the perfect creator for your project</p>

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, skill, or keyword..." className="pl-10 bg-[#12121A] border-[rgba(255,255,255,0.06)] h-11" />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white">
              <X className="size-4" />
            </button>
          )}
        </div>
        <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className={`border-[rgba(255,255,255,0.1)] ${showFilters ? "bg-[#FFB59A]/10 border-[#FFB59A]/30 text-[#FFB59A]" : ""}`}>
          <SlidersHorizontal className="size-4 mr-1.5" /> Filters
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? "bg-[#FFB59A] text-[#0A0A0F]" : "bg-[#12121A] border border-[rgba(255,255,255,0.06)] text-muted-foreground hover:text-white hover:border-[#FFB59A]/30"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Advanced filters */}
      {showFilters && (
        <div className="bg-[#12121A] rounded-xl border border-[rgba(255,255,255,0.06)] p-4 mb-4 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Price Range</label>
            <div className="flex flex-wrap gap-1.5">
              {PRICE_RANGES.map((p) => (
                <button key={p} onClick={() => setPriceRange(p)} className={`px-3 py-1 rounded-lg text-xs ${priceRange === p ? "bg-[#FFB59A] text-[#0A0A0F]" : "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-muted-foreground"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Minimum Rating</label>
            <div className="flex flex-wrap gap-1.5">
              {RATINGS.map((r) => (
                <button key={r} onClick={() => setRatingFilter(r)} className={`px-3 py-1 rounded-lg text-xs ${ratingFilter === r ? "bg-[#FFB59A] text-[#0A0A0F]" : "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-muted-foreground"}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent searches */}
      {!search && (
        <div className="mb-6">
          <h3 className="text-xs font-medium text-muted-foreground mb-2">Recent Searches</h3>
          <div className="flex flex-wrap gap-2">
            {RECENT_SEARCHES.map((s) => (
              <button key={s} onClick={() => setSearch(s)} className="px-3 py-1.5 rounded-lg bg-[#12121A] border border-[rgba(255,255,255,0.06)] text-xs text-muted-foreground hover:text-white hover:border-[#FFB59A]/30 transition-colors flex items-center gap-1.5">
                <Search className="size-3" /> {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <p className="text-sm text-muted-foreground mb-3">{filtered.length} creators found</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.map((creator) => (
          <div key={creator.id} className="bg-[#12121A] rounded-xl border border-[rgba(255,255,255,0.06)] p-4 hover:border-[#FFB59A]/15 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="size-12 rounded-xl bg-gradient-to-br from-[#FFB59A]/20 to-[#E09A7A]/20 border border-[#FFB59A]/20 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-[#FFB59A]">{creator.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-semibold text-sm truncate">{creator.name}</span>
                  {creator.isVerified && <span className="text-[#FFB59A] text-xs">✓</span>}
                  {creator.isAI && <span className="text-[8px] px-1 py-0.5 rounded-full bg-[#FFB59A]/10 text-[#FFB59A] font-medium">AI</span>}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{creator.bio}</p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="flex items-center gap-1 text-yellow-400"><Star className="size-3 fill-current" /> {creator.rating}</span>
                  <span className="text-muted-foreground">{creator.completedJobs} jobs</span>
                  <span className="font-medium text-[#FFB59A]">${creator.hourlyRate}/hr</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {creator.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.03)] text-[10px] text-muted-foreground">{skill}</span>
                  ))}
                  {creator.skills.length > 3 && <span className="text-[10px] text-muted-foreground">+{creator.skills.length - 3}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
