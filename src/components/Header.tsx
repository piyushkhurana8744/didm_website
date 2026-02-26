"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "#", hasDropdown: false },
  { name: "Courses", href: "#", hasDropdown: true },
  { name: "About", href: "#", hasDropdown: false },
  { name: "Placements", href: "#", hasDropdown: false },
  { name: "Blog", href: "#", hasDropdown: false },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gradient-to-b from-black/98 to-black/95 backdrop-blur-xl py-3 border-b border-[#be1e2e]/30 shadow-[0_10px_40px_rgba(190,30,46,0.2)]"
          : "bg-gradient-to-b from-black/80 to-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:rotate-12 ring-2 ring-white/20 shadow-[0_0_20px_rgba(190,30,46,0.3)] group-hover:shadow-[0_0_30px_rgba(190,30,46,0.5)]">
              <span className="text-white font-black text-sm">D</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white drop-shadow-md leading-none">
                DIDM
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/40 leading-none">
                Digital Marketing
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <Link
                href={item.href}
                className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/90 hover:text-[#be1e2e] transition-all duration-300 relative"
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300 text-white/40" />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <motion.a
            href="tel:+919999999999"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="hidden sm:flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
          >
            <Phone className="w-4 h-4" />
            <span className="text-xs font-bold">+91 99999-99999</span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              asChild
              className="bg-[#be1e2e] text-white px-8 py-6 rounded-full text-xs font-black uppercase tracking-wider hover:bg-[#a01824] transition-all duration-300 shadow-[0_10px_20px_rgba(190,30,46,0.3)] active:scale-95 transform hover:-translate-y-0.5"
            >
              <Link href="#">Contact Us</Link>
            </Button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-gradient-to-b from-black/98 to-black/95 backdrop-blur-xl border-t border-[#be1e2e]/30"
          >
            <div className="container mx-auto px-6 py-6">
              <nav className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-white/90 hover:text-[#be1e2e] transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                      {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-white/10">
                <a href="tel:+919999999999" className="flex items-center gap-2 text-white/70 text-sm font-bold">
                  <Phone className="w-4 h-4" /> +91 99999-99999
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
