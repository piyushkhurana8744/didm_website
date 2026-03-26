"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { DynamicForm } from "@/components/DynamicForm"

export default function ContactUsPage() {
  const [pageData, setPageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content?path=/contact");
        const data = await res.json();
        setPageData(data);
      } catch (error) {
        console.error("Error fetching contact content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const heroSection = pageData?.sections?.find((s: any) => s.type === "hero");
  const formSection = pageData?.sections?.find((s: any) => s.type === "standard") || pageData?.sections?.find((s: any) => s.sectionId === "contact_hero");

  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />

      {/* Dynamic Hero Section */}
      <section className="pt-48 pb-20 px-6 relative overflow-hidden bg-[#F8F9FA]">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#be1e2e]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-4"
          >
            {heroSection?.title || "Contact Us"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            {heroSection?.subtitle || "Home / Contact Us"}
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-2 mb-4 text-[#be1e2e]">
                 <Send className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{heroSection?.subtitle || "Contact Us"}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-6 uppercase leading-none">
                {heroSection?.content?.includes(" discuss") ? heroSection.content : "Lets Work Together"}
              </h2>
              <p className="text-black/40 font-bold mb-12 max-w-lg leading-relaxed">
                Ready To Take Your Social Media Presence To The Next Level? Let&apos;s Work Together To Create Impactful Strategies Drive Engagement, Growth, And Success For Your Brand.
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="First Name" className="bg-[#F8F9FA] border-none rounded-full px-8 py-7 h-auto font-bold placeholder:text-black/20 focus:ring-2 focus:ring-[#be1e2e]/50" />
                  <Input placeholder="Last Name" className="bg-[#F8F9FA] border-none rounded-full px-8 py-7 h-auto font-bold placeholder:text-black/20 focus:ring-2 focus:ring-[#be1e2e]/50" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Email Address" className="bg-[#F8F9FA] border-none rounded-full px-8 py-7 h-auto font-bold placeholder:text-black/20 focus:ring-2 focus:ring-[#be1e2e]/50" />
                  <Input placeholder="Phone Number" className="bg-[#F8F9FA] border-none rounded-full px-8 py-7 h-auto font-bold placeholder:text-black/20 focus:ring-2 focus:ring-[#be1e2e]/50" />
                </div>
                <textarea 
                  placeholder="How can we help you?" 
                  className="w-full bg-[#F8F9FA] border-none rounded-[2rem] px-8 py-7 h-48 font-bold placeholder:text-black/20 focus:ring-2 focus:ring-[#be1e2e]/50 resize-none"
                />
                <Button className="bg-[#be1e2e] hover:bg-[#a01824] text-white rounded-full px-12 py-7 h-auto font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-2xl shadow-[#be1e2e]/30">
                  Send Message ↗
                </Button>
              </form>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden">
                <img 
                  src={heroSection?.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800"} 
                  alt="Contact Us" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Sections */}
      {pageData?.sections?.filter((s: any) => s.type !== "hero" && s.type !== "standard").map((section: any) => (
        <section key={section.sectionId} className="py-24 px-6 bg-gray-50 overflow-hidden border-t border-black/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
               <h3 className="text-3xl font-black uppercase tracking-tighter">{section.title}</h3>
               <p className="text-black/40 font-bold leading-relaxed">{section.content}</p>
            </div>
            {(section.imageUrl || section.type === "form") && (
              <div className="flex-1">
                {section.type === "form" ? (
                  <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-xl">
                    <div className="mb-8">
                      <h3 className="text-2xl font-black tracking-tighter mb-2">{section.title}</h3>
                      <p className="text-black/40 text-sm font-bold">{section.content}</p>
                    </div>
                    <DynamicForm slug={section.formSlug} />
                  </div>
                ) : (
                  <img src={section.imageUrl} alt={section.title} className="rounded-3xl shadow-xl w-full h-[300px] object-cover" />
                )}
              </div>
            )}
          </div>
        </section>
      ))}

      <Footer />
    </main>
  )
}
