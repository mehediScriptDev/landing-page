const swiper = new Swiper('.coursesSwiper', {
            // Enable cursor grab
            grabCursor: true,
            
            // Responsive breakpoints
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                // Mobile (default): 1 slide
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                // Medium devices: 2 slides
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                // Large devices: 3 slides
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                }
            },
            
            // Pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: false,
            },
            
            // Loop mode
            loop: false,
            
            // Smooth transitions
            speed: 600,
            
            // Enable mouse wheel scrolling
            mousewheel: {
                forceToAxis: true,
            },
            
            // Keyboard control
            keyboard: {
                enabled: true,
            },
        });