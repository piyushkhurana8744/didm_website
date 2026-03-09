import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
  sectionId: { type: String, required: true },
  type: { type: String, default: "standard" }, // e.g., "hero", "features", "about", "cta"
  title: String,
  subtitle: String,
  content: String,
  imageUrl: String,
  ctaText: String,
  ctaLink: String,
  order: { type: Number, default: 0 },
  settings: { type: mongoose.Schema.Types.Mixed, default: {} },
  portfolioItems: [mongoose.Schema.Types.Mixed],
  services: [mongoose.Schema.Types.Mixed],
  stats: [mongoose.Schema.Types.Mixed],
  teamMembers: [mongoose.Schema.Types.Mixed],
  reasons: [mongoose.Schema.Types.Mixed],
  steps: [mongoose.Schema.Types.Mixed],
  posts: [mongoose.Schema.Types.Mixed],
  questions: [mongoose.Schema.Types.Mixed],
}, { strict: false });

const PageContentSchema = new mongoose.Schema({
  pagePath: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  }, // e.g., "/", "/about", "/services"
  pageName: { type: String, required: true },
  sections: [SectionSchema],
  seo: {
    title: String,
    description: String,
    keywords: [String],
  },
}, { timestamps: true });

export default mongoose.models.PageContent || mongoose.model("PageContent", PageContentSchema);
