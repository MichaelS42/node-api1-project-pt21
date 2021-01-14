const express = require("express");
const shortid = require("shortid");

let users = [];

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ hello: "world" });
});
//change

server.get("/hello", (req, res) => {
  res.json({ hello: "world" });
});

//create
server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  userInfo.id = shortid.generate();
  users.push(userInfo);

  res.status(201).json(userInfo);
});

//read
server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.get("/api/users/:id", (req, res) => {
    res.status(200).json(users);
  });

// delete

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const deleted = users.find((user) => user.id === id);

  if (deleted) {
    users = users.filter((user) => user.id !== id);
    res.status(200).json(deleted);
  } else {
    res.status(404).json({ message: "The user with the specified ID does not exist." });
  }
});

//update

server.patch("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  let found = users.find((user) => user.id === id);

  if (found) {
    Object.assign(found, changes);
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "id not found" });
  }
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;


  let index = users.findIndex(user => user.id === id);

  if (index !== -1) {
      users[index] = changes;
      res.status(200)

  } else {
      res.status(404).json({ message: "The user with the specified ID doesn't exist." })
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
