displayNavContacts();

//Смена раздела при клике на навигационную кнопку
navigateButtons.forEach((el) => {
    el.addEventListener('click', (event) => {
        //убирает у всех кнопок признак того, что кнопка активна
        navigateButtonsInactive(); 
        //добавляет нажатой кнопке признак того, что она активна
        event.target.classList.add('active'); 
        //скрывает контент других разделов
        unwantedContentHide(event.target.name+'Content');
    });
});
