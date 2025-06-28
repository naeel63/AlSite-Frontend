async function renderCatalog(catalogData) {
    const catalogTbody = document.querySelector('#catalogTBody');
    catalogTbody.innerHTML = '';
    
    catalogData.forEach((el, index) => {
        const tableRow = document.createElement('tr')

        const tableDataIndex = document.createElement('td')
        tableDataIndex.innerText = `${index+1}`
        tableRow.appendChild(tableDataIndex)

        const tableDataCode = document.createElement('td')
        tableDataCode.innerText = `${el.code}`
        tableRow.appendChild(tableDataCode)

        const tableDataName = document.createElement('td')
        tableDataName.innerText = `${el.name}`
        tableRow.appendChild(tableDataName)

        const tableDataOstatok = document.createElement('td')
        tableDataOstatok.innerText = `${el.ostatok}`
        tableRow.appendChild(tableDataOstatok)

        const tableDataButtonAdd = document.createElement('td')
        const buttonAdd = document.createElement('button')
        buttonAdd.innerText = `Добавить в корзину`

        buttonAdd.dataset.id = el.id
        buttonAdd.addEventListener('click', async (event) => {
            if (cart.has(el.id)){
                cart.get(el.id).quantity++
            } else {
                el.quantity = 1
                cart.set(el.id, el)
            }
            
            await cartCountChange(1)
            //console.log(cart)
           // tableRow.dataset.quantity++;
        })

        tableDataButtonAdd.appendChild(buttonAdd)
        tableRow.appendChild(tableDataButtonAdd)

        catalogTbody.appendChild(tableRow)
    })
}



async function renderActualDate(actualDate) {
    if(actualDate && actualDate.date){
        const actualPDate = document.querySelector('#actualPDate');
        actualPDate.innerText = `${actualDate.date}`;
    } else {
        console.log(`Ошибка в renderActualDate: ${actualDate}`)
    }
}