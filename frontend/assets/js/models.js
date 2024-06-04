// Array de modelos de exemplo
async function getDrones() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token not found in local storage');
        }

        const response = await fetch('http://localhost:15000/warehouse', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch components');
        }

        const data = await response.json();
        console.log(data)
        return data.data;
    } catch (error) {
        console.error('Error fetching components:', error);
    }
}
async function fetchDrones() {
    try {
        const drones = await getDrones();
        console.log(drones)
        if (drones) {
            console.log("2")
            showModels(drones);
        }
    } catch (error) {
        console.error('Error fetching components:', error);
    }
}

// Função para exibir modelos em formato de grid
function showModels(filteredModels) {
    const modelGrid = document.querySelector(".model-grid");
    modelGrid.innerHTML = "";
    filteredModels.forEach(model => {
        const modelElement = document.createElement("div");
        modelElement.classList.add("model");
        modelElement.innerHTML = `
            <p>${model.model}</p>
        `;
        modelElement.addEventListener("click", function() {
            openModal(model);
        });
        modelGrid.appendChild(modelElement);
    });
}

// Função para exibir todos os modelos
async function showAllModels() {
    const components = await getDrones();
    showModels(components);
}

// Função para exibir modelos filtrados por termo de pesquisa
async function filterModelsBySearchTerm(searchTerm) {
    const components = await getData();
    const filteredModels = components.filter(model => {
        return model.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    showModels(filteredModels);
}

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function() {
    const searchTerm = this.value;
    filterModelsBySearchTerm(searchTerm);
});

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("modelModal");
const overlay = document.getElementById("overlay");
    const closeButton = document.querySelector(".close");
    fetchDrones();
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

});

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById("modelModal");
    const overlay = document.getElementById("overlay");
    modal.style.display = "none";
    overlay.style.display = "none";
}

// Função para abrir o modal com os dados do modelo
function openModal(model) {
    closeModal(); // Fecha o modal antes de abrir um novo

    const modal = document.getElementById("modelModal");
    const overlay = document.getElementById("overlay");
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalDate = document.getElementById("modalDate");
    const modalQuantity = document.getElementById("modalQuantity");

    if (!modal || !modalTitle || !modalCategory || !modalDate || !modalQuantity) {
        console.log("Elemento do modal não encontrado");
        return;
    }

    modalTitle.textContent = model.model;
    modalCategory.textContent = "Category: " + model.manufacturer;
    modalQuantity.textContent = "Quantity: " + model.quantity;

    modal.style.display = "block"; // Exibe o modal
    overlay.style.display = "block"; // Exibe o overlay
}
