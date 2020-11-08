import Messages from "../database/dbMessages.js";

export default (app) => {
  app.get("/", (req, res) => res.status(200).send("Hello World"));

  app.post("/messages/new", (req, res) => {
    const dbMsg = req.body;
    Messages.create(dbMsg, (err, data) => {
      err ? res.status(500).send(err) : res.status(201).send(data);
    });
  });

  app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
      err ? res.status(500).send(err) : res.status(200).send(data);
    });
  });
};
