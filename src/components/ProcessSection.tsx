"use client";

import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Monitoring & Optimization",
    subtitle:
      "Continuous Monitoring And Regular Optimizations To Keep Your Campaigns Effective.",
    features: ["In-Depth Research", "Precision Implementation", "Transparent Reporting"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    number: "02",
    title: "Strategy Development",
    subtitle:
      "Creating Customized Strategies Aligned With Your Business Goals And Target Audience.",
    features: ["Market Analysis", "Competitor Research", "Goal Setting"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  },
  {
    number: "03",
    title: "Implementation & Launch",
    subtitle:
      "Executing Campaigns With Precision And Launching Them Across Multiple Channels.",
    features: ["Multi-Channel Setup", "Content Creation", "Campaign Launch"],
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2069&auto=format&fit=crop",
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

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextStep = () => {
    setDirection(1);
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

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
              <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">
                Our Work Process
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tighter mb-0 max-w-xl">
              Proven Process <span className="text-primary">for Success</span>
            </h2>
          </motion.div>

          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Button
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white px-8 py-6 rounded-full font-black transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevStep}
            className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 z-10 bg-white shadow-sm flex-shrink-0"
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
              <Card className="flex flex-col lg:flex-row items-center gap-12 bg-[#F8F9FA] p-8 lg:p-14 rounded-[40px] border border-gray-50 shadow-sm">
                <CardContent className="flex-1 relative w-full aspect-square max-w-[350px] p-0">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-full h-full rounded-full border-[8px] border-white shadow-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
                  >
                    <Image
                      src={steps[activeStep].image}
                      alt={steps[activeStep].title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </CardContent>

                <CardContent className="flex-1 p-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="text-primary font-black text-xs uppercase tracking-widest mb-4">
                      Step {steps[activeStep].number}
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-lg text-black/50 mb-8 leading-relaxed font-medium">
                      {steps[activeStep].subtitle}
                    </p>
                    <ul className="space-y-4">
                      {steps[activeStep].features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110">
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-lg font-black tracking-tight">{feature}</span>
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextStep}
            className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 z-10 bg-white shadow-sm flex-shrink-0"
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
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > activeStep ? 1 : -1);
                setActiveStep(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeStep ? "bg-primary w-8" : "bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
