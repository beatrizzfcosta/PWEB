document.addEventListener("DOMContentLoaded", function() {
    const dronesEmMontagem = [
        { name: "Drone A", progress: 0.7 },
        { name: "Drone B", progress: 0.45 },
    ];

    const dronesMontados = [
        { name: "Drone C", date: '2024-05-04' },
        { name: "Drone D", date: '2024-05-08' },
    ];

    const componentesBaixaDisponibilidade = [
        { name: "Motor A", quantity: 5 },
        { name: "Bateria 2000mAh", quantity: 8 },
    ];

    const dronesMenorDisponibilidade = [
        { name: "Drone E", quantity: 2 },
        { name: "Drone F", quantity: 3 },
    ];

    function createProgressBar(containerId, value) {
        var container = document.getElementById(containerId);
        if (!container) {
            console.error("Container não encontrado para a barra de progresso: " + containerId);
            return;
        }
        
        var circle = new ProgressBar.Circle(container, {
            color: '#FFEA82',
            trailColor: '#eee',
            trailWidth: 1,
            duration: 1400,
            easing: 'bounce',
            strokeWidth: 6,
            from: { color: '#FFEA82', a: 0 },
            to: { color: '#ED6A5A', a: 1 },
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                var val = Math.round(circle.value() * 100);
                if (val === 0) {
                    circle.setText('');
                } else {
                    circle.setText(val + '%');
                }
            }
        });

        circle.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        circle.text.style.fontSize = '2rem';

        circle.animate(value);  // Número de 0.0 a 1.0
    }

    function showDronesEmMontagem() {
        createProgressBar("progress-container-1", dronesEmMontagem[0].progress);
        createProgressBar("progress-container-2", dronesEmMontagem[1].progress);
    }

    function showDronesMontados() {
        const container = document.getElementById("drones-montados-list");
        if (!container) {
            console.error("Container de drones montados não encontrado.");
            return;
        }

        dronesMontados.forEach(drone => {
            const droneElement = document.createElement("li");
            droneElement.textContent = `${drone.name} - ${drone.date}`;
            container.appendChild(droneElement);
        });
    }

    function showComponentesBaixaDisponibilidade() {
        const container = document.getElementById("componentes-baixa-disponibilidade-list");
        if (!container) {
            console.error("Container de componentes com baixa disponibilidade não encontrado.");
            return;
        }

        componentesBaixaDisponibilidade.forEach(componente => {
            const componenteElement = document.createElement("li");
            componenteElement.textContent = `${componente.name} - ${componente.quantity} unidades`;
            container.appendChild(componenteElement);
        });
    }

    function showDronesMenorDisponibilidade() {
        const container = document.getElementById("drones-menor-disponibilidade-list");
        if (!container) {
            console.error("Container de drones com menor disponibilidade não encontrado.");
            return;
        }

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
