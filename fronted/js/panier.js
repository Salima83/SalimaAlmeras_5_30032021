let panier = localStorage.getItem('panier');
let html = document.querySelector(".products")

panier = JSON.parse(panier);
console.log(panier);
if (panier === null || panier === []) {
    console.log('panier vide');
}

/////

function supprimer(index) {
    console.log("supprimer index", index);
    panier.splice(index, 1)
    console.log(panier);
    localStorage.setItem("panier", JSON.stringify(panier))
    afficherPanier();
}

function afficherPanier() {
    let total = 0;
    html.innerHTML = "";
    panier.forEach((article, index) => {
        // console.log(++i, id);

        console.log(article);
        total = total + article.price;
        html.innerHTML +=
            `<div class="card">
                                        <img src="${article.imageUrl}" alt="ours" class="img img-thumbnail">
                                        <div class="card-body">
                                        <h2>${article.name} </h2>
                                        <p class="price">${article.price/100}.00€</p>
    
                                        <button id="btn-supprimer" type="button" onclick="supprimer(${index})" name"btn-supprimer">Supprimer</button>
                                        
                                    </div>
                                    </div>`

    })
    total = total / 100;
    console.log(total);
    html.innerHTML += `   <p class="somme-total"> prix total ${total}€</p>`


}
afficherPanier();
//////
let prixConfirmation = document.querySelector(".somme-total").innerText;
prixConfirmation = prixConfirmation.split(" ");
const submit = document.querySelector("#submit");
let inputFirstName = document.querySelector("#firstName");
let inputLastName = document.querySelector("#lastName");
let inputAdress = document.querySelector("#adress");
let inputCity = document.querySelector("#city");
let inputEmail = document.querySelector("#email");
let erreur = document.querySelector("#erreur")
    //formulaire de confirmation methode POST
function checkForm() {


}
////
submit.addEventListener("click", (e) => {
    e.preventDefault();

    if (!inputFirstName.value ||
        !inputLastName.value ||
        !inputCity.value ||
        !inputEmail.value ||
        !inputAdress.value
    ) {
        erreur.innerHTML = "Vous devez renseigner tous les champs !";

        /*} else if (isNaN(inputEmail.value)) {
            e.preventDefault();
            erreur.innerText = "Votre email n'est pas valide";*/
    } else {
        // 
        let productsBay = [];
        panier.forEach((article) => {

            productsBay.push(article._id);
            console.log(article._id);
            console.log(panier);
        })


        const order = {
            contact: {
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                city: inputCity.value,
                address: inputAdress.value,
                email: inputEmail.value,
            },


            products: productsBay,

        };

        //  la requette POST 
        const options = {
            method: "POST",
            body: JSON.stringify(order),
            headers: { "Content-Type": "application/json" },
        };

        //     
        fetch("http://localhost:3000/api/teddies/order", options)
            .then((response) => response.json())
            .then((data) => {

                console.log(data);

                localStorage.setItem("orderId", data.orderId);
                localStorage.setItem("total", prixConfirmation[2]);
                window.location = "confirmation.html";

            })
            .catch((err) => {
                alert("Il y a eu une erreur : " + err);
            });
    }
});