//фильтр каталога по вводу
function filterCatalog(query) {
    const filteredData = catalogData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.code.toLowerCase().includes(query.toLowerCase())
    );
    renderCatalog(filteredData);
}