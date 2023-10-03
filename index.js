const express = require("express");
const Datastore = require("nedb");
const fetch = require('node-fetch');

const wmo = require('./wmo.json');

const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
      if (err) {
        response.end();
        return;
      }
      response.send(data);
    });
});

app.post("/api", (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

app.get("/w/:latlon", async (request, response) => {
  // console.log(request.params);
  const latlon = request.params.latlon.split(',');
  const lat = latlon[0];
  const lon = latlon[1];

  const api_url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}8&hourly=temperature_2m&hourly=weathercode&timezone=GMT`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});

app.get("/wmo", async (request, response)=> {
  const data = request.body;
  const condition = data.cond;
  // const wmoCond = JSON.stringify(wmo);
  response.json(wmo);
});