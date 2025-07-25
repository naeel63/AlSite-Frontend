function plusMinusSwapper(event){
    //console.log(event.target.firstChild.style.content)
    if (event.target.tagName === "LI") {
        if (event.target.firstChild.style.content == 'url("img/minus.svg")'){
            event.target.firstChild.style.content = "url('img/plus.svg')"
        } else {
            event.target.firstChild.style.content = "url('img/minus.svg')"
        }
        event.stopPropagation()
    }
}

