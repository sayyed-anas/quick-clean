const mongoose = require("mongoose");

const monSchema = new mongoose.Schema({
  Carts: [
    {
      img: String,
      name: String,
      delivery: String,
      price: Number,
      btn: String,
    },
  ],
});

module.exports = mongoose.model("munus", monSchema);
