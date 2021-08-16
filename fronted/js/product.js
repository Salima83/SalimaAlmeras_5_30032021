let Url = new URL('http://localhost:3000/api/teddies/${id}')
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);


renderProduits(id)
    .then(produit => {
        console.log(produit);
        //display produit
    });


async function renderProduits(id) {

    try {
        let response = await fetch(`http://localhost:3000/api/teddies/${id}`, { method: 'GET' })
        return await response.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

//Selection de la class ou on vas injecter le code HTML//

const containerEl = document.querySelector("#container");
//la structure

const container = ` 
                        <div id="container-produit">
                        <div class="card">
                        <div class="card-body">
                           <img src="${Produit.imageUrl}" alt="teddie"/>
                           <h2>${Produit.name} </h2>
                           <p class="price">${Produit.price/100}.00€</p>
                           <p class="discriptio">${Produit.description}</p>
                        <form>
                           <label for="option_produit"></label>
                        <select name="option_produit"id="option_produit">
                           <option value="option_1"option_1</option>
                           <option value="option_2"option_2</option>
                        </select>
                        </form>
                        <button id="btn-envoyer" type="submit" name"btn-envoyer">Commander l'article</button>
                    </div>
                       </div>
                       </div> `
Produit.innerHTML = container;