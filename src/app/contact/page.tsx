"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, Send } from "lucide-react"

const infoCards = [
  {
    icon: Mail,
    title: "Email Address",
    details: ["support@seox.com", "info@seox.com"],
  },
  {
    icon: Phone,
    title: "Phone Number",
    details: ["+1 (123) 456-7890", "+1 (123) 456-7890"],
  },
  {
    icon: MapPin,
    title: "Office Address",
    details: ["123 Innovation Lane,", "Digital City, DX 90210"],
  },
]

const stats = [
  { id: 1, label: "Account Boosted", value: "12,570+", icon: Facebook, color: "#1877F2" },
  { id: 2, label: "Account Managed", value: "350+", icon: Send, color: "#0088CC" },
  { id: 3, label: "Account Optimized", value: "5,482+", icon: Instagram, color: "#E4405F" },
  { id: 4, label: "Account Grow", value: "5,559+", icon: Linkedin, color: "#0A66C2" },
  { id: 5, label: "User Hired", value: "4,569+", icon: "Be", color: "#0057FF" },
  { id: 6, label: "Account Promoted", value: "9,587+", icon: "tiktok", color: "#000000" },
]

export default function ContactUsPage() {
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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            Home / Contact Us
          </motion.p>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {infoCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#F8F9FA] rounded-[2rem] p-10 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl hover:shadow-[#be1e2e]/5 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#be1e2e] shadow-sm mb-6 group-hover:bg-[#be1e2e] group-hover:text-white transition-colors duration-500">
                  <card.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-black mb-4">{card.title}</h4>
                <div className="space-y-1">
                  {card.details.map((detail, dIndex) => (
                    <p key={dIndex} className="text-black/40 font-bold text-sm">{detail}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-2 mb-4 text-[#be1e2e]">
                 <Send className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Contact Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-6">
                Lets Work Together
              </h2>
              <p className="text-black/40 font-bold mb-12 max-w-lg leading-relaxed">
                Ready To Take Your Social Media Presence To The Next Level? Let&apos;s Work Together To Create Impactful Strategies Drive Engagement, Growth, And Success For Your Brand.
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="First Name" className="bg-[#F8F9FA] border-none rounded-full px-8 py-7 h-auto font-bold placeholder:text-black/20 focus:ring-2 focus:ring-[#be1e2e]/50" />
                  <Input placeholder="Last Name" className="bg-[#F8F9FA] border-none rounded-full px-8 py-7 h-auto font-bold placeholder:text-black/20 focus:ring-2 focus:ring-[#be1e2e]/50" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Email Address" className="bg-[#F8F9FA] border-none rounded-full px-8 py-7 h-auto font-bold placeholder:text-black/20 focus:ring-2 focus:ring-[#be1e2e]/50" />
                  <Input placeholder="Phone Number" className="bg-[#F8F9FA] border-none rounded-full px-8 py-7 h-auto font-bold placeholder:text-black/20 focus:ring-2 focus:ring-[#be1e2e]/50" />
                </div>
                <div className="relative">
                  <select className="w-full bg-[#F8F9FA] border-none rounded-full px-8 py-7 h-auto font-bold text-black/20 focus:ring-2 focus:ring-[#be1e2e]/50 appearance-none">
                    <option>Service Type</option>
                    <option>SEO Optimization</option>
                    <option>Social Media Marketing</option>
                    <option>PPC Advertising</option>
                  </select>
                </div>
                <textarea 
                  placeholder="How can we help you?" 
                  className="w-full bg-[#F8F9FA] border-none rounded-[2rem] px-8 py-7 h-48 font-bold placeholder:text-black/20 focus:ring-2 focus:ring-[#be1e2e]/50 resize-none"
                />
                <Button className="bg-[#be1e2e] hover:bg-[#a01824] text-white rounded-full px-12 py-7 h-auto font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-2xl shadow-[#be1e2e]/30">
                  Send ↗
                </Button>
              </form>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" 
                  alt="Team working" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stats Section */}
      <section className="py-24 px-6 bg-[#F8F9FA] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 relative">
               <div className="relative w-full aspect-square">
                  <div className="absolute top-0 right-0 w-[80%] aspect-[4/3] rounded-[2rem] overflow-hidden z-20 shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1600880212319-7834e538c559?q=80&w=600&auto=format&fit=crop" alt="Meeting" fill className="object-cover" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-[70%] aspect-square rounded-[2rem] overflow-hidden z-10 shadow-xl">
                    <Image src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop" alt="Workspace" fill className="object-cover" />
                  </div>
               </div>
            </div>

            <div className="lg:w-1/2">
              <div className="flex items-center gap-2 mb-4 text-[#be1e2e]">
                 <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                    <span className="text-[8px] font-black">?</span>
                 </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Why Choose Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-6">
                Your Success, Our Priority
              </h2>
              <p className="text-black/40 font-bold mb-12 max-w-lg leading-relaxed">
                Proven Track Record Of Boosting Engagement And Sales. Expert Team Fluent In The Latest Trends And Technologies. Dedicated Account Managers Ensuring Personalized Service.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex items-center gap-6">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: stat.color }}
                    >
                       {typeof stat.icon === "string" ? (
                         <span className="font-black text-xs uppercase">{stat.icon}</span>
                       ) : (
                         <stat.icon className="w-5 h-5 fill-current" />
                       )}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-black">{stat.value}</h4>
                      <p className="text-[10px] font-black uppercase tracking-wider text-black/30">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full relative bg-gray-100 overflow-hidden">
        {/* Placeholder for Map */}
        <div className="absolute inset-0 grayscale opacity-50">
           <Image 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop" 
            alt="Map Placeholder" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 z-10 border border-[#be1e2e]/10">
           <div className="w-12 h-12 rounded-full bg-[#be1e2e] flex items-center justify-center text-white">
              <MapPin className="w-6 h-6" />
           </div>
           <div>
              <h4 className="text-black font-black uppercase text-xs tracking-widest">Our Headquarters</h4>
              <p className="text-black/40 font-bold text-[10px]">123 Innovation Lane, Digital City</p>
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
