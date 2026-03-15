"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight,
  Search,
  BarChart3,
  Share2,
  FileText,
  Globe,
  MessageSquare,
  Rocket,
  Zap,
  Target,
  Users,
  LineChart,
  TrendingUp,
  ClipboardList,
  LucideIcon
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const iconMap: Record<string, LucideIcon> = {
  Search,
  BarChart3,
  Share2,
  FileText,
  Globe,
  MessageSquare,
  Rocket,
  Zap,
  Target,
  Users,
  LineChart,
  TrendingUp,
  ClipboardList,
};

export default function DynamicServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [pageData, setPageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const contentInView = useInView(contentRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const path = `/services/${slug}`;
        const res = await fetch(`/api/content?path=${path}`, { cache: "no-store" });
        const data = await res.json();
        setPageData(data);
      } catch (error) {
        console.error("Error fetching service content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) fetchContent();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#be1e2e] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!pageData || !pageData.sections || pageData.sections.length === 0) {
    return (
      <main className="min-h-screen bg-white font-sans">
        <Header />
        <section className="pt-44 pb-24 px-6 text-center">
          <h1 className="text-4xl font-black mb-4">Page Not Found</h1>
          <p className="text-black/40 mb-8">The service you looking for does not exist.</p>
          <Button asChild className="bg-[#be1e2e]">
            <Link href="/services">Back to Services</Link>
          </Button>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />

      {/* ─── Dynamic Sections ─── */}
      {pageData.sections.map((section: any, idx: number) => {
        if (section.type === "hero") {
          return (
            <section
              key={section.sectionId}
              ref={heroRef}
              className="relative pt-44 pb-24 px-6 overflow-hidden bg-black"
            >
              {/* Background Elements */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#be1e2e]/20 via-black to-[#0a0a0a]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
                
                {/* Animated Blobs */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#be1e2e]/20 rounded-full blur-[120px] animate-blob" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#be1e2e]/10 rounded-full blur-[150px] animate-blob animation-delay-2000" />
              </div>

              <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                  <motion.div
                    initial={{ opacity: 1, x: 0 }} // Visible on load
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 text-center lg:text-left"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#be1e2e]" />
                      <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">
                        {section.subtitle || "Online Strikers"}
                      </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-6">
                      {section.title.split(' ').map((word: string, i: number) => 
                        i === section.title.split(' ').length - 1 ? 
                        <span key={i} className="text-gradient-primary">{word}</span> : 
                        word + ' '
                      )}
                    </h1>

                    <p className="text-white/50 text-lg font-bold max-w-2xl lg:mx-0 mx-auto mb-10 leading-relaxed">
                      {section.content}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Button
                        asChild
                        className="bg-[#be1e2e] text-white px-10 py-6 rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-[#a01824] transition-all shadow-xl shadow-[#be1e2e]/20 group"
                      >
                        <Link href="/contact" className="flex items-center gap-2">
                          Get Started
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>

                  {section.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="flex-1 w-full max-w-xl relative"
                    >
                      <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 group z-10">
                        <img 
                          src={section.image} 
                          alt={section.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 animate-float"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#be1e2e]/20 via-transparent to-transparent" />
                      </div>
                      
                      {/* Decorative Frame */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[3rem] backdrop-blur-sm -z-10 translate-x-4 translate-y-4" />
                      
                      {/* Floating element */}
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#be1e2e]/20 rounded-full blur-3xl animate-pulse" />
                    </motion.div>
                  )}
                </div>
              </div>
            </section>
          );
        }

        if (section.type === "standard") {
          const isEven = idx % 2 === 0;
          return (section.image ? (
            <section key={section.sectionId} className="py-24 px-6 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto">
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center mb-20`}>
                  {/* Image Column */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 relative"
                  >
                    <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl group">
                      <img 
                        src={section.image} 
                        alt={section.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#be1e2e]/20 to-transparent" />
                    </div>
                    {/* Decorative element */}
                    <div className={`absolute -bottom-6 ${isEven ? '-right-6' : '-left-6'} w-32 h-32 bg-[#be1e2e]/5 rounded-full blur-3xl -z-10`} />
                  </motion.div>

                  {/* Content Column */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex-1"
                  >
                    <div className="flex items-center gap-2 mb-4 text-[#be1e2e]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#be1e2e]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                        {section.subtitle || "Overview"}
                      </span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6 text-black leading-[1.1]">
                      {section.title}
                    </h2>
                    <div className="text-black/50 text-lg leading-relaxed whitespace-pre-line font-medium mb-8">
                      {section.content}
                    </div>
                  </motion.div>
                </div>

                {/* Services Grid */}
                {section.services && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.services.map((service: any, sIdx: number) => {
                      const IconComp = iconMap[service.icon] || CheckCircle2;
                      return (
                        <motion.div
                          key={sIdx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: sIdx * 0.1 }}
                          className="bg-[#F8F9FA] p-8 rounded-3xl border border-gray-100 hover:border-[#be1e2e]/20 transition-all duration-500 hover:shadow-xl group card-glow"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-[#be1e2e]/10 flex items-center justify-center mb-6 group-hover:bg-[#be1e2e] transition-colors duration-500">
                            <IconComp className="w-6 h-6 text-[#be1e2e] group-hover:text-white transition-colors" />
                          </div>
                          <h3 className="text-xl font-black mb-4 tracking-tight text-black">{service.title}</h3>
                          <p className="text-black/40 text-sm leading-relaxed mb-6 font-medium">
                            {service.description}
                          </p>
                          {service.items && (
                            <ul className="space-y-3">
                              {service.items.map((item: string, iIdx: number) => (
                                <li key={iIdx} className="flex items-start gap-3 text-xs font-bold text-black/60">
                                  <div className="w-5 h-5 rounded-full bg-[#be1e2e]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <CheckCircle2 className="w-3 h-3 text-[#be1e2e]" />
                                  </div>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          ) : (
            <section key={section.sectionId} className="py-24 px-6 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto">
                <div className={`flex flex-col ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-16`}>
                  {/* Content Column */}
                  <div className="flex-1">
                    <motion.div
                      variants={scrollRevealVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-2 mb-6 text-[#be1e2e]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#be1e2e]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                          {section.subtitle || "Overview"}
                        </span>
                      </div>
                      <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 text-black leading-[0.95]">
                        {section.title}
                      </h2>
                      <div className="prose prose-lg max-w-none text-black/50 font-medium leading-relaxed mb-12 whitespace-pre-line">
                        {section.content}
                      </div>
                    </motion.div>
                  </div>

                  {/* Image Column (Conditional) */}
                  {section.imageUrl && (
                    <div className="flex-1 w-full">
                      <motion.div
                        variants={scrollRevealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl group"
                      >
                        <img 
                          src={section.imageUrl} 
                          alt={section.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </motion.div>
                    </div>
                  )}
                </div>
                {section.services && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {section.services.map((service: any, sIdx: number) => {
                      const IconComp = iconMap[service.icon] || CheckCircle2;
                      return (
                        <motion.div
                          key={sIdx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: sIdx * 0.1 }}
                          className="bg-[#F8F9FA] p-8 rounded-3xl border border-gray-100 hover:border-[#be1e2e]/20 transition-all duration-500 hover:shadow-xl group card-glow"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-[#be1e2e]/10 flex items-center justify-center mb-6 group-hover:bg-[#be1e2e] transition-colors duration-500">
                            <IconComp className="w-6 h-6 text-[#be1e2e] group-hover:text-white transition-colors" />
                          </div>
                          <h3 className="text-xl font-black mb-4 tracking-tight text-black">{service.title}</h3>
                          <p className="text-black/40 text-sm leading-relaxed mb-6 font-medium">
                            {service.description}
                          </p>
                          {service.items && (
                            <ul className="space-y-3">
                              {service.items.map((item: string, iIdx: number) => (
                                <li key={iIdx} className="flex items-start gap-3 text-xs font-bold text-black/60">
                                  <div className="w-5 h-5 rounded-full bg-[#be1e2e]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <CheckCircle2 className="w-3 h-3 text-[#be1e2e]" />
                                  </div>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          ));
        }

        return null;
      })}

      <Footer />
    </main>
  );
}
