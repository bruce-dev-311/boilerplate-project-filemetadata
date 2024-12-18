var express = require('express');
var cors = require('cors');
const multer = require("multer");
const path = require("path");
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({ dest: "uploads/" });

// Route to handle file upload
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (req.file) {
    res.json({
      filename: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
