import mongoose from "mongoose";

const FormFieldSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["text", "email", "textarea", "select", "checkbox", "tel"],
    default: "text" 
  },
  placeholder: String,
  required: { type: Boolean, default: false },
  options: [String], // for select/checkbox
  order: { type: Number, default: 0 },
});

const FormDefinitionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Contact Us", "Quote Request"
  slug: { type: String, required: true, unique: true }, // generated from name
  fields: [FormFieldSchema],
  submitButtonText: { type: String, default: "Submit" },
  successMessage: { type: String, default: "Form submitted successfully!" },
  recipientEmail: String, // email to notify on submission
}, { timestamps: true });

export default mongoose.models.FormDefinition || mongoose.model("FormDefinition", FormDefinitionSchema);
