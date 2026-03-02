"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"

interface Service {
  id: number
  title: string
  image: string
}

const services: Service[] = [
  { id: 1, title: "Business Strategy", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Business Strategy", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Business Strategy", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "Business Strategy", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" },
  { id: 5, title: "PR Staffing", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
  { id: 6, title: "Web Design", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop" },
  { id: 7, title: "Architecture", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop" },
  { id: 8, title: "Advertising", image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=800&auto=format&fit=crop" },
  { id: 9, title: "E-Commerce", image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=800&auto=format&fit=crop" },
  { id: 10, title: "Travel Guide", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop" },
  { id: 11, title: "Investment", image: "https://images.unsplash.com/photo-1579548122064-9da09ea2475a?q=80&w=800&auto=format&fit=crop" },
  { id: 12, title: "Solar Energy", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop" },
]

const stats = [
  { label: "Agency Employees", value: "500+" },
  { label: "Project Done", value: "900+" },
  { label: "Revenue Generated", value: "$200M" },
  { label: "Satisfied Client", value: "110K" },
  { label: "Country Worldwide", value: "109+" },
]

const team = [
  { id: 1, name: "Morgan Brooks", role: "Senior Project Leader", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" },
  { id: 2, name: "Alan Patterson", role: "Marketing Officer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "Sophia Lee", role: "UI/UX Designer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop" },
  { id: 4, name: "Chris Glasser", role: "The Team", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop" },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 relative overflow-hidden bg-[#F8F9FA]">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#be1e2e]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-black tracking-tighter mb-4"
          >
            Our Service V1
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            Looking For Strategic Web
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-[0.85/1] overflow-hidden rounded-xl cursor-pointer shadow-lg"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-6 left-6 pr-4">
                  <h3 className="text-xl font-black text-white leading-tight">
                    {service.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Stats Bar */}
      <section className="py-20 px-6 bg-[#0B1120] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 text-center text-white">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-3 tracking-tighter hover:text-[#be1e2e] transition-colors">
                  {stat.value}
                </div>
                <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
