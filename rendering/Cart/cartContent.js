async function renderCart(cart) {

    const cartPurchases = document.querySelector('#cartPurchases')
    const cartReceipt = document.querySelector('#cartReceipt')

    // Очищаем содержимое
    cartPurchases.innerHTML = ''
    cartReceipt.innerHTML = ''

    // Сбрасываем стили списка товаров
    cartPurchases.classList.remove(
        "rounded-lg",
        "border",
        "mb-6"
    )

    // =========================
    // Пустая корзина
    // =========================
    if (cart.length === 0 || cart.length === undefined) {

        // Показываем сообщение о пустой корзине
        // внутри основного блока
        renderEmptyReceipt(cartPurchases)

        // Полностью скрываем блок с итогами
        cartReceipt.style.display = "none"

        return
    }

    // =========================
    // Корзина с товарами
    // =========================

    // Показываем блок итогов
    cartReceipt.style.display = ""

    // Рендерим товары
    renderCartPurchases(cartPurchases, cart)

    // Рендерим итоговый чек
    renderReceipt(cartReceipt, cart)
}