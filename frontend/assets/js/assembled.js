document.addEventListener('DOMContentLoaded', () => {
    // Dummy data for demonstration. In a real application, this data should be fetched from a backend or local storage.
    const assembledDrones = [
        {
            id: 1,
            model: 'Modelo C',
            steps: [
                { name: 'Escolher o Modelo do Drone', date: '2024-05-01' },
                { name: 'Escolher as Peças do Drone', date: '2024-05-02' },
                { name: 'Verificar Disponibilidade das Peças', date: '2024-05-03' },
                { name: 'Fase de Testes', date: '2024-05-04' }
            ]
        },
        {
            id: 2,
            model: 'Modelo D',
            steps: [
                { name: 'Escolher o Modelo do Drone', date: '2024-05-05' },
                { name: 'Escolher as Peças do Drone', date: '2024-05-06' },
                { name: 'Verificar Disponibilidade das Peças', date: '2024-05-07' },
                { name: 'Fase de Testes', date: '2024-05-08' }
            ]
        }
    ];

    const assembledDronesContainer = document.getElementById('assembledDronesContainer');
    assembledDrones.forEach(drone => {
        const droneCard = document.createElement('div');
        // é adicionada ao droneCard, o que permite estilizar este elemento com CSS.
        droneCard.classList.add('drone-card');

        const droneTitle = document.createElement('h2');
        droneTitle.innerText = `Drone ${drone.id} - ${drone.model}`;
        //O droneTitle é então adicionado como filho ao droneCard.
        droneCard.appendChild(droneTitle);

        drone.steps.forEach(step => {
            const stepInfo = document.createElement('div');
            stepInfo.classList.add('step-info');
            stepInfo.innerHTML = `<span>${step.name}:</span> ${step.date}`;
            //O droneCard é então adicionado como filho ao droneCard.
            droneCard.appendChild(stepInfo);
        });

        // na div com id assembledDronesContainer adiciono para cada assembledDrones o objeto criado acima
        assembledDronesContainer.appendChild(droneCard);
    });
});
