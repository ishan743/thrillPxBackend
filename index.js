const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post("/api/uploadImage", upload.single("file"), (req, res) => {
    const file = req.file;
    console.log("Image uploaded successfully:", file.filename);
    res.send("Image uploaded successfully");
  });

app.post("/api/uploadLink",(req,res)=>{
    console.log(req);
    res.json({message:"link received"+req.body.link});
})

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});