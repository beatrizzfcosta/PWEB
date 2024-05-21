// inAssembly.js
let droneCount = 0;

function addNewDrone() {
    droneCount++;
    const dronesContainer = document.getElementById('dronesContainer');

    const droneDiv = document.createElement('div');
    droneDiv.classList.add('drone');
    droneDiv.id = `drone${droneCount}`;

    droneDiv.innerHTML = `
        <h2>Drone ${droneCount}</h2>
        <div class="progress-bar" id="progress${droneCount}">
            <div class="progress-bar-inner" id="progress-inner${droneCount}"></div>
        </div>
        <div class="accordion" id="accordion${droneCount}">
            ${createAccordionItem(1, 'Escolher o Modelo do Drone')}
            ${createAccordionItem(2, 'Escolher as Peças do Drone')}
            ${createAccordionItem(3, 'Verificar Disponibilidade das Peças')}
            ${createAccordionItem(4, 'Fase de Testes')}
        </div>
    `;

    dronesContainer.appendChild(droneDiv);
}

function createAccordionItem(step, title) {
    return `
        <div class="accordion-item" id="step${step}Drone${droneCount}">
            <div class="accordion-header" onclick="toggleStep(${droneCount}, ${step})">
                <h3>${title} <span class="status-icon" id="status${step}Drone${droneCount}"></span></h3>
            </div>
            <div class="accordion-content">
                <!-- Content for step ${step} -->
                <div class="step-content">
                    <!-- Dynamic content based on step will go here -->
                    ${step === 1 ? createModelSelection() : ''}
                    ${step === 2 ? createPartsSelection() : ''}
                    ${step === 3 ? createAvailabilityCheck() : ''}
                    ${step === 4 ? createTestingPhase() : ''}
                </div>
                ${step > 1 ? `<button onclick="prevStep(${droneCount}, ${step})">Voltar</button>` : ''}
                ${step < 4 ? `<button onclick="nextStep(${droneCount}, ${step})">Próxima Etapa</button>` : '<button onclick="finish()">Finalizar</button>'}
            </div>
        </div>
    `;
}

function createModelSelection() {
    return `
        <div class="models">
            <input type="radio" name="modelDrone${droneCount}" id="model1Drone${droneCount}" value="Modelo 1">
            <label for="model1Drone${droneCount}">Modelo 1</label><br>
            <input type="radio" name="modelDrone${droneCount}" id="model2Drone${droneCount}" value="Modelo 2">
            <label for="model2Drone${droneCount}">Modelo 2</label><br>
        </div>
    `;
}

function createPartsSelection() {
    return `
        <div class="parts">
            <!-- Lista de peças aqui -->
        </div>
    `;
}

function createAvailabilityCheck() {
    return `
        <div class="availability">
            <!-- Informações de disponibilidade aqui -->
        </div>
    `;
}

function createTestingPhase() {
    return `
        <p>Conclua a montagem e teste seu drone de acordo com as instruções fornecidas.</p>
    `;
}

function toggleStep(drone, step) {
    const content = document.querySelector(`#step${step}Drone${drone} .accordion-content`);
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
}

function nextStep(drone, currentStep) {
    document.querySelector(`#step${currentStep}Drone${drone} .accordion-content`).style.display = 'none';
    document.getElementById(`status${currentStep}Drone${drone}`).innerHTML = '<i class="fas fa-check-circle" style="color: green;"></i>';
    
    const nextStep = currentStep + 1;
    document.getElementById(`step${nextStep}Drone${drone}`).style.display = 'block';
    toggleStep(drone, nextStep);

    updateProgress(drone, nextStep);
}

function prevStep(drone, currentStep) {
    document.querySelector(`#step${currentStep}Drone${drone} .accordion-content`).style.display = 'none';
    
    const prevStep = currentStep - 1;
    toggleStep(drone, prevStep);
}

function finish() {
    alert("Montagem do drone concluída!");
}

function updateProgress(drone, step) {
    const progress = (step - 1) / 3 * 100; // Step ranges from 1 to 4
    document.getElementById(`progress-inner${drone}`).style.width = `${progress}%`;
}

// Função para inicializar os estados das etapas quando um drone é selecionado
function initializeSteps() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`step${i}`).style.display = 'none';
        document.getElementById(`status${i}`).innerHTML = '';
    }
    toggleStep(1);
}
