import mongoose from "mongoose";

const FormSubmissionSchema = new mongoose.Schema({
  formSlug: { type: String, required: true, index: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  ip: String,
  userAgent: String,
}, { timestamps: true });

export default mongoose.models.FormSubmission || mongoose.model("FormSubmission", FormSubmissionSchema);
