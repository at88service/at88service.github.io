const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

// Ensure the directory exists
const dir = './public/images';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// Setup storage logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/'); 
  },
  filename: (req, file, cb) => {
    // This uses the actual name of the file you picked
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  
  // Send back the path that the website will use to show the image
  res.json({ url: `images/${req.file.originalname}` });
});

app.listen(3001, () => console.log('Upload server active at http://localhost:3001'));