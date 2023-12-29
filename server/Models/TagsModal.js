import mongoose from "mongoose";

const TagsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tags", TagsSchema);
