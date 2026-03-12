"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, 
  Loader2, 
  CheckCircle2, 
  Settings,
  Globe,
  Plus,
  Trash2,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function GlobalSettingsPage() {
  const [activeTab, setActiveTab] = useState<"navbar" | "footer">("navbar");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [navbarData, setNavbarData] = useState<any>({ sections: [{ items: [] }] });
  const [footerData, setFooterData] = useState<any>({ sections: [] });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      try {
        const [navRes, footerRes] = await Promise.all([
          fetch("/api/content?path=__navbar"),
          fetch("/api/content?path=__footer")
        ]);
        const nav = await navRes.json();
        const footer = await footerRes.json();
        
        if (nav.sections) setNavbarData(nav);
        if (footer.sections) setFooterData(footer);
      } catch (error) {
        console.error("Error fetching global settings:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const data = activeTab === "navbar" ? navbarData : footerData;
      const path = activeTab === "navbar" ? "__navbar" : "__footer";
      const pageName = activeTab === "navbar" ? "Navbar" : "Footer";

      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pagePath: path,
          pageName: pageName,
          sections: data.sections,
          seo: {}
        }),
      });

      if (res.ok) {
        // Also update seed data
        await fetch("/api/admin/update-seed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pagePath: path,
            sections: data.sections,
            seo: {}
          }),
        });

        toast.success(`${pageName} updated successfully`);
      } else {
        toast.error(`Failed to update ${pageName.toLowerCase()}`);
      }
    } catch (error) {
      toast.error("An error occurred while saving");
      console.error("Error saving global settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const addNavItem = () => {
    const newItems = [...navbarData.sections[0].items, { name: "New Link", href: "/", hasDropdown: false }];
    setNavbarData({ ...navbarData, sections: [{ ...navbarData.sections[0], items: newItems }] });
  };

  const removeNavItem = (index: number) => {
    const newItems = navbarData.sections[0].items.filter((_: any, i: number) => i !== index);
    setNavbarData({ ...navbarData, sections: [{ ...navbarData.sections[0], items: newItems }] });
  };

  const updateNavItem = (index: number, field: string, value: any) => {
    const newItems = [...navbarData.sections[0].items];
    newItems[index] = { ...newItems[index], [field]: value };
    setNavbarData({ ...navbarData, sections: [{ ...navbarData.sections[0], items: newItems }] });
  };

  if (!isLoaded) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#be1e2e]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-10 pb-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#be1e2e] flex items-center justify-center shadow-lg shadow-[#be1e2e]/20">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter">Global Settings</h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mt-1">Manage Navbar, Footer and Site-wide components</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-4 bg-[#be1e2e] rounded-2xl font-black uppercase text-[12px] tracking-widest flex items-center gap-3 hover:bg-[#a01824] transition-all shadow-xl shadow-[#be1e2e]/20"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("navbar")}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === "navbar" ? "bg-[#be1e2e] text-white shadow-lg shadow-[#be1e2e]/20" : "text-white/40 hover:text-white"
            }`}
          >
            Navbar
          </button>
          <button
            onClick={() => setActiveTab("footer")}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === "footer" ? "bg-[#be1e2e] text-white shadow-lg shadow-[#be1e2e]/20" : "text-white/40 hover:text-white"
            }`}
          >
            Footer
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {activeTab === "navbar" ? (
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#be1e2e]">Navigation Items</h3>
                <Button 
                  onClick={addNavItem}
                  variant="outline" 
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl px-4 py-2"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Item
                </Button>
              </div>

              <div className="space-y-4">
                {navbarData.sections[0].items.map((item: any, index: number) => (
                  <div key={index} className="group relative bg-white/5 border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/[0.07] hover:border-[#be1e2e]/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Label</label>
                        <input 
                          type="text"
                          value={item.name || ""}
                          onChange={(e) => updateNavItem(index, "name", e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-[#be1e2e]/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Href (Link)</label>
                        <input 
                          type="text"
                          value={item.href || ""}
                          onChange={(e) => updateNavItem(index, "href", e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-[#be1e2e]/50"
                        />
                      </div>
                      <div className="flex flex-col justify-center gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Has Dropdown</label>
                        <button
                          onClick={() => updateNavItem(index, "hasDropdown", !item.hasDropdown)}
                          className={`w-12 h-6 rounded-full p-1 transition-all ${item.hasDropdown ? "bg-[#be1e2e]" : "bg-white/10"}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${item.hasDropdown ? "translate-x-6" : "translate-x-0"}`} />
                        </button>
                      </div>
                      <div className="flex items-center justify-end">
                        <button 
                          onClick={() => removeNavItem(index)}
                          className="p-3 text-white/20 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    {item.hasDropdown && (
                      <div className="mt-8 pl-10 border-l border-white/10 space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Dropdown Items</h4>
                        {(item.dropdownItems || []).map((subItem: any, subIndex: number) => (
                           <div key={subIndex} className="group/sub flex items-center gap-4">
                              <div className="flex-1 grid grid-cols-2 gap-4">
                                <input 
                                  type="text"
                                  placeholder="Sub-item Name"
                                  value={subItem.name || ""}
                                  onChange={(e) => {
                                    const newSubItems = [...(item.dropdownItems || [])];
                                    newSubItems[subIndex] = { ...subItem, name: e.target.value };
                                    updateNavItem(index, "dropdownItems", newSubItems);
                                  }}
                                  className="bg-black/20 border border-white/5 rounded-xl px-4 py-2 text-[11px] font-bold text-white transition-all focus:border-[#be1e2e]/30"
                                />
                                <input 
                                  type="text"
                                  placeholder="Sub-item Href"
                                  value={subItem.href || ""}
                                  onChange={(e) => {
                                    const newSubItems = [...(item.dropdownItems || [])];
                                    newSubItems[subIndex] = { ...subItem, href: e.target.value };
                                    updateNavItem(index, "dropdownItems", newSubItems);
                                  }}
                                  className="bg-black/20 border border-white/5 rounded-xl px-4 py-2 text-[11px] font-bold text-white transition-all focus:border-[#be1e2e]/30"
                                />
                              </div>
                              <button 
                                onClick={() => {
                                  const newSubItems = (item.dropdownItems || []).filter((_: any, i: number) => i !== subIndex);
                                  updateNavItem(index, "dropdownItems", newSubItems);
                                }}
                                className="p-2 text-white/10 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all"
                                title="Delete Sub-item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                           </div>
                        ))}
                        <Button 
                          onClick={() => {
                            const newSubItems = [...(item.dropdownItems || []), { name: "New Sub-item", href: "/" }];
                            updateNavItem(index, "dropdownItems", newSubItems);
                          }}
                          className="bg-[#be1e2e]/10 text-[#be1e2e] hover:bg-[#be1e2e]/20 border border-[#be1e2e]/20 text-[10px] font-black uppercase"
                        >
                          Add Sub-item
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Footer Sections Mapper */}
              {footerData.sections.map((section: any, idx: number) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#be1e2e]">{section.sectionId.replace('footer_', '').replace('_', ' ')}</h3>
                  
                  {section.sectionId === 'footer_brand' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Description</label>
                        <textarea 
                          value={section.description || ""}
                          onChange={(e) => {
                            const newSections = [...footerData.sections];
                            newSections[idx] = { ...section, description: e.target.value };
                            setFooterData({ ...footerData, sections: newSections });
                          }}
                          rows={3}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold text-white"
                        />
                      </div>
                    </div>
                  )}

                  {section.sectionId === 'footer_contact' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Email</label>
                        <input 
                          type="text"
                          value={section.email || ""}
                          onChange={(e) => {
                            const newSections = [...footerData.sections];
                            newSections[idx] = { ...section, email: e.target.value };
                            setFooterData({ ...footerData, sections: newSections });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Address</label>
                        <input 
                          type="text"
                          value={section.address || ""}
                          onChange={(e) => {
                            const newSections = [...footerData.sections];
                            newSections[idx] = { ...section, address: e.target.value };
                            setFooterData({ ...footerData, sections: newSections });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Phone</label>
                        <input 
                          type="text"
                          value={section.phone || ""}
                          onChange={(e) => {
                            const newSections = [...footerData.sections];
                            newSections[idx] = { ...section, phone: e.target.value };
                            setFooterData({ ...footerData, sections: newSections });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white"
                        />
                      </div>
                    </div>
                  )}

                  {(section.links) && (
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Links</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.links.map((link: any, lIdx: number) => (
                          <div key={lIdx} className="group/link flex items-center gap-2">
                            <input 
                              type="text"
                              value={link.label || ""}
                              onChange={(e) => {
                                const newSections = [...footerData.sections];
                                const newLinks = [...section.links];
                                newLinks[lIdx] = { ...link, label: e.target.value };
                                newSections[idx] = { ...section, links: newLinks };
                                setFooterData({ ...footerData, sections: newSections });
                              }}
                              placeholder="Label"
                              className="w-1/2 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-white"
                            />
                            <input 
                              type="text"
                              value={link.href || ""}
                              onChange={(e) => {
                                const newSections = [...footerData.sections];
                                const newLinks = [...section.links];
                                newLinks[lIdx] = { ...link, href: e.target.value };
                                newSections[idx] = { ...section, links: newLinks };
                                setFooterData({ ...footerData, sections: newSections });
                              }}
                              placeholder="Href"
                              className="w-1/2 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-white"
                            />
                            <button 
                              onClick={() => {
                                const newSections = [...footerData.sections];
                                const newLinks = section.links.filter((_: any, i: number) => i !== lIdx);
                                newSections[idx] = { ...section, links: newLinks };
                                setFooterData({ ...footerData, sections: newSections });
                              }}
                              className="p-2 text-white/10 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all"
                              title="Delete Link"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
