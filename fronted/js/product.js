let params = new URL(document.location).searchParams;
let id = params.get("id");

renderProduits(id)
    .then(product => {
        console.log(product)
            //display product
    });
async function renderProduits(id) {

    try {
        let res = await fetch(`http://localhost:3000/api/teddies/${id}`, { method: 'GET' })
        return await res.json();

    } catch (error) {
        console.log(error);
    }


}