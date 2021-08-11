let url = new URL('http://localhost:3000/api/teddies/${id}');
let params = new URLSearchParams(url.search);

const produitCardImg = document.querySelector(".img");
const produitCardName = document.querySelector(".product-card__title");
const produitCardDescription = document.querySelector(
    ".product-card__description"
);
const produitCardPrice = document.querySelector(".product-card__price");
const teddyNumber = document.querySelector("#teddyNum");
const colorSelect = document.querySelector("#color-select");


(async function() {
    const produitId = getProduitId()
    const produitData = await getProduiData(Produit__link)
    renderProduit(produitData)
})()

function getProduiId() {
    return new URL(location.href).searchParams.get('id')
}

async function produitById(id) {
    let rep = await fetch('http://localhost:3000/api/teddies' + id, { method: 'GET' });
    let reponse = await rep.json();
    return reponse;
}



function renderProduit(produiData) {
    document.getElementById("Produit__link").textContent = produiData.card
    document.getElementById("Produit__link").textContent = produiData.card
}