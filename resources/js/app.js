import axios from "axios";
import Noty from "noty";

const addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");
const humberger = document.querySelector(".humberger");
const navList = document.querySelector(".list-items-inner");
const cart = document.querySelector(".cartImg");
const logo = document.querySelector(".logo-side");
const close = document.querySelector(".close-icon");

close.addEventListener("click", () => {
  navList.classList.add("hidden");
  cart.classList.remove("hidden");
  logo.classList.remove("hidden");
});

humberger.addEventListener("click", () => {
  console.log("This is Humberger click");
  navList.classList.remove("hidden");
  cart.classList.add("hidden");
  logo.classList.add("hidden");
});

const updateCart = (pizza) => {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      cartCounter.innerText = res.data.totalQty;

      new Noty({
        type: "success",
        timeout: 1000,
        text: "Item added to cart",
        progressBar: false,
        layout: "topLeft",
      }).show();

      console.log(res.data.totalQty);
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 1000,
        text: "Something went wrong",
        progressBar: false,
      }).show();
    });
};

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const pizzas = JSON.parse(btn.dataset.pizza);
    updateCart(pizzas);
    console.log(pizzas);
  });
});
