"use client";

import { useState, useEffect } from "react";
import { 
  X, 
  Search, 
  Image as ImageIcon, 
  Loader2, 
  Check, 
  Trash2,
  ExternalLink
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
  createdAt: string;
}

interface MediaLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function MediaLibrary({ isOpen, onClose, onSelect }: MediaLibraryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

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

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/media?id=${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        setMedia(media.filter(m => m._id !== deleteId));
        if (selectedId === deleteId) setSelectedId(null);
        toast.success("Image deleted successfully");
      } else {
        toast.error("Failed to delete image");
      }
    } catch (error) {
      toast.error("Error occurred during deletion");
    } finally {
      setDeleteId(null);
    }
  };

  const filteredMedia = media.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl h-[80vh] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Media Library</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#be1e2e]">Asset Management</p>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Toolbar */}
            <div className="px-8 py-6 bg-white/[0.02] border-b border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="text"
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-[#be1e2e]/50 transition-all"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
                  {filteredMedia.length} Items Found
                </span>
                <Button 
                  disabled={!selectedId}
                  onClick={() => {
                    const item = media.find(m => m._id === selectedId);
                    if (item) onSelect(item.url);
                  }}
                  className="bg-[#be1e2e] hover:bg-[#a01824] text-white rounded-xl px-6 py-2 h-auto text-xs font-black uppercase tracking-widest disabled:opacity-30 transition-all"
                >
                  Apply Selection
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="w-10 h-10 animate-spin text-[#be1e2e]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Loading your assets...</span>
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                  <ImageIcon className="w-16 h-16 mb-6" />
                  <h3 className="text-xl font-bold uppercase tracking-tight">No Media Found</h3>
                  <p className="text-xs font-medium max-w-xs mt-2">Upload some images in the editor to see them here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {filteredMedia.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedId(item._id)}
                      className={`relative aspect-square rounded-3xl overflow-hidden cursor-pointer border-2 transition-all ${
                        selectedId === item._id 
                          ? "border-[#be1e2e] shadow-xl shadow-[#be1e2e]/20" 
                          : "border-white/5 hover:border-white/20"
                      }`}
                    >
                      <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                      
                      {/* Overlays */}
                      <div className={`absolute inset-0 bg-[#be1e2e]/20 transition-opacity ${selectedId === item._id ? "opacity-100" : "opacity-0"}`} />
                      
                      {selectedId === item._id && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-[#be1e2e] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[9px] font-bold text-white/80 truncate pr-2">{item.name}</span>
                      </div>
                      
                      {/* Action buttons on hover */}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                        <button 
                          onClick={(e) => handleDelete(e, item._id)}
                          className="p-3 bg-red-500/20 hover:bg-red-500/40 text-red-500 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer Information */}
            <div className="px-8 py-4 bg-white/[0.01] border-t border-white/5 flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/10">Connected to Cloudinary</span>
              <div className="flex items-center gap-4">
                {selectedId && (
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#be1e2e]">
                    1 Asset Selected
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <ConfirmDialog 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Image?"
        description="Are you sure you want to delete this image? This will not delete it from Cloudinary, only from your library list. This action cannot be undone."
        confirmText="Delete Image"
        variant="destructive"
      />
    </AnimatePresence>
  );
}
