async function renderGroupsGeneral(data) {
    const groupsNames = document.querySelector('#groupsNames')
    const ulGeneral = document.createElement('ul')

    data.forEach((el) => {
        const li = document.createElement('li')
        li.innerText = el.name

        li.dataset.id = el.id

        li.addEventListener('click', renderGroup)

        ulGeneral.appendChild(li)
    })
    groupsNames.appendChild(ulGeneral)

    console.log('Конец renderGroupsGeneral')
}

/**
 * Rendering subgroups names in #groupsNames division and
 * rendering data in #groupProducts division
 */
async function renderGroup(event){
    const groupData = await fetchGroupData(event.target.dataset.id)

    await renderSubgroupsNamesInGroupsNames(groupData)
    await renderSubgroupsNamesInGroupProducts(groupData)
    await renderGroupData(groupData)
    console.log('Конец renderGroup')
}

async function renderSubgroupsNamesInGroupsNames(groupData){
    const liGeneral = document.querySelector(`[data-id="${groupData.id}"]`) // поправить
    if (liGeneral.childElementCount == 0){
        const ulChild = document.createElement('ul')

        ulChild.dataset.name = `${groupData.name} ulChild`

        groupData.children.forEach(el => {
            const liChild = document.createElement('li')
            liChild.innerText = el.name
            liChild.dataset.id = el.id

            ulChild.appendChild(liChild)
        })
        liGeneral.appendChild(ulChild)
        console.log('Конец renderSubgroupsNames')
    } else {
        liGeneral.firstElementChild.classList.toggle('none')
    }
}

async function renderSubgroupsNamesInGroupProducts(groupData){
    if (!groupData.children.length == 0) {
        const ul = document.createElement('ul')
        ul.innerText = 'Подгруппы:'

        groupData.children.forEach(el => {
            const li = document.createElement('li')
            li.innerText = el.name

            ul.appendChild(li)
        })

        groupProductsDivision.appendChild(ul)
        const groupProductsDivision = document.querySelector('#groupProducts')
    }
}

/**
 * Rendering group's children and subgroups in groupProducts division
 */
async function renderGroupData(groupData){
    const groupProductsDivision = document.querySelector('#groupProducts')
     
    const columnsName = ['', 'Код','Название','Остаток','Действие']
    const groupProductsTable = tableCreate(columnsName)
    const groupProductsTBody = groupProductsTable.lastChild

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
            
            await cartCountChange(1)
        })
        action.appendChild(buttonAdd)
        tr.appendChild(action)

        groupProductsTBody.appendChild(tr)
    })

    groupProductsDivision.appendChild(groupProductsTable)
}

