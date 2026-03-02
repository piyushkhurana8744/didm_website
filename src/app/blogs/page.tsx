"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Discover The Emerging Trends That Are Reshaping The Startup Ecosystem.",
    date: "12/10/2024",
    author: "Dortha Flowers",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Learn The Secrets To Creating A Brand That Resonates With Your Audience.",
    date: "12/10/2024",
    author: "Alen Jones",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Mastering SEO: The Ultimate Guide To Boosting Website Traffic",
    date: "12/10/2024",
    author: "Parishia Sanders",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Content Marketing Tips To Elevate Your Brand's Online Presence",
    date: "12/10/2024",
    author: "Kathy Pearson",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "The Power Of Social Media Marketing: Strategies For Growth",
    date: "12/10/2024",
    author: "Ricky Smith",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Data-Driven Insights: Using Analytics To Enhance Your Marketing Strategy",
    date: "12/10/2024",
    author: "Carol Moon",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Creating A Winning Content Strategy: Tips And Best Practices",
    date: "12/10/2024",
    author: "Rhonda Rhodes",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "How To Measure SEO Success: Key Metrics To Track",
    date: "12/10/2024",
    author: "Iva Ryan",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  }
]

export default function BlogsPage() {
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
            className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-4"
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            Home / Our Blog
          </motion.p>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl shadow-black/5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-black/40">
                      <Calendar className="w-4 h-4 text-[#be1e2e]" />
                      <span className="text-[10px] font-black uppercase tracking-wider">{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-black/40">
                      <User className="w-4 h-4 text-[#be1e2e]" />
                      <span className="text-[10px] font-black uppercase tracking-wider">{post.author}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-black leading-tight tracking-tight group-hover:text-[#be1e2e] transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <div className="pt-4">
                    <div className="flex items-center gap-2 text-black font-black uppercase text-[10px] tracking-widest group-hover:text-[#be1e2e] transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-24 flex justify-center items-center gap-4">
            <button className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:text-[#be1e2e] hover:border-[#be1e2e] hover:bg-[#be1e2e]/5 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <button className="w-12 h-12 rounded-full bg-[#be1e2e] text-white font-black text-sm flex items-center justify-center shadow-lg shadow-[#be1e2e]/20">01</button>
              <button className="w-12 h-12 rounded-full border border-black/5 text-black font-black text-sm flex items-center justify-center hover:bg-gray-50 transition-colors">02</button>
              <span className="text-black/40 font-black px-2">...</span>
              <button className="w-12 h-12 rounded-full border border-black/5 text-black font-black text-sm flex items-center justify-center hover:bg-gray-50 transition-colors">12</button>
            </div>
            <button className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:text-[#be1e2e] hover:border-[#be1e2e] hover:bg-[#be1e2e]/5 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 bg-black text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#be1e2e_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">
            Ready To Grow Your Business With <span className="text-[#be1e2e]">Online Strikers</span>
          </h2>
          <p className="text-white/40 font-bold mb-12 max-w-2xl mx-auto">
            Let Us Help You Unlock Your Business&apos;s Full Potential. With Tailored SEO Strategies And Proven Digital Marketing Techniques, We&apos;ll Drive Traffic, Improve Conversions, And Elevate Your Brand Online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative w-full max-w-md">
              <input type="email" placeholder="Enter Your Email" className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-6 text-white font-bold placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#be1e2e]/50" />
            </div>
            <Button className="bg-[#be1e2e] hover:bg-[#a01824] text-white rounded-full px-12 py-7 h-auto font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-2xl shadow-[#be1e2e]/30">
              Subscribe ↗
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
