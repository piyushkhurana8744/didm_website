"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import Testimonials from "@/components/Testimonials";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [pageData, setPageData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content?path=/", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setPageData(data);
        }
      } catch (error) {
        console.error("Error fetching page content:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchContent();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Extract section data
  const heroSection = pageData?.sections?.find((s: any) => s.type === "hero");
  const statsSection = pageData?.sections?.find((s: any) => s.type === "features" || (s.type === "standard" && s.title?.includes("Results")));
  const whyChooseSection = pageData?.sections?.find((s: any) => s.type === "standard" && s.subtitle?.includes("Why Choose Us"));
  const processSection = pageData?.sections?.find((s: any) => s.type === "standard" && s.subtitle?.includes("Work Process"));
  const testimonialsSection = pageData?.sections?.find((s: any) => s.type === "standard" && s.subtitle?.includes("Testimonials"));
  const blogSection = pageData?.sections?.find((s: any) => s.type === "standard" && s.subtitle?.includes("Blog"));

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <Hero content={heroSection} />
      <StatsSection content={statsSection} />
      <WhyChooseUs content={whyChooseSection} />
      <ProcessSection content={processSection} />
      
      {/* Render any additional dynamic sections */}
      {pageData?.sections?.filter((s: any) => 
        !["hero", "features"].includes(s.type) && 
        !s.subtitle?.includes("Why Choose Us") && 
        !s.title?.includes("Results") &&
        !s.subtitle?.includes("Work Process") &&
        !s.subtitle?.includes("Testimonials") &&
        !s.subtitle?.includes("Blog")
      ).map((section: any) => (
        <section key={section.sectionId} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
            <p className="text-lg text-gray-600 mb-8">{section.content}</p>
            {section.imageUrl && <img src={section.imageUrl} alt={section.title} className="rounded-2xl shadow-xl max-w-2xl" />}
          </div>
        </section>
      ))}

      <Testimonials content={testimonialsSection} />
      <BlogSection content={blogSection} />
      <Footer />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-[#be1e2e] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50 transform hover:-translate-y-1 group"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="m18 15-6-6-6 6" />
            </motion.svg>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
