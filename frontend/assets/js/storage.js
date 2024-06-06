// Função para buscar os componentes do backend
async function getData() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token not found in local storage');
        }

        const response = await fetch('http://localhost:15000/warehouse/part', {
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
        return data.data;
    } catch (error) {
        console.error('Error fetching components:', error);
    }
}

async function fetchComponents() {
    try {
        const components = await getData();
        if (components) {
            showComponents(components);
        }
    } catch (error) {
        console.error('Error fetching components:', error);
    }
}

async function filterComponentsBySearchTerm(searchTerm) {
    try {
        const components = await getData();
        if (components) {
            const filteredComponents = components.filter(component => {
                return component.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            showComponents(filteredComponents);
        }
    } catch (error) {
        console.error('Error filtering components by search term:', error);
    }
}

async function showComponentsByCategory(category) {
    try {
        const components = await getData();
        if (components) {
            const filteredComponents = components.filter(component => {
                return component.type.toLowerCase() === category.toLowerCase();
            });
            console.log(filteredComponents);
            if(category === "all"){
                return showComponents(components);
            }
            showComponents(filteredComponents);
        }
    } catch (error) {
        console.error('Error filtering components by category:', error);
    }
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

// Configuração do modal
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
    fetchComponents();
});

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById("componentModal");
    const overlay = document.getElementById("overlay");

    if (!modal || !overlay) {
        console.log("Elemento do modal ou overlay não encontrado");
        return;
    }

    modal.style.display = "none"; // Esconde o modal
    overlay.style.display = "none"; // Esconde o overlay
}

// Função para abrir o modal com os dados do componente
function openModal(component) {
    closeModal(); // Fecha o modal antes de abrir um novo

    const modal = document.getElementById("componentModal");
    const overlay = document.getElementById("overlay"); 
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalDate = document.getElementById("modalDate");
    const modalQuantity = document.getElementById("modalQuantity");
console.log(modalCategory)
    if (!modal || !modalTitle || !modalCategory || !modalDate || !modalQuantity) {
        console.log("Elemento do modal não encontrado");
        return;
    }

    modalTitle.textContent = component.name;
    modalCategory.textContent = "Category: " + component.type;
    modalDate.textContent = "Date: " + component.date;
    modalQuantity.textContent = "Quantity: " + component.quantity;

    modal.style.display = "block"; // Exibe o modal
    overlay.style.display = "block"; // Exibe o overlay
}

function closeModal2() {
    const modal = document.getElementById("addComponentModal");
    const overlay = document.getElementById("overlay2");

    if (!modal || !overlay) {
        console.log("Elemento do modal ou overlay não encontrado");
        return;
    }

    modal.style.display = "none"; // Esconde o modal
    overlay.style.display = "none"; // Esconde o overlay
}

function openModal2(component) {
    closeModal2(); // Fecha o modal antes de abrir um novo

    const modal = document.getElementById("addComponentModal");
    const overlay = document.getElementById("overlay2"); 
    const modalTitle = document.getElementById("componentName");
    const modalCategory = document.getElementById("componentCategory");
    const modalDate = document.getElementById("componentDescription");
    const modalQuantity = document.getElementById("componentQuantity");

    if (!modal || !modalTitle || !modalCategory || !modalDate || !modalQuantity) {
        console.log("Elemento do modal não encontrado");
        return;
    }

    modalTitle.textContent = component.name || "";
    modalCategory.textContent = "Category: " + (component.type || "");
    modalDate.textContent = "Date: " + (component.date || "");
    modalQuantity.textContent = "Quantity: " + (component.quantity || "");

    modal.style.display = "block"; // Exibe o modal
    overlay.style.display = "block"; // Exibe o overlay
}

function saveComponent() {
   
}
