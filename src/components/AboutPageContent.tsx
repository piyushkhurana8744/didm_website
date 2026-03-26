"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DynamicForm } from "@/components/DynamicForm";

interface AboutPageContentProps {
  pageData: any;
}

export default function AboutPageContent({ pageData }: AboutPageContentProps) {
  const heroSection = pageData?.sections?.find((s: any) => s.type === "hero");
  const aboutSection = pageData?.sections?.find((s: any) => s.type === "about");

  return (
    <>
      <section className="pt-48 pb-20 px-6 relative overflow-hidden bg-[#F8F9FA]">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#be1e2e]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-4"
          >
            {heroSection?.title || "About Us"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            {heroSection?.subtitle || "Home / About Us"}
          </motion.p>
        </div>
      </section>

      {aboutSection && (
        <section className="py-24 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <div className="lg:w-1/2 relative group">
              <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl transform group-hover:rotate-1">
                <img 
                  src={aboutSection.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"} 
                  alt={aboutSection.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute top-10 -left-10 w-full h-full bg-[#be1e2e] -z-10 rounded-[3rem] opacity-5 transform group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="lg:w-1/2 space-y-10">
              <div className="flex items-center gap-2 text-[#be1e2e]">
                 <div className="w-10 h-[2px] bg-[#be1e2e]" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">{aboutSection.subtitle}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-black leading-[0.9] tracking-tighter">
                {aboutSection.title.includes("Scaling") ? (
                  <>Innovative Scaling <br /> <span className="text-[#be1e2e]">Future Business</span></>
                ) : aboutSection.title}
              </h2>
              <p className="text-black/40 font-bold text-lg leading-relaxed max-w-xl">
                {aboutSection.content}
              </p>
              {aboutSection.ctaText && (
                <div className="pt-4">
                   <Button className="bg-[#be1e2e] hover:bg-[#a01824] text-white rounded-full px-12 py-7 h-auto font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-2xl shadow-[#be1e2e]/30">
                    {aboutSection.ctaText} ↗
                   </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {pageData?.sections?.filter((s: any) => !["hero", "about"].includes(s.type)).map((section: any) => (
        <section key={section.sectionId} className="py-24 px-6 bg-white overflow-hidden border-t border-gray-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-2 text-[#be1e2e]">
                 <div className="w-6 h-[2px] bg-[#be1e2e]" />
                 <span className="text-[10px] font-black uppercase tracking-widest">{section.subtitle}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">{section.title}</h2>
              <p className="text-black/40 font-bold leading-relaxed">{section.content}</p>
              {section.ctaText && (
                <Button className="bg-[#be1e2e] text-white rounded-full px-8 py-4 h-auto text-[10px] font-black uppercase tracking-widest">
                  {section.ctaText}
                </Button>
              )}
            </div>
            {(section.imageUrl || section.type === "form") && (
              <div className="flex-1">
                {section.type === "form" ? (
                  <div className="bg-[#F8F9FA] p-10 rounded-[2.5rem] border border-gray-100 shadow-xl">
                    <div className="mb-8">
                      <h3 className="text-2xl font-black tracking-tighter mb-2">{section.title}</h3>
                      <p className="text-black/40 text-sm font-bold">{section.content}</p>
                    </div>
                    <DynamicForm slug={section.formSlug} />
                  </div>
                ) : (
                  <img src={section.imageUrl} alt={section.title} className="rounded-3xl shadow-2xl w-full object-cover" />
                )}
              </div>
            )}
          </div>
        </section>
      ))}
    </>
  );
}
