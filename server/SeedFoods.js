// seedFoods.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Food = require("./models/FoodModel"); // ensure this path is correct

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    // Clear existing foods
    await Food.deleteMany();

    // Insert full menu items
    await Food.insertMany([
      // ----------------- BIRYANI & RICE -----------------
      {
        name: "Chicken Dum Biryani",
        description: "Slow-cooked royal biryani with juicy chicken and spices.",
        price: 399,
        category: "Biryani",
        image: "/images/chicken-biryani.jpg",
      },
      {
        name: "Veg Biryani",
        description: "Aromatic basmati rice cooked with fresh vegetables.",
        price: 299,
        category: "Biryani",
        image: "/images/biryani.jpg",
      },
      {
        name: "Spicy Chicken Biryani",
        description: "Fiery chicken biryani for spice lovers.",
        price: 449,
        category: "Biryani",
        image: "/images/spicy-chicken-biryani.jpg",
      },
      {
        name: "Veg Fried Rice",
        description: "Chinese-style rice stir-fried with mixed veggies.",
        price: 199,
        category: "Rice",
        image: "/images/veg-pulao.webp",
      },
      // ----------------- PIZZA (Fast Food + Snacks) -----------------
      {
        name: "Chicken Pizza",
        description: "Cheesy pizza topped with spicy chicken chunks.",
        price: 299,
        category: "Pizza • Fast Food",
        image: "/images/chicken-pizza.webp",
      },
      {
        name: "Corn Pizza",
        description: "Soft-crust pizza loaded with sweet corn and cheese.",
        price: 199,
        category: "Pizza • Fast Food",
        image: "/images/corn-cheese-pizza.jpg",
      },
      {
        name: "Cheese Pizza",
        description: "Classic extra-cheese delight for cheese lovers.",
        price: 149,
        category: "Pizza • Fast Food",
        image: "/images/Cheese-pizza.webp",
      },

      // ----------------- BURGER (Fast Food + Snacks) -----------------
      {
        name: "Chicken Burger",
        description: "Crunchy chicken patty with creamy mayo and veggies.",
        price: 149,
        category: "Burger • Fast Food",
        image: "/images/Crispy-Chicken-Burger.webp",
      },
      {
        name: "Veg Burger",
        description: "Crispy veg patty with fresh lettuce and sauce.",
        price: 99,
        category: "Burger • Fast Food",
        image: "/images/burger-classic-cheese.jpg",
      },

      // ----------------- PASTA -----------------
      {
        name: "White Sauce Pasta",
        description: "Creamy pasta with herbs & parmesan cheese.",
        price: 249,
        category: "Pasta",
        image: "/images/white-sauce-pasta.jpg",
      },
      {
        name: "Chicken Pasta",
        description: "Rich creamy pasta loaded with tender chicken.",
        price: 249,
        category: "Pasta",
        image: "/images/Apesto-pasta-chicken.webp",
      },

      // ----------------- SNACKS & SIDES -----------------
      {
        name: "French Fries",
        description: "Crispy golden fries served with classic seasoning.",
        price: 99,
        category: "Snacks • Fast Food",
        image: "/images/French-Fries.webp",
      },
      {
        name: "Fried Chicken",
        description: "Crispy fried chicken coated in special spices.",
        price: 299,
        category: "Snacks • Chicken",
        image: "/images/Fried-Chicken.jpg",
      },

      // ----------------- INDIAN VEG SPECIALS -----------------
      {
        name: "Paneer Khurchan",
        description: "Soft paneer cooked in thick spicy Indian gravy.",
        price: 249,
        category: "Indian Veg",
        image: "/images/paneer-khurchan.jpg",
      },

      // ----------------- CASSEROLE / CHEF SPECIALS -----------------
      {
        name: "Cheesy Potato Bake",
        description: "Baked potato casserole with a rich cheesy topping.",
        price: 199,
        category: "Chef Special",
        image: "/images/casserole-dish-potatoes-cheese.jpg",
      },
      {
        name: "Chicken & Veg Casserole",
        description: "Oven-baked chicken with potatoes, beans and veggies.",
        price: 349,
        category: "Chef Special",
        image: "/images/casserole-dish-fried-chicken-potatoes-vegetable-beans.jpg",
      },
      {
        name: "Meatball Potato Casserole",
        description: "Cheesy potato casserole topped with juicy meatballs.",
        price: 299,
        category: "Chef Special",
        image: "/images/potatoes-casserole-dish-fried-meatballs.jpg",
      },

      // ----------------- EXTRA CHICKEN DISH -----------------
      {
        name: "Green Sprouts Spicy Chicken",
        description: "Spicy chicken served with fresh green sprouts.",
        price: 199,
        category: "Chicken Special",
        image: "/images/spicychicken-green-sprouts--homemade-spicy-chicken.jpg",
      },
    ]);

    console.log("🎉 All menu items inserted successfully!");
    process.exit();
  })
  .catch((err) => {
    console.log("❌ Error seeding foods:", err);
    process.exit(1);
  });