let panier = localStorage.getItem('panier');
let html = document.querySelector(".products")
    ///
panier = JSON.parse(panier);
console.log(panier);
if (panier === null || panier === []) {
    console.log('panier vide');
    panier = [];
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
            `                   
            <div class="card-mb-3">
                 <div class="card-body">
                 <div class="d-flex justify-content-between">
                  <div class="d-flex flex-row align-items-center">       
                       <div >
                                        <img src="${article.imageUrl}" class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                                        </div>
                                        <div class="ms-3">
                                        <h5>${article.name} </h5>
                                        
                                        
                                        <div class="d-flex flex-row align-items-center">

                                        <div style="width: 80px;">
                                        <p class="mb-0">${article.price/100}.00€</p>
                                        
                                        <button id="btn-supprimer" type="btn-supprimé" onclick="supprimer(${index})" name"btn-supprimer">Supprimer</button>
                                        </div>
                                        </div>
                                    </div>    
                                    </div>
                                   </div>
                                    </div>
                                    </div>
                                    <hr>
                                    `

    })
    total = total / 100;
    console.log(total);
    html.innerHTML += `   <p class="somme-total"> prix total ${total}.00€</p>`
    localStorage.setItem("total", total);
    //
    if (panier.length === 0) {
        document.querySelector(".form").style.display = "none";
        document.querySelector(".somme-total").style.display = "none";
    }

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
    ) {
        erreur.innerText = "Vous devez renseigner tous les champs"
        return false
    } else {
        //les champs sont tous remplis
        //Vérifier l'email
        if (validateEmail(inputEmail)) {
            //Si l'email est valide, onvérifie les prénoms etc.
            if (!validateName(inputFirstName)) {
                erreur.innerText = "Le prénom n'est pas valide";
                return false;
            }
            if (!validateName(inputLastName)) {
                erreur.innerText = "Le nom n'est pas valide";
                return false;
            }
            if (!validateName(inputCity)) {
                erreur.innerText = "La ville n'est pas valide";
                return false;
            }
            return true
        } else {
            erreur.innerText = "L'email est invalide";
            return false;
        }
    }
}

function validateEmail(input) {
    // valider format email
    const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const email = input.value.trim();
    if (!emailRegex.test(email)) {
        return false;
    }
    return true;
}
///
function validateName(input) {
    //On autorise que les lettres maj et miniscule + trait d'union
    let regName = /^[a-zA-Z-]+$/;
    let name = input.value;
    if (!regName.test(name)) {
        alert('Valeur incorrect');
        input.focus();
        return false;
    } else {
        return true;
    }
}
///

submit.addEventListener("click", (e) => {
    e.preventDefault();

    if (checkForm()) {
        // si le panier est vide la commande n est pas envoyée
        if (panier.length === 0) {
            return
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
    }
});