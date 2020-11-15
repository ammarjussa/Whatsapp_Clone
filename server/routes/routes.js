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

  app.post("/groups/addgroup", (req, res) => {
    const newGroup = req.body;
    Groups.create(newGroup, (err, data) => {
      err ? res.status(500).send(err) : res.status(201).send(data);
    });
  });

  app.get("/groups/all", (req, res) => {
    Groups.find((err, data) => {
      err ? res.status(500).send(err) : res.status(200).send(data);
    });
  });

  app.post("/groups/addmember", (req, res) => {
    Groups.updateOne(
      { _id: req.body._id },
      { $push: { members: req.body.member } },
      (err, data) => {
        err ? res.status(500).send(err) : res.status(201).send(data);
      }
    );
  });

  app.post("/groups/addmessage", (req, res) => {
    console.log(req.body);

    Groups.updateOne(
      { _id: req.body._id },
      {
        $push: {
          messages: {
            name: req.body.message.name,
            message: req.body.message.message,
          },
        },
      },
      (err, data) => {
        err ? res.status(500).send(err) : res.status(201).send(data);
      }
    );
  });

  app.get("/groups/singlegroup", (req, res) => {
    Groups.findOne({ _id: req.body._id }, (err, data) => {
      err ? res.status(500).send(err) : res.status(200).send(data);
    });
  });
};
