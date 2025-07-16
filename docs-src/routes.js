import Index from './pages/index.vue'
import ComponentView from './pages/components/ComponentView.vue';
import Components from './layouts/components.vue';
import StylesView from './pages/styles/StylesView.vue';
import Styles from './layouts/styles.vue';

const routes = [
    {
        path: '/',
        component: Index,
        name: 'Index',
        meta: {title: 'Kickstart'}
    },
    {
        path: '/components',
        component: Components,
        children: [
            {
                path: ':component',
                component: ComponentView,
            }
        ]
    },
    {
        path: '/styles',
        component: Styles,
        children: [
            {
                path: ':style',
                component: StylesView,
            }
        ]
    },
];

export default routes;