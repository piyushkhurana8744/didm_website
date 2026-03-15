"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  BarChart3,
  Share2,
  FileText,
  Globe,
  CheckCircle2,
} from "lucide-react";

const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const services = [
  {
    icon: Search,
    title: "Search Engine Optimization (SEO)",
    description:
      "Search Engine Optimization is essential for businesses that want long-term online visibility. Our SEO strategies focus on improving search engine rankings, increasing organic traffic, and strengthening your brand authority.",
    items: [
      "Keyword research and competitor analysis",
      "On-page SEO optimization",
      "Technical SEO improvements",
      "High-quality link building",
      "Local SEO optimization",
      "SEO content optimization",
      "Continuous performance monitoring",
    ],
    closing:
      "With our professional SEO services, your website becomes more visible on search engines and attracts highly targeted traffic.",
  },
  {
    icon: BarChart3,
    title: "Pay-Per-Click Advertising (PPC)",
    description:
      "PPC advertising helps businesses reach their potential customers instantly through paid search campaigns. Our team manages high-performance advertising campaigns that focus on delivering maximum return on investment.",
    items: [
      "Google Ads campaign setup and optimization",
      "Targeted keyword research",
      "High-converting ad copy creation",
      "Landing page optimization",
      "Budget management and bid strategy",
      "Conversion tracking and campaign analysis",
    ],
    closing:
      "Our PPC advertising services help businesses generate immediate leads and increase online visibility.",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description:
      "Social media platforms are powerful tools for building brand awareness and connecting with potential customers. Our social media marketing services help businesses create engaging content, grow their audience, and build a strong digital brand.",
    items: [
      "Social media strategy planning",
      "Content creation and design",
      "Profile optimization",
      "Community engagement",
      "Paid social media advertising",
      "Analytics and performance tracking",
    ],
    closing:
      "With the right strategy, social media can become a strong channel for brand engagement and lead generation.",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    description:
      "Content plays a crucial role in attracting and engaging potential customers. Our content marketing strategies focus on delivering valuable and relevant information that builds trust and authority for your brand.",
    items: [
      "SEO blog writing",
      "Website content development",
      "Landing page content creation",
      "Email marketing content",
      "Brand storytelling",
      "Content strategy planning",
    ],
    closing:
      "High-quality content not only improves SEO rankings but also strengthens your brand credibility.",
  },
  {
    icon: Globe,
    title: "Website Design and Development",
    description:
      "Your website represents your brand in the digital world. A professionally designed website improves user experience, increases engagement, and supports your marketing campaigns.",
    items: [
      "Custom website design",
      "Mobile-responsive development",
      "SEO-friendly website structure",
      "Fast loading and optimized performance",
      "User-friendly navigation",
      "Conversion-focused layouts",
    ],
    closing:
      "Our goal is to create websites that combine attractive design with strong functionality and marketing performance.",
  },
];

export default function DigitalServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-20"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6 text-[#be1e2e]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#be1e2e]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Our Services
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4 max-w-2xl text-black">
              Our Digital Marketing Services
            </h2>
            <p className="text-black/40 text-base max-w-2xl font-medium">
              At Online Strikers, we provide a complete range of{" "}
              <strong className="text-black/70">digital marketing services</strong>{" "}
              designed to help businesses grow online and stay ahead of their competitors.
            </p>
          </div>
        </motion.div>

        {/* Service Cards */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-50 hover:border-[#be1e2e]/10 card-glow">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                  {/* Left: Icon + Title + Description */}
                  <div className="flex-shrink-0 lg:w-[35%]">
                    <div className="w-12 h-12 rounded-2xl bg-[#be1e2e]/10 flex items-center justify-center mb-4 group-hover:bg-[#be1e2e] group-hover:shadow-lg group-hover:shadow-[#be1e2e]/20 transition-all duration-500">
                      <service.icon className="w-5 h-5 text-[#be1e2e] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black tracking-tight mb-3 leading-tight text-black">
                      {service.title}
                    </h3>
                    <p className="text-black/40 text-sm leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>

                  {/* Right: Bullet Items + Closing */}
                  <div className="flex-1">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#be1e2e] mb-4">
                      Our Services Include:
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-5">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-[#be1e2e]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5 text-[#be1e2e]" />
                          </div>
                          <span className="text-sm font-bold text-black/60">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-black/35 text-sm font-medium leading-relaxed border-t border-gray-100 pt-4">
                      {service.closing}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
