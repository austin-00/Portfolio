document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 0. Dynamic API Base URL Configuration
    // ==========================================
    const API_HOSTNAME = window.location.hostname || "127.0.0.1";
    const BASE_URL = "http://127.0.0.1:8000";

    // ==========================================
    // 1. Workflow Step Carousel
    // ==========================================
    const steps = document.querySelectorAll(".workflow-step");

    if (steps.length) {
        let currentStep = 0;
        let timer;

        const animationSelectors = {
            build: ".build-node",
            test: ".test-item",
            fix: ".fix-item",
            automate: ".automate-item"
        };

        function restartAnimation(container, selector) {
            const items = container.querySelectorAll(selector);

            items.forEach(item => {
                item.classList.remove("animate");
            });

            void container.offsetWidth; // Trigger reflow to restart CSS animation

            items.forEach(item => {
                item.classList.add("animate");
            });
        }

        function updateCarousel() {
            steps.forEach((step, index) => {
                step.classList.remove("active", "prev", "next");

                if (index === currentStep) {
                    step.classList.add("active");

                    const type = step.dataset.step;
                    const selector = animationSelectors[type];

                    if (selector) {
                        restartAnimation(step, selector);
                    }

                    return;
                }

                // FIXED: Correct formula for previous step index
                if (index === (currentStep - 1 + steps.length) % steps.length) {
                    step.classList.add("prev");
                    return;
                }

                if (index === (currentStep + 1) % steps.length) {
                    step.classList.add("next");
                }
            });
        }

        function nextStep() {
            currentStep = (currentStep + 1) % steps.length;
            updateCarousel();
        }

        function startCarousel() {
            clearInterval(timer);
            timer = setInterval(nextStep, 4000);
        }

        function stopCarousel() {
            clearInterval(timer);
        }

        updateCarousel();
        startCarousel();

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                stopCarousel();
            } else {
                startCarousel();
            }
        });
    }

    // ==========================================
    // 2. Contact Section Intersection Observer
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

    // ==========================================
    // 3. Cookie Helper
    // ==========================================
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // ==========================================
    // 4. Fetch CSRF Token
    // ==========================================
    async function initializeCsrf() {
        try {
            await fetch(`${BASE_URL}/api/csrf/`, {
                method: "GET",
                credentials: "include"
            });
            console.log("CSRF token initialized.");
        } catch (error) {
            console.error("Error initializing CSRF token:", error);
        }
    }

    // Initialize CSRF Token on load
    initializeCsrf();

    // ==========================================
    // 5. Contact Form Submission
    // ==========================================
    const contactForm = document.querySelector(".contact-form form");

    if (contactForm) {
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

            let csrfToken = getCookie("csrftoken");
            if (!csrfToken) {
                await initializeCsrf();
                csrfToken = getCookie("csrftoken");
            }

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");

            const formData = {
                name: nameInput ? nameInput.value.trim() : "",
                email: emailInput ? emailInput.value.trim() : "",
                message: messageInput ? messageInput.value.trim() : ""
            };

            try {
                const response = await fetch(`${BASE_URL}/api/contact/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken || ""
                    },
                    credentials: "include",
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
                        const firstError = Object.values(data.errors)[0];
                        feedbackBox.textContent = firstError;
                    } else if (data.error) {
                        feedbackBox.textContent = data.error;
                    } else {
                        feedbackBox.textContent = "Failed to send message. Please check your inputs.";
                    }
                }
            } catch (error) {
                console.error("Network error during submission:", error);
                feedbackBox.style.backgroundColor = "#f8d7da";
                feedbackBox.style.color = "#721c24";
                feedbackBox.textContent = "Unable to connect to server. Please try again later.";
            }
        });
    }
});