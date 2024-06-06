document.addEventListener('DOMContentLoaded', async function () {
    const charts=[]
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token not found in local storage');
    }

    const chartPecasUsadas = async () => {
        const response = await fetch('http://localhost:15000/stat/mostOwnedParts', {
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
        const ctx = document.getElementById('chartPecasUsadassId').getContext('2d');
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [data[0].name, data[1].name, data[2].name, data[3].name, data[4].name],
                datasets: [{
                    label: 'Peças Mais Usadas',
                    data: [data[0].quantity, data[1].quantity, data[2].quantity, data[3].quantity, data[4].quantity],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };


    const chartLineExample = async () => {
        try {
            const response = await fetch('http://localhost:15000/stat/mostBuiltDrone', {
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
            const ctx = document.getElementById('lineChartExample').getContext('2d');
            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [data[0].model, data[1].model, data[2].model, data[3].model, data[4].model],
                    datasets: [{
                        label: 'Example Line Data',
                        data: [data[0].quantity, data[1].quantity, data[2].quantity, data[3].quantity, data[4].quantity],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error in chartLineExample:', error);
        }
    };
    const chartModelosEficientes = () => {
        return new Chart(document.getElementById('chartModelosEficientes').getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Velocidade', 'Estabilidade', 'Durabilidade', 'Custo', 'Facilidade de Montagem'],
                datasets: [
                    {
                        label: 'Drone A',
                        data: [70, 80, 90, 60, 70],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Drone B',
                        data: [80, 70, 85, 65, 80],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Drone C',
                        data: [60, 75, 80, 70, 90],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const chartTempoMedio = () => {
        return new Chart(document.getElementById('chartTempoMedio').getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Escolha do Modelo', 'Escolha das Peças', 'Montagem', 'Fase de Teste'],
                datasets: [
                    {
                        label: 'Drone A',
                        data: [30, 40, 35, 15],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'Drone B',
                        data: [20, 35, 50, 45],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'Drone C',
                        data: [25, 30, 45, 20],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'Drone D',
                        data: [35, 25, 40, 30],
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1,
                        fill: false
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const createChart = (index) => {
        switch (index) {
            case 0:
                return chartPecasUsadas();
            case 1:
                return chartLineExample();
            case 2:
                return chartTempoMedio();


        }
    };
    // Inicializar o primeiro gráfico
    charts.push(chartPecasUsadas());
    charts.push(chartLineExample());
    charts.push(chartTempoMedio());
    charts.push(chartPecasUsadas());
});
