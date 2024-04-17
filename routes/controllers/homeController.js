const cartModel = require("../../app/models/cartModel");

const homeController = async (req, res) => {
  const all_carts = await cartModel.findOne({
    _id: "65c5f20b7b91d5363931bcb4",
  });

  res.render("home", { all_carts: all_carts });
};

module.exports = homeController;
