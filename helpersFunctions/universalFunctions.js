/**
 * Удаляет всех потомков у выбранного элемента
 * @param {*} element 
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}