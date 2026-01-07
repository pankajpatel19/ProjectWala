import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    primary_language: { type: String },
    technology: { type: [String], default: [] },
    thumbnail: { type: String },
    file_url: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
