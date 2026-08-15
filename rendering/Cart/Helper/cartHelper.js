/**
 * Рендеринг пустого блока "Итого"
 * @param {HTMLElement} parentDiv
 */
function renderEmptyReceipt(parentDiv){
    const content = document.createElement("div");
    content.id = 'emptyCart'
    content.innerText = "Ваша корзина пуста\nДобавьте товары из каталога"
    parentDiv.appendChild(content)
}



/**
 * Рендеринг блока с покупками
 * @param {HTMLElement} parentElement
 * @param {Map<number, purchase>} cart
 */
function renderCartPurchases(parentElement, cart){
    parentElement.classList.add("rounded-lg", "border", "mb-6")

    cart.forEach((el) => {
        
        if(cart){

            const mainDiv = document.createElement("div")
            mainDiv.classList.add("purchase", "gap-6", "items-center")
            
            //Div для имени, кода, цены товара
            const textDiv = document.createElement("div")
            textDiv.classList.add("purchaseSummary")

            //Div для количества товара в корзине и кнопок для уменьшение/увеличения количества товара
            const countDiv = document.createElement("div")
            countDiv.classList.add("purchaseCount")

            //Div для цены товара
            const priceDiv = document.createElement("div")
            priceDiv.classList.add("purchasePrice")

            //Div для кнопки удаления товара из корзины
            const deleteButton = document.createElement("button")

            //Наполнение textDiv
            {
                const purchaseTextDivName = document.createElement("h3")
                const purchaseTextDivCode = document.createElement("p")
                const purchaseTextDivPrice = document.createElement("p")
                
                purchaseTextDivName.innerText = `${el.name}`
                purchaseTextDivCode.innerText = `Код: ${el.code}`
                purchaseTextDivPrice.innerText = `${el.price} ₽`

                purchaseTextDivPrice.classList.add("mt-2","color-primary")

                const fragment = document.createDocumentFragment()
                fragment.append(purchaseTextDivName, purchaseTextDivCode,purchaseTextDivPrice)
                textDiv.appendChild(fragment)
            }

            //Наполнение countDiv
            {
                const minusButton = document.createElement("button")
                const countSpan = document.createElement("span")
                const plusButton = document.createElement("button")

                minusButton.innerHTML = 
                `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
                </svg>
                `

                countSpan.innerText = `${el.quantity}`

                plusButton.innerHTML = 
                `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                </svg>
                `

                countDiv.classList.add("gap-3", "flex", "items-center")
                minusButton.classList.add("flex","rounded", "border", "h-8", "w-8", "justify-center", "items-center", "background-white", "grey-hover")
                countSpan.classList.add( "w-12", "text-center")
                plusButton.classList.add("flex","rounded", "border", "h-8", "w-8","justify-center", "items-center", "background-white", "grey-hover")
                
                const fragment = document.createDocumentFragment()
                fragment.append(minusButton, countSpan, plusButton)
                countDiv.appendChild(fragment)
            } 

            //Наполнение priceDiv
            {
                const price = document.createElement("p")

                price.innerText = `${el.price} ₽`

                price.classList.add("text-right", "color-primary", "min-w-100px")

                priceDiv.appendChild(price)
            }

            //Наполнение deleteButton
            {
                deleteButton.innerHTML = 
                `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
                `

                deleteButton.classList.add("background-white", "grey-hover", "delete-button", "p-2", "flex", "justify-center")
            }

            const fragment = document.createDocumentFragment()
            fragment.append(textDiv, countDiv, priceDiv, deleteButton)
            mainDiv.appendChild(fragment)
            parentElement.appendChild(mainDiv)

        } else {
            console.log("Корзина пуста")
        }
    })
}

/**
 * Рендеринг итогового чека
 * @param {HTMLElement} parentElement
 * @param {Map<number, purchase>} cart
 */
function renderReceipt(parentElement, cart){
    parentElement.classList.add("rounded-lg", "border", "p-6")

    const receiptDiv = document.createElement("div")
    const applicationButton = document.createElement("button")

    //Наполнение receiptDiv
    {
        const itogo = document.createElement("h2")
        const totalPriceSpan = document.createElement("span")

        itogo.innerText = "Итого"

        //Цикл для подсчета итоговой суммы в чеке
        let totalPrice = 0
        cart.forEach((el, index) => {
            if(el.price){
                totalPrice += el.price*el.quantity
            }
            else {
                console.log(`Для ${el.name} цены нет`)
            }
        })
        totalPriceSpan.innerText = `${totalPrice} ₽`

        totalPriceSpan.classList.add("text-right", "color-primary")
        receiptDiv.classList.add("flex", "items-center", "justify-between", "mb-6")

        const fragment = document.createDocumentFragment()
        fragment.append(itogo, totalPriceSpan)
        receiptDiv.appendChild(fragment)
    }

    //Наполнение applicationButton
    {
        applicationButton.innerText = "Оформить заявку"

        applicationButton.classList.add("background-primary", "color-white",
            "w-full", "py-3", "text-center", "border-none", "rounded",
            "primary-hover")

        applicationButton.addEventListener(
            'click',
            () => openCheckoutModal(cart)
        )
    }

    

    const fragment = document.createDocumentFragment()
    fragment.append(receiptDiv, applicationButton)
    parentElement.appendChild(fragment)
}