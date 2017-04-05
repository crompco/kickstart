const browserEnv = require('browser-env');
const Vue = require('vue');
const window = browserEnv();

export function resetDocument() {
	if ( document.body.firstChild ) {
		document.body.removeChild(document.body.firstChild);
	}

	let div = document.createElement('div');
	div.setAttribute('id', 'testapp');
	document.body.appendChild(div);
}

export function component(Component, props) {
	const c = Vue.extend(Component)
	let vm = new c({propsData: props}).$mount();
	console.log(document.getElementById('testapp'), document.getElementById('testapp').firstChild);
	console.log(vm.$el);
	return vm;
}

