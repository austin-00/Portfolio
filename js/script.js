document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 0. Dynamic API Base URL Configuration
    // ==========================================
    const BASE_URL = "http://127.0.0.1:8000";

    // ==========================================
    // 1. Workflow Step Carousel (Shatter + Dust)
    // ==========================================
    const steps = document.querySelectorAll(".workflow-step");

    if (steps.length) {
        let currentStep = 0;
        let timer;
        let isAnimating = false;
        
        const SHATTER_TIME = 800;
        const REFORM_TIME = 800;
        const DISPLAY_TIME = 4000; 

        const animationSelectors = {
            build: ".build-node",
            test: ".test-item",
            fix: ".fix-item",
            automate: ".automate-item"
        };

        function restartAnimation(container, selector) {
            const items = container.querySelectorAll(selector);
            items.forEach(item => item.classList.remove("animate"));
            void container.offsetWidth;
            items.forEach(item => item.classList.add("animate"));
        }

        function createDustParticle(container, x, y, size, colorClass) {
            const p = document.createElement("span");
            p.className = "dust-particle " + colorClass;
            p.style.left = x + "px";
            p.style.top = y + "px";
            p.style.width = size + "px";
            p.style.height = size + "px";
            container.appendChild(p);
            return p;
        }

        function generateShards(card, isScatter) {
            const rect = card.getBoundingClientRect();
            const parent = card.parentElement;
            const parentRect = parent.getBoundingClientRect();
            
            const container = document.createElement("div");
            container.style.position = "absolute";
            container.style.left = (rect.left - parentRect.left) + "px";
            container.style.top = (rect.top - parentRect.top) + "px";
            container.style.width = rect.width + "px";
            container.style.height = rect.height + "px";
            container.style.zIndex = "50";
            container.style.pointerEvents = "none";
            container.style.overflow = "visible";
            parent.appendChild(container);

            const cols = 4;
            const rows = 5;
            const pieceWidth = rect.width / cols;
            const pieceHeight = rect.height / rows;
            const animElements = [];

            const clone = card.cloneNode(true);
            clone.className = "workflow-step active"; 
            clone.style.position = "absolute";
            clone.style.left = "0";
            clone.style.top = "0";
            clone.style.width = "100%";
            clone.style.height = "100%";
            clone.style.margin = "0";
            clone.style.animation = "none";
            clone.style.boxShadow = "none";

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const piece = document.createElement("div");
                    piece.style.position = "absolute";
                    piece.style.width = pieceWidth + "px";
                    piece.style.height = pieceHeight + "px";
                    piece.style.left = (c * pieceWidth) + "px";
                    piece.style.top = (r * pieceHeight) + "px";
                    piece.style.overflow = "hidden"; 
                    piece.style.borderRadius = "4px";

                    const inner = clone.cloneNode(true);
                    inner.style.position = "absolute";
                    inner.style.left = (-c * pieceWidth) + "px";
                    inner.style.top = (-r * pieceHeight) + "px";
                    inner.style.width = rect.width + "px";
                    inner.style.height = rect.height + "px";
                    inner.style.transform = "none";
                    
                    piece.appendChild(inner);
                    container.appendChild(piece);

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const posX = (c * pieceWidth) + (pieceWidth / 2);
                    const posY = (r * pieceHeight) + (pieceHeight / 2);
                    
                    const angle = Math.atan2(posY - centerY, posX - centerX) + (Math.random() - 0.5);
                    const distance = 150 + Math.random() * 200;

                    const fromTransform = isScatter 
                        ? 'translate(0, 0) rotate(0deg) scale(1)' 
                        : `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${(Math.random() - 0.5) * 180}deg) scale(0.6)`;
                    
                    const toTransform = isScatter
                        ? `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${(Math.random() - 0.5) * 180}deg) scale(0.6)`
                        : 'translate(0, 0) rotate(0deg) scale(1)';

                    animElements.push({ el: piece, fromTransform, toTransform });
                }
            }

            for (let i = 0; i < 100; i++) {
                const colorRoll = Math.random();
                const colorClass = colorRoll < 0.15 ? "light" : (colorRoll < 0.55 ? "dark" : "");
                const size = 6 + Math.random() * 8;
                
                const endX = Math.random() * rect.width;
                const endY = Math.random() * rect.height;

                const angle = Math.random() * Math.PI * 2;
                const distance = 150 + Math.random() * 150; 
                const startX = endX + Math.cos(angle) * distance;
                const startY = endY + Math.sin(angle) * distance;

                const spawnX = isScatter ? endX : startX;
                const spawnY = isScatter ? endY : startY;

                const p = createDustParticle(container, spawnX, spawnY, size, colorClass);

                const fromX = isScatter ? 0 : -Math.cos(angle) * distance;
                const fromY = isScatter ? 0 : -Math.sin(angle) * distance;
                const toX = isScatter ? Math.cos(angle) * distance : 0;
                const toY = isScatter ? Math.sin(angle) * distance : 0;

                p.animate([
                    { transform: `translate(${fromX}px, ${fromY}px) scale(${isScatter ? 1 : 0.5})`, opacity: isScatter ? 1 : 0 },
                    { opacity: 1, offset: 0.3 },
                    { transform: `translate(${toX}px, ${toY}px) scale(${isScatter ? 0.5 : 1})`, opacity: 0 }
                ], {
                    duration: isScatter ? SHATTER_TIME : REFORM_TIME,
                    easing: isScatter ? 'cubic-bezier(0.4, 0, 0.6, 1)' : 'cubic-bezier(0.16, 1, 0.3, 1)',
                    fill: 'forwards'
                });
            }

            return { container, animElements };
        }

        function shatterBox(card) {
            return new Promise((resolve) => {
                card.classList.add("disintegrating");
                const { container, animElements } = generateShards(card, true);

                animElements.forEach(({ el, fromTransform, toTransform }) => {
                    el.animate([{ transform: fromTransform, opacity: 1 }, { transform: toTransform, opacity: 0 }], {
                        duration: SHATTER_TIME,
                        easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
                        fill: 'forwards'
                    });
                });

                setTimeout(() => {
                    container.remove();
                    card.classList.remove("disintegrating");
                    resolve();
                }, SHATTER_TIME);
            });
        }

        function reformBox(card) {
            return new Promise((resolve) => {
                card.classList.add("integrating");
                const { container, animElements } = generateShards(card, false);

                animElements.forEach(({ el, fromTransform, toTransform }) => {
                    el.animate([{ transform: fromTransform, opacity: 0 }, { transform: toTransform, opacity: 1 }], {
                        duration: REFORM_TIME,
                        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        fill: 'forwards'
                    });
                });

                setTimeout(() => {
                    container.remove();
                    card.classList.remove("integrating");
                    const type = card.dataset.step;
                    if (animationSelectors[type]) {
                        restartAnimation(card, animationSelectors[type]);
                    }
                    resolve();
                }, REFORM_TIME);
            });
        }

        function updateClasses(index) {
            steps.forEach((step, i) => {
                step.classList.remove("active", "prev", "next");
                if (i === index) step.classList.add("active");
            });
        }

        async function nextStep() {
            if (isAnimating) return;
            isAnimating = true;

            const outgoing = steps[currentStep];
            const nextIndex = (currentStep + 1) % steps.length;
            const incoming = steps[nextIndex];

            await shatterBox(outgoing);
            currentStep = nextIndex;
            updateClasses(currentStep);
            await reformBox(incoming);

            isAnimating = false;
        }

        function startCarousel() {
            clearInterval(timer);
            timer = setInterval(nextStep, DISPLAY_TIME + SHATTER_TIME + REFORM_TIME);
        }

        function stopCarousel() {
            clearInterval(timer);
        }

        updateClasses(0);
        const firstCard = steps[0];
        reformBox(firstCard).then(() => {
            startCarousel();
        });

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) stopCarousel();
            else startCarousel();
        });
    }

    // ==========================================
    // 2. Intersection Observers (Contact & About)
    // ==========================================
    const contactSection = document.querySelector(".contact");
    if (contactSection) {
        const contactObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        contactSection.classList.add("visible");
                        observer.unobserve(contactSection);
                    }
                });
            },
            { threshold: 0.25 }
        );
        contactObserver.observe(contactSection);
    }

    const aboutSection = document.querySelector(".about");
    if (aboutSection) {
        aboutSection.style.opacity = "0";
        aboutSection.style.transform = "translateY(40px)";
        aboutSection.style.transition = "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";

        const aboutObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        aboutSection.style.opacity = "1";
                        aboutSection.style.transform = "translateY(0)";
                        observer.unobserve(aboutSection);
                    }
                });
            },
            { threshold: 0.15 }
        );
        aboutObserver.observe(aboutSection);
    }

    // ==========================================
    // 3. Contact Form Submission (Simplified & Fixed)
    // ==========================================
    const contactForm = document.querySelector(".contact-form form");
    
    if (contactForm) {
        // Create feedback box if it doesn't exist
        let feedbackBox = contactForm.querySelector(".form-feedback");
        if (!feedbackBox) {
            feedbackBox = document.createElement("div");
            feedbackBox.className = "form-feedback";
            feedbackBox.style.marginTop = "15px";
            feedbackBox.style.padding = "10px";
            feedbackBox.style.borderRadius = "5px";
            feedbackBox.style.fontSize = "14px";
            feedbackBox.style.fontWeight = "bold";
            feedbackBox.style.textAlign = "center";
            feedbackBox.style.display = "none";
            contactForm.appendChild(feedbackBox);
        }

        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            feedbackBox.style.display = "block";
            feedbackBox.style.backgroundColor = "#e0e0e0";
            feedbackBox.style.color = "#333";
            feedbackBox.textContent = "Sending message...";

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");
            const honeypotInput = contactForm.querySelector('input[name="website"]');

            const formData = {
                name: nameInput ? nameInput.value.trim() : "",
                email: emailInput ? emailInput.value.trim() : "",
                message: messageInput ? messageInput.value.trim() : "",
                website: honeypotInput ? honeypotInput.value : ""
            };

            try {
                const response = await fetch(`${BASE_URL}/api/contact/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    feedbackBox.style.backgroundColor = "#d4edda";
                    feedbackBox.style.color = "#155724";
                    feedbackBox.textContent = data.message || "Your message has been sent successfully!";
                    contactForm.reset();
                } else {
                    feedbackBox.style.backgroundColor = "#f8d7da";
                    feedbackBox.style.color = "#721c24";
                    
                    if (data.errors) {
                        const firstError = Object.values(data.errors)[0][0]; 
                        feedbackBox.textContent = firstError;
                    } else if (data.error) {
                        feedbackBox.textContent = data.error;
                    } else {
                        feedbackBox.textContent = "Failed to send message.";
                    }
                }
            } catch (error) {
                console.error("Network error:", error);
                feedbackBox.style.backgroundColor = "#f8d7da";
                feedbackBox.style.color = "#721c24";
                feedbackBox.textContent = "Unable to connect to server. Is Django running?";
            }
        });
    }

    // ==========================================
    // 4. Project Modals Logic
    // ==========================================
    const categoryCards = document.querySelectorAll('.category-card');
    const modals = document.querySelectorAll('.project-modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    if (categoryCards.length > 0) {
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const targetId = card.getAttribute('data-target');
                const targetModal = document.getElementById(targetId);
                if (targetModal) {
                    targetModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.project-modal');
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modals.forEach(modal => {
                    if (modal.classList.contains('active')) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }
        });
    }
});