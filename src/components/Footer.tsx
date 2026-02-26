"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const quickLinks = ["Home", "About", "Services", "Blog", "Contact"];
const categories = ["SEO", "Marketing", "Strategy", "Advertising", "Social"];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer className="bg-black text-white pt-24 pb-12 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Ready to Grow Section */}
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-24 max-w-4xl mx-auto"
        >
          <h2 className="text-5xl lg:text-6xl font-black mb-8 tracking-tighter leading-tight">
            Grow Your Career <br /> <span className="text-primary italic">With DIDM</span>
          </h2>
          <p className="text-white/40 text-lg mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
            Unlock Your Career&apos;s Full Potential With Industry-Leading Digital Marketing
            Training And Expert-Led Courses.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative flex-1 w-full max-w-md group">
              <Input
                type="email"
                placeholder="Your Email"
                className="w-full bg-white/5 border-white/10 rounded-full py-6 px-8 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all duration-300 font-bold h-auto"
              />
              <Button className="absolute right-2 top-2 bottom-2 bg-[#be1e2e] text-white px-8 rounded-full font-black hover:bg-[#a01824] transition-all duration-300 active:scale-95">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Footer Links Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 pt-24 border-t border-white/5"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants}>
            <Link href="/" className="flex items-center gap-2 mb-8 group">
              <motion.div
                whileHover={{ rotate: 12 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
              >
                <span className="text-white font-black text-xs">D</span>
              </motion.div>
              <span className="text-2xl font-black tracking-tighter text-white">DIDM</span>
            </Link>
            <p className="text-white/30 mb-8 max-w-xs leading-relaxed font-medium">
              Delhi Institute of Digital Marketing — India&apos;s Leading Digital Marketing Training.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={social.href}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-black mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-white/30 font-bold hover:text-primary transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories Column */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-black mb-8">Categories</h4>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href="#"
                    className="text-white/30 font-bold hover:text-primary transition-colors duration-300"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-black mb-8">Contact</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Send className="w-5 h-5 text-primary opacity-50 flex-shrink-0 mt-1" />
                <p className="text-white/30 font-bold leading-tight">info@didm.in</p>
              </div>
              <div className="flex items-start gap-4">
                <Send className="w-5 h-5 text-primary opacity-50 rotate-90 flex-shrink-0 mt-1" />
                <p className="text-white/30 font-bold leading-tight">New Delhi, India</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-white/10 text-xs font-bold uppercase tracking-widest">
            ©2025 DIDM — Delhi Institute of Digital Marketing
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="#"
              className="text-white/10 text-xs font-bold hover:text-white transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-white/10 text-xs font-bold hover:text-white transition-colors duration-300"
            >
              Terms
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
