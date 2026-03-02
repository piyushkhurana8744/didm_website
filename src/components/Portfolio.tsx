"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

type Category = "all" | "ui-ux" | "development" | "app"

interface PortfolioItem {
  id: number
  title: string
  category: Category
  image: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Fintech Dashboard",
    category: "ui-ux",
    image: "https://picsum.photos/seed/fintech/800/600",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    category: "development",
    image: "https://picsum.photos/seed/ecommerce/800/600",
  },
  {
    id: 3,
    title: "Fitness Tracker App",
    category: "app",
    image: "https://picsum.photos/seed/fitness/800/600",
  },
  {
    id: 4,
    title: "Healthcare Portal",
    category: "ui-ux",
    image: "https://picsum.photos/seed/healthcare/800/600",
  },
  {
    id: 5,
    title: "SaaS Analytics",
    category: "development",
    image: "https://picsum.photos/seed/saas/800/600",
  },
  {
    id: 6,
    title: "Food Delivery App",
    category: "app",
    image: "https://picsum.photos/seed/food/800/600",
  },
]

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ui-ux", label: "UI/UX" },
  { id: "development", label: "Development" },
  { id: "app", label: "App" },
]

const categoryLabels: Record<Category, string> = {
  all: "All",
  "ui-ux": "UI/UX DESIGN",
  development: "WEB DEVELOPMENT",
  app: "MOBILE APP",
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
          <p className="text-gray-400 max-w-2xl mx-auto">
            Showcasing our expertise across digital design and development
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? "bg-primary text-white shadow-primary-lg"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Image Container */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Category Tag */}
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block text-xs font-bold text-primary tracking-wider mb-2"
                  >
                    {categoryLabels[item.category]}
                  </motion.span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {item.title}
                  </h3>

                  {/* View Project Arrow */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transform group-hover:translate-x-1 transition-transform"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                </div>

                {/* Border Glow on Hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
