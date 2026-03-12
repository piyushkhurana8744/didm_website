"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState, useEffect } from "react";
import { 
  Loader2, 
  Search, 
  Trash2, 
  ExternalLink, 
  Image as ImageIcon,
  Grid,
  List as ListIcon,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { toast } from "sonner";

interface MediaItem {
  _id: string;
  url: string;
  publicId: string;
  name: string;
  type: string;
  size?: number;
  format?: string;
  dimensions?: { width: number; height: number };
  createdAt: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      if (Array.isArray(data)) {
        setMedia(data);
      }
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/media?id=${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        setMedia(media.filter(m => m._id !== deleteId));
        toast.success("Asset deleted successfully");
      } else {
        toast.error("Failed to delete asset");
      }
    } catch (error) {
      toast.error("An error occurred during deletion");
    } finally {
      setDeleteId(null);
    }
  };

  const filteredMedia = media.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Media Assets</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#be1e2e] mt-1">Central Media Repository</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-[#be1e2e] text-white" : "text-white/40 hover:text-white"}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-[#be1e2e] text-white" : "text-white/40 hover:text-white"}`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#be1e2e] transition-colors" />
            <input 
              type="text"
              placeholder="Search by asset name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-sm font-bold focus:outline-none focus:border-[#be1e2e]/50 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-4 bg-white/5 border border-white/10 rounded-2xl">
              <Filter className="w-4 h-4 text-white/20" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Latest First</span>
            </div>
            <div className="px-6 py-4 bg-[#be1e2e]/10 border border-[#be1e2e]/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#be1e2e]">
              {filteredMedia.length} Assets
            </div>
          </div>
        </div>

        {/* Media Content */}
        {isLoading ? (
          <div className="h-[40vh] flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-[#be1e2e]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Accessing Cloudinary Storage...</span>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="h-[40vh] bg-white/5 border border-white/10 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <ImageIcon className="w-10 h-10 text-white/10" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter">No assets found</h3>
            <p className="text-white/40 font-bold max-w-xs mt-2">Upload images through the Page Content editor or Theme Settings to populate your library.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            <AnimatePresence>
              {filteredMedia.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-3 bg-red-500/20 hover:bg-red-500/40 text-red-500 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-black uppercase tracking-tight truncate text-white/80">{item.name}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#be1e2e]">
                        {item.format || "img"}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/20">
                        {item.dimensions ? `${item.dimensions.width}x${item.dimensions.height}` : ""}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-white/20">Asset</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-white/20">Name</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-white/20">Specs</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-white/20">Date</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-white/20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedia.map((item) => (
                  <tr key={item._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                        <img src={item.url} alt="" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <p className="text-sm font-bold text-white/80">{item.name}</p>
                      <p className="text-[10px] text-white/20 mt-1 truncate max-w-[200px]">{item.publicId}</p>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#be1e2e]">{item.format}</span>
                        <span className="text-[10px] font-bold text-white/40 mt-1">
                          {item.dimensions ? `${item.dimensions.width}x${item.dimensions.height}` : ""}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-[10px] font-bold text-white/40">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ConfirmDialog 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Asset?"
        description="Are you sure you want to delete this asset? This will permanently remove it from your media library. This action cannot be undone."
        confirmText="Delete Asset"
        variant="destructive"
      />
    </AdminLayout>
  );
}
