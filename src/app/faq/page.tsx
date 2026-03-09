"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

const commonQuestions = [
  {
    question: "What Is SEOX?",
    answer: "The timeline for SEO results can vary depending on factors like the competitiveness of your industry, the condition of your website, and the scope of the SEO strategy. On average, clients start seeing improvements in 3-6 months, though some may see faster results depending on specific circumstances."
  },
  {
    question: "What SEO services does SEOX offer?",
    answer: "We offer a comprehensive range of SEO services including keyword research, on-page optimization, technical SEO audits, backlink building, content strategy, and local SEO to help your business dominate search results."
  },
  {
    question: "Do you guarantee top rankings in search engines?",
    answer: "While no one can guarantee #1 rankings due to search engine algorithm changes, we use proven, ethical white-hat strategies that consistently deliver significant improvements in visibility, traffic, and rankings."
  },
  {
    question: "How much does SEOX charge for its services?",
    answer: "Our pricing is tailored to the specific needs and goals of your business. We offer various packages ranging from boutique consulting to full-scale enterprise SEO management. Contact us for a custom quote."
  },
  {
    question: "How long does it take to see results from SEOX's SEO services?",
    answer: "SEO is a long-term investment. Most clients see initial improvements within 3 months, with more significant, sustainable growth appearing between the 6 to 12-month marks."
  }
]

const generalQuestions = [
  {
    question: "How do I get started with SEOX?",
    answer: "We provide in-depth monthly reports that detail key performance metrics such as traffic, rankings, backlinks, and other SEO KPIs. Our team ensures transparency, so you always know how your SEO efforts are progressing."
  },
  {
    question: "Can SEOX help with international SEO?",
    answer: "Yes, we specialize in multi-lingual and multi-regional SEO strategies to help your brand expand its reach across global markets and connect with international audiences effectively."
  },
  {
    question: "Does SEOX work with businesses of all sizes?",
    answer: "Absolutely. We have experience working with startups, small to medium businesses, and large-scale enterprises across a wide variety of industries."
  },
  {
    question: "Will SEOX handle content creation as part of their services?",
    answer: "Yes, our content team creates high-quality, SEO-optimized content including blog posts, landing pages, and technical guides that resonate with both users and search engines."
  },
  {
    question: "What kind of reporting and analytics will I receive from SEOX?",
    answer: "You will receive comprehensive monthly reports featuring data from Google Analytics, Search Console, and our custom tracking tools, along with strategic insights and next steps."
  }
]

function AccordionItem({ item, isOpen, onClick }: { item: { question: string, answer: string }, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="mb-4 overflow-hidden rounded-xl transition-all duration-300">
      <button
        onClick={onClick}
        className={`w-full px-8 py-6 text-left flex items-center justify-between transition-all duration-300 ${
          isOpen ? "bg-[#be1e2e] text-white" : "bg-[#F8F9FA] text-black hover:bg-gray-100"
        }`}
      >
        <span className="text-base md:text-lg font-black tracking-tight">{item.question}</span>
        <div className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-0" : ""}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5 text-black/20" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className={`px-8 pb-8 pt-2 text-sm md:text-base leading-relaxed ${isOpen ? "bg-[#be1e2e] text-white/80" : "bg-[#F8F9FA]"}`}>
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  const [openCommon, setOpenCommon] = useState<number | null>(0)
  const [openGeneral, setOpenGeneral] = useState<number | null>(0)

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
            Frequently Asked Question
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            Home / Frequently Asked Question
          </motion.p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Common Questions */}
          <div className="mb-24">
            <h2 className="text-2xl md:text-3xl font-black text-black mb-12 tracking-tight">
              Common Questions About SEOX Services
            </h2>
            <div className="space-y-4">
              {commonQuestions.map((item, index) => (
                <AccordionItem
                  key={index}
                  item={item}
                  isOpen={openCommon === index}
                  onClick={() => setOpenCommon(openCommon === index ? null : index)}
                />
              ))}
            </div>
          </div>

          {/* General Questions */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-12 tracking-tight">
              Everything You Need To Know
            </h2>
            <div className="space-y-4">
              {generalQuestions.map((item, index) => (
                <AccordionItem
                  key={index}
                  item={item}
                  isOpen={openGeneral === index}
                  onClick={() => setOpenGeneral(openGeneral === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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