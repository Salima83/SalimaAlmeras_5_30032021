let panier = localStorage.getItem('panier');

panier = JSON.parse(panier);
console.log(panier);
if (panier === null || panier === []) {
    console.log('panier vide');
}
async function getProduct(id) {
    try {
        let response = await fetch(`http://localhost:3000/api/teddies/${id}`, { methode: 'GET' })
        return await response.json();

    } catch (error) {
        console.log(error);
    }
}
let products = []; //initialiser une variable
//console.log('avant', products);
//let i = 0;
//let ids = [];
panier.forEach(id => {
        // console.log(++i, id);
        //if (ids.indexOf(id) === -1) {
        getProduct(id).then(product => {
                if (product !== undefined) {
                    products.push(product);
                    console.log(product);
                }
            })
            // ids.push(id);
            // }

    })
    //console.log('apres', products);