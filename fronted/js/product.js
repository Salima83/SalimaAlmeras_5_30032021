let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

function renderContainer(Produit) {
    //Selection de la class ou on vas injecter le code HTML

    const containerEl = document.querySelector("#container");
    //la structure
    const container = ` 
                        <div id="container-produit">
                        <div class="card">
                        <div class="card-body">
                           <img src="${Produit.imageUrl}" alt="ours" class="img-thumbnail">
                           <h2>${Produit.name} </h2>
                           <p class="price">${Produit.price/100}.00€</p>
                           <p class="discriptio">${Produit.description}</p>
                        
                          <div class="product-quantity">
                          <label for="tedNum">Quantité :</label>
                          <input id="tedNum" type="number" name="tedNum" value="1" min="1">
                          </div>
                          <select name="option_produit"id="option_produit">
                           <option value="option_1">${Produit.colors}</option>
                           <option value="option_2">${Produit.colors}</option>
                          </select>

                        

                        <button id="btn-envoyer" type="button" name"btn-envoyer">Ajouter au panier</button>
                    </div>
                       </div>
                       </div> `

    containerEl.innerHTML = container;

}

//AJOUT DU PRODUIT au panier
function addItem(id) {
    let panier = localStorage.getItem('panier'); //recuperer
    panier = JSON.parse(panier) // PARSE LE JSON
        //si le panier n' existe pas
    if (panier === null) {
        panier = []
    }
    panier.push(id)
    panier = JSON.stringify(panier) //RETRANSFORME EN JSON
    localStorage.setItem('panier', panier); //STOCKER
    console.log(panier);


}


renderProduits(id)
    .then(Produit => {
        console.log(Produit);
        //display produit
        renderContainer(Produit)
            //selectionner l'element par click
        const buttonElement = document.getElementById('btn-envoyer');
        console.log('btn-envoyer');
        buttonElement.addEventListener('click', function(event) {
            addItem(id)

            //Création du produit qui sera ajouté au panier
            /* let produitAdded = {
                 name: Name,
                 price: parseFloat(Price.innerHTML),
                 _id: id,
                 quantity:''*/


        })




    });


async function renderProduits(id) {

    try {

        let response = await fetch(`http://localhost:3000/api/teddies/${id}`, { method: 'GET' })

        return await response.json();

    } catch (error) {
        console.log(error);
    }
}