"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Shield, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";

export default function AccountSettings() {
  const { data: session, update } = useSession();
  const [email, setEmail] = useState(session?.user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (password && password !== confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match" });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update account");

      setStatus({ type: "success", message: "Account updated successfully" });
      setPassword("");
      setConfirmPassword("");
      
      // Update session
      await update({
        ...session,
        user: {
          ...session?.user,
          email: email
        }
      });

    } catch (error: any) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Account Settings</h1>
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Manage your administrative credentials</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 space-y-4">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#be1e2e]/20 border border-[#be1e2e]/30 flex items-center justify-center font-black text-3xl text-[#be1e2e] mx-auto">
                {session?.user?.email?.[0].toUpperCase() || "A"}
              </div>
              <div>
                <h3 className="font-bold text-white tracking-tight">{session?.user?.email}</h3>
                <p className="text-[10px] font-black text-[#be1e2e] uppercase tracking-[0.2em]">Administrator</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e] flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Login Email
                  </h4>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#be1e2e]/50 transition-all"
                    placeholder="Enter new email address"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e] flex items-center gap-2">
                    <Lock className="w-3 h-3" /> New Password
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#be1e2e]/50 transition-all"
                      placeholder="Enter new password"
                    />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#be1e2e]/50 transition-all"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <p className="text-[10px] font-bold text-white/20 italic">Leave password fields blank to keep current password</p>
                </div>
              </div>

              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-bold ${
                    status.type === "success" 
                      ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                      : "bg-[#be1e2e]/10 text-[#be1e2e] border border-[#be1e2e]/20"
                  }`}
                >
                  {status.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {status.message}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-8 bg-[#be1e2e] hover:bg-[#a01824] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#be1e2e]/20 disabled:opacity-50 transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Update Account Details"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
