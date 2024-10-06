// Unsplash API setup (replace with your Unsplash Access Key if needed)
const productAPI = "https://picsum.photos/v2/list?page=1&limit=5";

// Elements
const productTitle = document.getElementById("product-title");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const mainImage = document.getElementById("main-image");
const thumbnailsContainer = document.getElementById("thumbnails");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const confirmationMessage = document.getElementById("confirmation-message");
const quantityInput = document.getElementById("quantity");

let images = [];
let currentIndex = 0;

// Fetch product images from API
fetch(productAPI)
  .then(response => response.json())
  .then(data => {
    // Extract image URLs
    images = data.map(item => item.download_url);
    updateCarousel();
    createThumbnails(images);
  })
  .catch(error => console.error("Error fetching product images:", error));

// Function to update carousel image
function updateCarousel() {
  mainImage.src = images[currentIndex];
}

// Create thumbnails
function createThumbnails(images) {
  thumbnailsContainer.innerHTML = ''; // Clear any previous thumbnails

  images.forEach((imgSrc, index) => {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.classList.add("thumbnail");
    img.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
      updateActiveThumbnail();
    });
    thumbnailsContainer.appendChild(img);
  });
  updateActiveThumbnail();
}

// Update active thumbnail style
function updateActiveThumbnail() {
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle("active", index === currentIndex);
  });
}

// Event listeners for prev/next buttons
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
  updateActiveThumbnail();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
  updateActiveThumbnail();
});

// "Add to Cart" button functionality
addToCartBtn.addEventListener("click", () => {
  confirmationMessage.style.display = "block";
  setTimeout(() => {
    confirmationMessage.style.display = "none";
  }, 3000); // Confirmation message visible for 3 seconds
});
