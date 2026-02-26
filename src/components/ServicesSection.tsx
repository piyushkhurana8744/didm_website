"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    number: "1",
    title: "Search Engine Optimization (SEO)",
    description:
      "Enhance Your Website's Visibility On Search Engines With Comprehensive SEO Strategies Including Research.",
  },
  {
    number: "2",
    title: "Content Marketing",
    description:
      "Engage Your Audience With High-Quality, Relevant Content That Drives Traffic Fosters Customer.",
  },
  {
    number: "3",
    title: "Pay-Per-Click (PPC) Advertising",
    description:
      "Maximize Your ROI With Targeted PPC Campaigns Designed To Attract The Right Audience Customers.",
  },
  {
    number: "4",
    title: "Social Media Marketing",
    description:
      "Build A Strong Social Media Presence To Connect With Your Audience, Awareness, Engagement.",
  },
  {
    number: "5",
    title: "Website Design & Development",
    description:
      "Create A User-Friendly, Responsive Website That Not Only Looks Great But Also Performs Exceptionally.",
  },
  {
    number: "6",
    title: "Analytics & Reporting",
    description:
      "Gain Insights Into Your Digital Performance Detailed Reporting To Inform Your Strategy & Reporting.",
  },
];

// Scroll animation variants - fade + slide-up reveal
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

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="py-24 bg-[#F0F0F0] text-black overflow-hidden border-t border-gray-50"
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
              <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">
                Our Services
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tighter mb-8 max-w-xl">
              Our Digital Marketing Courses & Services
            </h2>
            <p className="text-lg text-black/50 max-w-lg mb-8 leading-relaxed font-medium">
              At DIDM, We Provide Industry-Leading Digital Marketing Training Designed To Boost Your Career, Build Real Skills, And Maximize Placement Opportunities.
            </p>
            <Button className="bg-[#be1e2e] text-white px-8 py-6 rounded-full font-black hover:bg-[#a01824] transition-all duration-300 transform hover:scale-105">
              View All Services
            </Button>
          </motion.div>

          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop" 
                alt="DIDM Digital Marketing Courses"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group"
            >
              <Card className="bg-white rounded-xl border border-gray-100 transition-all duration-500 hover:border-gray-200 hover:shadow-md h-full">
                <CardContent className="p-8">
                  <div className="flex items-start gap-5">
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-black transition-all duration-300"
                    >
                      {service.number}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-black mb-3 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-black/40 font-medium leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
