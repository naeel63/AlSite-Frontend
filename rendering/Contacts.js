async function renderHeaderContacts(contacts) {
	const headerContacts = document.querySelector('#headerContacts');

	if (contacts) {
		const contactElement = document.createElement('span');
		contacts.forEach(contact => {
			
			console.log(contact)
			if (headerContacts.textContent) {
				contactElement.textContent += ', ';
			}
			contactElement.textContent += contact.phoneNumber
			headerContacts.appendChild(contactElement);
		});
	} else {
		headerContacts.textContent = 'Номера телефонов не найдены';
	}
}