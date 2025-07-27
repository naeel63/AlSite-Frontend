displayNavContacts();

//Старая механика, от которой я избавлюсь
//Смена раздела при клике на навигационную кнопку
navigateButtons.forEach((el) => {
    el.addEventListener('click', (event) => {
        if (el.id != 'navButtonCatalog'){
            //убирает у всех кнопок признак того, что кнопка активна
            navigateButtonsInactive(); 
            //добавляет нажатой кнопке признак того, что она активна
            event.target.classList.add('active'); 
            //скрывает контент других разделов
            unwantedContentHide(event.target.name+'Content');
        }
    });
});
