import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    category: { type: String, require: true },
    ingredients: { type: Array, default: [], require: true },
    description: String,
    imageURL: String,
    likesCount: { type: Number, default: 0 },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      require: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Menu", MenuSchema);
