document.addEventListener('DOMContentLoaded', async () => {
    // Dummy data for demonstration. In a real application, this data should be fetched from a backend or local storage.
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token not found in local storage');
    }

    const response = await fetch('http://localhost:15000/project', {
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
    const projects = data.data;
    console.log(projects[0].users[0].username)
    const assembledDronesContainer = document.getElementById('assembledDronesContainer');
    projects.forEach(result => {
        const droneCard = document.createElement('div');
        // é adicionada ao droneCard, o que permite estilizar este elemento com CSS.
        droneCard.classList.add('drone-card');

        const droneTitle = document.createElement('h2');
        droneTitle.innerText = `Project  ${result.name}`;
        //O droneTitle é então adicionado como filho ao droneCard.
        droneCard.appendChild(droneTitle);

        result.users.forEach(step => {
            const stepInfo = document.createElement('div');
            stepInfo.classList.add('step-info');
            stepInfo.innerHTML = `<span>${step.username}</span> `;
            //O droneCard é então adicionado como filho ao droneCard.
            droneCard.appendChild(stepInfo);
        });

        // na div com id assembledDronesContainer adiciono para cada assembledDrones o objeto criado acima
        assembledDronesContainer.appendChild(droneCard);
    });
});
