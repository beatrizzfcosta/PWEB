// Add this JavaScript to your ../assets/js/inAssembly.js
let currentStep = 0;
let droneData = {
    model: '',
    components: {},
    tests: {},
    name: '',
    difficulty: ''
};
let drones = [];
let unsavedChanges = false;

function openModal() {
    document.getElementById('overlay').style.display = 'block'; // Mostra o overlay
    document.getElementById('droneModal').style.display = 'block';
    
    loadComponents();
    updateModal();
    unsavedChanges = false;
}

function closeModal() {
    console.log('fechar');
    document.getElementById('confirmCloseModal').style.display = 'block';
}

function confirmCloseModal(confirm) {
    if (confirm) {
        saveProgress();
        document.getElementById('droneModal').style.display = 'none';
        document.getElementById('confirmCloseModal').style.display = 'none';
        document.getElementById('overlay').style.display = 'none'; 
        updateDroneCard();
    } else {
        closeModalWithoutSaving() 
    }
}

function closeModalWithoutSaving() {
    document.getElementById('droneModal').style.display = 'none';
    document.getElementById('confirmCloseModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none'; 
    unsavedChanges = false;
}

function cancelClose() {
    document.getElementById('confirmCloseModal').style.display = 'none';
}


function nextStep() {
    if (currentStep < 3) {
        currentStep++;
        updateCarousel();
        unsavedChanges = true;
        updateProgressBar();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        updateCarousel();
        unsavedChanges = true;
        updateProgressBar();
    }
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    items.forEach((item, index) => {
        item.style.transform = `translateX(-${currentStep * 100}%)`;
    });
}

function loadComponents() {
    const components = [
        { name: 'Motor', available: true },
        { name: 'Propeller', available: true },
        { name: 'Battery', available: false },
        { name: 'Controller', available: true },
        { name: 'Camera', available: true }
    ];
    const container = document.getElementById('componentsContainer');
    container.innerHTML = ''; // Clear previous components
    components.forEach(component => {
        const div = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.disabled = !component.available;
        checkbox.id = component.name;
        const label = document.createElement('label');
        label.htmlFor = component.name;
        label.innerText = component.name + (component.available ? '' : ' (Unavailable)');
        div.appendChild(checkbox);
        div.appendChild(label);
        container.appendChild(div);
    });
}

function saveProgress() {
    const currentStepId = `step${currentStep + 1}`;
    if (currentStepId === 'step1') {
        droneData.model = document.getElementById('droneModelSelect').value;
    } else if (currentStepId === 'step2') {
        const checkboxes = document.querySelectorAll('#componentsContainer input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            droneData.components[checkbox.id] = checkbox.checked;
        });
    } else if (currentStepId === 'step3') {
        droneData.tests = {
            test1: document.getElementById('test1').checked,
            test2: document.getElementById('test2').checked,
            test3: document.getElementById('test3').checked,
            test4: document.getElementById('test4').checked
        };
    } else if (currentStepId === 'step4') {
        droneData.name = document.getElementById('droneName').value;
        droneData.difficulty = document.getElementById('assemblyDifficulty').value;
    }

    if (!droneData.id) {
        droneData.id = Date.now();
        drones.push(droneData);
    } else {
        const index = drones.findIndex(drone => drone.id === droneData.id);
        if (index !== -1) {
            drones[index] = droneData;
        }
    }

    updateDroneCard(); // Atualiza ou adiciona o cartão do drone

    unsavedChanges = false;
    closeModal();
}

