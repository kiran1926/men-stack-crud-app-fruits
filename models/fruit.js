const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
});

//craete model
const Fruit = mongoose.model("Fruit", fruitSchema);

//export 
module.exports = Fruit;