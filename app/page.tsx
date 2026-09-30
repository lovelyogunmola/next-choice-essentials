'use client';

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  icon: string;
  badge?: string;
};

const products: Product[] = [
  { id: 1, name: "Wireless LED Desk Lamp", category: "Home Essentials", price: 18500, icon: "💡", badge: "Popular" },
  { id: 2, name: "Car Phone Holder", category: "Car Accessories", price: 9500, icon: "🚗", badge: "New" },
  { id: 3, name: "Smart RGB Night Light", category: "Smart Gadgets", price: 12500, icon: "🌈" },
  { id: 4, name: "Portable Mini Fan", category: "Smart Gadgets", price: 14500, icon: "🌀" },
  { id: 5, name: "Car Cleaning Kit", category: "Car Accessories", price: 22000, icon: "✨" },
  { id: 6, name: "Storage Organizer Set", category: "Home Essentials", price: 17500, icon: "🧺" },
];

const categories = ["All", "Home Essentials", "Car Accessories", "Smart Gadgets"];

function money(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  function addToCart(product: Product) {
    setCart((current) => [...current, product]);
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main>
      <header className="header">
        <div className="container nav">
          <div className="brand">
            <span className="brand-mark">NC</span>
            <div>
              <strong>Next Choice</strong>
              <small>ESSENTIALS</small>
            </div>
          </div>
          <nav className="nav-links">
            <a href="#shop">Shop</a>
            <a href="#categories">Categories</a>
            <a href="#about">About</a>
          </nav>
          <button className="cart-button" onClick={() => setCartOpen(true)}>
            🛒 Cart <span>{cart.length}</span>
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">EVERYDAY PRODUCTS • SMART CHOICES</p>
            <h1>Everything you need. <span>One smart choice.</span></h1>
            <p className="hero-copy">
              Discover useful home essentials, car accessories, smart gadgets,
              and everyday products selected for modern living.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#shop">Shop now</a>
              <a className="secondary-button" href="#categories">Browse categories</a>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-icon">🛍️</div>
            <p>NEW COLLECTION</p>
            <h2>Smart finds for everyday life</h2>
            <span>Quality • Value • Convenience</span>
          </div>
        </div>
      </section>

      <section className="category-strip" id="categories">
        <div className="container">
          <p className="section-kicker">SHOP BY CATEGORY</p>
          <div className="category-grid">
            <button onClick={() => setCategory("Home Essentials")}>🏠<strong>Home Essentials</strong><span>Useful items for your space</span></button>
            <button onClick={() => setCategory("Car Accessories")}>🚘<strong>Car Accessories</strong><span>Practical upgrades for your car</span></button>
            <button onClick={() => setCategory("Smart Gadgets")}>⚡<strong>Smart Gadgets</strong><span>Simple tech for modern life</span></button>
          </div>
        </div>
      </section>

      <section className="shop container" id="shop">
        <div className="section-heading">
          <div>
            <p className="section-kicker">OUR PICKS</p>
            <h2>Featured products</h2>
          </div>
          <div className="search">
            <span>⌕</span>
            <input
              aria-label="Search products"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="filters">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active-filter" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filtered.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                {product.badge && <span className="badge">{product.badge}</span>}
                <span>{product.icon}</span>
              </div>
              <div className="product-info">
                <p>{product.category}</p>
                <h3>{product.name}</h3>
                <div className="product-bottom">
                  <strong>{money(product.price)}</strong>
                  <button onClick={() => addToCart(product)}>Add to cart</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty">No products found. Try another search.</div>
        )}
      </section>

      <section className="trust">
        <div className="container trust-grid">
          <div><span>✓</span><strong>Quality picks</strong><small>Products chosen for everyday use</small></div>
          <div><span>₦</span><strong>Great value</strong><small>Useful products at fair prices</small></div>
          <div><span>↗</span><strong>Easy shopping</strong><small>Simple, mobile-friendly experience</small></div>
        </div>
      </section>

      <section className="about container" id="about">
        <p className="section-kicker">ABOUT NEXT CHOICE</p>
        <h2>Making everyday shopping simpler.</h2>
        <p>
          Next Choice Essentials is being built as a modern online storefront
          for practical products across the home, car, and smart-gadget categories.
        </p>
      </section>

      <footer>
        <div className="container footer-inner">
          <div><strong>Next Choice Essentials</strong><span>Smart choices for everyday living.</span></div>
          <span>© 2026 Next Choice Essentials</span>
        </div>
      </footer>

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cart-head">
              <h2>Your cart</h2>
              <button onClick={() => setCartOpen(false)}>✕</button>
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart">Your cart is empty.</div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div className="cart-item" key={`${item.id}-${index}`}>
                      <span>{item.icon}</span>
                      <div><strong>{item.name}</strong><small>{money(item.price)}</small></div>
                    </div>
                  ))}
                </div>
                <div className="cart-total"><span>Total</span><strong>{money(total)}</strong></div>
                <button className="checkout-button">Checkout coming next</button>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
