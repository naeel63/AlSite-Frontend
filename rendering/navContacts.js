async function renderNavContacts(contacts) {
	const navContacts = document.querySelector('#navContacts');

	if (contacts) {
		contacts.forEach(contact => {
			const contactElement = document.createElement('div');
			contactElement.textContent = contact.phoneNumber;
			navContacts.appendChild(contactElement);
		});
	} else {
		navContacts.textContent = 'Номера телефонов не найдены';
	}
}