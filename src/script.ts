import { responsiveManager } from "./responsive";
import { ALL_PRODUCTS } from "./data/products";

interface CartItem {
  name: string;
  tag: string;
  price: number;
  size: number;
  image: string;
  inCart: number;
}

interface CartItems {
  [key: string]: CartItem;
}

/**
 * Initialize cart functionality and product management
 */
function initializeCart(): void {
  const carts = document.querySelectorAll(".atc") as NodeListOf<HTMLElement>;

  // Convert products from data/products.ts to the format expected by cart
  const products: CartItem[] = ALL_PRODUCTS.map(product => ({
    name: product.name,
    tag: product.tag,
    price: product.price,
    size: product.size,
    image: product.image,
    inCart: 0,
  }));

  // Add event listeners to all "Add to Cart" buttons
  carts.forEach((cart) => {
    cart.addEventListener("click", () => {
      const tag = cart.getAttribute("data-tag");
      if (tag) {
        const selectedProduct = products.find((product) => product.tag === tag);
        if (selectedProduct) {
          cartNumbers(selectedProduct);
        }
      }
    });
  });

  /**
   * Initialize cart numbers from localStorage
   */
  function onLoadCartNumbers(): void {
    const productNumbers = localStorage.getItem("cartNumbers");
    const cartSpan = document.querySelector(".cart span");

    if (cartSpan) {
      if (productNumbers) {
        cartSpan.textContent = productNumbers;
      } else {
        localStorage.setItem("cartNumbers", "0");
        cartSpan.textContent = "0";
      }
    }
  }

  /**
   * Update cart numbers when product is added
   */
  function cartNumbers(product: CartItem): void {
    alert(product.name + " was added to your cart.");

    let productNumbers = localStorage.getItem("cartNumbers");
    const numberValue = parseInt(productNumbers || "0", 10);

    const newTotal = numberValue + 1;
    localStorage.setItem("cartNumbers", newTotal.toString());

    const cartSpan = document.querySelector(".cart span");
    if (cartSpan) {
      cartSpan.textContent = newTotal.toString();
    }

    setItems(product);
  }

  /**
   * Add item to cart in localStorage
   */
  function setItems(product: CartItem): void {
    let cartItems: CartItems | null = null;

    const storedItems = localStorage.getItem("productsInCart");
    if (storedItems) {
      cartItems = JSON.parse(storedItems);
    }

    if (cartItems !== null) {
      if (cartItems[product.tag] !== undefined) {
        cartItems[product.tag].inCart += 1;
      } else {
        cartItems[product.tag] = { ...product };
        cartItems[product.tag].inCart = 1;
      }
    } else {
      const newProduct = { ...product };
      newProduct.inCart = 1;
      cartItems = {
        [product.tag]: newProduct,
      };
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    totalCost(product);
  }

  /**
   * Update total cost of cart
   */
  function totalCost(product: CartItem): void {
    const cartCostStr = localStorage.getItem("totalCost");
    let cartCost = parseFloat(cartCostStr || "0");

    if (!isNaN(cartCost)) {
      const newTotal = cartCost + product.price;
      localStorage.setItem("totalCost", newTotal.toFixed(2));
    } else {
      localStorage.setItem("totalCost", product.price.toFixed(2));
    }
  }

  /**
   * Display cart items on the cart page
   */
  function displayCart(): void {
    const cartItemsStr = localStorage.getItem("productsInCart");
    const cartItems: CartItems | null = cartItemsStr
      ? JSON.parse(cartItemsStr)
      : null;

    const productContainer = document.querySelector(".products");
    const cartCostStr = localStorage.getItem("totalCost");

    if (cartItems && productContainer) {
      productContainer.innerHTML = "";

      if (Object.keys(cartItems).length === 0) {
        productContainer.innerHTML =
          "<p>Your cart is empty. Go and buy something!</p>";
      } else {
        Object.values(cartItems).forEach((item) => {
          const itemTotal = (item.inCart * item.price).toFixed(2);
          productContainer.innerHTML += `
            <div class="product">
              <ion-icon name="trash-outline" class="remove-item" style="font-size: 36px; color: white;"></ion-icon>
              <img src="${item.image}">
              <div class="product-details">
                <span class="product-title" style="color: white;">${item.name}</span>
                <span class="product-size" style="color: white;">Size ${item.size}</span>
              </div>
              <div class="product-price" style="color: white;">$${item.price}</div>
              <div class="product-quantity">
                <ion-icon name="caret-back-circle-outline" class="decrease-quantity" style="font-size: 24px; color: white;"></ion-icon>
                <span class="quantity-value">${item.inCart}</span>
                <ion-icon name="caret-forward-circle-outline" class="increase-quantity" style="font-size: 24px; color: white"></ion-icon>
              </div>
              <div class="product-total">$${itemTotal}</div>
            </div>
          `;
        });

        const cartTotal = (parseFloat(cartCostStr || "0") * 1.065).toFixed(2);

        productContainer.innerHTML += `
          <div class="basketTotalContainer">
            <h4 class="basketTotalTitle" style="color: white;">
              Basket Total <br> <i> (6.5% Tax)</i>
            </h4>
            <h4 class="basketTotal" style="color: white;">
              $${cartTotal}
            </h4>
          </div>
        `;

        const checkoutButton = document.getElementById(
          "checkoutButton"
        ) as HTMLButtonElement;
        if (checkoutButton) {
          checkoutButton.innerHTML = `Checkout - $${cartTotal}`;
        }

        // Attach event listeners to cart action buttons
        attachCartEventListeners();
      }
    }
  }

  /**
   * Attach event listeners to cart buttons (remove, increase, decrease)
   */
  function attachCartEventListeners(): void {
    const removeButtons = document.querySelectorAll(
      ".product ion-icon.remove-item"
    );
    removeButtons.forEach((button, index) => {
      button.addEventListener("click", () => removeItem(index));
    });

    const decreaseButtons = document.querySelectorAll(
      ".product ion-icon.decrease-quantity"
    );
    decreaseButtons.forEach((button, index) => {
      button.addEventListener("click", () => decreaseQuantity(index));
    });

    const increaseButtons = document.querySelectorAll(
      ".product ion-icon.increase-quantity"
    );
    increaseButtons.forEach((button, index) => {
      button.addEventListener("click", () => increaseQuantity(index));
    });
  }

  /**
   * Decrease quantity of item in cart
   */
  function decreaseQuantity(index: number): void {
    const cartItemsStr = localStorage.getItem("productsInCart");
    const cartItems: CartItems = cartItemsStr ? JSON.parse(cartItemsStr) : {};

    const productTag = Object.keys(cartItems)[index];

    if (
      cartItems[productTag] &&
      cartItems[productTag].inCart > 1
    ) {
      cartItems[productTag].inCart -= 1;

      // Update cart numbers
      const productNumbersStr = localStorage.getItem("cartNumbers");
      let productNumbers = parseInt(productNumbersStr || "0", 10);
      if (productNumbers > 0) {
        productNumbers -= 1;
        localStorage.setItem("cartNumbers", productNumbers.toString());
        const cartSpan = document.querySelector(".cart span");
        if (cartSpan) {
          cartSpan.textContent = productNumbers.toString();
        }
      }

      // Update total cost
      const cartCostStr = localStorage.getItem("totalCost");
      let cartCost = parseFloat(cartCostStr || "0");
      if (!isNaN(cartCost)) {
        const newTotal = cartCost - cartItems[productTag].price;
        localStorage.setItem("totalCost", newTotal.toFixed(2));
      }

      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      displayCart();
    }
  }

  /**
   * Increase quantity of item in cart
   */
  function increaseQuantity(index: number): void {
    const cartItemsStr = localStorage.getItem("productsInCart");
    const cartItems: CartItems = cartItemsStr ? JSON.parse(cartItemsStr) : {};

    const productTag = Object.keys(cartItems)[index];

    if (cartItems[productTag]) {
      cartItems[productTag].inCart += 1;

      // Update cart numbers
      const productNumbersStr = localStorage.getItem("cartNumbers");
      let productNumbers = parseInt(productNumbersStr || "0", 10);
      productNumbers += 1;
      localStorage.setItem("cartNumbers", productNumbers.toString());
      const cartSpan = document.querySelector(".cart span");
      if (cartSpan) {
        cartSpan.textContent = productNumbers.toString();
      }

      // Update total cost
      const cartCostStr = localStorage.getItem("totalCost");
      let cartCost = parseFloat(cartCostStr || "0");
      if (!isNaN(cartCost)) {
        const newTotal = cartCost + cartItems[productTag].price;
        localStorage.setItem("totalCost", newTotal.toFixed(2));
      }

      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      displayCart();
    }
  }

  /**
   * Remove item from cart
   */
  function removeItem(index: number): void {
    const cartItemsStr = localStorage.getItem("productsInCart");
    const cartItems: CartItems = cartItemsStr ? JSON.parse(cartItemsStr) : {};

    const productTag = Object.keys(cartItems)[index];
    const productQuantity = cartItems[productTag]?.inCart || 0;
    const productPrice = cartItems[productTag]?.price || 0;

    // Update cart numbers
    const productNumbersStr = localStorage.getItem("cartNumbers");
    let productNumbers = parseInt(productNumbersStr || "0", 10);
    productNumbers -= productQuantity;
    localStorage.setItem("cartNumbers", productNumbers.toString());
    const cartSpan = document.querySelector(".cart span");
    if (cartSpan) {
      cartSpan.textContent = productNumbers.toString();
    }

    // Update total cost
    const cartCostStr = localStorage.getItem("totalCost");
    let cartCost = parseFloat(cartCostStr || "0");
    if (!isNaN(cartCost)) {
      const newTotal = cartCost - productQuantity * productPrice;
      localStorage.setItem("totalCost", newTotal.toFixed(2));
    }

    delete cartItems[productTag];
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    displayCart();
  }

  // Initialize
  onLoadCartNumbers();
  displayCart();
}

/**
 * Main entry point - runs when DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize responsive manager
  responsiveManager.init();

  // Listen for viewport changes and redraw cart if needed
  responsiveManager.onViewportChange(() => {
    const cartDisplay = document.querySelector(".products");
    if (cartDisplay && cartDisplay.children.length > 0) {
      // Re-render cart to ensure proper layout
      const existingCart = localStorage.getItem("productsInCart");
      if (existingCart) {
        initializeCart();
      }
    }
  });

  // Listen for layout recalculation events
  window.addEventListener("layoutRecalculated", () => {
    // Handle any necessary recalculations
    console.log("Layout recalculated");
  });

  // Initialize cart functionality
  initializeCart();
});
