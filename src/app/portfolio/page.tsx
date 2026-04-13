"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"

type Category = "all" | "seo" | "development" | "advertising"

interface PortfolioItem {
  id: number
  title: string
  category: Category
  image: string
  description: string
  client: string
  service: string
  year: string
  link: string
}

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "seo", label: "SEO" },
  { id: "advertising", label: "Advertising" },
  { id: "development", label: "Web Development" },
]

const categoryLabels: Record<Category, string> = {
  all: "All Projects",
  "seo": "SEO",
  development: "WEB DEVELOPMENT",
  advertising: "ADVERTISING",
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("all")
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)
  const [pageData, setPageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content?path=/portfolio", { cache: "no-store" });
        const data = await res.json();
        setPageData(data);
      } catch (error) {
        console.error("Error fetching portfolio content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const heroSection = pageData?.sections?.find((s: any) => s.type === "hero");
  const portfolioSection = pageData?.sections?.find((s: any) => s.portfolioItems);
  const portfolioItems: PortfolioItem[] = portfolioSection?.portfolioItems || [];

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
            ● {heroSection?.subtitle || "OUR WORK"}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {heroSection?.title || "PORTFOLIO"}
          </motion.h1>
          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            {heroSection?.content || "Showcasing our expertise across digital design and development. Explore our latest projects and see how we transform ideas into reality."}
          </motion.p> */}
        </div>
      </section>

      {/* Filter Buttons Section Removed */}

      {/* Portfolio Grid */}
      <section className="px-6 pb-24 min-h-[400px]">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : portfolioItems.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => setSelectedProject(item)}
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
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary/80 mb-4 block">
                        {item.service}
                      </span>
                      
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/20">View Case Study</span>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
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
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
              <p className="text-white/20 font-bold uppercase tracking-widest text-xs">No projects found</p>
            </div>
          )}
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
              <div className="relative aspect-video bg-white/5 overflow-hidden">
                {/* Blurred Backdrop */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={selectedProject.image}
                    alt=""
                    fill
                    className="object-cover blur-3xl opacity-30 scale-125"
                  />
                </div>
                
                {/* Actual Image */}
                <div className="absolute inset-8 z-10 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              {/* Project Details */}
              <div className="p-8">
                {/* Category Tag Removed */}
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/5 rounded-2xl p-6">
                    <span className="text-sm text-gray-500 block mb-2">Client</span>
                    <span className="text-xl font-bold">{selectedProject.client}</span>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 md:col-span-1">
                    <span className="text-sm text-gray-500 block mb-2">Duration</span>
                    <span className="text-xl font-bold">{selectedProject.year}</span>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 md:col-span-3">
                    <span className="text-sm text-gray-500 block mb-2">Service</span>
                    <span className="text-xl font-bold text-primary">{selectedProject.service}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link 
                  href={selectedProject.link} 
                  target={selectedProject.link.startsWith("http") ? "_blank" : "_self"} 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-full text-lg font-bold">
                    Visit
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">
            © 2026 Online Strikers. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}