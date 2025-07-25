/**
 * Рендеринг главных групп товаров
 * @param {*} data Массив из главных групп товаров
 */
async function renderGroupsGeneral(data) {
    const groupsMenu = document.querySelector('#groupsMenu')
    const ulGeneral = document.createElement('ul')

    data.forEach((el) => {
        const li = document.createElement('li')
        li.innerHTML = `<span class="icon-menu"></span> ${el.name}`

        li.dataset.id = el.id

        li.addEventListener('click', renderGroup)
        li.addEventListener('click', plusMinusSwapper)

        ulGeneral.appendChild(li)
    })
    groupsMenu.appendChild(ulGeneral)
}

/**
 * Рендеринг имен подгрупп в разделе #groupsMenu и 
 * рендеринг данных в разделе #groupMain 
 */
async function renderGroup(event){
    console.log(event.target.tagName)
    if (event.target.tagName === "LI") {
        const groupData = await fetchGroupData(event.target.dataset.id)
        await renderSubgroupsNamesInGroupsMenu(groupData)
        await renderGroupMain(groupData)
    }
}
