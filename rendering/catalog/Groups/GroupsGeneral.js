/**
 * Рендеринг имен подгрупп в разделе #groupsMenu и 
 * рендеринг данных в разделе #groupProducts 
 */
async function renderGroupMenu(){
    const parentDiv = document.querySelector("#groupsFromDB")

    //Добавление логики по загрузке подгрупп и товаров у группы при клике и их стилей+рендеринг главных групп при переходе в каталог
    if(!(parentDiv.classList.contains('main-groups-loaded'))){
        parentDiv.classList.add('main-groups-loaded')
        
        groupsDiv.addEventListener('click', event => {
            const item = event.target.closest('.group')
            if (!item) return;

            groupsDiv.querySelectorAll(".group.background-accent").forEach(item => {
                item.classList.remove("background-accent");
            });

            item.classList.toggle("background-accent");

            //Чистка #groupProducts перед рендерингом новых товаров
            const div = document.querySelector('#groupProducts');
            div.innerHTML = '';
            //Рендеринг подгрупп и товаров выбранной группы
            renderSubgroups(item,false)
            renderGroupProducts(item.dataset.id)
        })
    
        //Рендеринг главных групп при открытии каталога
        renderSubgroups(parentDiv, true)
        renderGroupProducts()
    }
}

/**
 * Рендеринг групп в родительском элементе
 * @param {HTMLElement} parentDiv
 * @param {boolean} isMainGroups
 */
async function renderSubgroups(parentDiv, isMainGroups) {
    if (parentDiv.classList.contains('child-loaded')){
        parentDiv.classList.remove('child-loaded')
        parentDiv.parentElement.querySelectorAll(':scope > .child').forEach(el => {
            el.classList.remove('none')
        })
    } 
    else if (parentDiv.classList.contains('loaded')) {
        parentDiv.parentElement.querySelectorAll(':scope > .child').forEach(el => {
            el.classList.add('none')
        })

        parentDiv.classList.add('child-loaded')
    } 
    else {
        const groups = isMainGroups
        ? await fetchGroups()
        : (await fetchGroupData(parentDiv.dataset.id)).children
        
        groups.forEach(element => {
            div1 = document.createElement('div')
            div2 = document.createElement('div')
            div1.appendChild(div2)

            div2.classList.add('flex','items-center','gap-2', 'py-2', 'px-3', 'rounded', 'cursor-pointer', 'grey-hover', 'group')
            div2.innerHTML = 
                `
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill w-4 h-4 color-primary  " viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                    </svg>
                </button>
                <span class = "flex-1">${element.name}</span>
                `
            div2.dataset.id = `${element.id}`

            if (isMainGroups){
                parentDiv.appendChild(div1)
            } else parentDiv.parentElement.appendChild(div1)
            
        
            
            if (!isMainGroups) {
                div1.classList.add('border-l-2', 'pl-2', 'ml-5', 'child')
                parentDiv.classList.add('loaded')
            }
        });
    }
}

/**
 * Рендеринг товаров в разделе #groupProducts(пространство справа от меню групп)
 * @param {number} groupId 
 */
async function renderGroupProducts(groupId = -1){
    const divGroupProducts = document.querySelector('#groupProducts')
    const products = (groupId == -1)
    ? await fetchProducts()
    : await fetchGroupData(groupId)

    console.log('products', products)

    products.products.forEach(el =>{
        const divProductCard = document.createElement('div')
        divProductCard.classList.add('bg-white', 'rounded-lg', 'border', 'overflow-hidden', 'hover-shadow', 'flex', 'flex-col', 'h-full', 'flex-1')

        const divProductCardImage = document.createElement('div')
        divProductCardImage.classList.add('relative', 'h-48', 'background-secondary')

        const img = document.createElement('img')
        img.src = "img/jaguar_smile.jpg"
        img.alt = el.name
        img.classList.add('w-full', 'h-full', 'object-cover', 'object-center')

        const divProductCardBody = document.createElement('div')
        divProductCardBody.classList.add('p-4', 'flex', 'flex-col', 'flex-1')

        const divProductCardBodyCap = document.createElement('div')
        divProductCardBodyCap.classList.add('mb-4')
        divProductCardBodyCap.innerHTML = `
            <h3>${el.name}</h3>
            <p class="text-muted-foreground">
            Артикул:
            ${el.code}
            </p>
        `

        const divProductCardBodyMain = document.createElement('div')
        divProductCardBodyMain.classList.add('flex', 'justify-between', 'items-center', 'mt-auto')
        const divProductCardBodyMainSpan = document.createElement('span')
        divProductCardBodyMainSpan.classList.add('color-primary')
        divProductCardBodyMainSpan.textContent = `${el.price} ₽`
        divProductCardBodyMain.appendChild(divProductCardBodyMainSpan)
        const divProductCardBodyMainButton = document.createElement('button')
        divProductCardBodyMainButton.classList.add('flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'rounded',  'background-primary', 'color-white', 'primary-hover')
        divProductCardBodyMainButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart w-4 h-4" data-fg-bwxh75="1.14:9.11124:node_modules/lucide-react:440:27:15497:36:e:ShoppingCart::::::BPYc" data-fgid-bwxh75=":r3i:"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
            В корзину
        `
        divProductCardBodyMainButton.addEventListener('click', () => {
            if (cart.some(item => item.code === el.code)) {
                const existingItem = cart.find(item => item.code === el.code);
                existingItem.quantity += 1;
            } else {
                const newItem = {
                    name: el.name,
                    code: el.code,
                    price: el.price,
                    groupId: el.groupId,
                    ostatok: el.ostatok,
                    quantity: 1
                };
                cart.push(newItem);
            }
        })
        divProductCardBodyMain.appendChild(divProductCardBodyMainButton)

        divProductCardImage.appendChild(img)
        divProductCard.appendChild(divProductCardImage)
        divProductCardBody.appendChild(divProductCardBodyCap)
        divProductCardBody.appendChild(divProductCardBodyMain)
        divProductCard.appendChild(divProductCardBody)
        divGroupProducts.appendChild(divProductCard)
    })
}