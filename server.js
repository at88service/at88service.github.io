const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors()); // Allows your website to talk to this server

// 1. Setup where to save the images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/'); // Saves to your local folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keeps the original name
  }
});

const upload = multer({ storage: storage });

// 2. The Upload Route
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ url: `/images/${req.file.filename}` });
});

app.listen(3001, () => console.log('Upload server running on http://localhost:3001'));