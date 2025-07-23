const groupsMenuDivision = document.querySelector("#groupsMenu")

window.addEventListener('scroll',(event) => {
const scrollPosY = window.scrollY
    if (scrollPosY > 300) {
        groupsMenuDivision.classList.add('group_menu_position_sticky')
    } else {
        groupsMenuDivision.classList.remove('group_menu_position_sticky')
    }
})