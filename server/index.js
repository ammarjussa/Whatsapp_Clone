import express from "express";
import mongoose from "mongoose";
import APIRoutes from "./routes/routes.js";
import Pusher from "pusher";
import cors from "cors";

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1103960",
  key: "952f098bb894c5ef807c",
  secret: "e0985424b173e76fc4ee",
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

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change.fullDocument);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
      });
    }
  });
});

APIRoutes(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
