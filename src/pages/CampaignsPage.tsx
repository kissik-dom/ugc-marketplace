import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Filter,
  MapPin,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STATUSES = ["All", "Open", "In Progress", "Completed", "Draft"];

interface Campaign {
  id: string;
  title: string;
  brand: string;
  description: string;
  budget: string;
  status: "open" | "in_progress" | "completed" | "draft";
  applicants: number;
  category: string;
  deadline: string;
  location: string;
}

const CAMPAIGNS: Campaign[] = [
  { id: "1", title: "Kingdom Fashion Launch", brand: "Royal Fashion House", description: "Looking for 5 creators to showcase our new Royal Collection. High-end fashion content for Instagram and TikTok.", budget: "$5,000", status: "open", applicants: 23, category: "Fashion", deadline: "Jun 15, 2026", location: "Lagos, Nigeria" },
  { id: "2", title: "Centillion Music Promo", brand: "Centillion Music", description: "Need 3 music content creators to promote our new streaming platform. Beat-making tutorials and reaction content.", budget: "$3,500", status: "open", applicants: 18, category: "Music", deadline: "Jun 20, 2026", location: "Remote" },
  { id: "3", title: "AI Technology Series", brand: "Centillion AI", description: "Create a 5-part educational series explaining AI concepts in an engaging, accessible way.", budget: "$8,000", status: "in_progress", applicants: 45, category: "Technology", deadline: "Jul 1, 2026", location: "Remote" },
  { id: "4", title: "Real Estate Showcase", brand: "Kissi Gold", description: "Drone footage and virtual tours of premium island properties. Professional videography required.", budget: "$12,000", status: "open", applicants: 12, category: "Real Estate", deadline: "Jun 30, 2026", location: "Caribbean" },
  { id: "5", title: "Fitness & Wellness", brand: "Royal Wellness", description: "30-day fitness challenge content series. Looking for fitness influencers with 10K+ following.", budget: "$4,000", status: "completed", applicants: 31, category: "Lifestyle", deadline: "May 30, 2026", location: "West Africa" },
  { id: "6", title: "Kingdom Culture Documentary", brand: "Royal Studios", description: "Short-form documentary content about Kissi Kingdom culture, history, and modern life.", budget: "$6,500", status: "draft", applicants: 0, category: "Education", deadline: "Jul 15, 2026", location: "Kissi Kingdom" },
];

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  open: { bg: "bg-green-500/10", text: "text-green-400" },
  in_progress: { bg: "bg-blue-500/10", text: "text-blue-400" },
  completed: { bg: "bg-[#FFB59A]/10", text: "text-[#FFB59A]" },
  draft: { bg: "bg-gray-500/10", text: "text-gray-400" },
};

export function CampaignsPage() {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");

  const filtered = CAMPAIGNS.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = activeStatus === "All" || c.status === activeStatus.toLowerCase().replace(" ", "_");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="size-6 text-[#FFB59A]" /> Campaigns
          </h1>
          <p className="text-muted-foreground text-sm">Browse and manage creator campaigns</p>
        </div>
        <Button className="bg-[#FFB59A] hover:bg-[#E09A7A] text-[#0A0A0F]">
          <Plus className="size-4 mr-1.5" /> New Campaign
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search campaigns..." className="pl-10 bg-[#12121A] border-[rgba(255,255,255,0.06)] h-10" />
        </div>
        <div className="flex gap-1">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => setActiveStatus(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeStatus === s ? "bg-[#FFB59A] text-[#0A0A0F]" : "bg-[#12121A] border border-[rgba(255,255,255,0.06)] text-muted-foreground hover:text-white"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((campaign) => {
          const styles = STATUS_STYLES[campaign.status];
          return (
            <div key={campaign.id} className="bg-[#12121A] rounded-xl border border-[rgba(255,255,255,0.06)] p-5 hover:border-[#FFB59A]/15 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{campaign.title}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${styles.bg} ${styles.text} capitalize`}>
                      {campaign.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-sm text-[#FFB59A]">{campaign.brand}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-[#FFB59A]">{campaign.budget}</span>
                  <p className="text-xs text-muted-foreground">Budget</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{campaign.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1"><Users className="size-3" /> {campaign.applicants} applicants</span>
                <span className="flex items-center gap-1"><Calendar className="size-3" /> {campaign.deadline}</span>
                <span className="flex items-center gap-1"><MapPin className="size-3" /> {campaign.location}</span>
                <span className="px-2 py-0.5 rounded bg-[#FFB59A]/10 text-[#FFB59A] font-medium">{campaign.category}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
