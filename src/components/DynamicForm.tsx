"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DynamicFormProps {
  slug: string;
}

export function DynamicForm({ slug }: DynamicFormProps) {
  const [formDef, setFormDef] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`/api/forms?slug=${slug}`);
        const data = await res.json();
        setFormDef(data);
      } catch (err) {
        console.error("Failed to load form definition");
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [slug]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formSlug: slug, data }),
      });
      if (res.ok) {
        toast.success(formDef.successMessage || "Submission successful!");
        reset();
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred during submission.");
      console.error("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="animate-pulse h-64 bg-white/5 rounded-3xl" />;
  if (!formDef) return <div className="text-white/20">Form not found</div>;

  return (
    <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-10 text-center">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{formDef.name}</h3>
            <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Please fill in the details below</p>
          </div>

          <div className="space-y-6">
            {formDef.fields.map((field: any) => (
              <div key={field.id} className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    {...register(field.id, { required: field.required })}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-[#be1e2e]/50 transition-all resize-none"
                  />
                ) : field.type === "select" ? (
                  <div className="relative">
                    <select
                      {...register(field.id, { required: field.required })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-[#be1e2e]/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-black">Select an option...</option>
                      {field.options?.map((opt: any) => (
                        <option key={opt} value={opt} className="bg-black">{opt}</option>
                      ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                ) : field.type === "checkbox" ? (
                  <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer group">
                    <input
                      type="checkbox"
                      id={field.id}
                      {...register(field.id, { required: field.required })}
                      className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-[#be1e2e] focus:ring-[#be1e2e]/50 cursor-pointer"
                    />
                    <label htmlFor={field.id} className="text-sm font-bold text-white/60 group-hover:text-white transition-colors cursor-pointer">
                      {field.placeholder || "Agree to terms"}
                    </label>
                  </div>
                ) : (
                  <input
                    type={field.type}
                    {...register(field.id, { required: field.required })}
                    placeholder={field.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-[#be1e2e]/50 transition-all"
                  />
                )}
                {errors[field.id] && <span className="text-[10px] text-[#be1e2e] font-bold block pl-1">This field is required</span>}
              </div>
            ))}
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#be1e2e] hover:bg-[#a01824] h-16 rounded-2xl font-black uppercase tracking-widest mt-8 shadow-xl shadow-[#be1e2e]/20"
          >
            {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : formDef.submitButtonText}
          </Button>
        </form>
    </div>
  );
}
