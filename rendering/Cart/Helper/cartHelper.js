/** Функция, прибавляющая количество добавляемого товара к количеству товара в корзине
 * 
 * @param {*} difference Количество добавляемого товара
 */
function cartItemQuantityChange(difference) {
    cartItemQuantity = Math.max(0, cartItemQuantity + difference)
    cartItemCountInCatalogContainer.innerText = cartItemQuantity
}