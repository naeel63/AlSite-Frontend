/**
 * Рендеринг главных групп товаров
 * @param {*} data Массив из главных групп товаров
 */
async function renderGroupsGeneral(data) {
    const groupsMenuDivision = document.querySelector('#groupsMenuDivision')
    removeAllChildren(groupsMenuDivision)

    const ulGeneral = document.createElement('ul')

    data.forEach((el) => {
        const li = document.createElement('li')
        li.innerHTML = `<span class="icon-menu"></span> ${el.name}`

        li.dataset.id = el.id

        li.addEventListener('click', renderGroup)
        li.addEventListener('click', plusMinusSwapper)

        ulGeneral.appendChild(li)
    })
    groupsMenuDivision.appendChild(ulGeneral)
}

/**
 * Рендеринг имен подгрупп в разделе #groupsMenuDivision и 
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

async function renderGroupMenu(){
    console.log("great")
    const mainGroups = await fetchGroups()
    const parentDiv = document.querySelector("#groupsFromDB")
    console.log(mainGroups)

    mainGroups.forEach(element => {
        div1 = document.createElement('div')
        div2 = document.createElement('div')
        div1.appendChild(div2)

        div2.classList.add('flex','items-center','gap-2', 'py-2', 'px-3', 'rounded', 'cursor-pointer', 'grey-hover', 'group')
        div2.innerHTML = `
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill w-4 h-4 color-primary  " viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                </svg>
            </button>
            <span class = "flex-1">${element.name}</span>
        `
        div2.dataset.id = `${element.id}`
        parentDiv.appendChild(div1)
    });

    groupsDiv.addEventListener('click', event => {
        const item = event.target.closest('.group')

        if (!item) return;

        groupsDiv.querySelectorAll(".group.background-accent").forEach(item => {
            item.classList.remove("background-accent");
        });

        item.classList.toggle("background-accent");
        item.classList.toggle("grey-hover");
        

    })
}