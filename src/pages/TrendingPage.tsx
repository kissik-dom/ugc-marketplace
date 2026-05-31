import {
  ArrowUp,
  Award,
  BarChart3,
  Crown,
  Eye,
  Flame,
  Heart,
  Star,
  TrendingUp,
  Trophy,
  User,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrendingCreator {
  rank: number;
  name: string;
  handle: string;
  category: string;
  rating: number;
  earnings: string;
  growth: string;
  completedJobs: number;
  isAI: boolean;
  isVerified: boolean;
}

const TRENDING_CREATORS: TrendingCreator[] = [
  { rank: 1, name: "Visual Story", handle: "v_story", category: "Video", rating: 4.9, earnings: "$24,500", growth: "+45%", completedJobs: 91, isAI: false, isVerified: true },
  { rank: 2, name: "Luna Creative", handle: "luna_c", category: "Fashion", rating: 4.9, earnings: "$18,200", growth: "+38%", completedJobs: 48, isAI: true, isVerified: true },
  { rank: 3, name: "AfroShot Studios", handle: "afroshot", category: "Photography", rating: 4.8, earnings: "$15,800", growth: "+32%", completedJobs: 72, isAI: false, isVerified: true },
  { rank: 4, name: "Beat Machine", handle: "beat_m", category: "Music", rating: 4.7, earnings: "$12,100", growth: "+28%", completedJobs: 35, isAI: true, isVerified: false },
  { rank: 5, name: "Copy Queen", handle: "copyq", category: "Writing", rating: 4.6, earnings: "$9,800", growth: "+22%", completedJobs: 56, isAI: true, isVerified: true },
  { rank: 6, name: "Design Pro", handle: "designpro", category: "Design", rating: 4.8, earnings: "$8,400", growth: "+19%", completedJobs: 44, isAI: false, isVerified: true },
  { rank: 7, name: "Social Guru", handle: "social_g", category: "Marketing", rating: 4.5, earnings: "$7,200", growth: "+15%", completedJobs: 38, isAI: true, isVerified: false },
  { rank: 8, name: "Code Artist", handle: "code_art", category: "Tech", rating: 4.7, earnings: "$6,900", growth: "+12%", completedJobs: 29, isAI: false, isVerified: true },
];

const TRENDING_CATEGORIES = [
  { name: "Fashion", creators: 234, growth: "+42%", color: "#E91E8C" },
  { name: "Video Production", creators: 189, growth: "+38%", color: "#FF4D6A" },
  { name: "Photography", creators: 156, growth: "+25%", color: "#C4A1FF" },
  { name: "Music", creators: 145, growth: "+22%", color: "#FFB59A" },
  { name: "Writing", creators: 132, growth: "+18%", color: "#00D4AA" },
  { name: "Tech", creators: 98, growth: "+15%", color: "#3B82F6" },
];

const STATS = [
  { label: "Active Creators", value: "2,847", change: "+12%", icon: User },
  { label: "Open Campaigns", value: "342", change: "+8%", icon: Zap },
  { label: "Total Earnings", value: "$1.2M", change: "+24%", icon: BarChart3 },
  { label: "Completed Jobs", value: "4,521", change: "+18%", icon: Award },
];

export function TrendingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
        <TrendingUp className="size-6 text-[#FFB59A]" /> Trending
      </h1>
      <p className="text-muted-foreground text-sm mb-6">
        Top creators, rising stars, and marketplace insights
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-[#12121A] rounded-xl border border-[rgba(255,255,255,0.06)] p-4">
            <stat.icon className="size-5 text-[#FFB59A] mb-2" />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <span className="text-xs text-green-400 font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <div className="lg:col-span-2">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Trophy className="size-4 text-[#FFD700]" /> Creator Leaderboard
          </h2>
          <div className="space-y-2">
            {TRENDING_CREATORS.map((creator) => (
              <div key={creator.rank} className="bg-[#12121A] rounded-xl border border-[rgba(255,255,255,0.06)] p-4 hover:border-[#FFB59A]/15 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className={`text-lg font-bold w-8 text-center ${creator.rank === 1 ? "text-[#FFD700]" : creator.rank === 2 ? "text-gray-400" : creator.rank === 3 ? "text-amber-600" : "text-muted-foreground"}`}>
                    #{creator.rank}
                  </span>
                  <div className="size-10 rounded-full bg-gradient-to-br from-[#FFB59A]/20 to-[#E09A7A]/20 border border-[#FFB59A]/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-[#FFB59A]">{creator.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{creator.name}</span>
                      {creator.isVerified && <span className="text-[#FFB59A] text-xs">✓</span>}
                      {creator.isAI && <span className="text-[8px] px-1 py-0.5 rounded-full bg-[#FFB59A]/10 text-[#FFB59A] font-medium">AI</span>}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>@{creator.handle}</span>
                      <span>·</span>
                      <span>{creator.category}</span>
                      <span className="flex items-center gap-0.5 text-yellow-400"><Star className="size-3 fill-current" /> {creator.rating}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-semibold text-[#FFB59A]">{creator.earnings}</span>
                    <div className="flex items-center gap-1 justify-end text-xs text-green-400">
                      <ArrowUp className="size-3" /> {creator.growth}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-[#12121A] rounded-xl border border-[rgba(255,255,255,0.06)] p-4">
            <h3 className="font-semibold text-sm flex items-center gap-2 mb-3">
              <Flame className="size-4 text-orange-400" /> Hot Categories
            </h3>
            <div className="space-y-3">
              {TRENDING_CATEGORIES.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between cursor-pointer hover:bg-[#1A1A24] p-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <div>
                      <span className="text-sm font-medium">{cat.name}</span>
                      <p className="text-xs text-muted-foreground">{cat.creators} creators</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-400 font-medium">{cat.growth}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#FFB59A]/10 to-[#E09A7A]/5 rounded-xl border border-[#FFB59A]/10 p-4">
            <Crown className="size-6 text-[#FFD700] mb-2" />
            <h3 className="font-semibold text-sm mb-1">Creator of the Month</h3>
            <p className="text-xs text-muted-foreground mb-3">Visual Story earned the top spot with 91 completed jobs and a 4.9 rating.</p>
            <Button size="sm" className="bg-[#FFB59A] hover:bg-[#E09A7A] text-[#0A0A0F] h-8 text-xs">
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
