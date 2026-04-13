"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

type Category = "all" | "seo" | "development" | "advertising"

interface PortfolioItem {
  id: number
  title: string
  category: Category
  image: string
  service: string
  link: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Fintech Dashboard",
    category: "seo",
    image: "https://picsum.photos/seed/fintech/800/600",
    service: "Financial SEO & UX",
    link: "#",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    category: "development",
    image: "https://picsum.photos/seed/ecommerce/800/600",
    service: "Web Development",
    link: "#",
  },
  {
    id: 3,
    title: "Fitness Tracker App",
    category: "advertising",
    image: "https://picsum.photos/seed/fitness/800/600",
    service: "Mobile App Ads",
    link: "#",
  },
  {
    id: 4,
    title: "Healthcare Portal",
    category: "seo",
    image: "https://picsum.photos/seed/healthcare/800/600",
    service: "Healthcare SEO",
    link: "#",
  },
  {
    id: 5,
    title: "SaaS Analytics",
    category: "development",
    image: "https://picsum.photos/seed/saas/800/600",
    service: "SaaS Development",
    link: "#",
  },
  {
    id: 6,
    title: "Food Delivery App",
    category: "advertising",
    image: "https://picsum.photos/seed/food/800/600",
    service: "Food Delivery Ads",
    link: "#",
  },
]

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "seo", label: "SEO" },
  { id: "advertising", label: "Advertising" },
  { id: "development", label: "Web Development" },
]

const categoryLabels: Record<Category, string> = {
  all: "All",
  "seo": "SEO",
  development: "WEB DEVELOPMENT",
  advertising: "ADVERTISING",
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Category>("all")

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter)

  return (
    <section id="portfolio" className="relative py-24 bg-black text-white overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wider">
            ● OUR WORK
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            PORTFOLIO
          </h2>
        </motion.div>

        {/* Filter Buttons Removed */}

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <Link href={item.link} key={item.id} className="block">
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative flex flex-col rounded-[2rem] overflow-hidden cursor-pointer bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
                >
                  {/* Top: Image Section */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                    {/* Blurred Backdrop */}
                    <div className="absolute inset-0 z-0 opacity-40">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover blur-2xl scale-110"
                      />
                    </div>

                    {/* Actual Image */}
                    <div className="absolute inset-6 z-10 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    
                    {/* Subtle Overlay on Image ONLY */}
                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Bottom: Info Section */}
                  <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-white/[0.02] to-transparent">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors text-left uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/80 mb-6 block text-left">
                      {item.service}
                    </span>
                    
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/20">View Case Study</span>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17 17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
