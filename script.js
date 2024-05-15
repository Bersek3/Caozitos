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

  // Función para obtener los datos de la tienda de Fortnite
  function fetchShopItems() {
    fetch('https://fortniteapi.io/v2/shop?lang=es', {
      headers: {
        'Authorization': '928ef864-82ceb119-8d9124e7-a570bd6c'
      }
    })
    .then(response => response.json())
    .then(data => {
      displayShopItems(data.shop);
    })
    .catch(error => console.error('Error:', error));
  }

  // Función para mostrar los ítems de la tienda
  function displayShopItems(items) {
    shopItemsContainer.innerHTML = '';
    items.forEach(item => {
      const shopItem = document.createElement('div');
      shopItem.classList.add('shop-item');

      const itemImage = document.createElement('img');
      itemImage.src = item.full_background;
      itemImage.alt = item.name;

      const itemName = document.createElement('h2');
      itemName.textContent = item.name;

      const itemPrice = document.createElement('p');
      itemPrice.textContent = `Precio: ${item.price} V-Bucks`;

      shopItem.appendChild(itemImage);
      shopItem.appendChild(itemName);
      shopItem.appendChild(itemPrice);

      shopItemsContainer.appendChild(shopItem);
    });
  }

  // Inicializar mostrando la sección de mapas
  btnMaps.click();
});
