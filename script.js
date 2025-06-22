//Elements references
const productContainer = document.getElementById("productContainer");
const cartContainer = document.getElementById("cartContainer");
const testingBtn = document.getElementById("testingBtn");
const feedbackMessage = document.getElementById("feedback");
const totalPrice = document.getElementById("totalPrice");
const clearCartBtn = document.getElementById("clearCart");
const sortingButton = document.getElementById("sortingButton");

// Default products
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "IPad",
    price: 20000,
  },
  {
    id: 3,
    name: "Apple-Watch",
    price: 500,
  },
  {
    id: 4,
    name: "Plasma-TV",
    price: 40000,
  },
  {
    id: 5,
    name: "Music-Set",
    price: 10000,
  },
];

// empty cart
const cart = [];

// used to reset the Timer (user feedback purpose).
let feedbackTimer;

clearCartBtn.addEventListener("click", clearCart);
/* console.log("clearing the cart");
  cart = [];      // if we are going to change the cart type (const => let) then it will work in some times.
  renderedCartDetails();
 */

sortingButton.addEventListener("click", sortByPrice); //Another way to declare eventlisteners using functions.
/* // One way to declare the  eventlisteners.
  sortingButton.addEventListener("click", () => {
  cart.sort(function (item1, item2) {
    return item1.price - item2.price;
  });
  updatedFeedBack(`Sorted in ascending order`, "success");

  renderedCartDetails();
}); */

function clearCart() {
  cart.length = 0;
  console.log(cart); // this is one way or right way to clear the cart
  renderedCartDetails();
  updatedFeedBack("cart is cleared", "success");
}
function sortByPrice() {
  cart.sort(function (item1, item2) {
    return item1.price - item2.price;
  });
  updatedFeedBack(`Sorted in ascending order`, "success");

  renderedCartDetails();
}

function renderProductDetails() {
  products.forEach(function (product) {
    // <div class="Products">
    //   <span>1.Laptop - 50000</span>
    //   <button>Add Now</button>
    // </div>

    /* // this is one way to create elements dynamically using javascript code
  const productRow = ` 
    <div class="product-row">
    <span>${product.name} - Rs. ${product.price}</span>
    <button>Add Now</button>
    </div>
    `;
  productContainer.insertAdjacentHTML("afterend", productRow); */

    // this is the another way to create elements dynamically using javascript code
    const { id, name, price } = product;
    const divElement = document.createElement("div");
    divElement.className = "product-row";
    // indirectly calling fuction through onclick mechanism.
    divElement.innerHTML = `
  <span>${name} - Rs. ${price}</span>
  <button onclick="addToCart(${id})" )" >Add Now</button>   
     `;
    productContainer.appendChild(divElement);
  });
}
//Rendering Cart Details
function renderedCartDetails() {
  cartContainer.innerHTML = "";

  cart.forEach(function (products) {
    const { id, name, price } = products; // directly product items destructured
    const cortItemRow = `
        <div class="product-row">
          <span>${name} - Rs. ${price}</span>
          <button id="testingBtn" onclick="removedFromCart(${id})">Remove</button>
        </div>
  
  `;
    cartContainer.insertAdjacentHTML("beforeend", cortItemRow);
  });
  console.log("cart", cart);
  // let totalSum = 0;
  //
  // for (let i = 0; i < cart.length; i++) {
  //   totalSum = totalSum + cart[i].price;
  // }
  // totalPrice.textContent = `Rs. ${+totalSum}`;
  // USING REDUSE() METHOD
  const totalSum = cart.reduce(function (acc, curproduct) {
    return acc + curproduct.price;
  }, 0);
  totalPrice.textContent = `Rs. ${totalSum}`;
}

// Add To Cart
function addToCart(id) {
  // console.log("button is clicked", id);
  const productToAdd = products.find((product) => product.id === id);
  // check if the product is already in cart container or not
  const productThere = cart.some((product) => product.id === id);
  // console.log("productthere", productThere);
  if (productThere) {
    updatedFeedBack(`${name} already added to the cart`, "error");
    // feedbackMessage.textContent = `${productToAdd.name} already added to the cart`;
    return;
  }
  console.log(productToAdd);
  cart.push(productToAdd); // Here cart will be Updated.
  console.log(cart);
  renderedCartDetails();
  const product = cart.find((products) => products.id === id);

  updatedFeedBack(`${product.name} is added to the cart`, "success");
  // feedbackMessage.textContent = `${name} is added to the cart`;
}

function removedFromCart(id) {
  // need to remove items from cart
  console.log(id);
  const product = cart.find((products) => products.id === id);

  // const updatedCart = cart.filter(function (product) {
  //   return product.id !== id;
  // });
  const productIndex = cart.findIndex((products) => products.id === id); // directly can delete elements from cart using splice()

  cart.splice(productIndex, 1);
  // console.log(updatedCart);
  // cart = updatedCart;
  updatedFeedBack(`${product.name} is removed from the cart`, "error");
  setTimeout(() => {}, 2000);
  renderedCartDetails();
}

function updatedFeedBack(msg, type) {
  clearTimeout(feedbackTimer);
  feedbackMessage.style.display = "block";

  if (type === "success") {
    feedbackMessage.style.backgroundColor = "green";
  }
  if (type === "error") {
    feedbackMessage.style.backgroundColor = "red";
  }
  feedbackMessage.textContent = msg;

  feedbackTimer = setTimeout(function () {
    feedbackMessage.style.display = "none";
  }, 3000);
}

// Rendering Products
renderProductDetails();
