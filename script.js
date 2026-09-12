// JavaScript для кінематографічної презентації

class CinematicPresentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 9;
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updatePresentation();
        this.setupKeyboardControls();
    }

    setupEventListeners() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.addEventListener('click', () => this.previousSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === ' ') {
                e.preventDefault();
                this.nextSlide();
            }
        });
    }

    nextSlide() {
        if (this.isAnimating) return;
        if (this.currentSlide < this.totalSlides) {
            this.currentSlide++;
            this.updatePresentation();
        }
    }

    previousSlide() {
        if (this.isAnimating) return;
        if (this.currentSlide > 1) {
            this.currentSlide--;
            this.updatePresentation();
        }
    }

    updatePresentation() {
        this.isAnimating = true;
        
        // Оновити активні слайди
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index + 1 === this.currentSlide) {
                slide.classList.add('active');
            }
        });

        // Оновити лічильник
        document.getElementById('currentSlide').textContent = this.currentSlide;

        // Оновити прогрес бар
        const progress = (this.currentSlide / this.totalSlides) * 100;
        document.getElementById('progressFill').style.width = progress + '%';

        // Залишити час для анімації
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);

        // Запустити спецефекти для певних слайдів
        this.triggerSlideEffects();
    }

    triggerSlideEffects() {
        if (this.currentSlide === 1) {
            this.playApertureEffect();
        }
        if (this.currentSlide === 9) {
            this.playFinalEffect();
        }
    }

    playApertureEffect() {
        const apertures = document.querySelectorAll('.aperture');
        apertures.forEach(aperture => {
            aperture.style.animation = 'none';
            setTimeout(() => {
                aperture.style.animation = '';
            }, 10);
        });
    }

    playFinalEffect() {
        const montageFlash = document.querySelector('.montage-flash');
        if (montageFlash) {
            montageFlash.style.animation = 'none';
            setTimeout(() => {
                montageFlash.style.animation = 'montageFlash 0.5s ease-out forwards';
            }, 10);
        }
    }
}

// Ініціалізація при завантаженні
document.addEventListener('DOMContentLoaded', () => {
    new CinematicPresentation();
    
    // Показати інструкції
    console.log(`
    ╔══════════════════════════════════════════════════════════════╗
    ║  СУДОВА СИСТЕМА УКРАЇНИ - Кінематографічна Презентація      ║
    ╠══════════════════════════════════════════════════════════════╣
    ║  НАВІГАЦІЯ:                                                  ║
    ║  → Кліки на кнопки вліво/вправо або стрілки на клавіатурі    ║
    ║  → ПРОБІЛ для переходу до наступного слайду                  ║
    ║  → Всього 9 слайдів з епічними кіно-ефектами 🎬             ║
    ╠══════════════════════════════════════════════════════════════╣
    ║  ЕФЕКТИ:                                                     ║
    ║  ✓ Кен Бернс зум (8-12 сек на кожному слайді)               ║
    ║  ✓ Діафрагма (Aperture) на обкладинці та фіналі              ║
    ║  ✓ Зерно плівки (Film Grain) для кіно-атмосфери              ║
    ║  ✓ Світлові промені з анімацією                              ║
    ║  ✓ Пульсуючі кільця на ключових слайдах                     ║
    ║  ✓ Каскадна анімація текстів з затримками                   ║
    ║  ✓ Плавні переходи між слайдами (0.8s)                      ║
    ║  ✓ Неонові кольори та світлові ефекти                       ║
    ║  ✓ Монтажний спалах на фіналі                                ║
    ╚══════════════════════════════════════════════════════════════╝
    `);
});

// Додаткові функції для розширених можливостей
function exportAsVideo() {
    console.log('Функція експорту у відео буде доступна через FFmpeg');
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Запобігти прокруткою на сторінці
window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        document.querySelector('.presentation').nextSlide?.();
    } else {
        document.querySelector('.presentation').previousSlide?.();
    }
}, { passive: false });
