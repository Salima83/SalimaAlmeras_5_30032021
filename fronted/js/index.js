/**
 * Gère l'affichage et les interactions de la page d'accueil
 */


async function getProduits() {
    let url = 'Produits.json';
    try {
        let res = await fetch("http://localhost:3000/api/teddies");
        return await res.json();

    } catch (error) {
        console.log(error);
    }
}

async function renderProduits() {
    let Produits = await getProduits();
    let html = '';
    Produits.forEach(Produit => {
        let htmlSegment = `
       
                           <div class="row">
                           <div class="col-12 col-lg-4">
                           <div class="card">
                           
                            <img src="${Produit.imageUrl}" alt="ours" class="img-thumbnail">
                            <div class="card-body">
                            <h2>${Produit.name} </h2>
                            <p class="price">${Produit.price}</p>
                            <a href="product.html" id="Produit__link" class="Produit__link">voir l'article</a>
                        </div>
                        </div>
                        </div>
                         `;

        html += htmlSegment;
    });


    let row = document.querySelector('.row');
    row.innerHTML = html;
}

renderProduits();

function displayProduit(produit) {
    const templateElt = document.getElementById("templateProduit")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("card").textContent = produit.card
    cloneElt.getElementById("card").textContent = produit.body
    cloneElt.getElementById("card").href += "?id=" + produit.id

    document.getElementById("main").appendChild(cloneElt)
}