// Importer les fonctions de visualisation de football
import { getFootballData, createFootballBarChart, createFootballLineChart, createFootballPieChart, createFootballRadarChart } from './Footballvisualisation.js';

// Importer les fonctions de visualisation de vélo
import { getBikeData, createBikeBarChart ,createBikeMap,createBikeCompanyBarChart} from './bike.js';

// Fonction principale pour charger les visualisations
function loadVisualizations() {
    // Charger les données de football et créer les visualisations
    getFootballData().then(footballData => {
        createFootballBarChart(footballData);
        createFootballLineChart(footballData);
        createFootballPieChart(footballData);
        createFootballRadarChart(footballData);
    });

    // Charger les données de vélo et créer la visualisation
    getBikeData().then(bikeData => {
        createBikeBarChart(bikeData);
        createBikeMap(bikeData);
        createBikeCompanyBarChart(bikeData);
        
        
    });
}

// Attendre que le DOM soit entièrement chargé pour charger les visualisations
document.addEventListener("DOMContentLoaded", function () {
    loadVisualizations();
});
