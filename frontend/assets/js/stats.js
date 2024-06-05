document.addEventListener('DOMContentLoaded', function() {
    const charts = [];

    const chartPecasUsadas = () => {
        const ctx = document.getElementById('chartPecasUsadassId').getContext('2d');
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Motor', 'Hélice', 'Bateria', 'Controle', 'Câmera'],
                datasets: [{
                    label: 'Peças Mais Usadas',
                    data: [50, 40, 45, 35, 25],
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
        switch(index) {
            case 0:
                return chartPecasUsadas();
            case 1:
                return chartModelosEficientes();
            case 2:
                return chartTempoMedio();
        }
    };
    // Inicializar o primeiro gráfico
    charts.push(chartPecasUsadas());
    charts.push(chartModelosEficientes());
    charts.push(chartTempoMedio());
    charts.push(chartPecasUsadas());
});
