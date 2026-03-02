"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  Database,
  LayoutTemplate as Forms
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Page Content", href: "/admin/content", icon: FileText },
  { name: "Form Builder", href: "/admin/forms", icon: Forms },
  { name: "Global Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#be1e2e] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-72" : "w-20"
        } border-r border-white/5 bg-black/40 backdrop-blur-3xl transition-all duration-500 ease-[0.25, 0.4, 0.25, 1] relative z-30 hidden lg:flex flex-col`}
      >
        <div className="p-8 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className={`relative ${isSidebarOpen ? "h-8 w-32" : "h-6 w-6"}`}>
              {isSidebarOpen ? (
                <Image src="/logo-light.png" alt="Logo" fill className="object-contain" />
              ) : (
                <div className="w-6 h-6 bg-[#be1e2e] rounded-lg" />
              )}
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 mt-10 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? "bg-[#be1e2e] text-white shadow-lg shadow-[#be1e2e]/20" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {isSidebarOpen && (
                  <span className="text-[13px] font-black uppercase tracking-widest">{item.name}</span>
                )}
                {isSidebarOpen && isActive && (
                  <motion.div layoutId="active" className="ml-auto">
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-white/40 hover:text-red-500 hover:bg-red-500/5 transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="text-[13px] font-black uppercase tracking-widest">Sign Out</span>}
          </button>
        </div>
        
        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 bg-[#be1e2e] text-white rounded-full p-1 border border-[#be1e2e] hover:scale-110 transition-transform shadow-xl"
        >
          {isSidebarOpen ? <X className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <button className="p-2 text-white/60 hover:text-white">
                <Menu className="w-6 h-6" />
              </button>
            </div>
            <h2 className="text-lg font-black uppercase tracking-widest flex items-center gap-3">
              <span className="text-[#be1e2e]">ADMIN</span>
              <span className="text-white/20">/</span>
              <span>{menuItems.find(i => i.href === pathname)?.name || "Dashboard"}</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-black uppercase tracking-wider">{session.user?.email}</span>
              <span className="text-[9px] font-black text-[#be1e2e] uppercase tracking-[0.2em]">ONLINE STRIKER ADMIN</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#be1e2e]/20 border border-[#be1e2e]/30 flex items-center justify-center font-black text-[#be1e2e]">
              A
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
