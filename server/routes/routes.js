import Messages from "../database/dbMessages.js";
import Groups from "../database/dbGroups.js";

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

  app.post("/group/addgroup", (req, res) => {
    const newGroup = req.body;
    Messages.create(dbMsg, (err, data) => {
      err ? res.status(500).send(err) : res.status(201).send(data);
    });
  });

  app.get("/groups/all", (req, res) => {
    Groups.find((err, data) => {
      err ? res.status(500).send(err) : res.status(200).send(data);
    });
  });

  // app.post("/group/updatemessage", (req, res) => {
  //   const prevGroup = req.body;
  //   Groups.updateOne({ _id: updatedGroup._id }, );
  // });
};
