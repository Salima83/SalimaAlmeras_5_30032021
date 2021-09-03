let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);
let article;

function renderContainer(Produit) {
    //Selection de la class ou on vas injecter le code HTML

    const containerEl = document.querySelector("#container-sm");
    //la structure
    let sel = `<select >
    <option value="option_1">Tan</option>
    <option value="option_2">Chocolate</option>
    <option value="option_3">Black</option>
    <option value="option_2">White</option>
   </select>`
    const container = ` 
                        
                        <div class="card mb-3">
                        <div class="card-body1">
                           <img src="${Produit.imageUrl}" alt="ours" class="img mx-auto d-block">
                           </div>
                           
                           <h2 class="card-title">${Produit.name} </h2>
                           
                           <p class="card-price">${Produit.price/100}.00€</p>
                           <p class="card-discription">${Produit.description}</p>
                             ${sel}
                        <button id="btn-envoyer" type="button" name"btn-envoyer">Ajouter au panier</button>
                       </div>
                       </div> `

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
    console.log(panier);
}


renderProduits(id)
    .then(Produit => {
        console.log(Produit);
        article = Produit;
        //display produit
        renderContainer(Produit)
            //selectionner l'element par click
        const buttonElement = document.getElementById('btn-envoyer');
        console.log('btn-envoyer');
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