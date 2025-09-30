class ResponsiveSlider {
            constructor() {
                this.sliderTrack = document.getElementById('sliderTrack');
                this.dotsContainer = document.getElementById('dotsContainer');
                this.cards = document.querySelectorAll('.slider-card');
                this.currentIndex = 0;
                this.cardsPerView = this.getCardsPerView();
                this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
                
                this.init();
                this.setupEventListeners();
            }

            getCardsPerView() {
                if (window.innerWidth >= 1024) return 3; // lg
                if (window.innerWidth >= 768) return 2;  // md
                return 1; // mobile
            }

            init() {
                this.updateSlider();
                this.createDots();
            }

            createDots() {
                this.dotsContainer.innerHTML = '';
                for (let i = 0; i < this.totalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.className = `cursor-pointer transition-all duration-300 ${
                        i === this.currentIndex ? 'w-12 h-3 bg-btn-cl rounded-full' : 'w-3 h-3 bg-gray-300 rounded-full'
                    }`;
                    dot.addEventListener('click', () => this.goToSlide(i));
                    this.dotsContainer.appendChild(dot);
                }
            }

            updateSlider() {
                const translateX = -(this.currentIndex * (100 / this.cardsPerView));
                this.sliderTrack.style.transform = `translateX(${translateX}%)`;
                this.updateDots();
            }

            updateDots() {
                const dots = this.dotsContainer.children;
                for (let i = 0; i < dots.length; i++) {
                    dots[i].className = `cursor-pointer transition-all duration-300 ${
                        i === this.currentIndex ? 'w-12 h-3 bg-btn-cl rounded-full' : 'w-3 h-3 bg-gray-300 rounded-full'
                    }`;
                }
            }

            goToSlide(index) {
                this.currentIndex = Math.max(0, Math.min(index, this.totalSlides - 1));
                this.updateSlider();
            }

            nextSlide() {
                this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
                this.updateSlider();
            }

            prevSlide() {
                this.currentIndex = this.currentIndex === 0 ? this.totalSlides - 1 : this.currentIndex - 1;
                this.updateSlider();
            }

            handleResize() {
                const newCardsPerView = this.getCardsPerView();
                if (newCardsPerView !== this.cardsPerView) {
                    this.cardsPerView = newCardsPerView;
                    this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
                    this.currentIndex = Math.min(this.currentIndex, this.totalSlides - 1);
                    this.createDots();
                    this.updateSlider();
                }
            }

            setupEventListeners() {
                // Auto-play functionality
                setInterval(() => {
                    this.nextSlide();
                }, 5000);

                // Resize handler
                window.addEventListener('resize', () => {
                    this.handleResize();
                });

                // Touch/swipe support
                let startX = 0;
                let isDragging = false;

                this.sliderTrack.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    isDragging = true;
                });

                this.sliderTrack.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                });

                this.sliderTrack.addEventListener('touchend', (e) => {
                    if (!isDragging) return;
                    const endX = e.changedTouches[0].clientX;
                    const diffX = startX - endX;

                    if (Math.abs(diffX) > 50) {
                        if (diffX > 0) {
                            this.nextSlide();
                        } else {
                            this.prevSlide();
                        }
                    }
                    isDragging = false;
                });

                // Mouse drag support
                this.sliderTrack.addEventListener('mousedown', (e) => {
                    startX = e.clientX;
                    isDragging = true;
                    this.sliderTrack.style.cursor = 'grabbing';
                });

                document.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                });

                document.addEventListener('mouseup', (e) => {
                    if (!isDragging) return;
                    const endX = e.clientX;
                    const diffX = startX - endX;

                    if (Math.abs(diffX) > 50) {
                        if (diffX > 0) {
                            this.nextSlide();
                        } else {
                            this.prevSlide();
                        }
                    }
                    isDragging = false;
                    this.sliderTrack.style.cursor = 'grab';
                });
            }
        }

        // Initialize slider when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new ResponsiveSlider();
        });
