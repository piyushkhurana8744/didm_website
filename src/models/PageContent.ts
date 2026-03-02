import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
  sectionId: { type: String, required: true },
  title: String,
  subtitle: String,
  content: String,
  imageUrl: String,
  order: { type: Number, default: 0 },
});

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
