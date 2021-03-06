let params = new URL(document.location).searchParams;
let id = params.get("id");

let article;

function renderContainer(Produit) {
    //Selection de la class ou on vas injecter le code HTML

    const containerEl = document.querySelector("#container-sm");
    //la structure
    let option = "<select>";
    Produit.colors.forEach((color, index) => {
        option += `<option value="option${index}">${color}</option>`;


    });
    option += "</select>";

    const container = ` 
                        <div class="row row-cols-1 row-cols-md-2 g-4">
                        <div class="col">
                        <div class="card"style="width: 18rem;">
                           <img src="${Produit.imageUrl}" alt="ours" class="card-img-top">
                        <div class="card-body">
                           <h2 class="card-title">${Produit.name} </h2>
                           <p class="card-price">${Produit.price/100}.00€</p>
                           <p class="card-discription">${Produit.description}</p>
                             ${option}
                        <button id="btn-envoyer" type="button" name"btn-envoyer">Ajouter au panier</button>
                       
                        </div> 
                        </div>
                        </div> 
                        </div>
                       `

    containerEl.innerHTML = container;

}

//AJOUT DU PRODUIT au panier
function addItem() {
    let panier = localStorage.getItem('panier'); //recuperer
    panier = JSON.parse(panier) // PARSE LE JSON
        //si le panier n' existe pas
    if (panier === null) {
        panier = []
    }
    panier.push(article)
    panier = JSON.stringify(panier) //RETRANSFORME EN JSON
    localStorage.setItem('panier', panier); //STOCKER
}


renderProduits(id)
    .then(Produit => {

        article = Produit;
        //display produit
        renderContainer(Produit)
            //selectionner l'element par click
        const buttonElement = document.getElementById('btn-envoyer');

        buttonElement.addEventListener('click', function(event) {
            addItem()

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