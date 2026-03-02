"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Check, Plus, Minus } from "lucide-react"

const pricingPlans = [
  {
    id: "starter",
    name: "Starter Plan",
    price: "199",
    description: "Perfect for small businesses or startups looking to kickstart their digital marketing journey.",
    features: [
      "Basic SEO optimization",
      "10 Targeted Keywords",
      "On-page and off-page SEO",
      "Monthly performance reports",
      "Email support"
    ]
  },
  {
    id: "growth",
    name: "Growth Plan",
    price: "499",
    description: "Ideal for businesses aiming to expand their online presence and boost visibility.",
    features: [
      "Advanced SEO strategies",
      "25 Targeted Keywords",
      "Content marketing support",
      "Local SEO optimization",
      "Bi-weekly performance reports"
    ]
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "999",
    description: "A comprehensive package for businesses focused on dominating their industry.",
    features: [
      "Complete SEO and digital marketing suite",
      "50 Targeted Keywords",
      "Dedicated account manager",
      "Social media integration",
      "Weekly performance reports"
    ]
  }
]

const pricingFaqs = [
  {
    question: "Can I upgrade my plan later?",
    answer: "SEO is a long-term strategy. You'll start seeing improvements in a few months, but the best results usually take 4-6 months."
  },
  {
    question: "Are there any additional costs?",
    answer: "No, our pricing plans are all-inclusive for the services listed. Any additional specialized requirements would be discussed separately."
  },
  {
    question: "How long does it take to see results?",
    answer: "While results vary, most clients see meaningful progress in search visibility and traffic within the first three to six months of implementation."
  }
]

function PricingFaqItem({ item, isOpen, onClick }: { item: { question: string, answer: string }, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="mb-4 overflow-hidden rounded-xl">
      <button
        onClick={onClick}
        className={`w-full px-8 py-6 text-left flex items-center justify-between transition-all duration-300 ${
          isOpen ? "bg-[#be1e2e] text-white" : "bg-[#F8F9FA] text-black hover:bg-gray-100"
        }`}
      >
        <span className="text-base font-black tracking-tight">{item.question}</span>
        {isOpen ? <Minus className="w-5 h-5 shrink-0" /> : <Plus className="w-5 h-5 shrink-0 text-black/20" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`px-8 pb-8 pt-2 text-sm leading-relaxed ${isOpen ? "bg-[#be1e2e] text-white/80" : "bg-[#F8F9FA]"}`}>
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

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
            Pricing Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            Home / Pricing Plan
          </motion.p>
        </div>
      </section>

      {/* Pricing List Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#F8F9FA] rounded-[2.5rem] p-10 md:p-14 group hover:bg-white hover:shadow-2xl hover:shadow-[#be1e2e]/10 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Left Side: Pricing Info */}
                <div className="flex-1 space-y-6">
                  <h4 className="text-xl font-black text-black">{plan.name}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-black text-black tracking-tighter">${plan.price}</span>
                    <span className="text-black/40 text-[10px] font-black uppercase tracking-widest">/month</span>
                  </div>
                  <p className="text-black/50 text-sm leading-relaxed max-w-sm">
                    {plan.description}
                  </p>
                  <Button className="bg-transparent border border-[#be1e2e]/20 text-[#be1e2e] hover:bg-[#be1e2e] hover:text-white rounded-full px-10 py-7 h-auto font-black uppercase text-[10px] tracking-[0.2em] transition-all group-hover:bg-[#be1e2e] group-hover:text-white group-hover:border-[#be1e2e]">
                    Get Started ↗
                  </Button>
                </div>

                {/* Right Side: Features */}
                <div className="flex-1 w-full bg-white/50 group-hover:bg-white p-8 md:p-10 rounded-3xl transition-colors duration-500">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-black mb-6">Our Features</h5>
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-md bg-[#be1e2e] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm font-bold text-black/60 group-hover:text-black/80 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mini FAQ Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
           <div className="flex items-center justify-center gap-2 mb-6 text-[#be1e2e]">
            <div className="shrink-0">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              FAQ's
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter mb-16 leading-[0.9]">
            Frequently Asked Question
          </h2>
          
          <div className="text-left space-y-4">
            {pricingFaqs.map((faq, index) => (
              <PricingFaqItem
                key={index}
                item={faq}
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
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
