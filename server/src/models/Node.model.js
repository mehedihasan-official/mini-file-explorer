import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["folder", "file"],
      required: true
    },

    fileType: {
      type: String,
      enum: ["text", "image"],
      default: null
    },

    content: {
      type: String,
      default: ""
    },

    fileUrl: {
      type: String,
      default: null
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Node",
      default: null
    },

    path: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Node", nodeSchema);
