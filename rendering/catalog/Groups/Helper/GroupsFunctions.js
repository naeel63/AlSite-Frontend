/**
 * Рендеринг имен подгрупп группы в #groupMenu разделе.
 * @param {*} groupData 
 */
async function renderSubgroupsNamesInGroupsMenu(groupData){
    const liGeneral = document.querySelector(`[data-id="${groupData.id}"]`) // поправить
    if (liGeneral.childElementCount == 1){
        const ul = UlWithSubgroupsNames(groupData)
        liGeneral.appendChild(ul)
    } else {
        liGeneral.firstElementChild.nextElementSibling.classList.toggle('none')
    }
}

/**
 * Создание элемента группы ul с дочерними li с названиями его подгрупп
 * @param {*} groupData Данные группы
 * @returns ul для группы с li его подгрупп
 */
function UlWithSubgroupsNames(groupData){
    const ul = document.createElement('ul')

    groupData.children.forEach(el => {
        const liChild = document.createElement('li')
        liChild.dataset.id = el.id
        liChild.innerHTML = `<span class="icon-menu"></span> ${el.name}`
        
        ul.appendChild(liChild)
    })
    
    return ul
}

/**
 * Рендеринг данных группы в groupMain
 * @param {*} groupData Данные группы(подгруппы + ее товары)
 */
async function renderGroupMain(groupData) {
    const groupMainSubgroupsDivision = document.querySelector('#groupMainSubgroups')
    const groupMainProductsTBody = document.querySelector('#groupMainProductsTableBody')
    
    removeAllChildren(groupMainSubgroupsDivision)
    removeAllChildren(groupMainProductsTBody)
    await renderSubgroupsNamesInGroupMain(groupData, groupMainSubgroupsDivision)
    await renderProductsInGroupMain(groupData, groupMainProductsTBody)
}


/**
 * Рендеринг имен подгрупп в groupMain
 * @param {*} groupData Данные группы(подгруппы + ее товары)
 * @param {*} groupMainSubgroupsDivision Ccылка на контейнер, куда будут рендерится имена подгрупп
 */
async function renderSubgroupsNamesInGroupMain(groupData, groupMainSubgroupsDivision){

    if (!groupData.children.length == 0) {
        const ul = UlWithSubgroupsNames(groupData)

        groupMainSubgroupsDivision.appendChild(ul)
    }
}

/**
 * Рендеринг продуктов в таблице продуктов при открытии группы с продуктами
 * @param {*} groupData Данные группы(подгруппы + ее товары)
 * @param {*} groupMainProductsTBody Ссылка на тело таблицы, куда вставляются записи о товарах группы
 */
async function renderProductsInGroupMain(groupData, groupMainProductsTBody){

    if (!groupData.products.length == 0) {
        
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

            /*
            const tdOstatok = document.createElement('td')
            tdOstatok.innerText = el.ostatok
            tr.appendChild(tdOstatok)
            */

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
            buttonAdd.classList.add("btn")
            buttonAdd.classList.add("flash-btn")
            action.appendChild(buttonAdd)
            tr.appendChild(action)

            groupMainProductsTBody.appendChild(tr)
        })
    }
}
