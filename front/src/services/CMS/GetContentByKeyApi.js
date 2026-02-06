export function GetContentByKey(elements, elementKey) {
    return elements.find(item => item.element === elementKey) || null;
}