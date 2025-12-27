import React, { useEffect, useState } from "react";
import "./Menu.css";
import { useCart } from "../context/CartContext";

// ✅ Hero images
import chickenBiryani from "../images/chicken-biryani.jpg";
import biryaniImg from "../images/biryani.jpg";
import vegPulao from "../images/veg-pulao.webp";
import spicyChicken from "../images/spicy-chicken-biryani.jpg";

// ✅ Offer images
import offerPizza from "../images/Cheese-pizza.webp";
import offerBurger from "../images/burger-classic-cheese.jpg";
import offerPasta from "../images/white-sauce-pasta.jpg";

const Menu = () => {
  // ---------- OFFERS DATA ----------
  const offers = [
    {
      id: "offer-pizza",
      title: "Buy 1 Get 1 Free Pizza",
      description:
        "Valid till tonight! Grab your cheesy delight now!",
      image: offerPizza,
      price: 399,
    },
    {
      id: "offer-burger",
      title: "Flat 30% OFF on Burgers",
      description:
        "Juicy and loaded with flavors. Order now!",
      image: offerBurger,
      price: 249,
    },
    {
      id: "offer-pasta",
      title: "Free Drink with Pasta",
      description:
        "Perfect combo for a hearty meal.",
      image: offerPasta,
      price: 299, // effective combo price
    },
  ];

  // ---------- STATE ----------
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const OFFER_DURATION = 3 * 60 * 60; // 3 hours in seconds
  const [timeLeft, setTimeLeft] = useState(OFFER_DURATION); // seconds for each slide
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");


  // ---------- FETCH MENU ITEMS ----------
  useEffect(() => {
    fetch("http://localhost:5000/api/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error("Error fetching foods:", err));
  }, []);

  // ---------- OFFER AUTO-SLIDER + COUNTDOWN ----------
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // move to next offer
          setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
          return OFFER_DURATION; // reset timer to 3 hours
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [offers.length]);

  const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};


  const handleAddOfferToCart = (offer) => {
    const cartItem = {
      _id: offer.id, // unique id for cart
      name: offer.title,
      description: offer.description,
      price: offer.price,
      category: "Special Offer",
      image: offer.image,
    };
    addToCart(cartItem);
  };

  // ---------- SEARCH ----------
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    const section = document.getElementById("menu-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredFoods = foods.filter((food) => {
  const term = searchTerm.toLowerCase();

  const matchesSearch =
    !term ||
    food.name.toLowerCase().includes(term) ||
    (food.category && food.category.toLowerCase().includes(term));

  const matchesCategory =
    selectedCategory === "All" ||
    (food.category &&
      food.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return matchesSearch && matchesCategory;
});


  // ---------- JSX ----------
  return (
    <div>
      {/* ================== HERO SECTION ================== */}
      <section className="hero">
        <div className="hero-inner">
          {/* Left side – text + CTAs */}
          <div className="hero-left">
            <p className="hero-tag">Fresh • Fast • Homemade Taste</p>

            <h1>
              Welcome to <span className="brand">SmartBite</span> 🍴
            </h1>

            <p className="hero-subtitle">
              Craving something delicious? Order biryanis, pulao and more from
              SmartBite and get them delivered hot &amp; fresh in minutes.
            </p>

            {/* 🔍 Search bar */}
            <div className="hero-search">
              <input
                type="text"
                placeholder="Search biryani, pulao, kebabs..."
                aria-label="Search dishes"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button type="button" onClick={handleSearchClick}>
                Search
              </button>
            </div>

            <div className="hero-actions">
              <a href="#menu-section" className="hero-btn hero-btn-primary">
                Explore Menu
              </a>
              <a href="#offers" className="hero-btn hero-btn-secondary">
                View Special Offers
              </a>
            </div>

            <div className="hero-meta">
              <div>
                ⭐ <span>4.8/5</span>
                <p>Customer rating</p>
              </div>
              <div>
                ⏱ <span>30 mins</span>
                <p>Average delivery</p>
              </div>
              <div>
                🥘 <span>50+ dishes</span>
                <p>Across all categories</p>
              </div>
            </div>
          </div>

          {/* Right side – food visual */}
          <div className="hero-right">
            <div className="hero-main-card">
              <img
                src={chickenBiryani}
                alt="Chicken Biryani"
                className="hero-main-img"
              />
              <div className="hero-badge">Bestseller</div>
              <div className="hero-price-tag">Starting at ₹199</div>
            </div>

            <div className="hero-thumbs">
              <img src={biryaniImg} alt="Biryani" />
              <img src={vegPulao} alt="Veg Pulao" />
              <img src={spicyChicken} alt="Spicy Chicken Biryani" />
            </div>
          </div>
        </div>
      </section>

      {/* ================== SPECIAL OFFERS ================== */}
      <section id="offers" className="offers">
        <h2>🔥 Special Offers</h2>
        <p className="offers-subtitle">
          Handpicked combos and discounts just for you. Hurry, they refresh
          often!
        </p>

        <div className="offers-grid">
          {offers.map((offer, index) => {
            const isActive = index === currentOfferIndex;
            return (
              <div
                key={offer.id}
                className={`offer-card ${isActive ? "active" : ""}`}
                onClick={() => {
                  setCurrentOfferIndex(index);
                  setTimeLeft(OFFER_DURATION);
                  }}
              >
                <img src={offer.image} alt={offer.title} />
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>

                {isActive && (
                  <div className="offer-footer">
                    <div className="offer-countdown">
                      ⏳ Offer ends in{" "}
                      <span>{formatTime(timeLeft)}</span>
                    </div>
                    <button
                      className="offer-btn"
                      onClick={() => handleAddOfferToCart(offer)}
                    >
                      Add Offer to Cart
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="offer-dots">
          {offers.map((offer, index) => (
            <button
              key={offer.id}
              className={`offer-dot ${
                index === currentOfferIndex ? "active" : ""
              }`}
              onClick={() => {
                setCurrentOfferIndex(index);
                setTimeLeft(OFFER_DURATION);
              }}
              aria-label={`Go to ${offer.title}`}
            />
          ))}
        </div>
      </section>

      {/* ================== FOOD MENU ================== */}
      <section id="menu-section" className="menu-container">
        <h2>🍽️ Our Menu</h2>
        {/* 🔹 Category Filters */}
        <div className="menu-filters">
          {[
            "All",
            "Biryani",
            "Pizza",
            "Burger",
            "Pasta",
            "Rice",
            "Snacks",
            "Chef Special",
            "Indian Veg",
            "Chicken Special",
          ].map((cat) => (
          <button
          key={cat}
          className={`filter-chip ${
            selectedCategory === cat ? "active" : ""
          }`}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat}
          </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <div key={food._id} className="menu-card">
                <img src={food.image} alt={food.name} />
                <h3>{food.name}</h3>
                <p>{food.description}</p>
                <p className="price">₹{food.price}</p>
                <p className="category">{food.category}</p>

                <button className="add-btn" onClick={() => addToCart(food)}>
                  Add to Cart
                </button>
              </div>
            ))
          ) : foods.length === 0 ? (
            <p>Loading food items...</p>
          ) : (
            <p>No items found for “{searchTerm}”.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu;
