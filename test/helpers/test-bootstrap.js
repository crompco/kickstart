const Vue = require('vue/dist/vue.js');

module.exports = {
    resetDocument() {
		if ( document.body.firstChild ) {
			document.body.removeChild(document.body.firstChild);
		}

		let div = document.createElement('div');
		div.setAttribute('id', 'testapp');
		document.body.appendChild(div);
	},
    component(Component, propsData) {
        const c = Vue.extend(Component);

        return new c({propsData}).$mount();
    }
}
