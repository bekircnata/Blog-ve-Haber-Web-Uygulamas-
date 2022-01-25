const express = require("express");
const router = express.Router();
const http = require("https");
const News = require("../models/News");
const Category = require("../models/Category");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost/BlogApp";

var options = {
  method: "GET",
  hostname: "api.collectapi.com",
  port: null,
  path: "/news/getNews?country=tr&tag=general",
  headers: {
    "content-type": "application/json",
    authorization: "apikey 2vNvctiSPmErBjxuBMSORt:6gjUIu89n3oxEL2QdS91fP",
  },
};

const intervalNews = () => {
  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = JSON.parse(Buffer.concat(chunks));
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("BlogApp");
        dbo.collection("news").insertMany(body.result, function (err, res) {
          if (err) throw err;
          console.log("Number of documents inserted: " + res.insertedCount);
          db.close();
        });
      });
      for (i = 0; i < body.result.length; i++) {
        console.log(body.result[i]);
      }
      return body;
    });
  });

  req.end();
};

//1800000
setInterval(intervalNews, 1800000);

router.get("/news", (req, res) => {
  res.render("pages/news");
});

module.exports = router;
