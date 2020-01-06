import * as model from "../model_controllers/video";

export async function getVideos (
  req,
  res,
) {
  const data = await model.getAllVideos();

  res.json(data).send()
}

export async function getVideoById (
  req,
  res,
) {
  const id = req.params.id;
  const data = await model.getVideoById(id);

  res.json(data).send();
}

export async function updateVideoById (
  req,
  res
) {
  const id = req.params.id;
  const { title, description } = req.body;

  await model.updateVideoById(
    id,
    { title, description },
  );

  res.code(200).send();
}

export async function createVideo (
  req,
  res,
) {
  const { title, description, youtube_video_id } = req.body;
  await model.createVideo(
    { youtube_video_id, title, description },
  );

  res.send(200);
}

//The fallowing code not teste
//It is just an example
//Mybe it should be in separete js file
//Databse created, url to phpmyadmin http://www.phpmyadmin.co, subject to change
//host: sql7.freesqldatabase.com, username: sql7317899, pass: 763xshZsdn
//Idea is to have some information stored for quick access
//Used on page where category is chosen and videos displayed
//Thumbnail, title, description...
//Possible additional end-points: getAllCategories, addCategorie,
//addVideo (after upload to youtube), getUrlById, getVideosByCategory

var mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7317899",
  password: "763xshZsdn",
  database: "sql7317899"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  return con;
});


app.get('/api/getUrlById/:id',(req, res) => {
  let sql = "SELECT url FROM videos WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.post('/api/addVideo', (req, res) => {
  let data = {url: req.body.url, description: req.body.description, title: req.body.title, category: req.body.category};
  var con = connectToDatabase();
  var sql = "INSERT INTO videos SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


