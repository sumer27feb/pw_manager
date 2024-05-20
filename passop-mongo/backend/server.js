const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cors = require("cors");

dotenv.config();

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "passop";
const app = express();
const port = 3000;
app.use(bodyparser.json());
app.use(cors());

client.connect();
const db = client.db(dbName);

// Get all the passwords
app.get("/", async (req, res) => {
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.send(findResult);
});

// Save a passowrd
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult });
});

// Delete a password by id
app.delete("/", async (req, res) => {
  const collection = db.collection("documents");
  const findResult = await collection.find({}).toArray();
  res.send(findResult);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
