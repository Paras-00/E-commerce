document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            if (menuIcon && window.lucide) {
                const isOpened = navLinks.classList.contains('active');
                menuIcon.setAttribute('data-lucide', isOpened ? 'x' : 'menu');
                lucide.createIcons();
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (menuIcon && window.lucide) {
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    } else {
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    const categoryCards = document.querySelectorAll('.category-card');
    const productCards = document.querySelectorAll('.product-card');

    function filterProducts(category) {
        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === category);
        });

        productCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';

            setTimeout(() => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            }, 300);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterProducts(btn.dataset.filter);
        });
    });

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.filter;
            filterProducts(category);
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });

    const buyBtns = document.querySelectorAll('.buy-now-btn');
    buyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productTitle = e.target.closest('.product-card').querySelector('h3').innerText;

            const originalText = btn.innerText;
            btn.innerText = 'Added to Cart!';
            btn.style.background = 'var(--accent)';
            btn.style.color = 'var(--white)';

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 2000);
        });
    });

    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.75rem 5%';
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.padding = '1.25rem 5%';
            header.style.boxShadow = 'none';
        }
    });
});
