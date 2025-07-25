/**
 * Точка старта рендеринга раздела каталога
 */
navButtonCatalog.addEventListener('click', async (event) => {
    const groupsGeneral = await fetchGroups();
    await renderGroupsGeneral(groupsGeneral)
})