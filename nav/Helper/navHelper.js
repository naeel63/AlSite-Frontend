/**
 * Убирает у всех nav-button класс .active
 */
function navigateButtonsInactive() {
    navigateButtons.forEach((el) => {
        el.classList.remove('active');
    });
};

/**
 * Отображает контакты в header
 */
async function displayNavContacts(){
    contacts = await fetchContacts();
    await renderHeaderContacts(contacts);
}