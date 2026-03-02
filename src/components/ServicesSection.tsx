import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    number: "1",
    title: "Annual Organic Submissions (SEO)",
    description: "Achieving outstanding results for clients of various Industries.",
  },
  {
    number: "2",
    title: "Content Marketing",
    description: "Engaging your audience with high-quality, relevant content that drives traffic.",
  },
  {
    number: "3",
    title: "Pay-Per-Click (PPC) Advertising",
    description: "Maximize your ROI with targeted PPC campaigns designed to attract customers.",
  },
];

// Scroll animation variants
const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#F8F9FA] text-black overflow-hidden" ref={ref}>
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
                Our Services
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black leading-[1.1] tracking-tighter mb-4 max-w-xl">
              Result Driven SEO & <br /> Digital Marketing Services
            </h2>
            <p className="text-black/40 text-base max-w-lg mb-8 font-medium uppercase text-xs tracking-wide">
              At Our SEO Agency, We Provide Leading Digital Marketing Solutions Designed To Boost Your Business Growth, Build Real Skills, And Maximize Opportunities.
            </p>
            <Button className="bg-[#be1e2e] text-white px-8 py-6 rounded-md font-black hover:bg-[#a01824] transition-all uppercase text-[10px] tracking-widest">
              Get Started Now
            </Button>
          </motion.div>
        </div>

        {/* Services Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Column: Teal Illustration */}
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1 relative w-full aspect-square max-w-[550px]"
          >
            <div className="relative w-full h-full bg-[#4da1a9] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-12">
              <div className="absolute top-8 left-8">
                <h3 className="text-white text-3xl font-black tracking-tighter leading-none uppercase">
                  Digital <br /> Services <br /> <span className="text-white/50">SEO Agency</span>
                </h3>
              </div>
              <div className="relative w-full h-full mt-12">
                <Image
                  src="/images/services_new.png"
                  alt="Digital Marketing Experts"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Services List */}
          <div className="flex-1 space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card className="bg-white rounded-2xl border-none shadow-sm hover:shadow-md transition-all duration-300 p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      {service.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-2 tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-black/40 font-medium text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
