const cap = document.querySelector('#cap')

window.addEventListener("scroll", (event) => {
    const scrollPosY = window.scrollY
    if (scrollPosY > 100) {
        cap.classList.add('cap_animation')
    } else {
        cap.classList.remove('cap_animation')
    }
})