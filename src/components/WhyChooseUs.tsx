"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    number: "1",
    title: "Experienced Marketing Professionals",
    description: "Our team consists of digital marketing specialists with experience in SEO, paid advertising, content marketing, and social media growth.",
  },
  {
    number: "2",
    title: "Customized Marketing Strategies",
    description: "Every business has unique goals. We create tailored marketing strategies based on your industry, audience behavior, and business objectives.",
  },
  {
    number: "3",
    title: "Transparent Communication and Reporting",
    description: "We believe in complete transparency. Our detailed performance reports help clients understand campaign progress and marketing impact.",
  },
  {
    number: "4",
    title: "Data-Driven Marketing Approach",
    description: "Our strategies are based on analytics and performance insights, ensuring continuous improvement and better marketing outcomes.",
  },
  {
    number: "5",
    title: "Focus on Long-Term Growth",
    description: "Rather than short-term gains, we focus on sustainable growth strategies that build strong online visibility and brand authority.",
  },
];

const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

interface WhyChooseUsProps {
  content?: {
    title?: string;
    subtitle?: string;
    content?: string;
    imageUrl?: string;
    ctaText?: string;
    reasons?: Array<{ number: string; title: string; description: string }>;
  }
}

export default function WhyChooseUs({ content }: WhyChooseUsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const displayTitle = content?.title || "Why Choose Online Strikers as Your Digital Marketing Partner?";
  const displaySubtitle = content?.subtitle || "Why Choose Us";
  const displayContent = content?.content || "Selecting the right digital marketing agency can significantly impact your business growth. Online Strikers focuses on delivering strategies that generate real results.";
  const displayImageUrl = content?.imageUrl || "/images/why_choose_us_new.png";
  const displayCtaText = content?.ctaText || "Work With Us";
  const displayReasons = content?.reasons || [
    {
      number: "1",
      title: "Experienced Marketing Professionals",
      description: "Our team consists of digital marketing specialists with experience in SEO, paid advertising, content marketing, and social media growth.",
    },
    {
      number: "2",
      title: "Customized Marketing Strategies",
      description: "Every business has unique goals. We create tailored marketing strategies based on your industry, audience behavior, and business objectives.",
    },
    {
      number: "3",
      title: "Transparent Communication and Reporting",
      description: "We believe in complete transparency. Our detailed performance reports help clients understand campaign progress and marketing impact.",
    },
    {
      number: "4",
      title: "Data-Driven Marketing Approach",
      description: "Our strategies are based on analytics and performance insights, ensuring continuous improvement and better marketing outcomes.",
    },
    {
      number: "5",
      title: "Focus on Long-Term Growth",
      description: "Rather than short-term gains, we focus on sustainable growth strategies that build strong online visibility and brand authority.",
    },
  ];

  return (
    <section className="py-24 bg-white text-black overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1"
          >
            <div className="flex items-center gap-2 mb-6 text-primary">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
               {displaySubtitle}
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black leading-[1.1] tracking-tighter mb-4 max-w-xl text-black">
              {displayTitle}
            </h2>
          </motion.div>
          
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
             <Button className="bg-[#be1e2e] text-white rounded-md px-6 py-4 text-[10px] font-black uppercase tracking-wider hover:bg-[#a01824] transition-all">
              {displayCtaText}
            </Button>
          </motion.div>
        </div>

        {/* Content Layout */}
        <div className="space-y-16">
          {/* Top: Large Image */}
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={displayImageUrl}
              alt="Workspace"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Bottom: Reasons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex flex-col gap-4">
                  <div className="text-primary font-black text-xs uppercase tracking-widest">
                    {reason.number}. {reason.title}
                  </div>
                  <p className="text-black/40 font-medium text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
