"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MoveRight, Home, AlertCircle, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#be1e2e] selection:text-white overflow-hidden">
      <Header />
      
      <div className="relative min-h-screen flex flex-col items-center justify-center pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#be1e2e]/10 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#be1e2e]/5 rounded-full blur-[150px]"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          {/* Main 404 text with "Working on it" vibe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-[#be1e2e]/20 blur-2xl rounded-full" />
                <div className="bg-[#be1e2e] p-6 rounded-3xl relative">
                  <Rocket className="w-12 h-12 text-white" />
                </div>
              </motion.div>
            </div>

            <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter leading-none mb-4 bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent opacity-10 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
              404
            </h1>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#be1e2e] text-xs font-black uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-3 h-3" />
              Under Development
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              We Are Working On It
            </h2>
            
            <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
               The page you are looking for is currently being refined to meet our performance standards. Check back soon or navigate to our services.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild className="bg-[#be1e2e] hover:bg-[#a01824] text-white rounded-full px-10 py-7 h-auto font-black text-sm transition-all duration-300 shadow-[0_0_40px_rgba(190,30,46,0.3)] hover:shadow-[0_0_60px_rgba(190,30,46,0.5)] group">
                <Link href="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Return Home
                  <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Link 
                href="/services/digital-marketing-agency" 
                className="text-white/60 hover:text-white font-bold transition-colors flex items-center gap-2 group"
              >
                Explore Services
                <div className="h-px w-8 bg-white/20 group-hover:w-12 group-hover:bg-[#be1e2e] transition-all duration-300" />
              </Link>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-20">
             {["Sleek Design", "Turbo Speed", "Dynamic Logic", "Secure Core"].map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <div className="w-1 h-1 rounded-full bg-[#be1e2e]" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{tech}</span>
                </motion.div>
             ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
