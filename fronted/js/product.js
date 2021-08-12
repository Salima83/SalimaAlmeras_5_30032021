//methode 1

//const queryString_url_id = window.location.search;
//console.log(queryString_url_id);
//const id = queryString_url_id.slice(1);
//console.log(id);

//methode2
//const urlSearchParams = new URLSearchParams(queryString_url_id);
//console.log(urlSearchParams);

//const id = urlSearchParams.get("id");
//console.log(id);

//let url = ('http://localhost:3000/api/teddies/' + href);
//fetch("http://localhost:3000/api/teddies/" + href)
//href = search_params.get('id')
//.then(response => response.json())
//.then(commits => alert('not found'));
//let params = new URL(document.location).searchParams;
//let id = params.get("Produit.id");
//console.log(Produit.id);
//let url = new URL(url_str);
//let search_params = url.searchParams;

// true
//if (search_params.has('id')) {
// "100"
//  console.log(search_params.get('id'))
//}


//function ProduitById(id) {
//let rep = await fetch("http://localhost:3000/api/teddies/" + id, { method: 'GET' });
//let response = await rep.json();
//return reponse;
//}

let params = new URL(document.location).searchParams;
let id = params.get("id");

async function getProduits(id) {
    let url = 'Produits.json';
    try {
        let res = await fetch("http://localhost:3000/api/teddies/${productId}", { method: 'GET' })
        return await res.json();

    } catch (error) {
        console.log(error);
    }
}