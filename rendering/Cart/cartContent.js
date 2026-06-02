async function renderCart(cart) {

    const cartPurchases = document.querySelector('#cartPurchases')
    cartPurchases.innerHTML = ''
    const cartReceipt = document.querySelector('#cartReceipt')
    cartReceipt.innerHTML = ''

    if (cart.size != 0){

        renderCartPurchases(cartPurchases, cart)
    }

    if (cart.size != 0) {

        renderReceipt(cartReceipt, cart)

    } else {

        renderEmptyReceipt(cartReceipt)
    }


    
}