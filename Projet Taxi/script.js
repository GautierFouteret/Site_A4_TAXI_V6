import 'reservation.php';
import 'fonction_calcul_tarif.php';

// Récupération des éléments du DOM
const contactForm = document.querySelector('#contact-form');
const confirmationMessage = document.querySelector('#confirmation-message');
const gallery = document.querySelector('#gallery');

// Écouteur d'événement pour le formulaire de contact
contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Simulation de l'envoi du message
    setTimeout(function() {
        contactForm.reset(); // Réinitialise le formulaire
        confirmationMessage.style.display = 'block'; // Affiche le message de confirmation
        setTimeout(function() {
            confirmationMessage.style.display = 'none'; // Cache le message de confirmation après 3 secondes
        }, 3000);
    }, 1000);
});

// Génération de la galerie de photos de la flotte de taxis
const images = ['taxi arras 1.jpg', 'taxi arras 2.jpg', 'taxi arras 3.jpg']; // Remplacez avec les noms de vos images
images.forEach(image => {
    const img = document.createElement('img');
    img.src = 'images/' + image; // Assurez-vous que le chemin d'accès est correct
    img.alt = 'Taxi';
    gallery.appendChild(img);
});



$(document).ready(function() {
    $('#reservation-form').submit(function(event) {
        event.preventDefault();
        
        var departure = $('#departure').val();
        var arrival = $('#arrival').val();
        
        // Envoi des données à calcule_distance.php via AJAX pour obtenir la distance
        $.get('calcule_distance.php', { departure: departure, arrival: arrival }, function calculer_tarif($departure, $arrival, $tarif_choisi) {
            // Calcul du tarif en fonction de la distance (à remplacer par votre fonction de calcul de tarif)

                $distance_km = calculer_distance($departure, $arrival); // Fonction défini pour calculer la distance entre deux lieux
                $tarif = 0;
                switch ($tarif_choisi) {
                    case 1:
                        // Calcul du tarif selon les règles du tarif A
                        $tarif = $distance_km * 1.14; // Tarif kilométrique à 1,14 euros
                        $tarif = floor($distance_km / 0.0872) * 1.1; // Chute tarifaire de 0.1 euros par 87,72 mètres
                        break;
                    case 2:
                        // Calcul du tarif selon les règles du tarif B
                        $tarif = $distance_km * 1.45; // Tarif kilométrique à 1,45 euros
                        $tarif = floor($distance_km / 0.06892) * 1.1; // Chute tarifaire de 0.1 euros par 68.92 mètres
                        break;
                    case 3:
                        // Calcul du tarif selon les règles du tarif C
                        $tarif = $distance_km * 2.28; // Tarif kilométrique à 2,28 euros
                        $tarif = floor($distance_km / 0.04385) * 1.1; // Chute tarifaire de 0.1 euros par 43,85 mètres
                        break;
                    case 4:
                        // Calcul du tarif selon les règles du tarif D
                        $tarif = $distance_km * 2.90; // Tarif kilométrique à 2,90 euros
                        $tarif = floor($distance_km / 0.03448) * 1.1; // Chute tarifaire de 0.1 euros par 34,48 mètres
                        break;
                    default:
                        // Par défaut, le tarif est 0
                        $tarif = 0;
                        break;
                }
            
                return $tarif;
            })
            // Affichage du tarif
            $('#tarif-message').text('Le tarif de votre course est de : ' + tarif.toFixed(2) + ' euros');
    });
});
