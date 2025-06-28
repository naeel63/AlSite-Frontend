//рендеринг страницы каталога
navButtonCatalog.addEventListener('click', async (event) => {
    catalogData = await fetchCatalog();
    actualDate = await fetchActualDate();

    await renderCatalog(catalogData);
    await renderActualDate(actualDate);
})

//фильтр по вводу
document.querySelector('#searchInput')
    .addEventListener('input', async (event) => {
        await filterCatalog(event.target.value);
    });

//переход к корзине
document.querySelector('#goToCart')
    .addEventListener('click', (event) => {
        navButtonCart.click()
    })