// Edit these sample products and add your real Stripe Payment Links.
const products = [
  {
    name: "Digital Starter Pack",
    category: "STARTER KIT",
    description: "A sample listing. Replace this with a clear description of your real product.",
    price: "$9.99",
    symbol: "✦",
    checkoutUrl: ""
  },
  {
    name: "Creator Toolkit",
    category: "TOOLKIT",
    description: "Explain exactly what files, features, and formats the customer receives.",
    price: "$14.99",
    symbol: "⌘",
    checkoutUrl: ""
  },
  {
    name: "Premium Bundle",
    category: "BEST VALUE",
    description: "Describe what's included, any requirements, and how delivery works.",
    price: "$24.99",
    symbol: "N",
    checkoutUrl: ""
  }
];

const grid = document.getElementById("product-grid");

products.forEach((product) => {
  const card = document.createElement("article");
  card.className = "product-card";

  const visual = document.createElement("div");
  visual.className = "product-visual";
  const symbol = document.createElement("span");
  symbol.className = "product-symbol";
  symbol.textContent = product.symbol;
  visual.appendChild(symbol);

  const info = document.createElement("div");
  info.className = "product-info";

  const category = document.createElement("div");
  category.className = "product-tag";
  category.textContent = product.category;

  const title = document.createElement("h3");
  title.textContent = product.name;

  const description = document.createElement("p");
  description.textContent = product.description;

  const bottom = document.createElement("div");
  bottom.className = "product-bottom";

  const price = document.createElement("span");
  price.className = "price";
  price.textContent = product.price;

  const button = document.createElement("button");
  button.className = "buy-button";
  button.textContent = product.checkoutUrl ? "BUY NOW ↗" : "CHECKOUT SETUP";
  button.disabled = !product.checkoutUrl;
  button.title = product.checkoutUrl
    ? "Continue to secure checkout"
    : "Add a real payment link in script.js before publishing.";

  button.addEventListener("click", () => {
    if (product.checkoutUrl) {
      // Only use a real payment link created in your own payment-provider account.
      window.location.href = product.checkoutUrl;
    }
  });

  bottom.append(price, button);
  info.append(category, title, description, bottom);
  card.append(visual, info);
  grid.appendChild(card);
});

document.getElementById("year").textContent = new Date().getFullYear();
