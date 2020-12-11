import express from "express";
import mongoose from "mongoose";
import APIRoutes from "./routes/routes.js";
import Pusher from "pusher";
import cors from "cors";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

const path = require("path");

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const pusher = new Pusher({
  appId: "1103960",
  key: process.env.pusher_key || "7a0306a85bc21d1a726f",
  secret: process.env.pusher_secret || "1a63345a0faf36136c46",
  cluster: "ap2",
  useTLS: true,
});

app.use(express.json());
app.use(cors());

const conn_url =
  "mongodb+srv://admin:hBu887DFgv3fODcm@cluster0.zhoy4.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(conn_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB is connnected");

  const msgCollection = db.collection("groups");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "update") {
      const newmessage = change.updateDescription.updatedFields;
      pusher.trigger("messages", "inserted", {
        message: newmessage,
      });
    }
  });
});

APIRoutes(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
