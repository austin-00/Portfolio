document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".workflow-step");
    if (!steps.length) return;

    let currentStep = 0;

    function restartAnimation(container, selector) {
        const items = container.querySelectorAll(selector);

        items.forEach(item => item.classList.remove("animate"));

        // Reflow trick to restart CSS animations
        void container.offsetWidth;

        items.forEach(item => item.classList.add("animate"));
    }

    function update3DCarousel() {
        const total = steps.length;

        steps.forEach((step, index) => {
            // Reset positional classes
            step.classList.remove("active", "prev", "next");

            if (index === currentStep) {
                // Active Front Card
                step.classList.add("active");

                // Trigger node animations for the active step
                const stepType = step.dataset.step;
                const childSelector = `.${stepType}-node, .${stepType}-item, .connector`;
                restartAnimation(step, childSelector);

            } else if (index === (currentStep - 1 + total) % total) {
                // Card rotating out to the left
                step.classList.add("prev");

            } else if (index === (currentStep + 1) % total) {
                // Card waiting to rotate in from the right
                step.classList.add("next");
            }
        });
    }

    function nextStep() {
        currentStep = (currentStep + 1) % steps.length;
        update3DCarousel();
    }

    // Initialize initial 3D positions and set timer
    update3DCarousel();
    setInterval(nextStep, 4000);
});