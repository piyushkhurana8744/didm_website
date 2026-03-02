"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"

type Category = "all" | "ui-ux" | "development" | "app"

interface PortfolioItem {
  id: number
  title: string
  category: Category
  image: string
  description: string
  client: string
  year: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Fintech Dashboard",
    category: "ui-ux",
    image: "https://picsum.photos/seed/fintech/800/600",
    description: "A comprehensive financial dashboard with real-time analytics, transaction tracking, and customizable widgets.",
    client: "FinanceCorp",
    year: "2024",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    category: "development",
    image: "https://picsum.photos/seed/ecommerce/800/600",
    description: "Full-featured online store with payment integration, inventory management, and AI-powered recommendations.",
    client: "ShopTech",
    year: "2024",
  },
  {
    id: 3,
    title: "Fitness Tracker App",
    category: "app",
    image: "https://picsum.photos/seed/fitness/800/600",
    description: "Mobile application for tracking workouts, nutrition, and health metrics with social features.",
    client: "FitLife",
    year: "2023",
  },
  {
    id: 4,
    title: "Healthcare Portal",
    category: "ui-ux",
    image: "https://picsum.photos/seed/healthcare/800/600",
    description: "Patient management system with appointment scheduling, telemedicine, and medical records access.",
    client: "MedCare",
    year: "2024",
  },
  {
    id: 5,
    title: "SaaS Analytics",
    category: "development",
    image: "https://picsum.photos/seed/saas/800/600",
    description: "Business intelligence platform with custom dashboards, data visualization, and predictive analytics.",
    client: "DataPro",
    year: "2023",
  },
  {
    id: 6,
    title: "Food Delivery App",
    category: "app",
    image: "https://picsum.photos/seed/food/800/600",
    description: "Food delivery platform with real-time tracking, restaurant management, and loyalty program.",
    client: "QuickEats",
    year: "2024",
  },
  {
    id: 7,
    title: "Real Estate Platform",
    category: "ui-ux",
    image: "https://picsum.photos/seed/realestate/800/600",
    description: "Property listing platform with virtual tours, advanced search, and agent management system.",
    client: "PropertyHub",
    year: "2023",
  },
  {
    id: 8,
    title: "Education LMS",
    category: "development",
    image: "https://picsum.photos/seed/education/800/600",
    description: "Learning management system with course creation, progress tracking, and interactive assessments.",
    client: "EduLearn",
    year: "2024",
  },
]

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ui-ux", label: "UI/UX Design" },
  { id: "development", label: "Web Development" },
  { id: "app", label: "Mobile App" },
]

const categoryLabels: Record<Category, string> = {
  all: "All Projects",
  "ui-ux": "UI/UX DESIGN",
  development: "WEB DEVELOPMENT",
  app: "MOBILE APP",
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("all")
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter)

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-sm font-medium text-primary mb-4 tracking-wider"
          >
            ● OUR WORK
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            PORTFOLIO
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Showcasing our expertise across digital design and development. 
            Explore our latest projects and see how we transform ideas into reality.
          </motion.p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-8 py-4 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                activeFilter === category.id
                  ? "bg-primary text-white shadow-primary-lg"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Portfolio Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setSelectedProject(item)}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer bg-white/5"
                >
                  {/* Image Container */}
                  <div className="absolute inset-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    {/* Category Tag */}
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="inline-block text-xs font-bold text-primary tracking-wider mb-3"
                    >
                      {categoryLabels[item.category]}
                    </motion.span>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item.title}
                    </h3>

                    {/* Description Preview */}
                    <p className="text-gray-400 text-sm line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {item.description}
                    </p>

                    {/* View More Arrow */}
                    <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
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
                        className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      >
                        <path d="M7 17 17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </div>
                  </div>

                  {/* Border Glow on Hover */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-black border border-white/10 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
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
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>

              {/* Project Image */}
              <div className="relative aspect-video">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              {/* Project Details */}
              <div className="p-8">
                <span className="inline-block text-sm font-bold text-primary tracking-wider mb-4">
                  {categoryLabels[selectedProject.category]}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Project Info */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/5 rounded-2xl p-6">
                    <span className="text-sm text-gray-500 block mb-2">Client</span>
                    <span className="text-xl font-bold">{selectedProject.client}</span>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6">
                    <span className="text-sm text-gray-500 block mb-2">Year</span>
                    <span className="text-xl font-bold">{selectedProject.year}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-full text-lg font-bold">
                  View Live Project
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">
            © 2025 Online Strikers. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
