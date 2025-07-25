/**
 * Rendering group's subgroups in #groupMenu division.
 * Рендеринг имен подгрупп группы в #groupMenu разделе.
 * @param {*} groupData 
 */
async function renderSubgroupsNamesInGroupsMenu(groupData){
    const liGeneral = document.querySelector(`[data-id="${groupData.id}"]`) // поправить
    if (liGeneral.childElementCount == 1){
        const ulChild = document.createElement('ul')

        ulChild.dataset.name = `${groupData.name} ulChild`

        groupData.children.forEach(el => {
            const liChild = document.createElement('li')

            liChild.innerHTML = `<span class="icon-menu"></span> ${el.name}`

            liChild.dataset.id = el.id
            

            ulChild.appendChild(liChild)
        })
        liGeneral.appendChild(ulChild)
    } else {
        liGeneral.firstElementChild.nextElementSibling.classList.toggle('none')
    }
}

/**
 * Rendering group's data in #groupMain division.
 * Рендеринг данных группы в #groupMain разделе.
 * @param {*} groupData 
 */
async function renderGroupMain(groupData) {
    const groupMainDivision = document.querySelector('#groupMain')
    
    removeAllChildren(groupMainDivision)
    await renderSubgroupsNamesInGroupMain(groupData, groupMainDivision)
    await renderProductsInGroupMain(groupData, groupMainDivision)
}


/**
 * Rendering group's subgroups in #groupMain division.
 * Рендеринг имен подгрупп группы в #groupMain разделе.
 * @param {*} groupData 
 */
async function renderSubgroupsNamesInGroupMain(groupData, groupMainDivision){

    if (!groupData.children.length == 0) {
        const ul = document.createElement('ul')
        ul.innerText = 'Подгруппы:'

        groupData.children.forEach(el => {
            const li = document.createElement('li')
            li.innerText = el.name

            ul.appendChild(li)
        })

        groupMainDivision.appendChild(ul)
    }
}

/**
 * Rendering group's children and subgroups in groupMain division
 */
async function renderProductsInGroupMain(groupData, groupMainDivision){

    if (!groupData.products.length == 0) {
        
            
        const columnsName = ['', 'Код','Название','Остаток','Действие']
        const groupMainTable = tableCreate(columnsName)
        const groupMainTBody = groupMainTable.lastChild

        groupData.products.forEach((el, index) => {
            const tr = document.createElement('tr')

            const tdIndex = document.createElement('td')
            tdIndex.innerText = index + 1
            tr.appendChild(tdIndex)

            const tdCode = document.createElement('td')
            tdCode.innerText = el.code
            tr.appendChild(tdCode)

            const tdName = document.createElement('td')
            tdName.innerText = el.name
            tr.appendChild(tdName)

            const tdOstatok = document.createElement('td')
            tdOstatok.innerText = el.ostatok
            tr.appendChild(tdOstatok)

            const action = document.createElement('td')
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
                
                await cartItemQuantityChange(1)
            })
            action.appendChild(buttonAdd)
            tr.appendChild(action)

            groupMainTBody.appendChild(tr)
        })

        groupMainDivision.appendChild(groupMainTable)
    }
}