function addDroneCard(drone) {
    const dronesContainer = document.getElementById('dronesContainer');
    const droneCard = document.createElement('div');
    droneCard.className = 'drone-card';
    droneCard.setAttribute('data-id', drone.id);

    const progressContainer = document.createElement('div');
    progressContainer.id = `progressContainer-${drone.id}`;
    progressContainer.className = 'progress-bar-container';

    droneCard.innerHTML = `
        <h3>${drone.model}</h3>
        <div id="progressContainer-${drone.id}" class="progress-bar-container"></div>
        <button class="resume-btn" onclick="resumeAssembly(${drone.id})">Resume</button>
    `;

    dronesContainer.appendChild(droneCard);

    // Initialize the progress bar
    const progressBar = new ProgressBar.Line(`#progressContainer-${drone.id}`, {
        strokeWidth: 2, // Adjust the thickness of the line here
        easing: 'easeInOut',
        duration: 1400, 
        color: '#FFEA82',
        trailColor: '#3a3b3c',
        trailWidth: 1,
        svgStyle: { width: '100%', height: '100%' },
        text: {
            style: {
                color: '#3a3b3c',
                position: 'absolute',
                right: '50px',
                padding: 0,
                margin: 0,
                transform: null
            },
            autoStyleContainer: false
        },
        from: { color: '#FFEA82' },
        to: { color: '#ED6A5A' },
        step: (state, bar) => {
            bar.setText(Math.round(bar.value() + ' %'));
        }
    });

    const progress = calculateProgress(drone);
    progressBar.animate(progress / 100); // Animate to the current progress

    droneCard.appendChild(progressContainer); // Append progressContainer to droneCard
    progressContainer.appendChild(progressBar.svg); // Append progress bar to progressContainer

    drone.progressBar = progressBar; // Save the progress bar instance to update later
}


function updateProgressBar() {
    if (droneData.id) {
        const droneCard = document.querySelector(`.drone-card[data-id='${droneData.id}']`);
        if (droneCard) {
            const progress = calculateProgress(droneData);
            const progressBar = droneData.progressBar;
            progressBar.animate(progress); // Update the progress bar animation
        }
    }
}


function calculateProgress(drone) {
    let completedSteps = 0;
    if (drone.model) completedSteps += 25; // Modelo
    if (Object.keys(drone.components).length > 0) completedSteps += 25; // Componentes
    if (Object.keys(drone.tests).length > 0) completedSteps += 25; // Testes
    if (drone.name && drone.difficulty) completedSteps += 25; // Nome e dificuldade
    return completedSteps; // Retorna o progresso total
}

function calculateCurrentStep(drone) {
    if (!drone.model) return 0;
    if (!drone.name || !drone.difficulty) return 3;
    if (Object.keys(drone.tests).length === 0) return 2;
    if (Object.keys(drone.components).length === 0) return 1;
    return 4;  // All steps completed
}


function resumeAssembly(id) {
    droneData = drones.find(drone => drone.id === id);
    currentStep = calculateCurrentStep(droneData);
    openModal();
}

function calculateCurrentStep(drone) {
    if (!drone.model) return 0;
    if (Object.keys(drone.components).length === 0) return 1;
    if (Object.keys(drone.tests).length === 0) return 2;
    if (!drone.name || !drone.difficulty) return 3;
    return 4;  // All steps completed
}

function updateDroneCard() {
    const droneCard = document.querySelector(`.drone-card[data-id='${droneData.id}']`);
    if (droneCard) {
        const progress = calculateProgress(droneData);
        const progressBar = droneData.progressBar;
        progressBar.animate(progress);  // Update the progress bar animation
    } else {
        addDroneCard(droneData);
    }
}


function updateModal() {
    if (droneData.model) {
        document.getElementById('droneModelSelect').value = droneData.model;
    }
    if (droneData.components) {
        const checkboxes = document.querySelectorAll('#componentsContainer input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = !!droneData.components[checkbox.id];
        });
    }
    if (droneData.tests) {
        document.getElementById('test1').checked = !!droneData.tests.test1;
        document.getElementById('test2').checked = !!droneData.tests.test2;
        document.getElementById('test3').checked = !!droneData.tests.test3;
        document.getElementById('test4').checked = !!droneData.tests.test4;
    }
    if (droneData.name) {
        document.getElementById('droneName').value = droneData.name;
    }
    if (droneData.difficulty) {
        document.getElementById('assemblyDifficulty').value = droneData.difficulty;
    }

    updateProgressBar();  // Update the progress bar in the modal
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addDroneBtn').addEventListener('click', () => {
        // Reset droneData to default values
        droneData = {
            model: '',
            components: {},
            tests: {},
            name: '',
            difficulty: ''
        };
        currentStep = 0;
        openModal();
        updateModal(); // Update the modal to reflect the reset droneData
    });

    window.onclick = function(event) {
        const modal = document.getElementById('droneModal');
        if (event.target == modal) {
            closeModal();
        }
    };
});

