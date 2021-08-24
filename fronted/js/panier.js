let panier = localStorage.getItem('panier');
let html = document.querySelector(".products")

panier = JSON.parse(panier);
console.log(panier);
if (panier === null || panier === []) {
    console.log('panier vide');
}
async function getProduct(id) {
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
//let ids = [];
let total = 0;
panier.forEach(id => {
    // console.log(++i, id);
    //if (ids.indexOf(id) === -1) {
    getProduct(id).then(product => {
            if (product !== undefined) {
                products.push(product);
                console.log(product);
                total = total + product.price;
                html.insertAdjacentHTML("beforeend",
                    `<div class="card">
                                    <img src="${product.imageUrl}" alt="ours" class="img-thumbnail">
                                    <div class="card-body">
                                    <h2>${product.name} </h2>
                                    <p class="price">${product.price/100}.00€</p>

                                    <button id="btn-supprimer" type="button" onclick="supprimer('${id}')" name"btn-supprimer">Supprimer</button>
                                    
                                </div>
                                </div>`)

            }
        })
        // ids.push(id);
        // }

})

function supprimer(id) {
    console.log("supprimer id", id);

}