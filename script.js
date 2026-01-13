document.addEventListener('DOMContentLoaded', () => {
        // Sélectionner tous les boutons "Buy" dans les produits
        const buyButtons = document.querySelectorAll('.price a');
        // Sélectionner l'élément qui affiche le nombre (le compteur)
        const cartCountElement = document.querySelector('.cart-count');
    
        let count = 0;
    
        buyButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); // Empêche le lien de recharger la page ou de remonter en haut
                count++; // Incrémente le compteur
                cartCountElement.textContent = count; // Met à jour le texte
                cartCountElement.style.display = 'flex'; // Affiche le compteur s'il était caché
            });
        });
    });

 // Sélection des éléments du DOM
 const cartIcon = document.querySelector('.cart-box');
 const cartSidebar = document.querySelector('.cart-sidebar');
 const closeCartBtn = document.querySelector('.close-cart');
 const cartContent = document.querySelector('.cart-content');
 const totalElement = document.querySelector('.total-price');
 const cartCountElement = document.querySelector('.cart-count');
 const buyButtons = document.querySelectorAll('.price a');

 // Ouvrir le panier
 cartIcon.addEventListener('click', () => {
     cartSidebar.classList.add('active');
 });

 // Fermer le panier
 closeCartBtn.addEventListener('click', () => {
     cartSidebar.classList.remove('active');
 });

 // Fonction pour mettre à jour le total
 function updateTotal() {
     const cartItems = document.querySelectorAll('.cart-item');
     let total = 0;

     cartItems.forEach(item => {
         const priceElement = item.querySelector('.cart-price');
         // Enlève le signe $ et convertit en nombre
         const price = parseFloat(priceElement.innerText.replace('$', ''));
         total += price;
     });

     // Affiche le total avec 2 décimales
     totalElement.innerText = '$' + total.toFixed(2);
 }

 // Fonction pour mettre à jour le compteur du panier
 function updateCartCount() {
     const count = cartContent.children.length;
     cartCountElement.innerText = count;
     if (count > 0) {
         cartCountElement.style.display = 'flex';
     } else {
         cartCountElement.style.display = 'none';
     }
 }

 // Fonction pour supprimer un article
 function removeCartItem(event) {
     const buttonClicked = event.target;
     buttonClicked.parentElement.remove();
     updateTotal();
     updateCartCount();
 }

 // Fonction pour ajouter un produit au panier
 function addProductToCart(title, price, imageSrc) {
     const cartItem = document.createElement('div');
     cartItem.classList.add('cart-item');
     
     const cartItemContent = `
         <img src="${imageSrc}" alt="${title}">
         <div class="detail-box">
             <div class="cart-product-title">${title}</div>
             <div class="cart-price">${price}</div>
         </div>
         <i class="fa-solid fa-trash cart-remove"></i>`;
         
     cartItem.innerHTML = cartItemContent;
     cartContent.append(cartItem);
     
     // Ajouter l'écouteur d'événement pour le bouton supprimer
     cartItem.querySelector('.cart-remove').addEventListener('click', removeCartItem);
     
     updateTotal();
     updateCartCount();
 }

 // Écouteurs d'événements sur les boutons "Buy"
 buyButtons.forEach(button => {
     button.addEventListener('click', (event) => {
         event.preventDefault();
         
         // Trouver le conteneur du produit (parent .clo-4)
         const productContainer = button.closest('.clo-4');
         const title = productContainer.querySelector('h4').innerText;
         const price = productContainer.querySelector('p').innerText;
         const imageSrc = productContainer.querySelector('img').src;

         addProductToCart(title, price, imageSrc);
     });
 });
     