"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    number: "1",
    title: "Proven Track Record",
    description: "Hundreds Of Successful Campaigns And Satisfied Clients.",
  },
  {
    number: "2",
    title: "Custom Strategies",
    description: "Tailored SEO And Marketing Plans That Align With Your Unique Goals.",
  },
  {
    number: "3",
    title: "Expert Team",
    description: "Certified Professionals With Extensive Industry Experience.",
  },
  {
    number: "4",
    title: "Clear Reporting",
    description: "Detailed Reports To Keep You Informed Every Step Of The Way.",
  },
];

// Slow, smooth scroll-triggered animations
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
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1]
    },
  },
};

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="py-24 bg-white text-black overflow-hidden border-t border-gray-50"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tighter mb-0 max-w-xl">
              Right Choice <span className="text-primary italic">for Your Business</span>
            </h2>
          </motion.div>

          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Button className="bg-[#be1e2e] text-white px-8 py-6 rounded-full font-black shadow-xl hover:bg-[#a01824] transition-all duration-300 transform hover:scale-105">
              Work With Us
            </Button>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image */}
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1 relative w-full aspect-square max-w-[500px]"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="rounded-[32px] overflow-hidden shadow-2xl relative z-10 w-full h-full grayscale hover:grayscale-0 transition-all duration-700 card-glow"
            >
              <Image
                src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop"
                alt="Why Choose Us"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Reasons Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="group"
              >
                <Card className="bg-[#F8F9FA] rounded-[32px] border border-gray-100 transition-all duration-500 hover:bg-white hover:border-primary/20 hover:shadow-lg card-glow h-full">
                  <CardContent className="p-8">
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary font-black mb-6 shadow-sm border border-gray-50 uppercase text-xs"
                    >
                      0{reason.number}
                    </motion.div>
                    <h3 className="text-xl font-black mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-black/40 font-medium leading-relaxed text-sm">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
