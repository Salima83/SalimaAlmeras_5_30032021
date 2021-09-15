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
                           <div class="col-6">                      
                           <div class="thumbnail img-responsive">
                            <img src="${Produit.imageUrl}" alt="ours" class="thumbnail img-responsive">
                            <div class="card-body">
                            <h2  class="card-teddy">${Produit.name} </h2>
                            <p class="price">${Produit.price/100}.00€</p>
                            <a href="product.html?id=${Produit._id}" id="Produit__link" class="btn btn-outline-info mb-2">voir l'article</a>
                        </div>
                        </div>
                        </div>
                        </div>`;

        html += htmlSegment;
    });


    let row = document.querySelector('.row');
    row.innerHTML = html;
}

renderProduits();