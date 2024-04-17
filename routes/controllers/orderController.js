const order = require("../../app/models/order");
const moment = require("moment");

const custOrder = async (req, res) => {
  console.log(req.body);
  const { phone, address } = req.body;

  if (!phone || !address) {
    req.flash("error", "All fields are required");
    res.redirect("/cart");
  }

  const orderData = new order({
    customerId: req?.user?._id,
    items: req.session.cart.items,
    phone: phone,
    address: address,
  });

  orderData
    .save()
    .then((result) => {
      req.flash("success", "Order placed successfully");
      delete req.session.cart;
      res.redirect("/customer/orders");
    })
    .catch((err) => {
      req.flash("error", "Something Went Wrong");
      return res.redirect("/cart");
    });

  // const result = await orderData.save();
  // console.log(result);
};

const index = async (req, res) => {
  const orders = await order.find({ customerId: req.user._id }, null, {
    sort: { creatdAt: -1 },
  });
  res.render("customers/orders", { orders: orders, moment: moment });
  // console.log(orders);
};

module.exports = { custOrder, index };
