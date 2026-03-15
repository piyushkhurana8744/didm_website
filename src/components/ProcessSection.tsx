"use client";

import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
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

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1]
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1]
    },
  }),
};

interface ProcessSectionProps {
  content?: {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    steps?: Array<{
      number: string;
      title: string;
      subtitle: string;
      features: string[];
      image: string;
    }>;
  };
}

const defaultSteps = [
  // ... (original steps)
];

export default function ProcessSection({ content }: ProcessSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const displayTitle = content?.title || "Our Digital Marketing Process";
  const displaySubtitle = content?.subtitle || "Our Work Process";
  const displayCtaText = content?.ctaText || "Get In Touch";
  const displaySteps = content?.steps || [
    {
      number: "01",
      title: "Business Research and Market Analysis",
      subtitle: "We begin by understanding your business, competitors, target audience, and industry trends to build a solid marketing strategy.",
      features: ["Industry Analysis", "Competitor Research", "Audience Insights"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    },
    {
      number: "02",
      title: "Strategy Development",
      subtitle: "Based on research insights, we create a customized digital marketing strategy that aligns with your business goals.",
      features: ["Custom Roadmap", "Channel Selection", "Goal Setting"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    },
    {
      number: "03",
      title: "Campaign Implementation",
      subtitle: "Our team executes the strategy across multiple digital channels including SEO, PPC, social media, and content marketing.",
      features: ["Multi-Channel Setup", "Content Creation", "Campaign Launch"],
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2069&auto=format&fit=crop",
    },
    {
      number: "04",
      title: "Performance Monitoring and Optimization",
      subtitle: "We continuously track campaign performance, identify opportunities, and optimize strategies for better results.",
      features: ["Real-Time Tracking", "A/B Testing", "Continuous Optimization"],
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    },
    {
      number: "05",
      title: "Reporting and Growth Planning",
      subtitle: "We provide detailed performance reports and develop growth-focused plans to scale your marketing efforts over time.",
      features: ["Monthly Reports", "Growth Insights", "Scalable Plans"],
      image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const nextStep = () => {
    setDirection(1);
    setActiveStep((prev) => (prev + 1) % displaySteps.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setActiveStep((prev) => (prev - 1 + displaySteps.length) % displaySteps.length);
  };

  return (
    <section
      className="py-24 bg-black text-white overflow-hidden border-t border-white/5 relative"
      ref={ref}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 glow-mesh-red opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 glow-mesh-accent opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                {displaySubtitle}
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tighter mb-0 max-w-xl text-white">
              {displayTitle.includes("Success") ? (
                <>
                  {displayTitle.split("Success")[0]} <span className="text-primary">Success</span> {displayTitle.split("Success")[1]}
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
            <Button
              className="bg-primary text-white hover:bg-primary/90 px-8 py-6 rounded-full font-black transition-all duration-300 transform hover:scale-105 shadow-primary"
            >
              {displayCtaText}
            </Button>
          </motion.div>
        </div>

        {/* Process Carousel */}
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative flex items-center justify-between gap-8 max-w-6xl mx-auto"
        >
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "var(--primary)" }}
            whileTap={{ scale: 0.95 }}
            onClick={prevStep}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 z-10 bg-white/5 backdrop-blur-sm shadow-sm flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Content Card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex-1"
            >
              <Card className="flex flex-col lg:flex-row items-center gap-12 bg-white/[0.03] backdrop-blur-xl p-8 lg:p-14 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <CardContent className="flex-1 relative w-full aspect-square max-w-[350px] p-0 z-10">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-full h-full rounded-full border-[8px] border-white/5 shadow-2xl overflow-hidden group/img transition-all duration-700"
                  >
                    <div className="absolute inset-0 z-10 bg-primary/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                    <Image
                      src={displaySteps[activeStep].image}
                      alt={displaySteps[activeStep].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                    />
                    <div className="absolute inset-0 border-[12px] border-black/20 rounded-full z-20 pointer-events-none" />
                  </motion.div>
                  {/* Glow effect behind image */}
                  <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full -z-10 group-hover:bg-primary/30 transition-colors duration-700" />
                </CardContent>

                <CardContent className="flex-1 p-0 z-10 text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">
                        Step {displaySteps[activeStep].number}
                      </span>
                      <div className="h-px w-12 bg-primary/30" />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black mb-6 leading-tight text-white group-hover:text-primary/10 transition-colors duration-700">
                      {displaySteps[activeStep].title}
                    </h3>
                    <p className="text-lg text-white/50 mb-8 leading-relaxed font-medium">
                      {displaySteps[activeStep].subtitle}
                    </p>
                    <ul className="space-y-4">
                      {displaySteps[activeStep].features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-lg font-black tracking-tight text-white/80">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "var(--primary)" }}
            whileTap={{ scale: 0.95 }}
            onClick={nextStep}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 z-10 bg-white/5 backdrop-blur-sm shadow-sm flex-shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Step Indicators */}
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center gap-3 mt-10"
        >
          {displaySteps.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > activeStep ? 1 : -1);
                setActiveStep(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeStep ? "bg-primary w-8" : "bg-white/10 hover:bg-white/20"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
