"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Facebook, Instagram, Linkedin, Send, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1]
    },
  },
};

const iconMap: Record<string, any> = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  X: Send,
};

interface FooterProps {
  initialData?: any;
}

export default function Footer({ initialData }: FooterProps) {
  const [footerContent, setFooterContent] = useState<any>(initialData);
  
  useEffect(() => {
    const fetchFooter = async () => {
      if (initialData) return; // Skip fetch if data provided via props
      try {
        const res = await fetch("/api/content?path=__footer");
        const data = await res.json();
        if (data && data.sections) {
          setFooterContent(data);
        }
      } catch (error) {
        console.error("Error fetching footer content:", error);
      }
    };
    fetchFooter();
  }, []);

  const getSection = (id: string) => footerContent?.sections?.find((s: any) => s.sectionId === id);
  
  const brandSection = getSection("footer_brand");
  const quickLinksRef = getSection("footer_quick_links");
  const categoryLinksRef = getSection("footer_categories");
  const contactSection = getSection("footer_contact");
  const bottomSection = getSection("footer_bottom");

  const socialLinks = brandSection?.social?.map((s: any) => ({
    icon: iconMap[s.platform] || Send,
    href: s.href,
    label: s.platform
  })) || [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Send, href: "#", label: "X" },
  ];

  const quickLinks = quickLinksRef?.links || [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blogs" },
    { label: "Contact Us", href: "/contact" },
    { label: "Testimonials", href: "/testimonials" },
  ];

  const categoryList = categoryLinksRef?.links || [
    { label: "Digital Marketing", href: "#" },
    { label: "SEO Marketing", href: "#" },
    { label: "Startup Agency", href: "#" },
    { label: "Advertising Agency", href: "#" },
    { label: "Social Media Agency", href: "#" },
    { label: "Web Design Agency", href: "#" }
  ];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer className="bg-black text-white pt-32 pb-12 overflow-hidden relative" ref={ref}>
      {/* Background Texture/Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      
      {/* Bottom Glows */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#be1e2e]/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#be1e2e]/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Ready to Grow Section */}
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-32"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            Ready To Grow Your Business With Online Strikers
          </h2>
          <p className="text-white/60 text-base md:text-lg mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            Let Us Help You Unlock Your Business&apos;s Full Potential. With Tailored Digital Marketing Strategies And Industry-Leading Training, We&apos;ll Help You Elevate Your Brand Online. Don&apos;t Wait — Success Starts Today!
          </p>
          
          <div className="flex justify-center">
            <div className="flex w-full max-w-2xl bg-[#141414] rounded-full p-2 border border-white/5 focus-within:border-[#be1e2e]/30 transition-all duration-300">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-1 bg-transparent border-none py-4 px-8 text-white placeholder:text-white/30 focus:outline-none font-medium"
              />
              <Button className="bg-[#be1e2e] text-white hover:bg-[#a01824] px-10 py-5 h-auto rounded-full font-black text-base transition-all duration-300 shadow-lg shadow-[#be1e2e]/20">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-24"
        >
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="relative h-12 w-48 transition-transform duration-500 hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Online Strikers Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-white/60 mb-8 max-w-sm leading-relaxed font-bold italic">
              {brandSection?.description || "Online Strikers — India's Leading Digital Marketing Agency Empowering Brands For Over A Decade."}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social: any, i: number) => (
                <Link
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#be1e2e] hover:text-white hover:scale-110 transition-all duration-300 shadow-lg shadow-white/5"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-lg font-black mb-8 text-white">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link: any) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/60 hover:text-[#be1e2e] transition-colors duration-300 font-bold italic">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-lg font-black mb-8 text-white">Category List</h4>
            <ul className="space-y-4">
              {categoryList.map((cat: any) => (
                <li key={cat.label || cat}>
                  <Link href={cat.href || "#"} className="text-white/60 hover:text-[#be1e2e] transition-colors duration-300 font-bold italic text-sm">
                    {cat.label || cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-lg font-black mb-8 text-white">Contact Information</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <Mail className="w-5 h-5 text-white/40 group-hover:text-[#be1e2e] transition-colors" />
                <p className="text-white/60 font-bold italic group-hover:text-white transition-colors text-sm">{contactSection?.email || "info@onlinestrikers.com"}</p>
              </div>
              <div className="flex items-start gap-4 group cursor-pointer">
                <MapPin className="w-5 h-5 text-white/40 group-hover:text-[#be1e2e] transition-colors mt-1" />
                <p className="text-white/60 font-bold italic group-hover:text-white transition-colors text-sm">{contactSection?.address || "New Delhi, India"}</p>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <Phone className="w-5 h-5 text-white/40 group-hover:text-[#be1e2e] transition-colors" />
                <p className="text-white/60 font-bold italic group-hover:text-white transition-colors text-sm">{contactSection?.phone || "99999-99999"}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          <p className="text-white/40 text-sm font-bold italic">
            ©Copyright 2025 Online Strikers . All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-white/40 text-sm font-bold italic hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <div className="w-px h-4 bg-white/10 hidden md:block" />
            <Link href="/privacy" className="text-white/40 text-sm font-bold italic hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
          
          {/* Scroll to top indicator */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute right-0 -top-12 hidden md:flex w-12 h-12 rounded-full border border-white/10 items-center justify-center cursor-pointer hover:bg-[#be1e2e] hover:border-[#be1e2e] transition-colors group"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:-translate-y-1 transition-transform">
              <path d="M1 9L6 4L11 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
