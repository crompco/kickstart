/**
 * jsdom has no layout engine; these give elements and the viewport a size.
 */
export function setViewport(width, height) {
    Object.defineProperty(document.documentElement, 'clientWidth', { value: width, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: height, configurable: true });
}

export function setRect(el, { x = 0, y = 0, width = 0, height = 0 }) {
    el.getBoundingClientRect = () => ({ x, y, width, height, top: y, left: x, right: x + width, bottom: y + height, toJSON() {} });
    Object.defineProperty(el, 'offsetWidth', { value: width, configurable: true });
    Object.defineProperty(el, 'offsetHeight', { value: height, configurable: true });
}

export function flushPromises() {
    return new Promise(resolve => setTimeout(resolve));
}
