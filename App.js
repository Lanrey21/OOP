// Define the Product class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Define the ShoppingCartItem class
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    calculateTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// Define the ShoppingCart class
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    calculateTotalPrice() {
        return this.items.reduce((total, item) => total + item.calculateTotalPrice(), 0);
    }
}

// Create instances of Product
const product1 = new Product(1, "Laptop", 1000);
const product2 = new Product(2, "Phone", 500);
const product3 = new Product(3, "Headphones", 100);

// Create an instance of ShoppingCart
const cart = new ShoppingCart();

// Get elements from the DOM
const productList = document.getElementById("product-list");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Function to render products
function renderProducts() {
    const products = [product1, product2, product3];
    productList.innerHTML = ''; // Clear previous products if any
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <p>${product.name} - $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Add to cart function
function addToCart(productId) {
    let product;
    switch (productId) {
        case 1: product = product1; break;
        case 2: product = product2; break;
        case 3: product = product3; break;
    }
    cart.addItem(product, 1);
    renderCart();
}

// Render cart items
function renderCart() {
    cartItemsContainer.innerHTML = "";
    if (cart.items.length === 0) {
        cartItemsContainer.innerHTML = "<p>Cart is empty.</p>";
    } else {
        cart.items.forEach(item => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");
            cartItemDiv.innerHTML = `
                <p>${item.product.name} x ${item.quantity} - $${item.calculateTotalPrice()}</p>
                <button class="remove-btn" onclick="removeFromCart(${item.product.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
    }
    cartTotal.innerText = `$${cart.calculateTotalPrice()}`;
}

// Remove from cart function
function removeFromCart(productId) {
    cart.removeItem(productId);
    renderCart();
}

// Initialize product list and empty cart
renderProducts();
renderCart();
