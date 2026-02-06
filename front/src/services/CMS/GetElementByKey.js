export function getCmsElementByKey(elements, elementKey) {
    return elements.find(item => item.element === elementKey) || null;
}