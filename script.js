/*
 * NeverFair storefront frontend.
 *
 * IMPORTANT:
 * - This file is public. Never put payment secret keys, R2 credentials,
 *   private download URLs, or signing secrets here.
 * - Configure a Cloudflare Worker to implement the API routes below.
 * - The browser never declares a purchase successful. Only your server
 *   should verify payment-provider webhooks and authorize file delivery.
 */

const PRODUCTS = {
  neverlose: {
    id: "neverlose",
    name: "NeverFair Neverlose Edition",
    price: "$4.00",
    description: "A focused digital software edition with a streamlined setup and a clean, practical experience."
  },
  aimwhere: {
    id: "aimwhere",
    name: "NeverFair Aimwhere Edition",
    price: "$3.00",
    description: "A second focused software edition, designed around a simple interface and direct workflow."
  }
};

// Replace this only if your Cloudflare Worker uses a different API prefix.
// Same-origin /api routes are recommended for a Cloudflare Pages + Worker setup.
const API_BASE = "/api";

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const dialog = document.querySelector("#product-dialog");
const toast = document.querySelector("#toast");
let activeProductId = null;
let toastTimer = null;

document.querySelector("#year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function showMessage(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 4200);
}

function openProductDetails(productId) {
  const product = PRODUCTS[productId];
  if (!product) return;
  activeProductId = productId;
  document.querySelector("#dialog-title").textContent = product.name;
  document.querySelector("#dialog-description").textContent = product.description;
  document.querySelector("#dialog-price").textContent = product.price;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else showMessage(`${product.name} — ${product.price}`);
}

async function beginCheckout(productId, button) {
  const product = PRODUCTS[productId];
  if (!product) return;

  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Connecting…";

  try {
    // Worker must validate productId and look up the real price server-side.
    const response = await fetch(`${API_BASE}/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id })
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error || "Checkout is not configured yet.");
    }

    const data = await response.json();
    if (!data.checkoutUrl || typeof data.checkoutUrl !== "string") {
      throw new Error("The checkout service returned an invalid response.");
    }

    // Redirect only to a URL returned by your trusted Worker.
    const checkoutUrl = new URL(data.checkoutUrl, window.location.origin);
    if (!["https:", "http:"].includes(checkoutUrl.protocol)) {
      throw new Error("The checkout service returned an unsafe URL.");
    }
    window.location.assign(checkoutUrl.href);
  } catch (error) {
    showMessage(error.message || "Unable to start checkout. Please try again later.");
    button.disabled = false;
    button.textContent = originalText;
  }
}

document.querySelectorAll(".details-button").forEach(button => {
  button.addEventListener("click", () => openProductDetails(button.dataset.product));
});

document.querySelectorAll(".buy-button").forEach(button => {
  button.addEventListener("click", () => beginCheckout(button.dataset.product, button));
});

document.querySelector("#dialog-buy").addEventListener("click", event => {
  if (!activeProductId) return;
  dialog.close();
  beginCheckout(activeProductId, event.currentTarget);
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());

dialog.addEventListener("click", event => {
  // Clicking the dimmed area closes the dialog.
  if (event.target === dialog) dialog.close();
});

// Subtle reveal animation; content remains visible if IntersectionObserver is unavailable.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Optional verified-download landing behavior.
// Your Worker should redirect here only after verifying the payment session server-side.
// Never accept a client-provided "paid=true" flag as proof of purchase.
const params = new URLSearchParams(window.location.search);
if (params.has("download_session")) {
  const sessionId = params.get("download_session");
  if (sessionId) {
    showMessage("Checking your order…");
    fetch(`${API_BASE}/download?session_id=${encodeURIComponent(sessionId)}`, {
      method: "GET",
      credentials: "same-origin",
      redirect: "follow"
    }).then(response => {
      if (response.redirected) {
        window.location.assign(response.url);
        return;
      }
      if (!response.ok) throw new Error("Your order could not be verified yet. Contact support if you were charged.");
      return response.blob().then(blob => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "NeverFair-download";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
      });
    }).catch(error => showMessage(error.message));
  }
}
