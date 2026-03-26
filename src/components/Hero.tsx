"use client"

import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { ArrowRight, Search, Zap, Globe } from "lucide-react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  },
}

interface HeroProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    ctaText?: string;
    ctaLink?: string;
    stats?: Array<{ value: string; label: string }>;
  }
}

export default function Hero({ content }: HeroProps) {
  const displayTitle = content?.title || "Digital Marketing Agency";
  const displaySubtitle = content?.subtitle || "Online Strikers";
  const displayDescription = content?.description || "Online Strikers is a results-driven digital marketing agency that helps businesses build a powerful online presence using modern marketing strategies, creative campaigns, and data-driven insights.";
  const displayImageUrl = content?.imageUrl || "/images/hero.png";
  const displayCtaText = content?.ctaText || "Audit Your Website";
  const displayStats = content?.stats || [
    { value: "24+", label: "Projects Done" },
    { value: "11k+", label: "Happy Clients" },
    { value: "10k+", label: "Global Reach" },
  ];

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-black text-white overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#be1e2e]/20 via-black to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Animated Blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#be1e2e]/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#be1e2e]/10 rounded-full blur-[150px] animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial="visible" // Set to visible by default or with a very quick animation to avoid "empty" look
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="space-y-6"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#be1e2e]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#be1e2e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#be1e2e]"></span>
            </span>
            {displaySubtitle}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter"
          >
            {displayTitle === "Digital Marketing Agency" ? (
              <>Digital <span className="text-gradient-primary">Marketing</span> <br /> Agency</>
            ) : displayTitle}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-white/50 text-lg md:text-xl font-medium max-w-xl leading-relaxed"
          >
            {displayDescription}
          </motion.p>

          {/* Audit Form / CTA */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <div className="flex-1 max-w-md relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Globe className="w-4 h-4 text-white/30 group-focus-within:text-[#be1e2e] transition-colors" />
              </div>
              <Input
                placeholder="Enter your website URL"
                className="bg-white/5 border-white/10 focus:border-[#be1e2e]/50 py-6 pl-12 rounded-2xl text-white placeholder:text-white/20"
              />
            </div>
            <Button className="bg-[#be1e2e] hover:bg-[#a01824] text-white py-6 px-8 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#be1e2e]/20 group">
              {displayCtaText}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-8 pt-8 border-t border-white/5"
          >
            {displayStats.map((item, i) => (
              <div key={i} className="flex flex-col">
                <h3 className="text-3xl font-black tracking-tight">{item.value}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e] opacity-70">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE/ASSET */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:flex justify-center items-center"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#be1e2e]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#be1e2e]/10 rounded-full blur-3xl" />
          
          <div className="relative w-full max-w-lg aspect-square">
            {/* Glossy Frame */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[3rem] backdrop-blur-sm z-0" />
            
            <div className="absolute inset-4 rounded-[2.5rem] overflow-hidden shadow-2xl z-10">
              <Image
                src={displayImageUrl}
                alt="Hero Image"
                fill
                priority
                className="object-cover animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl z-20 shadow-xl"
            >
              <Zap className="w-6 h-6 text-[#be1e2e] mb-1" />
              <div className="text-[8px] font-black uppercase tracking-widest">Fast Rank</div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl z-20 shadow-xl"
            >
              <Search className="w-6 h-6 text-[#be1e2e] mb-1" />
              <div className="text-[8px] font-black uppercase tracking-widest">SEO Optimized</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}