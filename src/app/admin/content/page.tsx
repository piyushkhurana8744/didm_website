"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Save, 
  Trash2, 
  Image as ImageIcon, 
  Type, 
  Layout,
  Search,
  ChevronRight,
  ExternalLink,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const pages = [
  { name: "Home Page", path: "/", icon: Layout },
  { name: "About Us", path: "/about", icon: Layout },
  { name: "Services", path: "/services", icon: Layout },
  { name: "Portfolio", path: "/portfolio", icon: Layout },
  { name: "Team", path: "/team", icon: Layout },
  { name: "FAQ", path: "/faq", icon: Layout },
];

export default function ContentPage() {
  const [selectedPage, setSelectedPage] = useState(pages[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sections, setSections] = useState<any[]>([]);

  // Fetch page content when selected page changes
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoaded(false);
      try {
        const res = await fetch(`/api/content?path=${selectedPage.path}`);
        const data = await res.json();
        setSections(data.sections || []);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchContent();
  }, [selectedPage]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pagePath: selectedPage.path,
          pageName: selectedPage.name,
          sections,
        }),
      });

      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSection = (index: number, field: string, value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, {
      sectionId: `section_${Date.now()}`,
      title: "New Section",
      subtitle: "",
      content: "",
      type: "standard"
    }]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row gap-10 h-full">
        {/* Page List Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/40 px-2">Select Page</h3>
            <div className="space-y-1">
              {pages.map((page) => (
                <button
                  key={page.path}
                  onClick={() => setSelectedPage(page)}
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 ${
                    selectedPage.path === page.path 
                      ? "bg-[#be1e2e]/10 border border-[#be1e2e]/20 text-white" 
                      : "text-white/40 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <page.icon className={`w-4 h-4 ${selectedPage.path === page.path ? "text-[#be1e2e]" : ""}`} />
                    <span className="text-sm font-bold uppercase tracking-tight">{page.name}</span>
                  </div>
                  {selectedPage.path === page.path && <ChevronRight className="w-4 h-4 text-[#be1e2e]" />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#be1e2e]/5 border border-[#be1e2e]/20 p-6 rounded-3xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e] mb-2">Editor Tip</h4>
            <p className="text-xs font-bold text-white/60 leading-relaxed">
              Changes will only be visible on the public site after you click "Publish Changes".
            </p>
          </div>
        </div>

        {/* Content Editor Area */}
        <div className="flex-1 space-y-8 pb-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#be1e2e] flex items-center justify-center shadow-lg shadow-[#be1e2e]/20">
                <selectedPage.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter">{selectedPage.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20">LIVE PATH:</span>
                  <a href={selectedPage.path} target="_blank" className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e] flex items-center gap-1 hover:underline">
                    {selectedPage.path} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-4 bg-[#be1e2e] rounded-2xl font-black uppercase text-[12px] tracking-widest flex items-center gap-3 hover:bg-[#a01824] transition-all disabled:opacity-50 shadow-xl shadow-[#be1e2e]/20"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {showSuccess ? "Published!" : "Publish Changes"}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!isLoaded ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[50vh] flex flex-col items-center justify-center gap-4"
              >
                <Loader2 className="w-10 h-10 animate-spin text-[#be1e2e]" />
                <p className="text-xs font-black uppercase tracking-widest text-white/20">Loading Content...</p>
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {sections.length === 0 && (
                  <div className="bg-white/5 border border-white/10 border-dashed rounded-[2.5rem] p-20 text-center">
                    <p className="text-white/20 font-bold">No sections found for this page. Start by adding one!</p>
                  </div>
                )}
                
                {sections.map((section, idx) => (
                  <motion.div
                    key={section.sectionId}
                    layout
                    className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 group relative hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl font-black text-white/5 group-hover:text-[#be1e2e]/20 transition-colors uppercase tracking-widest">#{idx + 1}</span>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 shadow-sm">
                          <Layout className="w-3 h-3 text-[#be1e2e]" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{section.type || "standard"} section</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeSection(idx)}
                        className="p-3 bg-red-500/5 hover:bg-red-500/10 text-red-500/40 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Section Title</label>
                          <input 
                            value={section.title || ""}
                            onChange={(e) => updateSection(idx, "title", e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold placeholder:text-white/10 focus:outline-none focus:border-[#be1e2e]/50 transition-all"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Description / Content</label>
                          <textarea 
                            value={section.content || ""}
                            onChange={(e) => updateSection(idx, "content", e.target.value)}
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold placeholder:text-white/10 focus:outline-none focus:border-[#be1e2e]/50 transition-all resize-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Background Image URL</label>
                          <div className="relative group">
                            <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#be1e2e] transition-colors" />
                            <input 
                              value={section.imageUrl || ""}
                              onChange={(e) => updateSection(idx, "imageUrl", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white font-mono text-xs focus:outline-none focus:border-[#be1e2e]/50 transition-all"
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <button 
                  onClick={addSection}
                  className="w-full py-10 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-white/20 hover:text-[#be1e2e] hover:border-[#be1e2e]/40 hover:bg-[#be1e2e]/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#be1e2e]/20 transition-all">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Add New Section</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AdminLayout>
  );
}
