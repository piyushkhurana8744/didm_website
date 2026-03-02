"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-white font-sans flex flex-col">
      <Header />

      <section className="flex-1 flex flex-col items-center justify-center pt-48 pb-24 px-6 relative overflow-hidden text-center">
        {/* Abstract Background Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#be1e2e]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-[#be1e2e]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Massive 404 Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative inline-block mb-12"
          >
            <h1 className="text-[12rem] md:text-[20rem] font-black text-black leading-none tracking-tighter select-none opacity-[0.03]">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-8xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#be1e2e] to-black tracking-tight drop-shadow-2xl">
                 404
               </span>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-[1.1]">
              Opps! Page Not Found
            </h2>
            <p className="text-black/40 font-bold text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/">
              <Button className="bg-[#be1e2e] hover:bg-[#a01824] text-white rounded-full px-12 py-8 h-auto font-black uppercase text-[12px] tracking-[0.2em] transition-all shadow-2xl shadow-[#be1e2e]/30 group">
                <Home className="mr-3 w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                Go Back To Home
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="border-black/5 text-black hover:bg-black hover:text-white rounded-full px-12 py-8 h-auto font-black uppercase text-[12px] tracking-[0.2em] transition-all"
            >
              <ArrowLeft className="mr-3 w-5 h-5" />
              Go Back Previous
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Footer Wrapper */}
      <section className="py-24 px-6 bg-black text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#be1e2e_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
            Ready To Grow Your Business With <span className="text-[#be1e2e]">Online Strikers</span>
          </h2>
          <Link href="/contact">
            <Button className="bg-[#be1e2e] hover:bg-[#a01824] text-white rounded-full px-12 py-7 h-auto font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-2xl shadow-[#be1e2e]/30">
              Contact Support ↗
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
