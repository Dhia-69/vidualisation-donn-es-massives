function getFootballData() {
    return fetch('data.json') // Charger le fichier data.json localement
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données : ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Données brutes :', data); // Afficher les données brutes (optionnel)
            return data.competitions;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
            return []; // Retourner un tableau vide en cas d'erreur
        });
}

// Fonction pour créer un graphique à barres
function createFootballBarChart(competitionsData) {
    const areas = {};
    competitionsData.forEach(competition => {
        const areaName = competition.area.name;
        areas[areaName] = areas[areaName] ? areas[areaName] + 1 : 1;
    });

    const labels = Object.keys(areas);
    const data = Object.values(areas);

    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nombre de compétitions',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
}
function createFootballLineChart(competitionsData) {
    const years = {};
    competitionsData.forEach(competition => {
        if (competition.currentSeason && competition.currentSeason.startDate) {
            const year = new Date(competition.currentSeason.startDate).getFullYear();
            years[year] = years[year] ? years[year] + 1 : 1;
        }
    });

    const xValues = Object.keys(years);
    const yValues = Object.values(years);

    const data = [{
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Nombre de compétitions par année',
        marker: {color: 'blue'}
    }];

    const layout = {
        title: 'Évolution du Nombre de Compétitions de Football au Fil des Années',
        xaxis: {
            title: 'Année',
            tickmode: 'linear'
        },
        yaxis: {
            title: 'Nombre de Compétitions'
        }
    };

    Plotly.newPlot('line-chart', data, layout);
}

// Fonction pour créer un diagramme circulaire montrant la répartition des compétitions par type
function createFootballPieChart(competitionsData) {
    const types = {};
    competitionsData.forEach(competition => {
        const type = competition.type;
        types[type] = types[type] ? types[type] + 1 : 1;
    });

    const labels = Object.keys(types);
    const values = Object.values(types);

    const data = [{
        values: values,
        labels: labels,
        type: 'pie'
    }];

    const layout = {
        title: 'Répartition des Compétitions de Football par Type'
    };

    Plotly.newPlot('pie-chart', data, layout);
}

function createFootballRadarChart(competitionsData) {
    // Sélectionner un échantillon de données pour la démonstration
    const sampleCompetitions = competitionsData.slice(0, 5);

    // Préparer les données pour le diagramme radar
    const labels = ['Popularité', 'Durée', 'Excitation', 'Équité', 'Accessibilité'];
    const datasets = [];

    // Définir différentes couleurs pour chaque compétition
    const colors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'];

    // Générer des valeurs aléatoires pour les caractéristiques des compétitions
    sampleCompetitions.forEach((competition, index) => {
        const values = [
            Math.floor(Math.random() * 10) + 1, // Popularité (valeurs entre 1 et 10)
            Math.floor(Math.random() * 10) + 1, // Durée
            Math.floor(Math.random() * 10) + 1, // Excitation
            Math.floor(Math.random() * 10) + 1, // Équité
            Math.floor(Math.random() * 10) + 1  // Accessibilité
        ];

        datasets.push({
            label: competition.name,
            data: values,
            backgroundColor: colors[index],
            borderColor: colors[index],
            borderWidth: 1
        });
    });

    // Configurer les options du diagramme radar
    const options = {
        scale: {
            ticks: { beginAtZero: true, max: 10 }
        }
    };

    // Créer le diagramme radar
    const ctx = document.getElementById('radar-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: options
    });
}

export {createFootballBarChart}
export {createFootballLineChart}
export{createFootballRadarChart}
export{createFootballPieChart}
export {getFootballData}
