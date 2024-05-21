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
        <h2>Seleção de Peças</h2>
        <form>
            <label>
                <input type="checkbox" name="parts" value="Motor Brushless 2204">
                Motor Brushless 2204
            </label><br>
            <label>
                <input type="checkbox" name="parts" value="Controlador de Velocidade Eletrônico (ESC) 20A">
                Controlador de Velocidade Eletrônico (ESC) 20A
            </label><br>
            <label>
                <input type="checkbox" name="parts" value="Hélices 5045">
                Hélices 5045
            </label><br>
        </form>
    </div>
`;
}

function createAvailabilityCheck() {
    return `
        <div class="availability">
            <h2>Checagem de Disponibilidade</h2>
            <p>Verifique se todas as peças selecionadas estão disponíveis em estoque antes de prosseguir com a montagem.</p>
            <ul>
                <li>Motor Brushless 2204: <span class="status">Disponível</span></li>
                <li>ESC 20A: <span class="status">Indisponível</span></li>
                <li>Hélices 5045: <span class="status">Disponível</span></li>
                <li>Placa Controladora de Voo F4: <span class="status">Disponível</span></li>
                <li>Bateria LiPo 1500mAh 4S: <span class="status">Disponível</span></li>
                <li>Transmissor e Receptor de Rádio 2.4GHz: <span class="status">Disponível</span></li>
                <li>Estrutura de Fibra de Carbono: <span class="status">Disponível</span></li>
                <li>GPS Módulo: <span class="status">Disponível</span></li>
                <li>LEDs para Orientação: <span class="status">Indisponível</span></li>
            </ul>
            <p>Nota: Para itens indisponíveis, considere fontes alternativas ou aguarde reposição.</p>
        </div>
    `;
}

function createTestingPhase() {
    return `
    <div class="testing">
        <h2>Fase de Testes</h2>
        <p>Conclua a montagem e teste seu drone de acordo com as instruções fornecidas abaixo:</p>
        <form>
            <label>
                <input type="checkbox" name="testing" value="Verificar conexões elétricas">
                Verifique todas as conexões elétricas e assegure-se de que estão seguras.
            </label><br>
            <label>
                <input type="checkbox" name="testing" value="Calibrar placa controladora de voo">
                Calibre a placa controladora de voo utilizando o software apropriado.
            </label><br>
            <label>
                <input type="checkbox" name="testing" value="Teste de motor">
                Realize um teste de motor para garantir que todos estão funcionando corretamente.
            </label><br>
            <label>
                <input type="checkbox" name="testing" value="Teste de rádio">
                Teste a resposta do transmissor e receptor de rádio para garantir comunicação adequada.
            </label><br>
            <label>
                <input type="checkbox" name="testing" value="Voo de teste">
                Realize um voo de teste em um espaço aberto e seguro.
            </label><br>
            <label>
                <input type="checkbox" name="testing" value="Monitorar temperatura">
                Monitore a temperatura dos componentes durante o voo para evitar superaquecimento.
            </label><br>
            <label>
                <input type="checkbox" name="testing" value="Ajustar configurações de voo">
                Ajuste as configurações de voo conforme necessário para estabilidade e desempenho ideal.
            </label>
        </form>
        <p>Se encontrar algum problema durante os testes, consulte o manual de solução de problemas ou procure ajuda em fóruns especializados.</p>
    </div>
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
