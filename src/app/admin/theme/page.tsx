"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Palette, 
  Save, 
  Loader2, 
  Type, 
  Moon, 
  Sun,
  Image as ImageIcon,
  CheckCircle2,
  Settings
} from "lucide-react";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";

export default function ThemePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [theme, setTheme] = useState({
    primaryColor: "#be1e2e",
    secondaryColor: "#000000",
    accentColor: "#be1e2e",
    fontFamily: "Outfit",
    darkMode: true,
    logoUrl: "",
    faviconUrl: "",
    customCss: "",
  });

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await fetch("/api/theme");
        const data = await res.json();
        setTheme(data);
      } catch (error) {
        console.error("Error fetching theme:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchTheme();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theme),
      });

      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving theme:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-10 pb-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#be1e2e] flex items-center justify-center shadow-lg shadow-[#be1e2e]/20">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter">Theme Settings</h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mt-1">Customize global site aesthetics</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving || !isLoaded}
            className="px-8 py-4 bg-[#be1e2e] rounded-2xl font-black uppercase text-[12px] tracking-widest flex items-center gap-3 hover:bg-[#a01824] transition-all disabled:opacity-50 shadow-xl shadow-[#be1e2e]/20"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {showSuccess ? "Applied!" : "Save Theme"}
          </button>
        </div>

        {!isLoaded ? (
          <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#be1e2e]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Colors Section */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#be1e2e] flex items-center gap-2">
                <Palette className="w-4 h-4" /> Visual Identity
              </h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Primary Color</label>
                  <div className="flex gap-4">
                    <input 
                      type="color" 
                      value={theme.primaryColor}
                      onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                      className="w-12 h-12 rounded-xl bg-transparent border border-white/10 cursor-pointer"
                    />
                    <input 
                      type="text"
                      value={theme.primaryColor}
                      onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-xs font-mono text-white"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Accent Color</label>
                  <div className="flex gap-4">
                    <input 
                      type="color" 
                      value={theme.accentColor}
                      onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                      className="w-12 h-12 rounded-xl bg-transparent border border-white/10 cursor-pointer"
                    />
                    <input 
                      type="text"
                      value={theme.accentColor}
                      onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Typography & Assets */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#be1e2e] flex items-center gap-2">
                <Type className="w-4 h-4" /> Typography & Assets
              </h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Font Family</label>
                  <select 
                    value={theme.fontFamily}
                    onChange={(e) => setTheme({ ...theme, fontFamily: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-bold text-white focus:outline-none"
                  >
                    <option value="Outfit">Outfit (Default)</option>
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Montserrat">Montserrat</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Dark Mode</label>
                    <p className="text-[8px] text-white/20 uppercase font-bold">Default interface style</p>
                  </div>
                  <button 
                    onClick={() => setTheme({ ...theme, darkMode: !theme.darkMode })}
                    className={`w-12 h-6 rounded-full p-1 transition-all ${theme.darkMode ? "bg-[#be1e2e]" : "bg-white/10"}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${theme.darkMode ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Branding Section */}
            <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#be1e2e] flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Branding Assets
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CloudinaryUpload 
                  label="Website Logo"
                  currentUrl={theme.logoUrl}
                  onUpload={(url) => setTheme({ ...theme, logoUrl: url })}
                />
                <CloudinaryUpload 
                  label="Favicon"
                  currentUrl={theme.faviconUrl}
                  onUpload={(url) => setTheme({ ...theme, faviconUrl: url })}
                />
              </div>
            </div>

            {/* Custom CSS Section */}
            <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#be1e2e] flex items-center gap-2">
                <Settings className="w-4 h-4" /> Advanced Customization
              </h3>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Custom CSS</label>
                <textarea 
                  value={theme.customCss}
                  onChange={(e) => setTheme({ ...theme, customCss: e.target.value })}
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xs font-mono text-white focus:outline-none focus:border-[#be1e2e]/50"
                  placeholder="/* Add your custom CSS here */"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
