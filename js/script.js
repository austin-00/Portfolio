const steps = document.querySelectorAll(".workflow-step");
let currentStep = 0;


function restartAnimation(container, selector) {
    const items = container.querySelectorAll(selector);

    items.forEach(item => {
        item.classList.remove("animate");
    });

    void container.offsetWidth;

    items.forEach(item => {
        item.classList.add("animate");
    });
}


function showStep() {
    steps.forEach(step => {
        step.classList.remove("active");
    });

    const current = steps[currentStep];

    current.classList.add("active");

    if (current.dataset.step === "build") {
        restartAnimation(current, ".build-node");
    }

    if (current.dataset.step === "test") {
        restartAnimation(current, ".test-item");
    }

    if (current.dataset.step === "fix") {
        restartAnimation(current, ".fix-item");
    }

    if (current.dataset.step === "automate") {
        restartAnimation(current, ".automate-item");
    }
}


function nextStep() {
    currentStep++;

    if (currentStep >= steps.length) {
        currentStep = 0;
    }

    showStep();
}


showStep();

setInterval(nextStep, 4000);

function showStep() {
    steps.forEach(step => {
        step.classList.remove("active");
    });

    const current = steps[currentStep];

    current.classList.add("active");

    if (current.dataset.step === "build") {
        restartAnimation(current, ".build-node");
    }

    if (current.dataset.step === "test") {
        restartAnimation(current, ".test-item");
    }

    if (current.dataset.step === "fix") {
        restartAnimation(current, ".fix-item");
    }

    if (current.dataset.step === "automate") {
        restartAnimation(current, ".automate-item");
    }
}


function nextStep(){
    currentStep++;
    
    if (currentStep >= steps.length) {
        currentStep = 0;
    }

    showStep();
}

setInterval(nextStep, 4000);

showStep();