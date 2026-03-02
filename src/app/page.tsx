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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <StatsSection />
      <WhyChooseUs />
      <ProcessSection />
      <Testimonials />
      <BlogSection />
      <Footer />

      {/* Scroll to Top Button with Animation */}
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
