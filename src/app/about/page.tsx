"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"

const stats = [
  { label: "Agency Employees", value: "500+" },
  { label: "Project Done", value: "900+" },
  { label: "Revenue Generated", value: "$200M" },
  { label: "Satisfied Client", value: "110K" },
  { label: "Country Worldwide", value: "109+" },
]

export default function AboutPage() {
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
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            Home / About Us
          </motion.p>
        </div>
      </section>

      {/* Driving Excellence Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="lg:w-1/2 relative group">
            <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl transform group-hover:rotate-1">
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" 
                alt="Driving Excellence" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Small floating image */}
            <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square rounded-[2rem] overflow-hidden border-[12px] border-white shadow-2xl z-20 group-hover:-translate-x-4 transition-transform duration-500">
               <Image 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop" 
                alt="Office work" 
                fill 
                className="object-cover"
              />
            </div>
            {/* Background decorative block */}
            <div className="absolute top-10 -left-10 w-full h-full bg-[#be1e2e] -z-10 rounded-[3rem] opacity-5 transform group-hover:scale-105 transition-transform duration-500" />
          </div>

          <div className="lg:w-1/2 space-y-10">
            <div className="flex items-center gap-2 text-[#be1e2e]">
               <div className="w-10 h-[2px] bg-[#be1e2e]" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Driving Excellence</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-black leading-[0.9] tracking-tighter">
              Innovative Scaling <br /> <span className="text-[#be1e2e]">Future Business</span>
            </h2>
            <p className="text-black/40 font-bold text-lg leading-relaxed max-w-xl">
              Elevate Your Social Media Presence To The Next Level! Our Team Creates Impactful Strategies That Drive Engagement, Growth, And Success For Your Brand.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-4">
                  <h4 className="text-xl font-black text-black">Strategic SEO</h4>
                  <p className="text-sm font-bold text-black/40 leading-relaxed">Tailored strategies focused on long-term visibility and ROI.</p>
               </div>
               <div className="space-y-4">
                  <h4 className="text-xl font-black text-black">Data Analysis</h4>
                  <p className="text-sm font-bold text-black/40 leading-relaxed">Turning raw data into actionable insights for continuous growth.</p>
               </div>
            </div>
            <div className="pt-4">
               <Button className="bg-[#be1e2e] hover:bg-[#a01824] text-white rounded-full px-12 py-7 h-auto font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-2xl shadow-[#be1e2e]/30">
                Get Started ↗
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-[#0B1120] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#be1e2e]/5 rounded-full blur-[60px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between gap-12 relative z-10">
          {[
            { label: "Accounts Boosted", val: "12,570+" },
            { label: "Accounts Managed", val: "350+" },
            { label: "Team Experts", val: "25+" },
            { label: "Success Stories", val: "900+" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">{stat.val}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mini Footer Bar */}
      <div className="w-full bg-black py-4 px-10 flex flex-col md:flex-row justify-between items-center text-white relative z-20 border-t border-white/5 shrink-0">
        <p className="text-[8px] font-black opacity-40 uppercase tracking-widest leading-none">© 2025 ONLINE STRIKERS INC. ALL RIGHTS RESERVED.</p>
      </div>

      {/* Empowering You Section */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-24">
            <div className="lg:w-1/2 relative space-y-4">
               <div className="grid grid-cols-2 gap-4 h-[500px]">
                  <div className="relative rounded-[2rem] overflow-hidden h-full shadow-xl">
                      <Image 
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop" 
                        alt="Collaboration" 
                        fill 
                        className="object-cover"
                      />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="relative rounded-[2rem] overflow-hidden flex-1 shadow-xl">
                       <Image 
                        src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=400&auto=format&fit=crop" 
                        alt="Happy Team" 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="relative rounded-[2rem] overflow-hidden flex-1 shadow-xl">
                       <Image 
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=400&auto=format&fit=crop" 
                        alt="Planning" 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  </div>
               </div>
            </div>

            <div className="lg:w-1/2 space-y-10">
              <div className="flex items-center gap-2 text-[#be1e2e]">
                 <div className="w-10 h-[2px] bg-[#be1e2e]" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Empowering You</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-black leading-[0.9] tracking-tighter">
                Drive Growth With <br /> <span className="text-[#be1e2e]">Precision Marketing</span>
              </h2>
              <div className="space-y-4 border-l-4 border-[#be1e2e] pl-8">
                  <h4 className="text-2xl font-black text-black">Our Team Member</h4>
                  <p className="text-black/40 font-bold text-lg leading-relaxed">
                    Our Diverse Team Consists Of SEO Specialists Content Strategists PPC Experts And Social Media Enthusiasts Who Collaborate.
                  </p>
              </div>
              <p className="text-black/30 font-bold leading-relaxed max-w-lg">
                We understand that every business is unique. That's why we take a customized approach to every project, building solutions that meet your specific needs.
              </p>
            </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
