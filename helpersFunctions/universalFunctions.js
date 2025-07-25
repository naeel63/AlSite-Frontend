/**
 * Удаляет всех потомков у выбранного элемента
 * @param {*} element 
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Добавляет всем разделам, кроме переданного, класс none.
 * @param {*} razdelId 
 */
async function unwantedContentHide(razdelId){
    contentContainers.forEach((el) => {
      if (el.id == razdelId){
        el.classList.remove('none')
      }
      else {
        el.classList.add('none')
      }
    });
};

/**
 * Создает таблицу с колонками, названия которых берутся из thArray
 * @param {*} thArray 
 * @returns Возвращает таблицу(элемент table)
 */
function tableCreate(thArray){
    if (!thArray.length == 0){
        const table = document.createElement('table')
        const thead = document.createElement('thead')
        table.appendChild(thead)

        const tr = document.createElement('tr')
        thead.appendChild(tr)

        thArray.forEach(el => {
            const th = document.createElement('th')
            th.innerText = el
            tr.appendChild(th)
        })

        const tbody = document.createElement('tbody')
        table.appendChild(tbody)
        return table
    } else {
        console.error('В функцию создания таблицы не были переданы названия столбцов')
    }
}