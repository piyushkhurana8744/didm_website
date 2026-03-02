"use client";

import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  FileText, 
  Users, 
  MousePointerClick, 
  TrendingUp,
  Clock,
  ArrowUpRight,
  Loader2,
  Layout
} from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#be1e2e]" />
        </div>
      </AdminLayout>
    );
  }

  const stats = data?.stats || [];
  const recentSubmissions = data?.recentSubmissions || [];
  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
              Welcome back, <span className="text-[#be1e2e]">Admin</span>
            </h1>
            <p className="text-white/40 font-bold">Here is what is happening with Online Strikers today.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">
              View Site
            </button>
            <button className="px-6 py-3 bg-[#be1e2e] rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#a01824] transition-all shadow-lg shadow-[#be1e2e]/20">
              New Form
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat: any, index: number) => {
            const Icon = [FileText, MousePointerClick, TrendingUp, Users][index] || Layout;
            return (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-[#be1e2e]/30 transition-all"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon className="w-12 h-12" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white/60" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.name}</span>
                </div>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-black tracking-tighter">{stat.value}</h3>
                  <span className="text-[10px] font-black text-[#be1e2e] bg-[#be1e2e]/10 px-2 py-1 rounded-lg">
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions / Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-black uppercase tracking-widest text-sm">Recent Submissions</h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e] hover:underline">View All</button>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
              {recentSubmissions.length === 0 && (
                <div className="p-10 text-center text-white/20 font-bold uppercase tracking-widest text-[10px]">No submissions yet</div>
              )}
              {recentSubmissions.map((sub: any) => (
                <div key={sub._id} className="p-6 border-b border-white/5 last:border-0 flex items-center justify-between group hover:bg-white/[0.02] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-black text-xs text-white/40 group-hover:bg-[#be1e2e]/20 group-hover:text-[#be1e2e] transition-all">
                      {sub.data?.name?.charAt(0) || sub.data?.email?.charAt(0) || "?"}
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-tight">{sub.data?.name || sub.data?.email || "Anonymous"}</h4>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">In: {sub.formSlug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] text-white/20 font-bold">{new Date(sub.createdAt).toLocaleDateString()}</span>
                    <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-white/40" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-black uppercase tracking-widest text-sm px-2">Site Health</h3>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Server Status</span>
                  <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Optimal</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[98%] bg-green-500" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Database Load</span>
                  <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Moderate</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[45%] bg-yellow-500" />
                </div>
              </div>
              <div className="bg-[#be1e2e]/5 border border-[#be1e2e]/20 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-4 h-4 text-[#be1e2e]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e]">Next Planned Task</span>
                </div>
                <p className="text-xs font-bold text-white/60">Backup Scheduled for 02:00 AM IST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
