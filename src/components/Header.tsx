"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [navItems, setNavItems] = useState([
    { name: "Home", href: "/", hasDropdown: false },
    { name: "About", href: "/about", hasDropdown: false },
    { 
      name: "Services", 
      href: "/digital-marketing-agency", 
      hasDropdown: true,
      dropdownItems: [
        { name: "Marketing", href: "/digital-marketing-agency" },
        { name: "Advertising", href: "#", isHeader: true },
        { name: "Google PPC", href: "/services/ppc" },
        { name: "Meta Ads", href: "/services/meta-ads" },
        { name: "Instagram Ads", href: "/services/instagram-ads" },
        { name: "Ecommerce PPC", href: "/services/ecommerce-ppc" },
        { name: "CRO", href: "/services/cro" },
      ]
    },
    {
      name: "Industries",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "SEO by Industry", href: "#", isHeader: true },
        { name: "Healthcare SEO", href: "/services/healthcare-seo" },
        { name: "Real Estate SEO", href: "/services/real-estate-seo" },
        { name: "Law Firm SEO", href: "/services/legal-seo" },
        { name: "Ads by Industry", href: "#", isHeader: true },
        { name: "Healthcare Ads", href: "/services/healthcare-ads" },
        { name: "Real Estate Ads", href: "/services/real-estate-ads" },
        { name: "Education Ads", href: "/services/education-ads" },
      ]
    },
    {
      name: "Development",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Web Development", href: "/services/web-development" },
        { name: "WordPress Dev", href: "/services/wordpress-development" },
        { name: "Shopify Dev", href: "/services/shopify-development" },
        { name: "UI/UX Design", href: "/services/ui-ux-design" },
        { name: "LMS Design", href: "/services/lms-design" },
        { name: "CRM Design", href: "/services/crm-design" },
      ]
    },
    { name: "Portfolio", href: "/portfolio", hasDropdown: false },
    { name: "Contact", href: "/contact", hasDropdown: false },
  ]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const res = await fetch("/api/content?path=__navbar");
        const data = await res.json();
        if (data && data.sections && data.sections[0] && data.sections[0].items) {
          setNavItems(data.sections[0].items);
        }
      } catch (error) {
        console.error("Error fetching nav items:", error);
      }
    };
    fetchNavItems();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useWhiteUI determines if we use white logo/text (for dark backgrounds)
  // 1. Home page (/) and Portfolio page (/portfolio) have dark hero sections.
  // 2. When scrolled, everything becomes black background -> White UI.
  const isDarkHeroPage = pathname === "/" || pathname === "/portfolio";
  const useWhiteUI = isDarkHeroPage || isScrolled;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/5 py-3"
          : isDarkHeroPage 
            ? "bg-transparent py-6"
            : "bg-white/90 backdrop-blur-md border-b border-black/5 py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-40 md:h-12 md:w-48 transition-all duration-500 hover:scale-105">
              <Image
                src={useWhiteUI ? "/logo-light.png" : "/logo-dark.png"}
                alt="Online Strikers Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={`group flex items-center gap-1.5 text-[13px] font-black transition-all duration-300 relative py-2 ${
                  useWhiteUI ? "text-white/80 hover:text-[#be1e2e]" : "text-black/80 hover:text-[#be1e2e]"
                }`}
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === item.name ? "rotate-180" : ""} ${useWhiteUI ? "text-white/30" : "text-black/20"} group-hover:text-[#be1e2e]`} />
                )}
              </Link>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {item.hasDropdown && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-2xl py-3 overflow-hidden border border-black/5"
                  >
                    {item.dropdownItems?.map((subItem) => {
                      if (subItem.isHeader) {
                        return (
                          <div 
                            key={subItem.name} 
                            className="px-6 py-2 text-[10px] font-black tracking-widest uppercase text-black/30 bg-gray-50/50"
                          >
                            {subItem.name}
                          </div>
                        );
                      }
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-6 py-2.5 text-[13px] font-black text-black/70 hover:text-[#be1e2e] hover:bg-gray-50 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6 md:gap-8">
          <button className={`transition-colors ${useWhiteUI ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"}`}>
            <Search className="w-5 h-5" />
          </button>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden sm:block"
          >
            <Button
              asChild
              className="bg-[#be1e2e] text-white hover:bg-[#a01824] px-5 py-2.5 h-auto rounded-full text-[12px] font-black tracking-wide group transition-all duration-300 shadow-lg shadow-[#be1e2e]/25 hover:shadow-[#be1e2e]/40 active:scale-95 hover:-translate-y-0.5 transform"
            >
              <Link href="/contact" className="flex items-center gap-1.5">
                Contact Us
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className={`lg:hidden p-1 ${useWhiteUI ? "text-white" : "text-black"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
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
            className="lg:hidden bg-black/95 backdrop-blur-2xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8">
              <nav className="flex flex-col gap-5">
                {navItems.map((item, index) => (
                  <div key={item.name}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center justify-between text-base font-bold text-white/90 hover:text-[#be1e2e] transition-colors py-2"
                        onClick={() => !item.hasDropdown && setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                        {item.hasDropdown && <ChevronDown className="w-5 h-5 text-white/20" />}
                      </Link>
                    </motion.div>
                    {item.hasDropdown && (
                      <div className="pl-4 mt-2 flex flex-col gap-3">
                        {item.dropdownItems?.map((subItem) => {
                          if (subItem.isHeader) {
                            return (
                              <div 
                                key={subItem.name} 
                                className="text-[10px] font-black tracking-widest uppercase text-white/20 mt-2"
                              >
                                {subItem.name}
                              </div>
                            );
                          }
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="text-sm font-bold text-white/40 hover:text-[#be1e2e] transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
