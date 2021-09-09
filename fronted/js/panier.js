let panier = localStorage.getItem('panier');
let html = document.querySelector(".products")
    ///
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
        console.log(article);
        total = total + article.price;
        html.innerHTML +=
            `<div class="card">
                                        <img src="${article.imageUrl}" alt="ours" class="img img-thumbnail">
                                        <div class="card-body1">
                                        <h2>${article.name} </h2>
                                        <p class="price">${article.price/100}.00€</p>
    
                                        <button id="btn-supprimer" type="btn-supprimé" onclick="supprimer(${index})" name"btn-supprimer">Supprimer</button>
                                        
                                    </div>
                                    </div>`

    })
    total = total / 100;
    console.log(total);
    html.innerHTML += `   <p class="somme-total"> prix total ${total}.00€</p>`
    localStorage.setItem("total", total);


}
afficherPanier();
//////
let prixConfirmation = document.querySelector(".somme-total").innerText;
prixConfirmation = prixConfirmation.split(" ");
//formulaire de confirmation methode POST
const submit = document.querySelector("#submit");
let inputFirstName = document.querySelector("#firstName");
let inputLastName = document.querySelector("#lastName");
let inputAdress = document.querySelector("#adress");
let inputCity = document.querySelector("#city");
let inputEmail = document.querySelector("#email");
let erreur = document.querySelector("#erreur")

function checkForm() {
    if (!inputFirstName.value ||
        !inputLastName.value ||
        !inputCity.value ||
        !inputEmail.value ||
        !inputAdress.value
    )
        return false
    else {
        return true
    }

}
////
submit.addEventListener("click", (e) => {
    e.preventDefault();

    if (checkForm()) {
        // si le panier est vide la commande n est pas envoyée
        if (panier.length === 0) {
            return
        }

        function checkEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        function validate() {
            let inputEmail = document.querySelector("#email");

            if (checkEmail(email)) {
                alert('Adresse e-mail valide');
            } else {
                alert('Adresse e-mail non valide');
            }
            return false;
        }

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
                window.location = "confirmation.html";
                localStorage.removeItem("panier");
            })
            .catch((err) => {
                alert("Il y a eu une erreur : " + err);
            });
    } else {
        erreur.innerHTML = "Vous devez renseigner tous les champs !";


    }
});