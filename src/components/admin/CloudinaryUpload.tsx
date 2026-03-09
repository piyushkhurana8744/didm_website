"use client";

import { useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import MediaLibrary from "./MediaLibrary";

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
  label?: string;
}

export default function CloudinaryUpload({ onUpload, currentUrl, label }: CloudinaryUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const saveToMediaLibrary = async (uploadData: any) => {
    try {
      await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: uploadData.secure_url,
          publicId: uploadData.public_id,
          name: uploadData.original_filename || "Untitiled Image",
          type: "image",
          size: uploadData.bytes,
          format: uploadData.format,
          dimensions: {
            width: uploadData.width,
            height: uploadData.height,
          },
        }),
      });
    } catch (err) {
      console.error("Failed to save to media library:", err);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      // 1. Get signature
      const timestamp = Math.round(new Date().getTime() / 1000);
      const sigRes = await fetch("/api/cloudinary", {
        method: "POST",
        body: JSON.stringify({ timestamp }),
      });
      const { signature, api_key, cloud_name } = await sigRes.json();

      // 2. Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("upload_preset", "didm_preset"); 

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await uploadRes.json();
      if (data.secure_url) {
        onUpload(data.secure_url);
        // Save to our database for the library
        await saveToMediaLibrary(data);
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {label && <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">{label}</label>}
      
      <div className="flex gap-2 mb-2">
        <label className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white">
          <Upload className="w-3 h-3" />
          Upload New
          <input type="file" className="hidden" onChange={handleUpload} disabled={isUploading} accept="image/*" />
        </label>
        <button 
          onClick={() => setIsLibraryOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#be1e2e]/10 border border-[#be1e2e]/20 rounded-xl hover:bg-[#be1e2e]/20 transition-all text-[10px] font-black uppercase tracking-widest text-[#be1e2e]"
        >
          <Library className="w-3 h-3" />
          Open Library
        </button>
      </div>

      <div className="relative group">
        {currentUrl ? (
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
            <img src={currentUrl} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onUpload("")}
                className="flex items-center gap-2 py-2 px-4 bg-red-500/20 hover:bg-red-500/40 text-red-500 rounded-lg transition-all text-[9px] font-black uppercase tracking-widest"
              >
                <X className="w-3 h-3" />
                Remove
              </button>
              {isUploading && (
                <div className="flex items-center gap-2 text-[#be1e2e]">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Uploading...</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center aspect-video bg-white/5 border border-white/10 border-dashed rounded-2xl opacity-40">
            {isUploading ? (
              <Loader2 className="w-8 h-8 animate-spin text-[#be1e2e]" />
            ) : (
              <>
                <ImageIcon className="w-8 h-8 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-widest">No Image Selected</span>
              </>
            )}
          </div>
        )}
      </div>
      
      {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest pl-1">{error}</p>}

      <MediaLibrary 
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelect={(url) => {
          onUpload(url);
          setIsLibraryOpen(false);
        }}
      />
    </div>
  );
}
