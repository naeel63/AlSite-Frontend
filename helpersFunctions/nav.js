//делает все nav-button неактивными-невыбранными
function navigateButtonsInactive() {
    navigateButtons.forEach((el) => {
        el.classList.remove('active');
    });
};

//вспомогательная функция, чтобы js нормально обрабатывал fetchContacts
async function displayNavContacts(){
    contacts = await fetchContacts();
    await renderNavContacts(contacts);
}