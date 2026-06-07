navigateButtons.forEach(element => {
    const sectionName = element.id.slice(9).toLowerCase() + "Content"
    /** @type {HTMLElement} section*/
    const section = document.querySelector(`#${sectionName}`)

    console.log(sectionName)

    if (sectionName == "catalogContent"){
        element.addEventListener("click", (event) => {
            renderGroupMenu();
        })
    }
    
    element.addEventListener("click", (event) => {
        if (section.classList.contains('none')) {
            const allNavButtons = document.querySelectorAll('.nav-button')
            const allSectionContents = document.querySelectorAll('.content-section')

            allNavButtons.forEach(element => {
                element.classList.remove('active')
            })
            allSectionContents.forEach(element => {
                element.classList.add('none')
            })

            element.classList.add('active')
            section.classList.remove('none')
        }
    })
});