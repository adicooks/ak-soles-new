import { responsiveManager } from "./responsive";

interface Product {
  name: string;
  tag: string;
  price: number;
  size: number;
  inCart: number;
}

interface CartItems {
  [key: string]: Product;
}

/**
 * Initialize cart functionality and product management
 */
function initializeCart(): void {
  const carts = document.querySelectorAll(".atc") as NodeListOf<HTMLElement>;

  const products: Product[] = [
    // Nike
    {
      name: "Nike Dunk Low Needlework",
      tag: "needle",
      price: 160,
      size: 7,
      inCart: 0,
    },
    {
      name: "Nike Dunk Low Gardenia",
      tag: "gardenia",
      price: 225,
      size: 9.5,
      inCart: 0,
    },
    {
      name: "Nike Dunk Low SLAG",
      tag: "slag",
      price: 200,
      size: 9,
      inCart: 0,
    },
    {
      name: "Nike Dunk Low Panda",
      tag: "panda",
      price: 150,
      size: 11,
      inCart: 0,
    },
    {
      name: "Nike Dunk Low Ebay",
      tag: "ebay",
      price: 150,
      size: 8.5,
      inCart: 0,
    },
    {
      name: "Nike Dunk Low Fuschia",
      tag: "fuschia",
      price: 175,
      size: 7,
      inCart: 0,
    },
    {
      name: "Nike Air Force 1 Jackie Robinson",
      tag: "jackie",
      price: 300,
      size: 11,
      inCart: 0,
    },
    {
      name: "Nike KD 15 B.A.D",
      tag: "kd",
      price: 290,
      size: 11,
      inCart: 0,
    },

    // Jordan
    {
      name: "Air Jordan 1 Low Doernbecher",
      tag: "riddhi",
      price: 375,
      size: 8.5,
      inCart: 0,
    },
    {
      name: "Air Jordan 3 Reimagined",
      tag: "reimagined",
      price: 275,
      size: 10,
      inCart: 0,
    },
    {
      name: "Air Jordan 4 Seafoam",
      tag: "seafoam",
      price: 250,
      size: 5.5,
      inCart: 0,
    },
    {
      name: "Air Jordan 4 Craft",
      tag: "craft",
      price: 250,
      size: 11,
      inCart: 0,
    },
    {
      name: "Air Jordan 4 Midnight Navy",
      tag: "midnight",
      price: 300,
      size: 10.5,
      inCart: 0,
    },
    {
      name: "Air Jordan 4 Black Canvas",
      tag: "canvas",
      price: 375,
      size: 12,
      inCart: 0,
    },
    {
      name: "Air Jordan 11 Cherry",
      tag: "cherry",
      price: 250,
      size: 12,
      inCart: 0,
    },

    // Yeezy
    {
      name: "Yeezy Boost 350 Onyx",
      tag: "onyx",
      price: 275,
      size: 9,
      inCart: 0,
    },
    {
      name: "Yeezy Boost 350 Pirate Black",
      tag: "pirate",
      price: 300,
      size: 9,
      inCart: 0,
    },
    {
      name: "Yeezy Foam Runner Mx Cinder",
      tag: "cinder",
      price: 150,
      size: 9,
      inCart: 0,
    },
    {
      name: "Yeezy Foam Runner Clay Taupe",
      tag: "taupe",
      price: 150,
      size: 9,
      inCart: 0,
    },
    {
      name: "Adidas Yeezy Slide Onyx",
      tag: "slide",
      price: 150,
      size: 9,
      inCart: 0,
    },
  ];

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
  function cartNumbers(product: Product): void {
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
  function setItems(product: Product): void {
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
  function totalCost(product: Product): void {
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
              <img src="img/${item.tag}.png">
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
