// Função para buscar os componentes do backend
async function fetchComponents() {
    try {
        const response = await fetch('http://localhost:15000/warehouse/part');
        if (!response.ok) {
            throw new Error('Failed to fetch components');
        }
        const data = await response.json();
        showComponents(data.part); 
    } catch (error) {
        console.error('Error fetching components:', error);
    }
}

function filterComponentsBySearchTerm(searchTerm) {
    const filteredComponents = components.filter(component => {
        return component.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    showComponents(filteredComponents);
}

function showComponentsByCategory(category) {
    const filteredComponents = components.filter(component => {
        return component.type.toLowerCase() === category.toLowerCase();
    });
    showComponents(filteredComponents);
}

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function() {
    const searchTerm = this.value;
    filterComponentsBySearchTerm(searchTerm);
});

// Evento de clique nos botões de categoria
const categoryButtons = document.querySelectorAll(".category-btn");
categoryButtons.forEach(button => {
    button.addEventListener("click", function() {
        const category = this.getAttribute("data-category");
        showComponentsByCategory(category);
    });
});

// Função para exibir as peças em formato de grid
function showComponents(components) {
    const componentGrid = document.querySelector(".component-grid");
    componentGrid.innerHTML = "";
    components.forEach(component => {
        const componentElement = document.createElement("div");
        componentElement.classList.add("component");
        componentElement.innerHTML = `
            <p>${component.name}</p>
            <p>${component.type}</p>
            <p>${component.specifications}</p>
            <p>${component.quantity}</p>
        `;
        componentElement.addEventListener("click", function() {
            openModal(component);
        });
        componentGrid.appendChild(componentElement);
    });
}

// Função para exibir todos os componentes ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    fetchComponents();
});


document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("componentModal");
    const closeButton = document.querySelector(".close");

    // Evento de clique no botão de fechar
    closeButton.addEventListener("click", function() {
        closeModal();
    });

    // Evento para fechar o modal quando clicar fora dele
    document.addEventListener("click", function(event) {
        if (!event.target.closest(".modal") && !event.target.closest(".component")) {
            closeModal();
        }
    });

    // Exibir todos os componentes em formato de grid ao carregar a página
    fetchComponents()
});

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById("componentModal");
    modal.style.display = "none";
}

// Função para abrir o modal com os dados do componente
function openModal(component) {
    closeModal(); // Fecha o modal antes de abrir um novo

    const modal = document.getElementById("componentModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalDate = document.getElementById("modalDate");
    const modalQuantity = document.getElementById("modalQuantity");

    if (!modal || !modalTitle || !modalCategory || !modalDate || !modalQuantity) {
        console.log("Elemento do modal não encontrado");
        return;
    }

    modalTitle.textContent = component.name;
    modalCategory.textContent = "Category: " + component.category;
    modalDate.textContent = "Date: " + component.date;
    modalQuantity.textContent = "Quantity: " + component.quantity;

    modal.style.display = "block"; // Exibe o modal
}