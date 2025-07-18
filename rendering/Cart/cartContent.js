async function renderCart(cart) {
    renderApplicationContainer()

	const cartTableContainer = document.querySelector('#cartTable')
    cartTableContainer.innerHTML = '';
    const cartItemCountContainer = document.querySelector('#cartItemCountInCart')
    cartItemCountContainer.innerText = `${cartItemQuantity}`

    const columnsName = ['', 'Код','Название','Количество','Действие']
    const cartTable = tableCreate(columnsName)
    const cartTBody = cartTable.lastChild

    cart.forEach((el, index) => {
        const tableRow = document.createElement('tr')

        const tableDataIndex = document.createElement('td')
        tableDataIndex.innerText = index
        tableRow.appendChild(tableDataIndex)

        const tableDataCode = document.createElement('td')
        tableDataCode.innerText = el.code
        tableRow.appendChild(tableDataCode)

        const tableDataName = document.createElement('td')
        tableDataName.innerText = el.name
        tableRow.appendChild(tableDataName)

        const tableDataQuantity = document.createElement('td')
        tableDataQuantity.innerText = el.quantity
        tableRow.appendChild(tableDataQuantity)

        const tableDataButtonClear = document.createElement('td')
        const buttonClear = document.createElement('button')

        buttonClear.innerText = `Убрать 1 единицу товара`
        buttonClear.addEventListener('click', async (event) => {
            if (cart.has(el.id) && cart.get(el.id).quantity >0){

                cart.get(el.id).quantity--
                cartItemQuantityChange(-1)

                if (cart.get(el.id).quantity == 0) {
                    if(cart.delete(el.id)){

                    } else {
                        console.error(`Товар не был успешно удален ${el}`)
                    }

                    renderCart(cart)
                }
                
            } else {
                console.error(`Данного товара нет в вашей корзине: ${el}`)
            }

            renderCart(cart)
        })

        tableDataButtonClear.appendChild(buttonClear)
        tableRow.appendChild(tableDataButtonClear)

        tableRow.appendChild(tableDataButtonClear)
        cartTBody.appendChild(tableRow)
        
    })
    cartTableContainer.appendChild(cartTable)
}

async function renderApplicationContainer(){
    createApplicationForm = document.querySelector('#create-application-form')

    createApplicationForm.addEventListener('submit', (event) => {
        event.preventDefault()
        
        const formData = new FormData(createApplicationForm)
        const formDataObject = Object.fromEntries(formData)
        
        fetchPost(formDataObject)
    })
}