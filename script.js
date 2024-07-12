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

// Función para mostrar las imágenes de los mapas
function displayMapImages() {
  const modalContent = document.querySelector('.modal-content');

  const images = [
      {
          url: 'img/CAOZ DOWNTOWN.png',
          alt: 'Mapa 1',
          link: 'https://www.fortnite.com/@czmatecraft/9336-0959-0757',
      },
      {
          url: 'img/CAOZ_GAMES.png',
          alt: 'Mapa 2',
          link: 'https://www.fortnite.com/@caoz/9069-6187-5522',
      },
      {
          url: 'img/CAOZITOS_WORLD.png',
          alt: 'Mapa 3',
          link: 'https://www.fortnite.com/@caoz/9585-4870-6549',
      }
  ];

  // Limpiar contenido anterior
  modalContent.innerHTML = `
      <span class="close"></span>
      <h1>CODIGO: CAOZ</h1>
  `;

  // Agregar imágenes al modal
  const imageContainer = document.createElement('div');
  imageContainer.style.display = 'grid';
  imageContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
  imageContainer.style.gap = '10px';
  imageContainer.style.marginTop = '10px';

  images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.url;
      imgElement.alt = image.alt;
      imgElement.style.cursor = 'pointer';
      imgElement.style.width = '700px';
      imgElement.style.height = '300px';
      imgElement.style.objectFit = 'cover';
      imgElement.style.borderRadius = '10px';

      // Añadir evento click
      imgElement.onclick = function() {
          const link = image.link;
          window.open(link, '_self');
      };

      imageContainer.appendChild(imgElement);
  });

  modalContent.appendChild(imageContainer);

  // Ajustar el tamaño del modal
  modalContent.style.width = 'auto'; // Ajustar automáticamente
  modalContent.style.maxWidth = '90vw'; // No exceder el 90% del ancho de la ventana
  modalContent.style.padding = '20px'; // Agregar algo de padding
  modalContent.style.boxSizing = 'border-box'; // Incluir padding en el tamaño total
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

document.getElementById('btn-maps').addEventListener('click', () => {
  document.getElementById('maps-section').style.display = 'flex';
  document.getElementById('shop-section').style.display = 'none';
  document.querySelector('.player-container').style.display = 'flex'; // Mostrar sección de streamers
});

document.getElementById('btn-shop').addEventListener('click', () => {
  document.getElementById('maps-section').style.display = 'none';
  document.getElementById('shop-section').style.display = 'flex';
  document.querySelector('.player-container').style.display = 'none'; // Ocultar sección de streamers
});

// Por defecto mostrar la sección de mapas
document.getElementById('maps-section').style.display = 'flex';
document.getElementById('shop-section').style.display = 'none';