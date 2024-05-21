// Array de modelos de exemplo
const models = [
    {
        id: "droneA",
        name: "Drone A",
        category: "quadcopter",
        date: "2024-05-20",
        quantity: 5,
        components: {
            motors: { id: "motorA", quantity: 4 },
            battery: { id: "battery2000", quantity: 1 },
            propellers: { id: "propeller10", quantity: 4 },
            flightController: { id: "fcA", quantity: 1 },
            frame: { id: "frameA", quantity: 1 },
            gps: { id: "gpsA", quantity: 1 },
        },
    },
    {
        id: "droneB",
        name: "Drone B",
        category: "quadcopter",
        date: "2024-05-21",
        quantity: 10,
        components: {
            motors: { id: "motorB", quantity: 4 },
            battery: { id: "battery3000", quantity: 1 },
            propellers: { id: "propeller8", quantity: 4 },
            flightController: { id: "fcB", quantity: 1 },
            frame: { id: "frameA", quantity: 1 },
            gps: { id: "gpsB", quantity: 1 },
        },
    },
    {
        id: "droneC",
        name: "Drone C",
        category: "fixed-wing",
        date: "2024-05-22",
        quantity: 20,
        components: {
            motors: { id: "motorA", quantity: 1 },
            battery: { id: "battery2000", quantity: 1 },
            propellers: { id: "propeller10", quantity: 1 },
            flightController: { id: "fcA", quantity: 1 },
            frame: { id: "frameB", quantity: 1 },
            gps: { id: "gpsA", quantity: 1 },
        },
    },
    {
        id: "droneD",
        name: "Drone D",
        category: "fixed-wing",
        date: "2024-05-23",
        quantity: 15,
        components: {
            motors: { id: "motorB", quantity: 1 },
            battery: { id: "battery3000", quantity: 1 },
            propellers: { id: "propeller8", quantity: 1 },
            flightController: { id: "fcB", quantity: 1 },
            frame: { id: "frameB", quantity: 1 },
            gps: { id: "gpsB", quantity: 1 },
        },
    },
    {
        id: "droneE",
        name: "Drone E",
        category: "helicopter",
        date: "2024-05-24",
        quantity: 25,
        components: {
            motors: { id: "motorA", quantity: 1 },
            battery: { id: "battery2000", quantity: 1 },
            propellers: { id: "propeller10", quantity: 2 },
            flightController: { id: "fcA", quantity: 1 },
            frame: { id: "frameC", quantity: 1 },
            gps: { id: "gpsA", quantity: 1 },
        },
    },
    {
        id: "droneF",
        name: "Drone F",
        category: "helicopter",
        date: "2024-05-25",
        quantity: 30,
        components: {
            motors: { id: "motorB", quantity: 1 },
            battery: { id: "battery3000", quantity: 1 },
            propellers: { id: "propeller8", quantity: 2 },
            flightController: { id: "fcB", quantity: 1 },
            frame: { id: "frameC", quantity: 1 },
            gps: { id: "gpsB", quantity: 1 },
        },
    },
];

// Função para exibir modelos em formato de grid
function showModels(filteredModels) {
    const modelGrid = document.querySelector(".model-grid");
    modelGrid.innerHTML = "";
    filteredModels.forEach(model => {
        const modelElement = document.createElement("div");
        modelElement.classList.add("model");
        modelElement.innerHTML = `
            <p>${model.name}</p>
        `;
        modelElement.addEventListener("click", function() {
            openModal(model);
        });
        modelGrid.appendChild(modelElement);
    });
}

// Função para exibir todos os modelos
function showAllModels() {
    showModels(models);
}

// Função para exibir modelos filtrados por termo de pesquisa
function filterModelsBySearchTerm(searchTerm) {
    const filteredModels = models.filter(model => {
        return model.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    showModels(filteredModels);
}

// Evento de digitação na barra de pesquisa
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function() {
    const searchTerm = this.value;
    filterModelsBySearchTerm(searchTerm);
});

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("modelModal");
    const closeButton = document.querySelector(".close");

    // Evento de clique no botão de fechar
    closeButton.addEventListener("click", function() {
        closeModal();
    });

    // Evento para fechar o modal quando clicar fora dele
    document.addEventListener("click", function(event) {
        if (!event.target.closest(".modal-content") && !event.target.closest(".model")) {
            closeModal();
        }
    });

    // Exibir todos os modelos em formato de grid ao carregar a página
    showAllModels();
});

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById("modelModal");
    modal.style.display = "none";
}

// Função para abrir o modal com os dados do modelo
function openModal(model) {
    closeModal(); // Fecha o modal antes de abrir um novo

    const modal = document.getElementById("modelModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalDate = document.getElementById("modalDate");
    const modalQuantity = document.getElementById("modalQuantity");

    if (!modal || !modalTitle || !modalCategory || !modalDate || !modalQuantity) {
        console.log("Elemento do modal não encontrado");
        return;
    }

    modalTitle.textContent = model.name;
    modalCategory.textContent = "Category: " + model.category;
    modalDate.textContent = "Date: " + model.date;
    modalQuantity.textContent = "Quantity: " + model.quantity;

    modal.style.display = "block"; // Exibe o modal
}
