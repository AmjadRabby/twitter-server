const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zxfa1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello i am working!");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


client.connect((err) => {
  const postCollection = client.db("twitter").collection("twitterPost");
  //   console.log("db connected");
  app.post("/addPost", (req, res) => {
    const post = req.body;
    postCollection.insertOne(post).then((result) => {
      console.log("post added");
      // res.send(result.insertedCount > 0)
    });
  });

  app.post("/post", (req, res) => {
    postCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
});

app.listen(process.env.PORT || port);
