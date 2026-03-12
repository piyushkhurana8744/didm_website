"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Save, 
  Trash2, 
  GripVertical,
  Settings2,
  List,
  CheckSquare,
  ChevronDown,
  Layout,
  FileText,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fieldTypes = [
  { id: "text", name: "Text Input", icon: FileText },
  { id: "email", name: "Email Input", icon: FileText },
  { id: "textarea", name: "Text Area", icon: List },
  { id: "select", name: "Dropdown", icon: ChevronDown },
  { id: "checkbox", name: "Checkbox", icon: CheckSquare },
  { id: "tel", name: "Phone Input", icon: FileText },
];

export default function FormBuilderPage() {
  const [forms, setForms] = useState<any[]>([]);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newFormName, setNewFormName] = useState("");
  const [deleteFormSlug, setDeleteFormSlug] = useState<string | null>(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const res = await fetch("/api/forms");
      const data = await res.json();
      setForms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching forms:", error);
      setForms([]);
    }
  };

  const handleSave = async () => {
    if (!selectedForm) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedForm),
      });

      if (res.ok) {
        toast.success("Form saved successfully");
        fetchForms();
      } else {
        toast.error("Failed to save form");
      }
    } catch (error) {
      toast.error("Error occurred while saving");
      console.error("Error saving form:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const addField = (type: string) => {
    if (!selectedForm) return;
    const newField = {
      id: `f_${Date.now()}`,
      label: "New Field",
      type,
      required: false,
      placeholder: "Enter value...",
    };
    setSelectedForm({
      ...selectedForm,
      fields: [...(selectedForm.fields || []), newField]
    });
  };

  const removeField = (id: string) => {
    if (!selectedForm?.fields) return;
    setSelectedForm({
      ...selectedForm,
      fields: selectedForm.fields.filter((f: any) => f.id !== id)
    });
  };

  const updateField = (id: string, updates: any) => {
    if (!selectedForm?.fields) return;
    setSelectedForm({
      ...selectedForm,
      fields: selectedForm.fields.map((f: any) => f.id === id ? { ...f, ...updates } : f)
    });
  };

  const deleteForm = async (slug: string) => {
    setDeleteFormSlug(slug);
  };

  const confirmDeleteForm = async () => {
    if (!deleteFormSlug) return;
    try {
      const res = await fetch(`/api/forms?slug=${deleteFormSlug}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Form deleted successfully");
        if (selectedForm?.slug === deleteFormSlug) setSelectedForm(null);
        fetchForms();
      } else {
        toast.error("Failed to delete form");
      }
    } catch (error) {
      toast.error("Error deleting form");
    } finally {
      setDeleteFormSlug(null);
    }
  };

  const handleCreateConfirm = () => {
    if (!newFormName.trim()) return;
    const slug = newFormName.toLowerCase().trim().replace(/ /g, "-");
    const newForm = { name: newFormName, slug, fields: [], submitButtonText: "Submit" };
    setSelectedForm(newForm);
    setIsCreateDialogOpen(false);
    setNewFormName("");
  };

  const createNewForm = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row gap-10 h-full">
        {/* Forms List */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/40 px-2">Your Forms</h3>
                  <div className="space-y-1">
              {Array.isArray(forms) && forms.map((form) => (
                <div
                  key={form.slug}
                  className={`group w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 ${
                    selectedForm?.slug === form.slug 
                      ? "bg-[#be1e2e]/10 border border-[#be1e2e]/20 text-white" 
                      : "text-white/40 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <button
                    onClick={() => setSelectedForm(form)}
                    className="flex-1 flex items-center gap-3 text-left"
                  >
                    <Layout className={`w-4 h-4 ${selectedForm?.slug === form.slug ? "text-[#be1e2e]" : ""}`} />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold uppercase tracking-tight">{form.name}</span>
                      <span className="text-[8px] font-black text-white/10 uppercase tracking-widest">{form.fields?.length || 0} fields</span>
                    </div>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteForm(form.slug);
                    }}
                    className="p-2 text-white/0 group-hover:text-white/20 hover:text-red-500 transition-all rounded-lg hover:bg-red-500/5"
                    title="Delete Form"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={createNewForm}
              className="w-full py-4 bg-white/5 rounded-2xl font-black uppercase text-[10px] tracking-widest text-white/40 hover:text-white hover:bg-white/[0.08] transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-3 h-3" />
              Create New Form
            </button>
          </div>
        </div>

        {/* Builder View */}
        <div className="flex-1 space-y-8 pb-20">
          {!selectedForm ? (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center bg-white/5 border border-white/10 border-dashed rounded-[3rem]">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Layout className="w-10 h-10 text-white/10" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Form Builder</h3>
              <p className="text-white/40 font-bold max-w-sm">Select an existing form or create a new one to start building your custom forms.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#be1e2e]/10 flex items-center justify-center border border-[#be1e2e]/20">
                    <Layout className="w-6 h-6 text-[#be1e2e]" />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={selectedForm.name || ""}
                      onChange={(e) => setSelectedForm({ ...selectedForm, name: e.target.value })}
                      className="bg-transparent border-none p-0 text-3xl font-black uppercase tracking-tighter focus:ring-0 w-full"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Slug:</span>
                      <code className="text-[10px] font-mono text-[#be1e2e] bg-[#be1e2e]/10 px-2 py-0.5 rounded-md">{selectedForm.slug}</code>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mt-1">CUSTOM FORM BUILDER</span>
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-8 py-4 bg-[#be1e2e] rounded-2xl font-black uppercase text-[12px] tracking-widest flex items-center gap-3 hover:bg-[#a01824] transition-all disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Form Schema
                </button>
              </div>

              {/* Form Preview / Builder Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Field Palette */}
                <div className="xl:col-span-3 space-y-6">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl sticky top-8">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6 px-2">Available Fields</h3>
                    <div className="space-y-3">
                      {fieldTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => addField(type.id)}
                          className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.08] transition-all border border-transparent hover:border-white/10 group text-left"
                        >
                          <type.icon className="w-4 h-4 text-white/20 group-hover:text-[#be1e2e] transition-colors" />
                          <span className="text-[11px] font-black uppercase tracking-widest">{type.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Drag Area */}
                <div className="xl:col-span-9 space-y-6">
                  <AnimatePresence>
                    {(selectedForm.fields || []).map((field: any, idx: number) => (
                      <motion.div
                        key={field.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-6 group flex items-center gap-6 hover:border-[#be1e2e]/30 transition-all shadow-sm"
                      >
                        <div className="cursor-grab active:cursor-grabbing text-white/10 group-hover:text-white/30">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Label</label>
                            <input 
                              value={field.label || ""}
                              onChange={(e) => updateField(field.id, { label: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-[#be1e2e]/50 transition-all"
                            />
                          </div>
...
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Type</label>
                            <div className="relative">
                              <select 
                                className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-[#be1e2e]/50 transition-all uppercase tracking-widest"
                                value={field.type || "text"}
                                onChange={(e) => updateField(field.id, { type: e.target.value })}
                              >
                                {fieldTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Placeholder</label>
                            <input 
                              value={field.placeholder || ""}
                              onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-[#be1e2e]/50 transition-all"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="p-3 rounded-xl bg-white/5 border border-transparent hover:border-[#be1e2e]/20 hover:bg-[#be1e2e]/5 text-white/20 hover:text-[#be1e2e] transition-all">
                            <Settings2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => removeField(field.id)}
                            className="p-3 rounded-xl bg-red-500/5 border border-transparent hover:border-red-500/20 text-red-500/20 hover:text-red-500 transition-all font-sans"
                            title="Remove Field"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <button className="w-full py-8 border-2 border-dashed border-white/5 rounded-[2rem] flex items-center justify-center gap-4 text-white/20 hover:text-[#be1e2e] hover:border-[#be1e2e]/30 hover:bg-[#be1e2e]/5 transition-all group font-black uppercase text-[10px] tracking-[0.3em]">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#be1e2e]/20 transition-all">
                      <Plus className="w-5 h-5" />
                    </div>
                    Drop New Field Here
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Create New Form</DialogTitle>
            <DialogDescription className="text-white/40 font-bold">
              Give your new form a name to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-white/40">
                Form Name
              </Label>
              <Input
                id="name"
                value={newFormName}
                onChange={(e) => setNewFormName(e.target.value)}
                placeholder="e.g. Contact Us"
                className="bg-white/5 border-white/10 rounded-xl py-6 font-bold"
                onKeyDown={(e) => e.key === "Enter" && handleCreateConfirm()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleCreateConfirm} 
              disabled={!newFormName.trim()}
              className="w-full py-6 bg-[#be1e2e] hover:bg-[#a01824] rounded-xl font-black uppercase text-[12px] tracking-widest"
            >
              Start Building
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ConfirmDialog 
        isOpen={!!deleteFormSlug}
        onClose={() => setDeleteFormSlug(null)}
        onConfirm={confirmDeleteForm}
        title="Delete Form?"
        description="Are you sure you want to delete this entire form? This action cannot be undone and will remove all associated field definitions."
        confirmText="Delete Form"
        variant="destructive"
      />
    </AdminLayout>
  );
}
