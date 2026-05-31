import {
  Bookmark,
  BookmarkX,
  ExternalLink,
  Heart,
  Search,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SavedCreator {
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
  savedAt: string;
}

const SAVED_CREATORS: SavedCreator[] = [
  { id: "1", name: "Luna Creative", handle: "luna_c", category: "Fashion", rating: 4.9, completedJobs: 48, hourlyRate: 85, skills: ["Photography", "Styling", "Reels"], isAI: true, isVerified: true, savedAt: "2 days ago" },
  { id: "2", name: "AfroShot Studios", handle: "afroshot", category: "Photography", rating: 4.8, completedJobs: 72, hourlyRate: 120, skills: ["Portrait", "Product", "Drone"], isAI: false, isVerified: true, savedAt: "3 days ago" },
  { id: "3", name: "Beat Machine", handle: "beat_m", category: "Music", rating: 4.7, completedJobs: 35, hourlyRate: 65, skills: ["Beat Making", "Mixing", "Audio"], isAI: true, isVerified: false, savedAt: "1 week ago" },
  { id: "4", name: "Visual Story", handle: "v_story", category: "Video", rating: 4.9, completedJobs: 91, hourlyRate: 150, skills: ["Videography", "Editing", "Motion"], isAI: false, isVerified: true, savedAt: "1 week ago" },
  { id: "5", name: "Copy Queen", handle: "copyq", category: "Writing", rating: 4.6, completedJobs: 56, hourlyRate: 55, skills: ["Copywriting", "SEO", "Script"], isAI: true, isVerified: true, savedAt: "2 weeks ago" },
];

export function SavedPage() {
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(SAVED_CREATORS.map((c) => c.id));

  const handleUnsave = (id: string) => {
    setSaved(saved.filter((s) => s !== id));
  };

  const filtered = SAVED_CREATORS.filter(
    (c) =>
      saved.includes(c.id) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
        <Bookmark className="size-6 text-[#FFB59A]" /> Saved Creators
      </h1>
      <p className="text-muted-foreground text-sm mb-6">
        Your bookmarked creators for quick access
      </p>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search saved creators..." className="pl-10 bg-[#12121A] border-[rgba(255,255,255,0.06)] h-10" />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#12121A] rounded-xl border border-[rgba(255,255,255,0.06)] p-12 text-center">
          <Bookmark className="size-12 text-[#FFB59A] mx-auto mb-3 opacity-40" />
          <h3 className="text-lg font-semibold mb-1">No saved creators</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Browse the marketplace and bookmark creators you want to work with
          </p>
          <Button className="bg-[#FFB59A] hover:bg-[#E09A7A] text-[#0A0A0F]">
            Browse Creators
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((creator) => (
            <div key={creator.id} className="bg-[#12121A] rounded-xl border border-[rgba(255,255,255,0.06)] p-5 hover:border-[#FFB59A]/15 transition-colors">
              <div className="flex items-start gap-4">
                <div className="size-14 rounded-xl bg-gradient-to-br from-[#FFB59A]/20 to-[#E09A7A]/20 border border-[#FFB59A]/20 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-[#FFB59A]">{creator.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold">{creator.name}</h3>
                    {creator.isVerified && <span className="text-[#FFB59A] text-xs">✓</span>}
                    {creator.isAI && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#FFB59A]/10 text-[#FFB59A] font-medium">AI</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">@{creator.handle} · {creator.category}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1 text-yellow-400"><Star className="size-3.5 fill-current" /> {creator.rating}</span>
                    <span className="text-muted-foreground">{creator.completedJobs} jobs</span>
                    <span className="font-medium text-[#FFB59A]">${creator.hourlyRate}/hr</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {creator.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[10px] text-muted-foreground">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-[10px] text-muted-foreground">Saved {creator.savedAt}</span>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-8 text-xs bg-[#FFB59A] hover:bg-[#E09A7A] text-[#0A0A0F]">
                      <ExternalLink className="size-3 mr-1" /> View
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 text-xs border-[rgba(255,255,255,0.1)]" onClick={() => handleUnsave(creator.id)}>
                      <BookmarkX className="size-3 mr-1" /> Unsave
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
