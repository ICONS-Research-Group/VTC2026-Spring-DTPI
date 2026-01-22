// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ===== Workshop Countdown Timer =====
    // Target date: October 19, 2025 14:00 Chengdu time (UTC+8)
    // Chengdu time 14:00 = UTC 06:00
    const targetDate = new Date('2025-10-19T06:00:00Z');
    
    function updateCountdown() {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
            console.log('Countdown elements not found');
            return;
        }

        const now = new Date();
        const timeLeft = targetDate.getTime() - now.getTime();

        if (timeLeft <= 0) {
            daysEl.textContent = '0';
            hoursEl.textContent = '0';
            minutesEl.textContent = '0';
            secondsEl.textContent = '0';
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Update with animation
        if (daysEl.textContent !== days.toString()) {
            daysEl.classList.add('countdown-update');
            setTimeout(() => daysEl.classList.remove('countdown-update'), 300);
        }
        if (hoursEl.textContent !== hours.toString()) {
            hoursEl.classList.add('countdown-update');
            setTimeout(() => hoursEl.classList.remove('countdown-update'), 300);
        }
        if (minutesEl.textContent !== minutes.toString()) {
            minutesEl.classList.add('countdown-update');
            setTimeout(() => minutesEl.classList.remove('countdown-update'), 300);
        }
        if (secondsEl.textContent !== seconds.toString()) {
            secondsEl.classList.add('countdown-update');
            setTimeout(() => secondsEl.classList.remove('countdown-update'), 300);
        }

        daysEl.textContent = days;
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;
    }

    // Start countdown immediately
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    // Function to update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Set active link on page load
    updateActiveNavLink();
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
});