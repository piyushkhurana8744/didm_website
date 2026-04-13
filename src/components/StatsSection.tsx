"use client"

import { motion, useInView, Variants } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Target, Share2, Eye, LucideIcon } from "lucide-react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Target,
  Share2,
  Eye,
}

interface StatsSectionProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    ctaText?: string;
    stats?: Array<{ label: string; description: string; value: string; icon?: string; color?: string }>;
  }
}

export default function StatsSection({ content }: StatsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const displayTitle = content?.title || "The Results Speak for Themselves";
  const displaySubtitle = content?.subtitle || "About Us";
  const displayDescription = content?.description || "With years of experience, we've helped businesses grow online and stay ahead of their competitors. Our results-driven approach ensures that every campaign we manage delivers measurable success.";
  const displayCtaText = content?.ctaText || "Work With Us";
  
  const defaultStats = [
    {
      label: "BOOSTING REVENUE",
      description: "Proven growth results",
      value: "2X to 6X",
      icon: "TrendingUp",
      color: "#be1e2e"
    },
    {
      label: "IMPROVED LEADS",
      description: "Quality lead generation",
      value: "3X to 8X",
      icon: "Target",
      color: "#be1e2e"
    },
    {
      label: "SOCIAL MEDIA ENGAGEMENT",
      description: "Enhanced audience reach",
      value: "4X to 8X",
      icon: "Share2",
      color: "#be1e2e"
    },
    {
      label: "BRAND EXPOSURE",
      description: "Massive visibility boost",
      value: "100 to 1000%",
      icon: "Eye",
      color: "#fbbf24"
    }
  ];

  const displayStats = content?.stats || defaultStats;

  return (
    <section ref={ref} className="bg-[#FBFBFB] py-32 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#be1e2e]/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-[#be1e2e]" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#be1e2e]">
                {displaySubtitle}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.95] text-black mb-8">
               {displayTitle}
            </h2>

            <p className="text-black/50 text-lg font-medium leading-relaxed max-w-2xl">
              {displayDescription}
            </p>
          </div>

          <Button className="bg-[#be1e2e] text-white rounded-full px-10 py-7 h-auto text-xs font-black uppercase tracking-widest hover:bg-[#a01824] transition-all shadow-xl shadow-[#be1e2e]/20 group">
            {displayCtaText}
            <TrendingUp className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </motion.div>

        {/* FEATURE CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon || ""] || TrendingUp;
            
            return (
              <motion.div
                key={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full bg-white rounded-[2.5rem] border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden group">
                  <CardContent className="p-10 flex flex-col h-full">
                    {/* Icon with colored glow */}
                    <div className="mb-10 relative">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundColor: stat.color || "#be1e2e" }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div 
                        className="absolute inset-0 blur-2xl opacity-20 scale-150 rounded-full"
                        style={{ backgroundColor: stat.color || "#be1e2e" }}
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-black/30 mb-4 group-hover:text-[#be1e2e] transition-colors">
                        {stat.label}
                      </h4>
                      <div className="text-3xl md:text-3xl font-black text-black tracking-tighter mb-4 leading-none">
                        {stat.value}
                      </div>
                    </div>

                    <p className="text-black/40 text-sm font-bold leading-relaxed">
                      {stat.description}
                    </p>
                    
                    {/* Subtle decorative accent */}
                    <div className="absolute bottom-0 left-0 w-full h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ backgroundColor: stat.color || "#be1e2e" }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}