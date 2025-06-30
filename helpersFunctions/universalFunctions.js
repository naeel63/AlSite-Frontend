/**
 * Remove all children from element
 * @param {*} element 
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}