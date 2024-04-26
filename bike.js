

// Fonction pour récupérer les données depuis l'API via un proxy
async function getBikeData() {
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const apiUrl = 'http://api.citybik.es/v2/networks';
    const url = proxyUrl + apiUrl;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données : ' + response.statusText);
    }
    const data = await response.json();
    console.log('Données brutes :', data); // Ajout du console.log pour afficher les données brutes
    return data.networks;
}

// Fonction pour créer un graphique à barres des réseaux de vélos par pays
async function createBikeBarChart() {
    const data = await getBikeData();

    const countries = {};
    data.forEach(network => {
        const country = network.location.country;
        if (countries[country]) {
            countries[country]++;
        } else {
            countries[country] = 1;
        }
    });

    const labels = Object.keys(countries);
    const values = Object.values(countries);

    const ctx = document.getElementById('bike-networks-chart').getContext('2d');
    const bikeNetworksChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nombre de réseaux de vélos par pays',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
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

// Fonction pour créer une carte Leaflet avec des marqueurs pour chaque réseau de vélos
function createBikeMap(networks) {
    // Sélectionnez un échantillon aléatoire de réseaux de vélos
    const sampleSize = 100; // Taille de l'échantillon
    const sampledNetworks = networks.sort(() => 0.5 - Math.random()).slice(0, sampleSize);

    // Initialisez la carte
    var map = L.map('bike-map').setView([0, 0], 2); // Centrez la carte initialement et définissez le niveau de zoom

    // Ajoutez la couche de tuiles (vous pouvez utiliser différents fournisseurs de tuiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    // Ajoutez des marqueurs pour chaque réseau de vélos échantillonné
    sampledNetworks.forEach(network => {
        var marker = L.marker([network.location.latitude, network.location.longitude]).addTo(map);
        marker.bindPopup(`<b>${network.name}</b><br>${network.location.city}, ${network.location.country}`);
    });
}

// Fonction pour créer un diagramme à barres horizontales représentant la répartition des réseaux de vélos par société
function createBikeCompanyBarChart(networks) {
    // Compter le nombre de réseaux par société
    const companies = {};
    networks.forEach(network => {
        const company = network.company[0]; // Nous utilisons uniquement le premier élément du tableau 'company'
        companies[company] = companies[company] ? companies[company] + 1 : 1;
    });

    // Préparer les données pour le diagramme à barres horizontales
    const labels = Object.keys(companies);
    const data = Object.values(companies);

    // Configuration du graphique
    const ctx = document.getElementById('bike-company-bar-chart').getContext('2d');
    const bikeCompanyBarChart = new Chart(ctx, {
        type: 'bar', // Utilisation du type de graphique 'bar'
        data: {
            labels: labels,
            datasets: [{
                label: 'Répartition des réseaux de vélos par société',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Inverser les axes de l'échelle pour obtenir un graphique de barres horizontal
            scales: {
                x: { // Utiliser l'axe des x pour les données numériques
                    beginAtZero: true
                }
            }
        }
    });
}


// Exporter les fonctions
export { getBikeData, createBikeBarChart, createBikeMap, createBikeCompanyBarChart };
