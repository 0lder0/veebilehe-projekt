const gallery = document.querySelector(".image-gallery"); 
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox ? lightbox.querySelector(".gallery-item img") : null;
const closeBtn = lightbox ? lightbox.querySelector(".close") : null;
const prevBtn = lightbox ? lightbox.querySelector(".prev") : null;
const nextBtn = lightbox ? lightbox.querySelector(".next") : null;
let currentIndex = 0;

// Kogume kõik galerii pildid massiivi
const images = gallery ? Array.from(gallery.querySelectorAll(".gallery-item img")) : [];

if (!gallery || images.length === 0 || !lightbox) {
  console.warn("Galerii või lightbox puudub või pilte pole.");
} else {

  // Lisame igale pildile indeksid ja muudetava kursori
  images.forEach((img, i) => {
    img.dataset.index = i; // määrame igale pildile indeksandmed
    img.style.cursor = "pointer"; // muudame kursori käeks
  });

  // Funktsioon lightboxi pildi uuendamiseks vastavalt indeksile
  function updateLightbox() {
    const src = images[currentIndex].src;
    lightboxImage.src = src;
    lightboxImage.alt = images[currentIndex].alt || "";
  }

  // Funktsioon lightboxi avamiseks
  function openLightbox(index) {
    currentIndex = index;      // määrame praeguse pildi indeksiks klõpsatud pildi
    updateLightbox();          // uuendame pildi lightboxis
    lightbox.style.display = "flex"; // näitame lightboxi
    document.body.style.overflow = "hidden"; // keelame kerimise taustal
  }

  // Funktsioon lightboxi sulgemiseks
  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = ""; // taastame kerimise
  }

  // Avame lightboxi, kui pildile klikitakse
  gallery.addEventListener("click", (e) => {
    const img = e.target.closest(".gallery-item img");
    if (!img) return;
    const idx = Number(img.dataset.index); // loeme pildi indeksi
    if (Number.isFinite(idx)) openLightbox(idx); // avame lightboxi vastava pildiga
  });

  // Sulgemisnupp
  closeBtn.addEventListener("click", closeLightbox);

  // Eelmine / järgmine pilt
  prevBtn.addEventListener("click", () => {
    // liigutame indeksit ühe võrra tagasi (tsükliga algusesse)
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  });
  nextBtn.addEventListener("click", () => {
    // liigutame indeksit ühe võrra edasi (tsükliga algusesse)
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  });

  // Kui klikitakse lightboxi tausta (mitte pildi või nuppude peale), sulgeme lightboxi
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Klaviatuuri juhtnupud lightboxi kasutamisel
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") return; // ainult kui lightbox on avatud

    if (e.key === "Escape") {
      closeLightbox(); // sulge
    } else if (e.key === "ArrowLeft") {
      prevBtn.click(); // eelmine pilt
    } else if (e.key === "ArrowRight") {
      nextBtn.click(); // järgmine pilt
    }
  });

}

// Koodi sain aadresilt: https://codingartistweb.com/2024/12/image-gallery-with-lightbox-effect-using-html-css-and-javascript/
// Autor: Coding Artist
// Kasutasin GitHub Copilotit, et koodi ühildada juba valmis tehtud veebilehe struktuuriga.