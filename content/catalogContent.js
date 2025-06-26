//рендеринг страницы каталога
navButtonCatalog.addEventListener('click', async (event) => {
    catalogData = await fetchCatalog();
    actualDate = await fetchActualDate();

    console.log(catalogData)

    await renderCatalog(catalogData);
    await renderActualDate(actualDate);
})

//фильтр по вводу
document.querySelector('#searchInput')
    .addEventListener('input', async (event) => {
        await filterCatalog(event.target.value);
    });