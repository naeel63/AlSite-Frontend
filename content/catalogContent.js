//рендеринг страницы каталога
navButtonCatalog.addEventListener('click', async (event) => {
    catalogData = await fetchCatalog();
    actualDate = await fetchActualDate();

    await renderCatalog(catalogData);
    await renderActualDate(actualDate);
})

//Отображение групп при нажатии на кнопку групп
groupsButton.addEventListener('click', async (event) => {
    catalogGeneralDivision.classList.add('none')
    groupsGeneralDivision.classList.remove('none')

    const groupsGeneral = await fetchGroups();
    await renderGroupsGeneral(groupsGeneral)
})

catalogButton.addEventListener('click', (event) => {
    catalogGeneralDivision.classList.remove('none')
    groupsGeneralDivision.classList.add('none')
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