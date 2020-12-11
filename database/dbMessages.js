import mongoose from "mongoose";

export const whatsappSchema = mongoose.Schema({
  message: String,
  name: String,
});

export default mongoose.model("messagecontents", whatsappSchema);
