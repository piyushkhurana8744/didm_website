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
  CheckCircle2,
  Settings,
  Globe,
  RotateCcw,
  LayoutTemplate as Forms
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import INITIAL_CONTENT_DATA from "@/data/initial-content.json";

const pages = [
  { name: "Home Page", path: "/", icon: Layout },
  { name: "About Us", path: "/about", icon: Layout },
  { name: "Services", path: "/services", icon: Layout },
  { name: "Portfolio", path: "/portfolio", icon: Layout },
  { name: "Team", path: "/team", icon: Layout },
  { name: "FAQ", path: "/faq", icon: Layout },
  { name: "Contact", path: "/contact", icon: Layout },
];

const INITIAL_CONTENT: Record<string, any> = INITIAL_CONTENT_DATA;

export default function ContentPage() {
  const [selectedPage, setSelectedPage] = useState(pages[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingSeed, setIsUpdatingSeed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showConfirmSeed, setShowConfirmSeed] = useState(false);
  const [availableForms, setAvailableForms] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [seo, setSeo] = useState<any>({ title: "", description: "", keywords: [] });

  // Fetch page content when selected page changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      try {
        // Fetch forms first
        const formsRes = await fetch("/api/forms");
        const formsData = await formsRes.json();
        setAvailableForms(formsData);

        // Then fetch page content
        const res = await fetch(`/api/content?path=${selectedPage.path}`);
        const data = await res.json();
        setSections(data.sections || []);
        setSeo(data.seo || { title: "", description: "", keywords: [] });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, [selectedPage.path]);

  const handleSeed = () => {
    const seedData = INITIAL_CONTENT[selectedPage.path];
    if (seedData) {
      setSections(seedData.sections);
      setSeo(seedData.seo);
    }
  };

  const handleUpdateSeed = async () => {
    setShowConfirmSeed(true);
  };

  const confirmUpdateSeed = async () => {
    setIsUpdatingSeed(true);
    try {
      const res = await fetch("/api/admin/update-seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pagePath: selectedPage.path,
          sections,
          seo,
        }),
      });

      if (res.ok) {
        toast.success("Default content updated successfully (Seed Data)");
        // Alert the user that they should commit changes if they want them to persist in git
        console.log("Seed data updated in src/data/initial-content.json");
      } else {
        const error = await res.json();
        toast.error(`Error: ${error.error}`);
      }
    } catch (error) {
      toast.error("Failed to update default content.");
      console.error("Error updating seed data:", error);
    } finally {
      setIsUpdatingSeed(false);
      setShowConfirmSeed(false);
    }
  };

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
          seo,
        }),
      });

      if (res.ok) {
        toast.success(`${selectedPage.name} content saved successfully`);
      } else {
        toast.error(`Failed to save ${selectedPage.name.toLowerCase()} content`);
      }
    } catch (error) {
      toast.error("An error occurred while saving content");
      console.error("Error saving content:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSection = (index: number, field: string, value: any) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const updateNestedItem = (sectionIdx: number, itemIdx: number, arrayField: string, itemField: string, value: any) => {
    const newSections = [...sections];
    const newArray = [...(newSections[sectionIdx][arrayField] || [])];
    newArray[itemIdx] = { ...newArray[itemIdx], [itemField]: value };
    newSections[sectionIdx] = { ...newSections[sectionIdx], [arrayField]: newArray };
    setSections(newSections);
  };

  const addNestedItem = (sectionIdx: number, arrayField: string, defaultItem: any) => {
    const newSections = [...sections];
    const newArray = [...(newSections[sectionIdx][arrayField] || []), defaultItem];
    newSections[sectionIdx] = { ...newSections[sectionIdx], [arrayField]: newArray };
    setSections(newSections);
  };

  const removeNestedItem = (sectionIdx: number, itemIdx: number, arrayField: string) => {
    const newSections = [...sections];
    const newArray = (newSections[sectionIdx][arrayField] || []).filter((_: any, i: number) => i !== itemIdx);
    newSections[sectionIdx] = { ...newSections[sectionIdx], [arrayField]: newArray };
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, {
      sectionId: `section_${Date.now()}`,
      title: "New Section",
      subtitle: "",
      content: "",
      type: "standard",
      imageUrl: "",
      ctaText: "",
      ctaLink: "",
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

          {/* SEO Editor Sidebar */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/40 px-2 flex items-center gap-2">
              <Globe className="w-3 h-3" /> SEO Metadata
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Meta Title</label>
                <input 
                  value={seo.title || ""}
                  onChange={(e) => setSeo({ ...seo, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-xs font-bold focus:outline-none focus:border-[#be1e2e]/50"
                  placeholder="Page SEO Title"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">Meta Description</label>
                <textarea 
                  value={seo.description || ""}
                  onChange={(e) => setSeo({ ...seo, description: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-xs font-bold focus:outline-none focus:border-[#be1e2e]/50 resize-none"
                  placeholder="Page SEO Description"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#be1e2e]/5 border border-[#be1e2e]/20 p-6 rounded-3xl space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e]">Data Management</h4>
            <p className="text-xs font-bold text-white/60 leading-relaxed">
              Restore this page to its default content.
            </p>
            <button
              onClick={handleSeed}
              className="w-full py-3 bg-[#be1e2e]/10 border border-[#be1e2e]/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#be1e2e] hover:bg-[#be1e2e]/20 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3 h-3" /> Seed Initial Content
            </button>
            <div className="pt-2 border-t border-[#be1e2e]/10">
              <p className="text-[10px] font-bold text-white/40 leading-relaxed mb-3">
                Save current changes as the new default for this page.
              </p>
              <button
                onClick={handleUpdateSeed}
                disabled={isUpdatingSeed}
                className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                {isUpdatingSeed ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                Set Current as Default
              </button>
            </div>
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
              Publish Changes
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
                className="space-y-12"
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
                    className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 group relative hover:border-white/20 transition-all shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl font-black text-white/5 group-hover:text-[#be1e2e]/20 transition-colors uppercase tracking-widest">#{idx + 1}</span>
                        <div className="flex items-center gap-3">
                          <select 
                            value={section.type || "standard"}
                            onChange={(e) => updateSection(idx, "type", e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-full py-1 px-4 text-[10px] font-black uppercase tracking-widest text-[#be1e2e] focus:outline-none"
                          >
                            <option value="standard">Standard</option>
                            <option value="hero">Hero</option>
                            <option value="features">Features</option>
                            <option value="form">Dynamic Form</option>
                            <option value="cta">Call to Action</option>
                            <option value="about">About</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            const newSections = [...sections];
                            if (idx > 0) {
                              [newSections[idx], newSections[idx-1]] = [newSections[idx-1], newSections[idx]];
                              setSections(newSections);
                            }
                          }}
                          className="p-2 bg-white/5 hover:bg-white/10 text-white/40 rounded-lg"
                        >
                          ↑
                        </button>
                        <button 
                          onClick={() => {
                            const newSections = [...sections];
                            if (idx < sections.length - 1) {
                              [newSections[idx], newSections[idx+1]] = [newSections[idx+1], newSections[idx]];
                              setSections(newSections);
                            }
                          }}
                          className="p-2 bg-white/5 hover:bg-white/10 text-white/40 rounded-lg"
                        >
                          ↓
                        </button>
                        <button 
                          onClick={() => removeSection(idx)}
                          className="p-3 bg-red-500/5 hover:bg-red-500/10 text-red-500/40 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                      <div className="md:col-span-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Title</label>
                            <input 
                              value={section.title || ""}
                              onChange={(e) => updateSection(idx, "title", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold placeholder:text-white/10 focus:outline-none focus:border-[#be1e2e]/50 transition-all font-sans"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Subtitle / Tagline</label>
                            <input 
                              value={section.subtitle || ""}
                              onChange={(e) => updateSection(idx, "subtitle", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold placeholder:text-white/10 focus:outline-none focus:border-[#be1e2e]/50 transition-all font-sans"
                            />
                          </div>
                        </div>

                        {section.type === "form" && (
                          <div className="space-y-4 pt-4">
                            <label className="text-[10px] font-black text-[#be1e2e] uppercase tracking-widest pl-1 flex items-center gap-2">
                              <Forms className="w-3 h-3" /> Select Integrated Form
                            </label>
                            <select 
                              value={section.formSlug || ""}
                              onChange={(e) => updateSection(idx, "formSlug", e.target.value)}
                              className="w-full bg-[#be1e2e]/5 border border-[#be1e2e]/30 rounded-2xl py-5 px-6 text-white text-sm font-bold focus:outline-none focus:border-[#be1e2e]/50 transition-all cursor-pointer appearance-none shadow-inner"
                            >
                              <option value="" className="bg-black text-white/40">-- Select a Form to Integrate --</option>
                              {availableForms.map((form) => (
                                <option key={form.slug} value={form.slug} className="bg-black text-white">
                                  {form.name} ({form.slug})
                                </option>
                              ))}
                            </select>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                              This section will render the selected form instead of standard content.
                            </p>
                          </div>
                        )}

                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Main Content</label>
                          <textarea 
                            value={section.content || ""}
                            onChange={(e) => updateSection(idx, "content", e.target.value)}
                            rows={6}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold placeholder:text-white/10 focus:outline-none focus:border-[#be1e2e]/50 transition-all resize-none font-sans"
                          />
                        </div>

                        {/* Nested Items Editor (Reasons, Steps, Testimonials, Posts) */}
                        <div className="space-y-6 pt-8 border-t border-white/10">
                          {section.reasons && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e]">Reasons / Features</h4>
                                <Button size="sm" variant="ghost" className="h-7 text-[9px] font-black uppercase text-white/40 hover:text-white" onClick={() => addNestedItem(idx, "reasons", { number: (section.reasons.length + 1).toString(), title: "New Reason", description: "" })}>
                                  <Plus className="w-3 h-3 mr-1" /> Add Reason
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 gap-4">
                                {section.reasons.map((reason: any, rIdx: number) => (
                                  <div key={rIdx} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4">
                                    <div className="flex-1 space-y-3">
                                      <input 
                                        value={reason.title || ""} 
                                        onChange={(e) => updateNestedItem(idx, rIdx, "reasons", "title", e.target.value)}
                                        className="w-full bg-transparent text-xs font-bold text-white focus:outline-none"
                                        placeholder="Reason Title"
                                      />
                                      <textarea 
                                        value={reason.description || ""} 
                                        onChange={(e) => updateNestedItem(idx, rIdx, "reasons", "description", e.target.value)}
                                        className="w-full bg-transparent text-[10px] text-white/60 focus:outline-none resize-none"
                                        placeholder="Reason Description"
                                        rows={2}
                                      />
                                    </div>
                                    <button onClick={() => removeNestedItem(idx, rIdx, "reasons")} className="text-white/10 hover:text-red-500 transition-colors">
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {section.steps && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e]">Process Steps</h4>
                                <Button size="sm" variant="ghost" className="h-7 text-[9px] font-black uppercase text-white/40 hover:text-white" onClick={() => addNestedItem(idx, "steps", { number: (section.steps.length + 1).toString().padStart(2, '0'), title: "New Step", subtitle: "", features: [], image: "" })}>
                                  <Plus className="w-3 h-3 mr-1" /> Add Step
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 gap-4">
                                {section.steps.map((step: any, sIdx: number) => (
                                  <div key={sIdx} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <input 
                                        value={step.title || ""} 
                                        onChange={(e) => updateNestedItem(idx, sIdx, "steps", "title", e.target.value)}
                                        className="bg-transparent text-xs font-black text-white focus:outline-none"
                                        placeholder="Step Title"
                                      />
                                      <button onClick={() => removeNestedItem(idx, sIdx, "steps")} className="text-white/10 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <input 
                                      value={step.subtitle || ""} 
                                      onChange={(e) => updateNestedItem(idx, sIdx, "steps", "subtitle", e.target.value)}
                                      className="w-full bg-transparent text-[10px] text-white/40 focus:outline-none"
                                      placeholder="Step Subtitle / Description"
                                    />
                                    <CloudinaryUpload 
                                      label="Step Image"
                                      currentUrl={step.image}
                                      onUpload={(url) => updateNestedItem(idx, sIdx, "steps", "image", url)}
                                    />
                        </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {section.items && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e]">Testimonials / Items</h4>
                                <Button size="sm" variant="ghost" className="h-7 text-[9px] font-black uppercase text-white/40 hover:text-white" onClick={() => addNestedItem(idx, "items", { name: "New Person", role: "Role", content: "", image: "" })}>
                                  <Plus className="w-3 h-3 mr-1" /> Add Item
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 gap-4">
                                {section.items.map((item: any, iIdx: number) => (
                                  <div key={iIdx} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <input 
                                        value={item.name || ""} 
                                        onChange={(e) => updateNestedItem(idx, iIdx, "items", "name", e.target.value)}
                                        className="bg-transparent text-xs font-black text-white focus:outline-none"
                                        placeholder="Name"
                                      />
                                      <button onClick={() => removeNestedItem(idx, iIdx, "items")} className="text-white/10 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <input 
                                      value={item.role || ""} 
                                      onChange={(e) => updateNestedItem(idx, iIdx, "items", "role", e.target.value)}
                                      className="w-full bg-transparent text-[10px] text-white/40 focus:outline-none"
                                      placeholder="Role"
                                    />
                                    <textarea 
                                      value={item.content || ""} 
                                      onChange={(e) => updateNestedItem(idx, iIdx, "items", "content", e.target.value)}
                                      className="w-full bg-transparent text-[10px] text-white/60 focus:outline-none resize-none"
                                      placeholder="Quote / Content"
                                      rows={2}
                                    />
                                    <CloudinaryUpload 
                                      label="Avatar Image"
                                      currentUrl={item.image}
                                      onUpload={(url) => updateNestedItem(idx, iIdx, "items", "image", url)}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {section.posts && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e]">Blog Posts</h4>
                                <Button size="sm" variant="ghost" className="h-7 text-[9px] font-black uppercase text-white/40 hover:text-white" onClick={() => addNestedItem(idx, "posts", { title: "New Blog Post", date: new Date().toLocaleDateString(), author: "Admin", image: "", excerpt: "" })}>
                                  <Plus className="w-3 h-3 mr-1" /> Add Post
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 gap-4">
                                {section.posts.map((post: any, pIdx: number) => (
                                  <div key={pIdx} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <input 
                                        value={post.title || ""} 
                                        onChange={(e) => updateNestedItem(idx, pIdx, "posts", "title", e.target.value)}
                                        className="bg-transparent text-xs font-black text-white focus:outline-none w-full"
                                        placeholder="Post Title"
                                      />
                                      <button onClick={() => removeNestedItem(idx, pIdx, "posts")} className="text-white/10 hover:text-red-500 transition-colors ml-2">
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <input 
                                        value={post.date || ""} 
                                        onChange={(e) => updateNestedItem(idx, pIdx, "posts", "date", e.target.value)}
                                        className="bg-transparent text-[9px] text-white/40 focus:outline-none"
                                        placeholder="Date"
                                      />
                                      <input 
                                        value={post.author || ""} 
                                        onChange={(e) => updateNestedItem(idx, pIdx, "posts", "author", e.target.value)}
                                        className="bg-transparent text-[9px] text-white/40 focus:outline-none"
                                        placeholder="Author"
                                      />
                                    </div>
                                    <textarea 
                                      value={post.excerpt || ""} 
                                      onChange={(e) => updateNestedItem(idx, pIdx, "posts", "excerpt", e.target.value)}
                                      className="w-full bg-transparent text-[10px] text-white/60 focus:outline-none resize-none"
                                      placeholder="Excerpt"
                                      rows={2}
                                    />
                                    <CloudinaryUpload 
                                      label="Post Thumbnail"
                                      currentUrl={post.image}
                                      onUpload={(url) => updateNestedItem(idx, pIdx, "posts", "image", url)}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {section.portfolioItems && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e]">Portfolio Projects</h4>
                                <Button size="sm" variant="ghost" className="h-7 text-[9px] font-black uppercase text-white/40 hover:text-white" onClick={() => addNestedItem(idx, "portfolioItems", { id: Date.now(), title: "New Project", category: "ui-ux", client: "", year: new Date().getFullYear().toString(), description: "", image: "" })}>
                                  <Plus className="w-3 h-3 mr-1" /> Add Project
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 gap-4">
                                {section.portfolioItems.map((item: any, pIdx: number) => (
                                  <div key={pIdx} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <input 
                                        value={item.title || ""} 
                                        onChange={(e) => updateNestedItem(idx, pIdx, "portfolioItems", "title", e.target.value)}
                                        className="bg-transparent text-xs font-black text-white focus:outline-none w-full"
                                        placeholder="Project Title"
                                      />
                                      <button onClick={() => removeNestedItem(idx, pIdx, "portfolioItems")} className="text-white/10 hover:text-red-500 transition-colors ml-2">
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                      <select 
                                        value={item.category || ""} 
                                        onChange={(e) => updateNestedItem(idx, pIdx, "portfolioItems", "category", e.target.value)}
                                        className="bg-white/5 border border-white/10 rounded-lg text-[9px] text-white/40 focus:outline-none p-1"
                                      >
                                        <option value="ui-ux">UI/UX Design</option>
                                        <option value="development">Web Development</option>
                                        <option value="app">Mobile App</option>
                                      </select>
                                      <input 
                                        value={item.client || ""} 
                                        onChange={(e) => updateNestedItem(idx, pIdx, "portfolioItems", "client", e.target.value)}
                                        className="bg-transparent text-[9px] text-white/40 focus:outline-none"
                                        placeholder="Client"
                                      />
                                      <input 
                                        value={item.year || ""} 
                                        onChange={(e) => updateNestedItem(idx, pIdx, "portfolioItems", "year", e.target.value)}
                                        className="bg-transparent text-[9px] text-white/40 focus:outline-none"
                                        placeholder="Year"
                                      />
                                    </div>
                                    <textarea 
                                      value={item.description || ""} 
                                      onChange={(e) => updateNestedItem(idx, pIdx, "portfolioItems", "description", e.target.value)}
                                      className="w-full bg-transparent text-[10px] text-white/60 focus:outline-none resize-none"
                                      placeholder="Project Description"
                                      rows={2}
                                    />
                                    <CloudinaryUpload 
                                      label="Project Image"
                                      currentUrl={item.image}
                                      onUpload={(url) => updateNestedItem(idx, pIdx, "portfolioItems", "image", url)}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {section.services && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e]">Services List</h4>
                                <Button size="sm" variant="ghost" className="h-7 text-[9px] font-black uppercase text-white/40 hover:text-white" onClick={() => addNestedItem(idx, "services", { id: Date.now(), title: "New Service", image: "" })}>
                                  <Plus className="w-3 h-3 mr-1" /> Add Service
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 gap-4">
                                {section.services.map((service: any, sIdx: number) => (
                                  <div key={sIdx} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <input 
                                        value={service.title || ""} 
                                        onChange={(e) => updateNestedItem(idx, sIdx, "services", "title", e.target.value)}
                                        className="bg-transparent text-xs font-black text-white focus:outline-none w-full"
                                        placeholder="Service Title"
                                      />
                                      <button onClick={() => removeNestedItem(idx, sIdx, "services")} className="text-white/10 hover:text-red-500 transition-colors ml-2">
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <CloudinaryUpload 
                                      label="Service Image"
                                      currentUrl={service.image}
                                      onUpload={(url) => updateNestedItem(idx, sIdx, "services", "image", url)}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {section.stats && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e]">Stats Bar Items</h4>
                                <Button size="sm" variant="ghost" className="h-7 text-[9px] font-black uppercase text-white/40 hover:text-white" onClick={() => addNestedItem(idx, "stats", { label: "New Stat", value: "0" })}>
                                  <Plus className="w-3 h-3 mr-1" /> Add Stat
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 gap-4">
                                {section.stats.map((stat: any, stIdx: number) => (
                                  <div key={stIdx} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <input 
                                        value={stat.label || ""} 
                                        onChange={(e) => updateNestedItem(idx, stIdx, "stats", "label", e.target.value)}
                                        className="bg-transparent text-xs font-black text-white focus:outline-none w-full"
                                        placeholder="Stat Label"
                                      />
                                      <button onClick={() => removeNestedItem(idx, stIdx, "stats")} className="text-white/10 hover:text-red-500 transition-colors ml-2">
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <input 
                                      value={stat.value || ""} 
                                      onChange={(e) => updateNestedItem(idx, stIdx, "stats", "value", e.target.value)}
                                      className="w-full bg-transparent text-[10px] text-white/60 focus:outline-none"
                                      placeholder="Value (e.g. 500+)"
                                    />
                                    <textarea 
                                      value={stat.description || ""} 
                                      onChange={(e) => updateNestedItem(idx, stIdx, "stats", "description", e.target.value)}
                                      className="w-full bg-transparent text-[10px] text-white/40 focus:outline-none resize-none"
                                      placeholder="Description"
                                      rows={2}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {section.teamMembers && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e]">Team Members</h4>
                                <Button size="sm" variant="ghost" className="h-7 text-[9px] font-black uppercase text-white/40 hover:text-white" onClick={() => addNestedItem(idx, "teamMembers", { id: Date.now(), name: "New Member", role: "Team Member", image: "" })}>
                                  <Plus className="w-3 h-3 mr-1" /> Add Member
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 gap-4">
                                {section.teamMembers.map((member: any, tmIdx: number) => (
                                  <div key={tmIdx} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <input 
                                        value={member.name || ""} 
                                        onChange={(e) => updateNestedItem(idx, tmIdx, "teamMembers", "name", e.target.value)}
                                        className="bg-transparent text-xs font-black text-white focus:outline-none w-full"
                                        placeholder="Member Name"
                                      />
                                      <button onClick={() => removeNestedItem(idx, tmIdx, "teamMembers")} className="text-white/10 hover:text-red-500 transition-colors ml-2">
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <input 
                                      value={member.role || ""} 
                                      onChange={(e) => updateNestedItem(idx, tmIdx, "teamMembers", "role", e.target.value)}
                                      className="w-full bg-transparent text-[10px] text-white/60 focus:outline-none"
                                      placeholder="Role"
                                    />
                                    <CloudinaryUpload 
                                      label="Member Image"
                                      currentUrl={member.image}
                                      onUpload={(url) => updateNestedItem(idx, tmIdx, "teamMembers", "image", url)}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">CTA Button Text</label>
                            <input 
                              value={section.ctaText || ""}
                              onChange={(e) => updateSection(idx, "ctaText", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold placeholder:text-white/10 focus:outline-none focus:border-[#be1e2e]/50 transition-all font-sans"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">CTA Button Link</label>
                            <input 
                              value={section.ctaLink || ""}
                              onChange={(e) => updateSection(idx, "ctaLink", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold placeholder:text-white/10 focus:outline-none focus:border-[#be1e2e]/50 transition-all font-mono text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-4 space-y-8">
                        <CloudinaryUpload 
                          label="Section Image / Background"
                          currentUrl={section.imageUrl}
                          onUpload={(url) => updateSection(idx, "imageUrl", url)}
                        />
                        
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                             <Settings className="w-3 h-3" /> Section Settings
                          </h4>
                          <div className="space-y-4">
                             {/* Optional: Add more specific settings here */}
                             <p className="text-[10px] text-white/20 italic">No advanced settings for this section type yet.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <button 
                  onClick={addSection}
                  className="w-full py-14 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-white/20 hover:text-[#be1e2e] hover:border-[#be1e2e]/40 hover:bg-[#be1e2e]/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#be1e2e]/20 transition-all">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Add New Section to {selectedPage.name}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ConfirmDialog 
        isOpen={showConfirmSeed}
        onClose={() => setShowConfirmSeed(false)}
        onConfirm={confirmUpdateSeed}
        title="Set as Default?"
        description="Are you sure you want to set the current content as the default? This will update the master seed data for this page. New versions will start with this content."
        confirmText="Update Default"
      />
    </AdminLayout>
  );
}
