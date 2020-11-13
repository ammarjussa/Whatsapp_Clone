import mongoose from "mongoose";
import { whatsappSchema } from "./dbMessages.js";

const groupSchema = mongoose.Schema({
  name: String,
  members: [String],
  messages: [whatsappSchema],
});

export default mongoose.model("groups", groupSchema);
