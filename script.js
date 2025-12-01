const gallery = document.querySelector(".image-gallery");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox ? lightbox.querySelector(".gallery-item img") : null;
const closeBtn = lightbox ? lightbox.querySelector(".close") : null;
const prevBtn = lightbox ? lightbox.querySelector(".prev") : null;
const nextBtn = lightbox ? lightbox.querySelector(".next") : null;
let currentIndex = 0;
const images = gallery ? Array.from(gallery.querySelectorAll(".gallery-item img")) : [];

if (!gallery || images.length === 0 || !lightbox) {
  console.warn("Gallery or lightbox not found or no images present.");
} else {
  // assign index data attributes so we can find the clicked image index
  images.forEach((img, i) => {
    img.dataset.index = i;
    img.style.cursor = "pointer";
  });

  function updateLightbox() {
    const src = images[currentIndex].src;
    lightboxImage.src = src;
    lightboxImage.alt = images[currentIndex].alt || "";
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  }

  // Open Lightbox when an image is clicked
  gallery.addEventListener("click", (e) => {
    const img = e.target.closest(".gallery-item img");
    if (!img) return;
    const idx = Number(img.dataset.index);
    if (Number.isFinite(idx)) openLightbox(idx);
  });

  // Close button
  closeBtn.addEventListener("click", closeLightbox);

  // Prev / Next
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  });
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  });

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard controls when lightbox is open
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") return;
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      prevBtn.click();
    } else if (e.key === "ArrowRight") {
      nextBtn.click();
    }
  });
}

// Koodi sain aadresilt: https://codingartistweb.com/2024/12/image-gallery-with-lightbox-effect-using-html-css-and-javascript/
// Autor: Coding Artist
// Kasutasin GitHub Copilotit, et koodi ühildada juba valmis tehtud veebilehe struktuuriga.