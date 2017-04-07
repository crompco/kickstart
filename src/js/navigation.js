// External Dependencies

// Internal Dependencies
import {domReady, dom} from '../helpers/dom';

export default class Navigation {

    constructor() {
        domReady(() => {
            this.$element = dom('.nav-bar .mobile-menu');

            this._init();
        });
    }

    _init() {
        this.$element.on('click', (e) => {
            console.log('click event: ', e);
            this.$element.addClass('show');
        });
    }
}