import express from "express";
import mongoose from "mongoose";
import APIRoutes from "./routes/routes.js";

// hBu887DFgv3fODcm
const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

const conn_url =
  "mongodb+srv://admin:hBu887DFgv3fODcm@cluster0.zhoy4.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(conn_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

APIRoutes(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
