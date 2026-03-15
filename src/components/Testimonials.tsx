"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const scrollRevealVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 80 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.4, 0.25, 1]
    },
  },
};

interface TestimonialsProps {
  content?: {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    imageUrl?: string;
    items?: Array<{
      name: string;
      role: string;
      content: string;
      image: string;
      isPrimary?: boolean;
    }>;
  };
}

export default function Testimonials({ content }: TestimonialsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const displayTitle = content?.title || "Success Through Clients' Words";
  const displaySubtitle = content?.subtitle || "Testimonials";
  const displayCtaText = content?.ctaText || "View All Review";
  const displayFeaturedImage = content?.imageUrl || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop";
  const displayTestimonials = content?.items || [
    {
      name: "Sarah M",
      role: "Store Owner",
      content: "DIDM Transformed Our Career Trajectory. The Hands-On Training Was Exceptional!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      isPrimary: false,
    },
    {
      name: "John Doe",
      role: "SEO Manager",
      content: "The Faculty At DIDM Is Proactive, Professional, And Results-Driven. Highly Recommend!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      isPrimary: true,
    },
    {
      name: "Alex Hales",
      role: "Business Owner",
      content: "Thanks To DIDM, I Landed My Dream Job In Digital Marketing Within 3 Months.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
      isPrimary: false,
    },
  ];

  return (
    <section
      className="py-24 bg-white text-black overflow-hidden border-t border-gray-50"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40">
                {displaySubtitle}
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter mb-0 max-w-xl text-black">
              {displayTitle.includes("Clients' Words") ? (
                <>
                  {displayTitle.split("Clients' Words")[0]} <br /> <span className="text-primary italic">Clients' Words</span>
                </>
              ) : (
                displayTitle
              )}
            </h2>
          </motion.div>

          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Button className="bg-[#be1e2e] text-white px-8 py-6 rounded-full text-xs font-black uppercase tracking-wider hover:bg-[#a01824] transition-all duration-300 transform hover:scale-105 shadow-xl">
              {displayCtaText}
            </Button>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-[1.2] space-y-4 w-full"
          >
            {displayTestimonials.map((t, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  x: 15,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="group"
              >
                <Card
                  className={`relative p-10 rounded-[40px] border transition-all duration-500 shadow-sm ${
                    t.isPrimary
                      ? "bg-gradient-stats-red text-white border-transparent shadow-2xl"
                      : "bg-[#F8F9FA] border-gray-100 hover:bg-white hover:shadow-lg"
                  }`}
                >
                  <CardContent className="p-0 flex items-center gap-8">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-[4px] border-white/20 flex-shrink-0 transition-transform duration-700 group-hover:scale-110">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-black text-2xl tracking-tight text-black">{t.name}</h4>
                          <p
                            className={`text-[10px] uppercase tracking-[0.25em] font-black ${
                              t.isPrimary ? "text-[#b1ff01]" : "text-primary"
                            }`}
                          >
                            {t.role}
                          </p>
                        </div>
                        <Quote
                          className={`w-10 h-10 opacity-10 ${t.isPrimary ? "text-white" : "text-black"}`}
                        />
                      </div>
                      <p
                        className={`text-lg font-medium leading-relaxed italic ${
                          t.isPrimary ? "text-white/80" : "text-black/60"
                        }`}
                      >
                        "{t.content}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Image */}
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1 lg:flex justify-center hidden"
          >
            <div className="relative w-full max-w-[500px] aspect-[4/5] overflow-hidden rounded-[50px] shadow-2xl group">
              <Image
                src={displayFeaturedImage}
                alt="Success Client"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#b1ff01] rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-black fill-black" />
                  </div>
                  <span className="text-white font-black uppercase tracking-widest text-xs">
                    Trusted Partner
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
