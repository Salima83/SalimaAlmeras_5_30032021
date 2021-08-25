let panier = localStorage.getItem('panier');
let html = document.querySelector(".products")

panier = JSON.parse(panier);
console.log(panier);
if (panier === null || panier === []) {
    console.log('panier vide');
}
/*async function getProduct(id) {
    try {
        let response = await fetch(`http://localhost:3000/api/teddies/${id}`, { methode: 'GET' })
        return await response.json();

    } catch (error) {
        console.log(error);
    }
}
let products = []; //initialiser une variable
//console.log('avant', products);
//let i = 0;
//let ids = [];*/



function supprimer(index) {
    console.log("supprimer index", index);
    panier.splice(index, 1)
    console.log(panier);
    localStorage.setItem("panier", JSON.stringify(panier))
    afficherPanier();
}

function afficherPanier() {
    let total = 0;
    html.innerHTML = "";
    panier.forEach((article, index) => {
        // console.log(++i, id);
        //if (ids.indexOf(id) === -1) {
        /*getProduct().then(product => {
            if (product !== undefined) {
                products.push(product);*/

        console.log(article);
        total = total + article.price;
        html.innerHTML +=
            `<div class="card">
                                        <img src="${article.imageUrl}" alt="ours" class="img-thumbnail">
                                        <div class="card-body">
                                        <h2>${article.name} </h2>
                                        <p class="price">${article.price/100}.00€</p>
    
                                        <button id="btn-supprimer" type="button" onclick="supprimer(${index})" name"btn-supprimer">Supprimer</button>
                                        
                                    </div>
                                    </div>`

    })
    total = total / 100;
    console.log(total);
    html.innerHTML += `   <p class="somme-total"> prix total ${total}€</p>`


}
afficherPanier();