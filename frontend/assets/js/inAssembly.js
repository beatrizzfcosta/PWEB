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
    if (unsavedChanges) {
        document.getElementById('confirmCloseModal').style.display = 'block';
    } else {
        document.getElementById('overlay').style.display = 'none'; // Esconde o overlay
        document.getElementById('droneModal').style.display = 'none';
        updateDroneCard();
    }
}

function confirmCloseModal() {
    document.getElementById('confirmCloseModal').style.display = 'block';
}

function closeModalWithoutSaving() {
    document.getElementById('droneModal').style.display = 'none';
    document.getElementById('confirmCloseModal').style.display = 'none';
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
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        updateCarousel();
        unsavedChanges = true;
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

    unsavedChanges = false;
    closeModal();
}

function addDroneCard(drone) {
    const dronesContainer = document.getElementById('dronesContainer');
    const droneCard = document.createElement('div');
    droneCard.className = 'drone-card';
    droneCard.setAttribute('data-id', drone.id);

    const progress = calculateProgress(drone);

    droneCard.innerHTML = `
        <h3>${drone.model}</h3>
        <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${progress}%;">${progress}%</div>
        </div>
        <button class="resume-btn" onclick="resumeAssembly(${drone.id})">Resume</button>
    `;

    dronesContainer.appendChild(droneCard);
}

function calculateProgress(drone) {
    let completedSteps = 0;
    if (drone.model) completedSteps++;
    if (Object.keys(drone.components).length > 0) completedSteps++;
    if (Object.keys(drone.tests).length > 0) completedSteps++;
    if (drone.name && drone.difficulty) completedSteps++;
    return (completedSteps / 4) * 100;
}

function resumeAssembly(id) {
    droneData = drones.find(drone => drone.id === id);
    openModal();
}

function updateDroneCard() {
    const droneCard = document.querySelector(`.drone-card[data-id='${droneData.id}']`);
    if (droneCard) {
        const progress = calculateProgress(droneData);
        droneCard.querySelector('.progress-bar-fill').style.width = `${progress}%`;
        droneCard.querySelector('.progress-bar-fill').innerText = `${progress}%`;
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
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addDroneBtn').addEventListener('click', () => {
        droneData = {
            model: '',
            components: {},
            tests: {},
            name: '',
            difficulty: ''
        };
        currentStep = 0;
        openModal();
    });

    window.onclick = function(event) {
        const modal = document.getElementById('droneModal');
        if (event.target == modal) {
            closeModal();
        }
    };
});
