import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
  name: String,
  members: [String],
  messages: [
    {
      name: String,
      message: String,
      timestamp: String,
    },
  ],
});

export default mongoose.model("groups", groupSchema);
