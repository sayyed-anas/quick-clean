const express = require("express");
const homeController = require("./controllers/homeController");
const orderController = require("./controllers/orderController");
const {
  cartController,
  updateController,
} = require("./controllers/customers/cartController");
const authControllers = require("./controllers/authController");
const guest = require(".././app/http/middlewares/guest");

const router = express.Router();

router.get("/", homeController);
router.get("/cart", cartController);
router.get("/login", guest, authControllers.login);
router.post("/login", authControllers.postLogin);
router.get("/register", guest, authControllers.register);
router.post("/register", authControllers.postRegister);
router.post("/update-cart", updateController);
router.post("/logout", authControllers.postLogout);

// Customer Routers
router.post("/orders", orderController.custOrder);
router.get("/customer/orders", orderController.index);

module.exports = router;
