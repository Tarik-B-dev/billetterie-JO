document.addEventListener("DOMContentLoaded", function () {
   // Initialiser les données dans le localStorage
   const ticketData = {
      "vip": { "standard": { "places": 4275, "price": 2750 }, "psh": { "places": 238, "price": 2750 }, "psha": { "places": 238, "price": 2750 } },
      "a": { "standard": { "places": 23750, "price": 800 }, "psh": { "places": 1425, "price": 700 }, "psha": { "places": 1425, "price": 700 } },
      "b": { "standard": { "places": 14250, "price": 1125 }, "psh": { "places": 950, "price": 1125 }, "psha": { "places": 950, "price": 1125 } },
      "c": { "standard": { "places": 17100, "price": 125 } },
      "d": { "standard": { "places": 6650, "price": 400 }, "psh": { "places": 713, "price": 300 }, "psha": { "places": 713, "price": 300 } },
      "e": { "standard": { "places": 2850, "price": 40 }, "psh": { "places": 238, "price": 30 }, "psha": { "places": 238, "price": 30 } }
   };
   localStorage.setItem('ticketData', JSON.stringify(ticketData));

   const categorySelect = document.querySelector('select[name="ticketCategory"]');
   const typeSelect = document.querySelector('select[name="ticketType"]');
   const numberInput = document.getElementById('number-places');

   function updateTicketInfo() {
      const category = categorySelect.value;
      const type = typeSelect.value;
      const numberOfTickets = parseInt(numberInput.value, 10);

      const ticketData = JSON.parse(localStorage.getItem('ticketData'));

      if (ticketData[category] && ticketData[category][type]) {
         const price = ticketData[category][type].price;
         const availability = ticketData[category][type].places;

         document.getElementById('price').textContent = price * numberOfTickets;
         document.getElementById('availability').textContent = availability - numberOfTickets;
      } else {
         document.getElementById('price').textContent = 'N/A';
         document.getElementById('availability').textContent = 'N/A';
      }
   }

   [categorySelect, typeSelect, numberInput].forEach(element => {
      element.addEventListener('change', updateTicketInfo);
   });

   // Initialiser les valeurs des spans lors du chargement de la page
   updateTicketInfo();

   document.getElementById('places-form').addEventListener('submit', function (event) {
      event.preventDefault();

      const category = categorySelect.value;
      const type = typeSelect.value;
      const numberOfTickets = parseInt(numberInput.value, 10);

      let ticketData = JSON.parse(localStorage.getItem('ticketData'));

      if (ticketData[category] && ticketData[category][type]) {
         if (ticketData[category][type].places >= numberOfTickets) {
            ticketData[category][type].places -= numberOfTickets;
            localStorage.setItem('ticketData', JSON.stringify(ticketData));
            alert('Votre commande a été confirmée !');
         } else {
            alert('Pas assez de places disponibles.');
         }
      } else {
         alert('Type de billet invalide.');
      }
   });
});
