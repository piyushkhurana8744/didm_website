"use client"

import { motion, useInView, Variants } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
}

interface StatsSectionProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    ctaText?: string;
    stats?: Array<{ label: string; description: string; value: string; gradient?: string }>;
  }
}

export default function StatsSection({ content }: StatsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-120px" })

  const displayTitle = content?.title || "The Results Speak for Themselves";
  const displaySubtitle = content?.subtitle || "About Us";
  const displayDescription = content?.description || "With years of experience, we've helped businesses grow online and stay ahead of their competitors. Our results-driven approach ensures that every campaign we manage delivers measurable success.";
  const displayCtaText = content?.ctaText || "Work With Us";
  const displayStats = content?.stats || [
    {
      label: "Clients Served Worldwide",
      description: "Successfully partnered with over 500+ clients across the globe, providing tailor-made marketing solutions that drive growth.",
      value: "500 +",
      gradient: "from-black via-black to-[#be1e2e]/80",
    },
    {
      label: "Project Successfully Completed",
      description: "We focus on high-performance strategy. We have successfully delivered over 700+ projects for various industries.",
      value: "700 +",
      gradient: "from-black via-black to-[#be1e2e]/60",
    },
    {
      label: "Revenue Generated for Clients",
      description: "Our marketing strategies have helped our clients generate over $200M in revenue for their businesses.",
      value: "$200M+",
      gradient: "from-black via-black to-[#be1e2e]/40",
    },
  ];

  return (
    <section ref={ref} className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
  variants={fadeUp}
  className="flex flex-col lg:flex-row justify-between gap-12 mb-20"
>
  <div className="max-w-2xl">
    <div className="flex items-center gap-2 mb-6">
      <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-black" />
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">
        {displaySubtitle}
      </span>
    </div>

    <h2 className="text-5xl font-black tracking-tight mt-6 mb-6 leading-[1.05] text-black">
      {displayTitle.includes("The Results Speak") ? (
        <>The Results Speak <br /> for Themselves</>
      ) : displayTitle}
    </h2>

    <p className="text-black/50 text-base max-w-xl">
      {displayDescription}
    </p>
  </div>

  <Button className="self-start bg-[#be1e2e] text-white rounded-full px-8 py-6 text-xs font-black uppercase tracking-wider hover:bg-[#a01824] transition-all">
    {displayCtaText}
  </Button>
</motion.div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
          {displayStats.map((stat, index) => {
            return (
              <motion.div
                key={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeUp}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
              >
                <Card className="relative overflow-hidden rounded-lg border-0 shadow-lg p-0">
                  <CardContent
                    className={`relative min-h-[350px] p-10 flex flex-col justify-between text-white bg-gradient-to-t ${stat.gradient || "from-black via-black to-[#be1e2e]/60"}`}
                  >
                    {/* subtle grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

                    <div className="relative z-10">
                      <h3 className="text-2xl font-black max-w-[240px] mb-4">
                        {stat.label}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {stat.description}
                      </p>
                    </div>

                    <div className="relative z-10 text-right">
                      <span className="text-6xl font-black tracking-tight">
                        {stat.value}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}