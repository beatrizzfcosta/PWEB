// scripts.js

// Array de componentes de exemplo
const components = [
    { id: "motorA", name: "Motor A", category: "motores", date: "2024-05-20", quantity: 5 },
    { id: "motorB", name: "Motor B", category: "motores", date: "2024-05-21", quantity: 10 },
    { id: "bateria2000", name: "Bateria de Lítio 2000mAh", category: "baterias", date: "2024-05-22", quantity: 20 },
    { id: "bateria3000", name: "Bateria de Lítio 3000mAh", category: "baterias", date: "2024-05-23", quantity: 15 },
    { id: "helice10", name: "Hélice 10x4.5", category: "hélices", date: "2024-05-24", quantity: 25 },
    { id: "helice8", name: "Hélice 8x4.5", category: "hélices", date: "2024-05-25", quantity: 30 }
];

// Função para exibir todos os componentes em formato de grid
function showAllComponents() {
    const componentGrid = document.querySelector(".component-grid");
    componentGrid.innerHTML = "";
    components.forEach(component => {
        const componentElement = document.createElement("div");
        componentElement.classList.add("component");
        componentElement.innerHTML = `
            <img src="caminho/para/imagem/${component.name}.jpg" alt="${component.name}">
            <p>${component.name}</p>
        `;
        componentElement.addEventListener("click", function() {
            openModal(component);
        });
        componentGrid.appendChild(componentElement);
    });
}

// Função para exibir componentes filtrados por categoria
function showComponentsByCategory(category) {
    const componentGrid = document.querySelector(".component-grid");
    componentGrid.innerHTML = "";
    components.forEach(component => {
        if (category === "all" || component.category === category) {
            const componentElement = document.createElement("div");
            componentElement.classList.add("component");
            componentElement.innerHTML = `
                <img src="caminho/para/imagem/${component.name}.jpg" alt="${component.name}">
                <p>${component.name}</p>
            `;
            componentElement.addEventListener("click", function() {
                openModal(component);
            });
            componentGrid.appendChild(componentElement);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("componentModal");
    const closeButton = document.querySelector(".close");

    // Evento de clique no botão de fechar
    closeButton.addEventListener("click", function() {
        closeModal();
    });

    // Evento de clique nos componentes
    const componentGrid = document.querySelector(".component-grid");
    componentGrid.addEventListener("click", function(event) {
        if (!event.target.closest(".component")) {
            closeModal();
        }
    });

    // Evento para fechar o modal quando clicar fora dele
    document.addEventListener("click", function(event) {
        if (!event.target.closest(".modal") && !event.target.closest(".component")) {
            closeModal();
        }
    });
});

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById("componentModal");
    modal.style.display = "none"; // Esconde o modal
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

// Evento de clique nos botões de categoria
const categoryButtons = document.querySelectorAll(".category-btn");
categoryButtons.forEach(button => {
    button.addEventListener("click", function() {
        const category = this.getAttribute("data-category");
        showComponentsByCategory(category);
    });
});

// Evento de digitação na barra de pesquisa
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function() {
    const searchTerm = this.value.toLowerCase();
    const filteredComponents = components.filter(component => {
        return component.name.toLowerCase().includes(searchTerm);
    });
    const category = document.querySelector(".category-btn.active").getAttribute("data-category");
    if (category === "all") {
        showAllComponents();
    } else {
        showComponentsByCategory(category);
    }
});

// Exibir todos os componentes em formato de grid ao carregar a página
showAllComponents();
