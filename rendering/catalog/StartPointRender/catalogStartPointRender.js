/**
 * Точка старта рендеринга раздела каталога
 */
navButtonCatalog.addEventListener('click', async (event) => {
    if (!catalogGeneralDivision.classList.contains('none') && false){
        const groupsGeneral = await fetchGroups();
        await renderGroupsGeneral(groupsGeneral)
    }
})