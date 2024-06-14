import { effect } from './reactivity';
export const createElement = (tag, { children } = {}) => {
	if (typeof tag === 'function') {
		return tag({ children });
	}
	const element = document.createElement(tag);

	if (children) {
		if (Array.isArray(children)) {
			children.forEach((child) => child && renderChild(child, element));
		} else {
			renderChild(children, element);
		}
	}
	return element;
};
function renderChild(child, element) {
	let text;
	if (typeof child === 'string' || typeof child === 'number') {
		text = document.createTextNode(child);
		element.appendChild(text);
	} else if (typeof child === 'function') {
		text = document.createTextNode(child);
		effect(() => {
			text.textContent = child();
		});
		element.appendChild(text);
	} else {
		element.appendChild(child);
	}
}
