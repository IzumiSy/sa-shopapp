const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const stripe = require("stripe")("sk_test_09l3shTSTKHYCzzZZsiLl2vA");
require("dotenv").config();

var app = express();

// view engine setup (Handlebars)
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));

/**
 * Home route
 */
app.get("/", function (req, res) {
  res.render("index");
});

/**
 * Checkout route
 */
app.get("/checkout", function (req, res) {
  // Just hardcoding amounts here to avoid using a database
  const item = req.query.item;
  const { title, amount, error } = getItemByID(item);

  stripe.paymentIntents
    .create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    })
    .then((intent) => {
      console.log(intent);

      res.render("checkout", {
        title: title,
        amount: amount,
        error: error,
      });
    });
});

const getItemByID = (id) => {
  switch (id) {
    case "1":
      return {
        title: "The Art of Doing Science and Engineering",
        amount: 2300,
      };
    case "2":
      return {
        title: "The Making of Prince of Persia: Journals 1985-1993",
        amount: 2500,
      };
    case "3":
      return {
        title: "Working in Public: The Making and Maintenance of Open Source",
        amount: 2800,
      };
    default:
      // Included in layout view, feel free to assign error
      return {
        error: "No item selected",
      };
  }
};

/**
 * Success route
 */
app.get("/success", function (req, res) {
  res.render("success");
});

/**
 * Start server
 */
app.listen(3000, () => {
  console.log("Getting served on port 3000");
});
