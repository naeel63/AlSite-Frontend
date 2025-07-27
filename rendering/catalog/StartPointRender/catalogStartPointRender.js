/**
 * Точка старта рендеринга раздела каталога
 */
navButtonCatalog.addEventListener('click', async (event) => {
    if (catalogGeneralDivision.classList.contains('none')){
        navigateButtonsInactive(); 
        //добавляет нажатой кнопке признак того, что она активна
        navButtonCatalog.classList.add('active'); 
        //скрывает контент других разделов
        unwantedContentHide(navButtonCatalog.name+'Content');

        const groupsGeneral = await fetchGroups();
        await renderGroupsGeneral(groupsGeneral)
    }
})