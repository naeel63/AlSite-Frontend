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