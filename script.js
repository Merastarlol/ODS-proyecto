// Configuración del carrusel + mensajes + navegación desde portada

// Array con imágenes de vida submarina (temática marina)
const slidesData = [
    {
        img: "https://images.unsplash.com/photo-1545671913-b89ac5b4cd1f?w=1200&h=600&fit=crop",
        caption: "🐢 Tortuga marina nadando entre corales"
    },
    {
        img: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&h=600&fit=crop",
        caption: "🐠 Peces payaso y anémonas, simbiosis perfecta"
    },
    {
        img: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1200&h=600&fit=crop",
        caption: "🪸 Arrecife de coral vibrante, biodiversidad asombrosa"
    },
    {
        img: "https://images.unsplash.com/photo-1598977126135-0c97ab5afb12?w=1200&h=600&fit=crop",
        caption: "✨ Medusas luminiscentes en las profundidades"
    },
    {
        img: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=1200&h=600&fit=crop",
        caption: "🐟 Cardumen en movimiento, mar abierto"
    },
    {
        img: "https://images.unsplash.com/photo-1551249144-75f3bf1ff37d?w=1200&h=600&fit=crop",
        caption: "🧜‍♂️ Caballito de mar, delicado y único"
    }
];

let currentIndex = 0;
let slideInterval;
const slidesContainer = document.getElementById('carouselSlides');
const dotsContainer = document.getElementById('dotsContainer');
const dynamicCaption = document.getElementById('dynamicCaption');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// función para construir carrusel y puntos
function buildCarousel() {
    if (slidesContainer) slidesContainer.innerHTML = '';
    if (dotsContainer) dotsContainer.innerHTML = '';
    
    slidesData.forEach((slide, idx) => {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('carousel-slide');
        const img = document.createElement('img');
        img.src = slide.img;
        img.alt = `Vida submarina ${idx+1}`;
        img.loading = "lazy";
        slideDiv.appendChild(img);
        slidesContainer.appendChild(slideDiv);
        
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (idx === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(idx);
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });
    
    updateCarousel();
}

function updateCarousel() {
    if (!slidesContainer) return;
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    if (dynamicCaption && slidesData[currentIndex]) {
        dynamicCaption.innerHTML = `<i class="fas fa-water"></i> ${slidesData[currentIndex].caption}`;
    }
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        if (idx === currentIndex) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

function goToSlide(index) {
    if (index < 0) index = slidesData.length - 1;
    if (index >= slidesData.length) index = 0;
    currentIndex = index;
    updateCarousel();
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function resetAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        startAutoSlide();
    }
}

// Eventos del carrusel
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
}

// Redimensionar ventana
window.addEventListener('resize', () => {
    updateCarousel();
});

// Inicializar carrusel
buildCarousel();
startAutoSlide();

// FUNCIONALIDAD BOTONES PORTADA: desplazamiento suave hacia marquesina y carrusel
const btnMarquee = document.getElementById('goToMarqueeBtn');
const btnCarousel = document.getElementById('goToCarouselBtn');
const marqueeSection = document.getElementById('marquesina-seccion');
const carouselSection = document.getElementById('carrusel-seccion');

if (btnMarquee && marqueeSection) {
    btnMarquee.addEventListener('click', (e) => {
        e.preventDefault();
        marqueeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        marqueeSection.style.transition = '0.3s';
        marqueeSection.style.boxShadow = '0 0 0 3px #90e0ef, 0 0 0 6px #0077b6';
        setTimeout(() => {
            marqueeSection.style.boxShadow = '';
        }, 800);
    });
}

if (btnCarousel && carouselSection) {
    btnCarousel.addEventListener('click', (e) => {
        e.preventDefault();
        carouselSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        carouselSection.style.transition = '0.3s';
        carouselSection.style.boxShadow = '0 0 0 3px #caf0f8, 0 0 0 6px #0096c7';
        setTimeout(() => {
            carouselSection.style.boxShadow = '';
        }, 800);
    });
}

// Pausar marquesina al hacer hover
const marqueeSpan = document.querySelector('.marquee span');
if (marqueeSpan) {
    const marqueeParent = marqueeSpan.parentElement;
    marqueeParent?.addEventListener('mouseenter', () => {
        marqueeSpan.style.animationPlayState = 'paused';
    });
    marqueeParent?.addEventListener('mouseleave', () => {
        marqueeSpan.style.animationPlayState = 'running';
    });
}

// Manejo de errores en imágenes
const allImages = document.querySelectorAll('.carousel-slide img');
if (allImages.length) {
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            this.src = "https://via.placeholder.com/1200x600/0a2f44/ffffff?text=Vida+Submarina";
            this.alt = "Imagen submarina no disponible";
        });
    });
}

// Soporte táctil para carrusel en móviles
let touchStartX = 0;
const carouselContainerElem = document.querySelector('.carousel-container');
if (carouselContainerElem) {
    carouselContainerElem.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    carouselContainerElem.addEventListener('touchend', (e) => {
        if (!touchStartX) return;
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) prevSlide();
            else nextSlide();
            resetAutoSlide();
        }
        touchStartX = 0;
    });
}

// Ajuste de alturas del carrusel
function adjustCarouselHeight() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length) {
        let maxHeight = 0;
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img && img.complete) {
                maxHeight = Math.max(maxHeight, img.clientHeight);
            }
        });
        if (maxHeight > 0) {
            const container = document.querySelector('.carousel-container');
            if (container) container.style.minHeight = maxHeight + 'px';
        }
    }
}

window.addEventListener('load', () => {
    adjustCarouselHeight();
    setTimeout(adjustCarouselHeight, 500);
});

console.log("🌊 Sitio web vida submarina | Campus Texcoco | Portada + marquesina + carrusel interactivo");