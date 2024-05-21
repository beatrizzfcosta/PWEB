document.addEventListener("DOMContentLoaded", function() {
    const dronesEmMontagem = [
        { name: "Drone A", progress: 70 },
        { name: "Drone B", progress: 45 },
    ];

    const dronesMontados = [
        { name: "Drone C", date: '2024-05-04'},
        { name: "Drone D", date: '2024-05-08'},
    ];

    const componentesBaixaDisponibilidade = [
        { name: "Motor A", quantity: 5 },
        { name: "Bateria 2000mAh", quantity: 8 },
    ];

    const dronesMenorDisponibilidade = [
        { name: "Drone E", quantity: 2 },
        { name: "Drone F", quantity: 3 },
    ];

    // Função para exibir drones em montagem com barra de progresso
    function showDronesEmMontagem() {
        const container = document.querySelector(".card:nth-of-type(1)");
        dronesEmMontagem.forEach(drone => {
            const droneElement = document.createElement("div");
            droneElement.classList.add("drone-progress");
            droneElement.innerHTML = `
                <p>${drone.name}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${drone.progress}%;"></div>
                </div>
                <p>${drone.progress}% completo</p>
            `;
            container.appendChild(droneElement);
        });
    }

    // Função para exibir drones montados
    function showDronesMontados() {
        const container = document.querySelector(".card:nth-of-type(2) ul");
        dronesMontados.forEach(drone => {
            const droneElement = document.createElement("li");
            droneElement.textContent = `${drone.name} - ${drone.date}`;
            container.appendChild(droneElement);
        });
    }

    // Função para exibir componentes com baixa disponibilidade
    function showComponentesBaixaDisponibilidade() {
        const container = document.querySelector(".card:nth-of-type(3) ul");
        componentesBaixaDisponibilidade.forEach(componente => {
            const componenteElement = document.createElement("li");
            componenteElement.textContent = `${componente.name} - ${componente.quantity} unidades`;
            container.appendChild(componenteElement);
        });
    }

    // Função para exibir drones com menor disponibilidade
    function showDronesMenorDisponibilidade() {
        const container = document.querySelector(".card:nth-of-type(4) ul");
        dronesMenorDisponibilidade.forEach(drone => {
            const droneElement = document.createElement("li");
            droneElement.textContent = `${drone.name} - ${drone.quantity} unidades`;
            container.appendChild(droneElement);
        });
    }

    // Inicialização
    showDronesEmMontagem();
    showDronesMontados();
    showComponentesBaixaDisponibilidade();
    showDronesMenorDisponibilidade();
});
