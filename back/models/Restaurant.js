import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    type: { type: String, require: true },
    imageURL: String,
    tags: { type: Array, default: [] },
    viewsCount: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  },
  { timestamps: true },
);

export default mongoose.model("Restaurant", RestaurantSchema);
