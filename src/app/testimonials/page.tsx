"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  { id: 1, name: "Shakib Al Hasan", role: "Marketing Manager", text: "We saw a dramatic increase in engagement within the first month of partnering with SEOX. Their creativity and strategy have truly transformed our online presence.", rating: 5, avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Tanzid Tamim", role: "CEO of FreshBites Cafe", text: "The team at SEOX is phenomenal! They understood our brand's vision and executed campaigns that not only boosted our followers but also doubled our sales.", rating: 5, avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Taslim Ahmed", role: "Founder of Glow World", text: "Their expertise in social media advertising is unmatched. Thanks to their targeted campaigns, our website traffic grew by 75%, and we achieved a 30% conversion rate.", rating: 5, avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Lari Warf", role: "Owner Of Company", text: "SEOX has completely revolutionized the way we approach digital marketing. Their meticulous SEO tracking and strategic insights helped us double our website traffic within months.", rating: 5, avatar: "https://i.pravatar.cc/150?u=4" },
  { id: 5, name: "Jerry Helfer", role: "Client", text: "We partnered with SEOX to improve our search engine rankings, and the results have been incredible. Their expertise in keyword analysis content optimization pushed website the top search results.", rating: 5, avatar: "https://i.pravatar.cc/150?u=5" },
  { id: 6, name: "Rhonda Rhodes", role: "Client", text: "Working with SEOX has been a game-changer for our business. Their data-driven approach to SEO and in-depth tracking reports gave us a clear picture of where we stood and what steps.", rating: 5, avatar: "https://i.pravatar.cc/150?u=6" },
  { id: 7, name: "Kenneth Allen", role: "Client", text: "The team at SEOX exceeded all our expectations. They took to understand our business goals tailored a strategy delivered measurable results. From detailed analytics actionable recommendations.", rating: 5, avatar: "https://i.pravatar.cc/150?u=7" },
  { id: 8, name: "Paula Mora", role: "Client", text: "SEOX turned our SEO challenges into opportunities for growth. Their technical expertise & hands-on support ensured that every aspect of our website was optimized for success increased significantly as a result.", rating: 5, avatar: "https://i.pravatar.cc/150?u=8" },
  { id: 9, name: "Frances Swann", role: "Client", text: "Before working with SEOX, we struggled to understand what was holding back our website performance. Their team conducted a thorough analysis and provided a detailed plan to improve rankings.", rating: 5, avatar: "https://i.pravatar.cc/150?u=9" },
]

export default function TestimonialsPage() {
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
            Testimonials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            Home / Testimonials
          </motion.p>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#F8F9FA] rounded-[3rem] overflow-hidden p-12 md:p-20 relative">
             {/* Large background quote icon */}
             <div className="absolute top-10 right-20 text-black/5 text-[15rem] font-serif select-none pointer-events-none line-height-1">&ldquo;</div>

            <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
              <div className="lg:w-1/3 w-full">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl group">
                   <Image
                    src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop"
                    alt="Featured Product"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[#be1e2e] py-6 px-8 text-white">
                    <div className="text-3xl font-black tracking-tight mb-1">20k Reviews</div>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-white" />)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3 w-full">
                <div className="space-y-10">
                  <p className="text-black/60 text-xl font-bold leading-relaxed max-w-2xl italic">
                    &quot;Working With SEOX Advertising Agency Has Been A Game-Changer For Our Brand. The Custom Water Bottles They Designed Were Not Only Visually Appealing But Also High-Quality And Practical. We Used Them During Our Corporate Events, And The Response Was Phenomenal. Our Clients Loved The Attention To Detail, And Many Even Commented On How These Bottles Reflected The Premium Nature Of Our Brand. SEOX&apos;s Team Made The Entire Process Seamless, From Brainstorming Design Ideas To Ensuring Timely Delivery. We Couldn&apos;t Have Asked For A Better Partner In Promoting Our Brand.&quot;
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-white shadow-lg">
                      <Image src="https://i.pravatar.cc/150?u=99" alt="Sarah Makiavelly" fill />
                    </div>
                    <div>
                      <h5 className="text-xl font-black text-black">Sarah Makiavelly</h5>
                      <p className="text-[#be1e2e] text-[10px] font-black uppercase tracking-widest">Marketing Manager</p>
                    </div>
                    <div className="ml-auto flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-[#be1e2e]" />
                       <div className="w-3 h-3 rounded-full bg-[#be1e2e]/20" />
                       <div className="w-3 h-3 rounded-full bg-[#be1e2e]/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="bg-[#F8F9FA] p-10 rounded-[2.5rem] relative overflow-hidden group hover:bg-white hover:shadow-2xl hover:shadow-[#be1e2e]/10 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#be1e2e] shadow-sm mb-6 group-hover:bg-[#be1e2e] group-hover:text-white transition-colors duration-500">
                  <span className="text-2xl font-serif">“</span>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" />
                  ))}
                  <span className="text-[10px] font-black text-black/20 ml-2">(5) Rating</span>
                </div>

                <p className="text-black/50 text-sm leading-relaxed mb-10 min-h-[80px]">
                  &quot;{item.text}&quot;
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-black/5">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-white shadow-sm">
                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="text-base font-black text-black group-hover:text-[#be1e2e] transition-colors">{item.name}</h5>
                    <p className="text-black/20 text-[10px] font-black uppercase tracking-wider">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-20 flex justify-center items-center gap-4">
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

      {/* CTA Section */}
      <section className="py-24 px-6 bg-black text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#be1e2e_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]"
          >
            Ready To Grow Your Business With <span className="text-[#be1e2e]">Online Strikers</span>
          </motion.h2>
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
