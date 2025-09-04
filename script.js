  // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all functionality
            initLoader();
            initNavigation();
            initThemeToggle();
            initBackToTop();
            initSmoothScroll();
            initAnimations();
            initFilterPosts();
            initNewsletterValidation();
            initLikeButtons();
            initParticles();
            initScrollEffects();
            initTestimonials();
            initAuthorFollow();
            initAdvancedInteractions();
            initReadingProgress();
            initSearchFunctionality();
            initLoadMore();
        });

        // Loading screen
        function initLoader() {
            const loader = document.querySelector('.loader');
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.classList.remove('no-scroll');
            }, 1500);
        }

        // Navigation functionality
        function initNavigation() {
            const header = document.querySelector('.header');
            const hamburger = document.querySelector('.hamburger');
            const nav = document.querySelector('.nav');
            const navLinks = document.querySelectorAll('.nav-link');
            let lastScrollY = window.scrollY;
            
            // Update active nav link based on scroll position
            function updateActiveNavLink() {
                const sections = document.querySelectorAll('section[id]');
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    
                    if (window.pageYOffset >= sectionTop - headerHeight - 50 && 
                        window.pageYOffset < sectionTop + sectionHeight - headerHeight - 50) {
                        currentSection = section.getAttribute('id') || '';
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            }
            
            // Sticky header on scroll
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                    
                    // Hide header on scroll down, show on scroll up
                    if (window.scrollY > lastScrollY && window.scrollY > 200) {
                        header.classList.add('hidden');
                    } else {
                        header.classList.remove('hidden');
                    }
                } else {
                    header.classList.remove('scrolled');
                    header.classList.remove('hidden');
                }
                
                lastScrollY = window.scrollY;
                updateActiveNavLink();
            });
            
            // Mobile menu toggle
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                hamburger.classList.toggle('active');
                nav.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });
            
            // Close mobile menu when clicking on links
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        }

        // Smooth scroll for navigation links
        function initSmoothScroll() {
            const navLinks = document.querySelectorAll('.nav-link, .footer a[href^="#"]');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#' || targetId === '') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Close mobile menu if open
                        const hamburger = document.querySelector('.hamburger');
                        const nav = document.querySelector('.nav');
                        if (hamburger && nav.classList.contains('active')) {
                            hamburger.classList.remove('active');
                            nav.classList.remove('active');
                            document.body.classList.remove('no-scroll');
                        }
                        
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update active class for navigation links
                        if (this.classList.contains('nav-link')) {
                            document.querySelectorAll('.nav-link').forEach(link => {
                                link.classList.remove('active');
                            });
                            this.classList.add('active');
                        }
                    }
                });
            });
        }

        // Dark/Light mode toggle
        function initThemeToggle() {
            const themeToggle = document.querySelector('.theme-toggle');
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Check for saved theme preference or use system preference
            if (localStorage.getItem('theme') === 'dark' || 
                (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
                document.body.classList.add('dark-mode');
            }
            
            // Toggle theme
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
                showToast('Theme changed successfully!', 'success');
            });
        }

        // Back to top button
        function initBackToTop() {
            const backToTopBtn = document.querySelector('.back-to-top');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Scroll animations
        function initAnimations() {
            const animatedElements = document.querySelectorAll('.featured-card, .post-card, .widget, .section-title, .author-card, .testimonial, .instagram-item');
            const heroElements = document.querySelectorAll('.hero-text, .hero-image, .category-tag, .hero-text h1, .hero-text p, .hero-text .btn');
            
            // Animate hero elements on load
            setTimeout(() => {
                heroElements.forEach(el => {
                    el.classList.add('animate');
                });
            }, 500);
            
            // Intersection Observer for scroll animations
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Observe all animated elements
            animatedElements.forEach(element => {
                observer.observe(element);
            });
            
            // Section title animation
            const sectionTitles = document.querySelectorAll('.section-title');
            sectionTitles.forEach(title => {
                observer.observe(title);
            });
        }

        // Advanced interactions
        function initAdvancedInteractions() {
            // Add floating animation to elements
            const floatingElements = document.querySelectorAll('.float-animation');
            floatingElements.forEach(el => {
                el.style.animationDelay = `${Math.random() * 2}s`;
            });
            
            // Add typing effect to hero title
            const heroTitle = document.querySelector('.hero-text h1');
            if (heroTitle) {
                const text = heroTitle.textContent;
                heroTitle.innerHTML = '';
                heroTitle.classList.add('typewriter');
                
                setTimeout(() => {
                    heroTitle.textContent = text;
                    heroTitle.style.borderRight = 'none';
                }, 3500);
            }
            
            // Add parallax effect to hero section
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                const heroContent = document.querySelector('.hero-content');
                
                if (hero && heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
                    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
                }
            });
            
            // Add hover effects to cards
            const cards = document.querySelectorAll('.enhanced-hover');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                });
            });
            
            // Add ripple effect to buttons
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const x = e.clientX - e.target.getBoundingClientRect().left;
                    const y = e.clientY - e.target.getBoundingClientRect().top;
                    
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple-effect');
                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }

        // Scroll effects for header and elements
        function initScrollEffects() {
            // Parallax effect for hero image
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                const heroContent = document.querySelector('.hero-content');
                
                if (hero && heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
                    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
                }
            });
        }

        // Filter posts by category
        function initFilterPosts() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const postCards = document.querySelectorAll('.post-card');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    // Filter posts
                    postCards.forEach(card => {
                        const cardCategory = card.getAttribute('data-category');
                        
                        if (filterValue === 'all' || filterValue === cardCategory) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }

        // Newsletter form validation
        function initNewsletterValidation() {
            const newsletterForms = document.querySelectorAll('#newsletter-form, #sidebar-newsletter-form');
            
            newsletterForms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const emailInput = this.querySelector('input[type="email"]');
                    const email = emailInput.value.trim();
                    
                    if (validateEmail(email)) {
                        // Simulate successful submission
                        showToast('Thank you for subscribing to our newsletter!', 'success');
                        this.reset();
                    } else {
                        // Show error
                        emailInput.classList.add('error');
                        this.querySelector('.error-message').style.display = 'block';
                        showToast('Please enter a valid email address', 'error');
                        
                        setTimeout(() => {
                            emailInput.classList.remove('error');
                            this.querySelector('.error-message').style.display = 'none';
                        }, 3000);
                    }
                });
            });
            
            // Email validation function
            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
        }

        // Like buttons functionality
        function initLikeButtons() {
            const likeButtons = document.querySelectorAll('.like-btn');
            
            likeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const icon = this.querySelector('i');
                    const count = this.querySelector('span');
                    
                    if (this.classList.contains('liked')) {
                        // Unlike
                        this.classList.remove('liked');
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                        count.textContent = parseInt(count.textContent) - 1;
                        showToast('Removed from your favorites', 'info');
                    } else {
                        // Like
                        this.classList.add('liked');
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        count.textContent = parseInt(count.textContent) + 1;
                        showToast('Added to your favorites', 'success');
                    }
                });
            });
        }

        // Testimonials slider
        function initTestimonials() {
            const track = document.querySelector('.testimonials-track');
            const testimonials = document.querySelectorAll('.testimonial');
            const prevBtn = document.querySelector('.testimonial-prev');
            const nextBtn = document.querySelector('.testimonial-next');
            let currentIndex = 0;
            
            // Set initial position
            updateTestimonialPosition();
            
            // Next testimonial
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % testimonials.length;
                updateTestimonialPosition();
            });
            
            // Previous testimonial
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                updateTestimonialPosition();
            });
            
            function updateTestimonialPosition() {
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
            
            // Auto-advance testimonials
            setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                updateTestimonialPosition();
            }, 5000);
        }

        // Author follow buttons
        function initAuthorFollow() {
            const followButtons = document.querySelectorAll('.author-card .btn');
            
            followButtons.forEach(button => {
                button.addEventListener('click', function() {
                    if (this.textContent === 'Follow') {
                        this.textContent = 'Following';
                        this.classList.add('btn-primary');
                        this.classList.remove('btn-outline');
                        showToast('You are now following this author', 'success');
                    } else {
                        this.textContent = 'Follow';
                        this.classList.remove('btn-primary');
                        this.classList.add('btn-outline');
                        showToast('You unfollowed this author', 'info');
                    }
                });
            });
        }

        // Load more posts functionality
        function initLoadMore() {
            const loadMoreBtn = document.getElementById('load-more-btn');
            const postsGrid = document.querySelector('.posts-grid');
            let currentPage = 1;
            
            loadMoreBtn.addEventListener('click', function() {
                // Simulate loading more posts
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    // In a real application, you would fetch more posts from a server
                    // For this example, we'll just clone existing posts
                    const existingPosts = document.querySelectorAll('.post-card');
                    const postsToAdd = [];
                    
                    // Clone first 2 posts to simulate new content
                    for (let i = 0; i < 2 && i < existingPosts.length; i++) {
                        const clone = existingPosts[i].cloneNode(true);
                        clone.style.opacity = '0';
                        clone.style.transform = 'translateY(30px)';
                        postsToAdd.push(clone);
                    }
                    
                    // Add the new posts to the grid
                    postsToAdd.forEach(post => {
                        postsGrid.appendChild(post);
                        
                        // Animate the new posts in
                        setTimeout(() => {
                            post.style.opacity = '1';
                            post.style.transform = 'translateY(0)';
                        }, 100);
                    });
                    
                    this.textContent = originalText;
                    this.disabled = false;
                    
                    // Show a message if we've reached the "end"
                    currentPage++;
                    if (currentPage >= 3) {
                        this.style.display = 'none';
                        showToast('All articles have been loaded', 'info');
                    } else {
                        showToast('More articles loaded successfully', 'success');
                    }
                }, 1000);
            });
        }

        // Particles.js background
        function initParticles() {
            // This would initialize particles.js in a real implementation
            // For now, we'll just add a simple CSS-based animation
            console.log("Particles background would be initialized here");
        }

        // Reading progress bar
        function initReadingProgress() {
            const progressBar = document.querySelector('.reading-progress');
            
            window.addEventListener('scroll', function() {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
                
                progressBar.style.width = scrollPercent + '%';
            });
        }

        // Search functionality
        function initSearchFunctionality() {
            const searchInput = document.getElementById('search-input');
            const searchButton = document.getElementById('search-button');
            
            searchButton.addEventListener('click', function() {
                performSearch();
            });
            
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
            
            function performSearch() {
                const searchTerm = searchInput.value.trim();
                
                if (searchTerm.length < 2) {
                    showToast('Please enter at least 2 characters to search', 'error');
                    return;
                }
                
                // In a real application, you would make an API call here
                // For this example, we'll just show a message
                showToast(`Searching for: ${searchTerm}`, 'info');
                
                // Clear the input
                searchInput.value = '';
            }
        }

        // Toast notification system
        function showToast(message, type = 'info') {
            const toastContainer = document.querySelector('.toast-container');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            
            // Add icon based on type
            let icon = 'info-circle';
            if (type === 'success') icon = 'check-circle';
            if (type === 'error') icon = 'exclamation-circle';
            
            toast.innerHTML = `
                <i class="fas fa-${icon}"></i>
                <span>${message}</span>
            `;
            
            toastContainer.appendChild(toast);
            
            // Show the toast
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            // Hide the toast after 5 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                
                // Remove the toast from DOM after animation completes
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 5000);
        }