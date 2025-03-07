//dependencies
const dotenv = require("dotenv");
const express = require('express'); //express
const mongoose = require("mongoose");
const Fruit = require("./models/fruit.js"); // Import the model
dotenv.config();
const app = express();

//connect to MonogDB
mongoose.connect(process.env.MONGODB_URI);
// log connection status
mongoose.connection.on("connected", () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`);
});
mongoose.connection.on("error", (error) => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`);
});

// middleware to access form data sent to server by the browser when created a new fruit
app.use(express.urlencoded({ extended: false}));

// Landing page
app.get("/", (req, res) => {
    res.render("index.ejs");
})

// GET all fruit data READ
app.get("/fruits", async(req, res) => {
    const allFruits = await Fruit.find({});
    console.log(allFruits);
    res.render("fruits/index.ejs", {fruits: allFruits});
});

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
});

//POST /fruits
app.post("/fruits", async(req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
      } else {
        req.body.isReadyToEat = false;
      }
    // or req.body.isReadyToEat = !!req.body.isReadyToEat;
    await Fruit.create(req.body);
    res.redirect("/fruits");
});

app.get("/fruits/:fruitId", async(req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
