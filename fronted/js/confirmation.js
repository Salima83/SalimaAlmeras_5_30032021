function displayOrderIdAndPrice() {
    const totalConfirmation = document.querySelector(".total span");
    const orderId = document.querySelector(".orderid span");

    totalConfirmation.innerText = localStorage.getItem("total") + ".00 € ";
    orderId.innerText = localStorage.getItem("orderId");
}
displayOrderIdAndPrice();