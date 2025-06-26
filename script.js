//Покраска активной навигационной кнопки
navigateButtons.forEach((el) => {
    el.addEventListener('click', (event) => {
        navigateButtonsInactive();
        event.target.classList.add('active');
    });
});

//

//Смена раздела при клике на навигационную кнопку
navigateButtons.forEach((el) => {
    el.addEventListener('click', (event) => {
        unwantedContentHide(event.target.name);
    });
});
