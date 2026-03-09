"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
}

export default function TeamPage() {
  const [pageData, setPageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content?path=/team", { cache: "no-store" });
        const data = await res.json();
        setPageData(data);
      } catch (error) {
        console.error("Error fetching team content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const heroSection = pageData?.sections?.find((s: any) => s.type === "hero");
  const teamSection = pageData?.sections?.find((s: any) => s.teamMembers);
  const teamMembers: TeamMember[] = teamSection?.teamMembers || [];

  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 relative overflow-hidden bg-[#F8F9FA]">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#be1e2e]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-4"
          >
            {heroSection?.title || "Our Team Member"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            {heroSection?.subtitle || "Home / Our Team Member"}
          </motion.p>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 4) * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[1/1.1] rounded-[2rem] overflow-hidden mb-6 bg-[#be1e2e]/5 flex items-end justify-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Mini Footer Bar */}
                <div className="w-full bg-black py-4 px-10 flex flex-col md:flex-row justify-between items-center text-white relative z-20 border-t border-white/5 shrink-0">
                  <p className="text-[8px] font-black opacity-40 uppercase tracking-widest leading-none">© 2025 ONLINE STRIKERS INC. ALL RIGHTS RESERVED.</p>
                </div>
                <div className="flex items-start justify-between px-2">
                  <div>
                    <h4 className="text-xl font-black text-black mb-1 group-hover:text-[#be1e2e] transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-black/30 text-[10px] font-black uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                  <button className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-[#be1e2e] group-hover:bg-[#be1e2e] group-hover:text-white transition-all shadow-sm">
                    <span className="text-2xl font-black leading-none">+</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-20 flex justify-center items-center gap-4">
            <button className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:text-[#be1e2e] hover:border-[#be1e2e] hover:bg-[#be1e2e]/5 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <button className="w-12 h-12 rounded-full bg-[#be1e2e] text-white font-black text-sm flex items-center justify-center shadow-lg shadow-[#be1e2e]/20">01</button>
              <button className="w-12 h-12 rounded-full border border-black/5 text-black font-black text-sm flex items-center justify-center hover:bg-gray-50 transition-colors">02</button>
              <span className="text-black/40 font-black px-2">...</span>
              <button className="w-12 h-12 rounded-full border border-black/5 text-black font-black text-sm flex items-center justify-center hover:bg-gray-50 transition-colors">12</button>
            </div>
            <button className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:text-[#be1e2e] hover:border-[#be1e2e] hover:bg-[#be1e2e]/5 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}