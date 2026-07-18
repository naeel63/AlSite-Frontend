async function renderCart(cart) {

    const cartPurchases = document.querySelector('#cartPurchases')
    cartPurchases.innerHTML = ''
    const cartReceipt = document.querySelector('#cartReceipt')
    cartReceipt.innerHTML = ''

    if (cart.length != 0 && cart.length !== undefined){

        renderCartPurchases(cartPurchases, cart)
    }

    if (cart.length != 0 && cart.length !== undefined) {

        renderReceipt(cartReceipt, cart)

    } else {

        renderEmptyReceipt(cartReceipt)
    }
 
}