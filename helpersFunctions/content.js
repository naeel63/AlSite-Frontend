//скрытие контента, который не показывается выбранной nav-button
async function unwantedContentHide(name){
    contentContainers.forEach((el) => {
        if (!el.classList.contains(`${name}`)){
            el.classList.add('none');
        }
        else {
            el.classList.remove('none')
        }
    });
};

//фильтр каталога по вводу
async function filterCatalog(query) {
    const filteredData = catalogData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.code.toLowerCase().includes(query.toLowerCase())
    );
    renderCatalog(filteredData);
}

async function cartCountChange(difference) {
    let a = Math.max(0, Number(cartCount.dataset.quantity))
    a += difference
    cartCount.dataset.quantity = a
    cartCount.innerText = cartCount.dataset.quantity
}

function tableCreate(thArray){
    if (!thArray.length == 0){
        const table = document.createElement('table')
        const thead = document.createElement('thead')
        table.appendChild(thead)

        const tr = document.createElement('tr')
        thead.appendChild(tr)

        thArray.forEach(el => {
            const th = document.createElement('th')
            th.innerText = el
            tr.appendChild(th)
        })

        const tbody = document.createElement('tbody')
        table.appendChild(tbody)
        return table
    } else {
        console.error('В функцию создания таблицы не были переданы названия столбцов')
    }
}