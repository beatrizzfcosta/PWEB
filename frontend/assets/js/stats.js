
document.addEventListener('DOMContentLoaded', () => {
    const bestModelsCtx = document.getElementById('bestModelsChart').getContext('2d');
    const componentsCtx = document.getElementById('componentsChart').getContext('2d');

    // Dummy data for demonstration. In a real application, this data should be fetched from a backend or local storage.
    const bestModelsData = {
        labels: ['Modelo 1', 'Modelo 2', 'Modelo 3'],
        datasets: [{
            label: 'Best Models',
            data: [2, 1, 0],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    const componentsData = {
        labels: ['Component A', 'Component B', 'Component C'],
        datasets: [{
            label: 'Components Used',
            data: [10, 12, 6],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    const totalAssemblies = 3;
    const averageTime = '3 days';

    new Chart(bestModelsCtx, {
        type: 'bar',
        data: bestModelsData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(componentsCtx, {
        type: 'pie',
        data: componentsData,
        options: {
            responsive: true
        }
    });

    document.getElementById('totalAssemblies').innerText = `Total Assemblies: ${totalAssemblies}`;
    document.getElementById('averageTime').innerText = `Average Time for Assembly: ${averageTime}`;
});
