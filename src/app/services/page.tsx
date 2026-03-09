"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"

interface Service {
  id: number
  title: string
  image: string
}

interface Stat {
  label: string
  value: string
}

export default function ServicesPage() {
  const [pageData, setPageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content?path=/services", { cache: "no-store" });
        const data = await res.json();
        setPageData(data);
      } catch (error) {
        console.error("Error fetching services content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const heroSection = pageData?.sections?.find((s: any) => s.type === "hero");
  const servicesSection = pageData?.sections?.find((s: any) => s.services);
  const statsSection = pageData?.sections?.find((s: any) => s.stats);

  const services: Service[] = servicesSection?.services || [];
  const stats: Stat[] = statsSection?.stats || [];
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
            className="text-5xl md:text-7xl lg:text-8xl font-black text-black tracking-tighter mb-4"
          >
            {heroSection?.title || "Our Services"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            {heroSection?.subtitle || "Looking For Strategic Web"}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-[0.85/1] overflow-hidden rounded-xl cursor-pointer shadow-lg"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-6 left-6 pr-4">
                  <h3 className="text-xl font-black text-white leading-tight">
                    {service.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Stats Bar */}
      <section className="py-20 px-6 bg-[#0B1120] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 text-center text-white">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-3 tracking-tighter hover:text-[#be1e2e] transition-colors">
                  {stat.value}
                </div>
                <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}