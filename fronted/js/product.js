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

//let url = 'http://localhost:3000/api/teddies/${Produit.id}';
//fetch("http://localhost:3000/api/teddies/${Produit.id}")
//  .then(response => response.json())
//.then(commits => alert('not found'));
let params = new URL(document.location).searchParams;
let id = params.get("Produit.id");