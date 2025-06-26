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

        const tableDataButton = document.createElement('td')
        const button = document.createElement('button')
        button.dataset.id = el.id
        button.innerText = `Добавить в корзину`
        tableDataButton.appendChild(button)
        tableRow.appendChild(tableDataButton)

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