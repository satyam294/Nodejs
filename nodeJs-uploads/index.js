const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// create multer middleware to intercept incoming encoded files in the req
//const upload = multer({dest: "uploads/"}); 

// make a disk storage object to save the file in the same format as uploaded

// destination and filename as functions because - the filename and destination
// might be decided dynamically at the time when the uploaded data arrives. 
// dont hardcore, run some logic inside the function to decide the final value, pass that in cb

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // decider logic
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // decider logic
    if(!file) return cb("No file attached");
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("profile-image"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

app.listen(PORT, () => console.log("Server listening on port 8000..."));