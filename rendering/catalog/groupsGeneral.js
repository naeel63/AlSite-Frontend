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

    console.log(groupData)

    await renderSubgroupsNames(groupData)
    await renderGroupData(groupData)
    console.log('Конец renderGroup')
}

async function renderSubgroupsNames(groupData){
    const liGeneral = document.querySelector(`[data-id="${groupData.id}"]`)
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

/**
 * Rendering group's children and subgroups in groupProducts division
 */
async function renderGroupData(groupData){
    if (!groupData.children.length == 0) {
        const groupProductsDivision = document.querySelector('#groupProducts')

        const ul = document.createElement('ul')
        ul.innerText = 'Подгруппы:'

        groupData.children.forEach(el => {
            const li = document.createElement('li')
            li.innerText = el.name

            ul.appendChild(li)
        })
        
        const columnsName = ['', 'Код','Название','Остаток','Действие']
        const groupProductsTable = tableCreate(columnsName)
        const groupProductsTBody = groupProductsTable.lastChild
        console.log(groupProductsTable)
        console.log(groupProductsTBody)
        groupData.products.forEach(el => {
            const li = document.createElement('li')
        })

        groupProductsDivision.appendChild(ul)
    }
}

