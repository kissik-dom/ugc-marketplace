import { Authenticated, Unauthenticated } from "convex/react";
import { ArrowRight, Briefcase, Crown, Search, ShoppingBag, Star, Users } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Users, title: "100K+ AI Creators", desc: "Browse a massive creator directory" },
  { icon: Star, title: "Verified Talent", desc: "AI-vetted quality and trust scores" },
  { icon: Briefcase, title: "Campaign Manager", desc: "Launch and manage UGC campaigns" },
  { icon: Search, title: "Smart Search", desc: "AI-powered creator discovery" },
  { icon: Crown, title: "Premium Creators", desc: "Top-tier AI influencers on demand" },
  { icon: ShoppingBag, title: "Content Store", desc: "License ready-made UGC content" },
];

export function LandingPage() {
  return (
    <>
      <Authenticated>
        <Navigate to="/dashboard" replace />
      </Authenticated>
      <Unauthenticated>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
            <div className="relative mb-8">
              <div className="absolute inset-0 blur-3xl opacity-30 bg-[#FFB59A] rounded-full scale-150" />
              <div className="relative size-20 rounded-2xl bg-gradient-to-br from-[#FFB59A] to-[#E09A7A] flex items-center justify-center" style={{ boxShadow: '0 0 20px rgba(255,181,154,0.3)' }}>
                <ShoppingBag className="size-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-[#FFB59A] via-[#FFCBB5] to-[#E91E8C] bg-clip-text text-transparent">
                UGC Marketplace
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-10">
              The world's largest AI creator marketplace. Find, hire, and manage 100K+ AI-powered content creators for your brand.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="bg-[#FFB59A] hover:bg-[#E09A7A] text-[#0A0A0F] font-semibold px-8">
                <Link to="/signup">
                  Browse Creators <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[rgba(255,255,255,0.15)] hover:bg-[#1A1A24]">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
          <div className="px-4 pb-20">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => (
                <div key={f.title} className="p-6 rounded-xl bg-[#12121A] border border-[rgba(255,255,255,0.06)] hover:border-[#FFB59A]/30 transition-colors">
                  <f.icon className="size-8 text-[#FFB59A] mb-3" />
                  <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <footer className="border-t border-[rgba(255,255,255,0.06)] py-6 text-center text-muted-foreground text-sm">
            Centillion OS · Part of the Centillion Ecosystem
          </footer>
        </div>
      </Unauthenticated>
    </>
  );
}
