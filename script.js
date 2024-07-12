document.addEventListener("DOMContentLoaded", function() {
  // Obtener elementos necesarios
  var modal = document.getElementById("modal");
  var btnModal = document.getElementById("open-modal");
  var span = document.getElementsByClassName("close")[0];
  var btnMaps = document.getElementById("btn-maps");
  var btnShop = document.getElementById("btn-shop");
  var mapsSection = document.getElementById("maps-section");
  var shopSection = document.getElementById("shop-section");
  var shopItemsContainer = document.getElementById("shop-items");

// Función para abrir el modal
btnModal.onclick = function() {
    modal.style.display = "block";
    displayMapImages(); // Muestra las imágenes al abrir el modal
}

// Función para detectar el sistema operativo
function getOS() {
  const userAgent = window.navigator.userAgent;
  if (userAgent.includes("Win")) return "windows";
  if (userAgent.includes("Mac")) return "mac";
  if (userAgent.includes("Linux")) return "linux";
  if (userAgent.includes("Android")) return "android";
  if (userAgent.includes("iPhone")) return "ios";
  return "unknown";
}

// Función para mostrar las imágenes de los mapas
function displayMapImages() {
  const modalContent = document.querySelector('.modal-content');
  const os = getOS();
  const fortniteLink = os === "windows" || os === "mac" ? 'fortnite://launch' : 'https://www.epicgames.com/fortnite/';

  const images = [
      {
          url: 'img/CAOZ DOWNTOWN.png',
          alt: 'Mapa 1',
          link: fortniteLink,
      },
      {
          url: 'img/CAOZ_GAMES.png',
          alt: 'Mapa 2',
          link: fortniteLink,
      },
      {
          url: 'img/CAOZITOS_WORLD.png',
          alt: 'Mapa 3',
          link: fortniteLink,
      }
  ];

  // Limpiar contenido anterior
  modalContent.innerHTML = `
      <span class="close"></span>
      <h1>CODIGO: CAOZ</h1>
  `;

  // Agregar imágenes al modal
  images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.url;
      imgElement.alt = image.alt;
      imgElement.style.cursor = 'pointer';
      imgElement.style.width = '400px';
      imgElement.style.height = '200px';
      imgElement.style.margin = '10px';

      // Añadir evento click
      imgElement.onclick = function() {
          window.location.href = image.link; // Abre la aplicación Fortnite o la página web
      };

      modalContent.appendChild(imgElement);
  });
}
  // Función para cerrar el modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // Cerrar el modal cuando el usuario haga clic fuera de él
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  // Función para mostrar la sección de mapas y ocultar la tienda
  btnMaps.onclick = function() {
      mapsSection.style.display = "flex";
      shopSection.style.display = "none";
      btnMaps.classList.add("active");
      btnShop.classList.remove("active");
  }

  // Función para mostrar la sección de la tienda y ocultar mapas
  btnShop.onclick = function() {
      mapsSection.style.display = "none";
      shopSection.style.display = "flex";
      btnShop.classList.add("active");
      btnMaps.classList.remove("active");
      fetchShopItems();
  }

  // Función para obtener los datos de la tienda
  function fetchShopItems() {
      const apiKey = '928ef864-82ceb119-8d9124e7-a570bd6c'; // Cambia por tu propia clave de API
      const apiUrl = 'https://fortniteapi.io/v2/shop?lang=es&includeRenderData=true&includeHiddenTabs=false';

      fetch(apiUrl, {
          headers: {
              'Authorization': apiKey
          }
      })
      .then(response => response.json())
      .then(data => {
          if (data.result && data.fullShop) {
              const shopItems = data.shop;
              displayShopItems(shopItems);
          } else {
              console.log('No se pudo obtener datos de la tienda.');
          }
      })
      .catch(error => console.error('Error:', error));
  }

  // Función para mostrar los ítems de la tienda
  function displayShopItems(items) {
      shopItemsContainer.innerHTML = '';
      items.forEach(item => {
          const shopItem = document.createElement('div');
          shopItem.classList.add('shop-item');

          const itemName = document.createElement('h2');
          itemName.textContent = item.displayName;

          const itemDescription = document.createElement('p');
          itemDescription.textContent = item.displayDescription;

          const itemPrice = document.createElement('p');
          itemPrice.textContent = `Precio: ${item.price.finalPrice}`;

          const itemImage = document.createElement('img');
          itemImage.src = item.displayAssets[0].url;
          itemImage.alt = item.displayName;

          shopItem.appendChild(itemName);
          shopItem.appendChild(itemDescription);
          shopItem.appendChild(itemPrice);
          shopItem.appendChild(itemImage);

          shopItemsContainer.appendChild(shopItem);
      });
  }

  // Inicializar mostrando la sección de mapas
  btnMaps.click();
});
