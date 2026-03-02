"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Gradient - Updated to match the example */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#be1e2e]/40 via-black to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
          className="space-y-8"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            ● DELHI INSTITUTE OF DIGITAL MARKETING
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Your Partner in <span className="text-primary">Digital Excellence</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-gray-300 max-w-xl"
          >
            Transforming businesses through innovative digital solutions.
          </motion.p>

          {/* Audit Form */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-2 max-w-md"
          >
            <Input
              placeholder="Audit Your Website"
              className="bg-transparent border-none text-white placeholder:text-gray-400"
            />
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-6">
              Get Started
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="flex gap-10 pt-6"
          >
            {[
              { value: "15+", label: "Years Experience" },
              { value: "50k+", label: "Students Trained" },
              { value: "500+", label: "Placements" },
            ].map((item, i) => (
              <div key={i}>
                <h3 className="text-3xl font-bold">{item.value}</h3>
                <p className="text-sm text-gray-400">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex justify-center items-center h-full"
        >
          {/* Premium Glow Background */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/40 via-primary/20 to-transparent blur-3xl opacity-60"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
          />

          {/* Main Image Container with Premium Styling */}
          <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl">
            {/* Premium Border Gradient */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none z-10" />
            
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            
            <Image
              src="/images/hero.png"
              alt="DIDM - Digital Marketing Expert"
              width={500}
              height={500}
              priority
              quality={95}
              className="w-full h-full object-cover"
            />

            {/* Inner Glow Overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Ambient Light Effects */}
          <div className="absolute -top-24 -right-24 w-56 h-56 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  )
}