import PageKsAutocomplete from './pages/PageKsAutocomplete.vue';
import PageKsTabs from './pages/PageKsTabs.vue';
import PageKsModal from './pages/PageKsModal.vue';
import PageKsLoaders from './pages/PageKsLoaders.vue';
import PageKsFormElements from './pages/PageKsFormElements.vue';
import PageKsSelect from './pages/PageKsSelect.vue';
import StylesPage from './pages/StylesPage.vue';
import PageKsCalendar from './pages/PageKsCalendar.vue';
import PageKsDatepicker from './pages/PageKsDatepicker.vue';
import PageKsToast from './pages/PageKsToast.vue';
import PageKsPaginator from './pages/PageKsPaginator.vue';
import PageKsCard from './pages/PageKsCard.vue';

const routes = [
    {
        path: '/',
        name: 'Index',
        redirect: '/ks-autocomplete'
    },
    {
        path: '/ks-autocomplete',
        component: PageKsAutocomplete,
        name: 'KsAutocomplete',
        meta: {title: 'Kickstart Autocomplete'}
    },
    {
        path: '/ks-tabs',
        component: PageKsTabs,
        name: 'KsTabs',
        meta: {title: 'Kickstart Tabs'}
    },
    {
        path: '/ks-modal',
        component: PageKsModal,
        name: 'KsModal',
        meta: {title: 'Kickstart Modal'}
    },
    {
        path: '/ks-forms',
        component: PageKsFormElements,
        name: 'KsForms',
        meta: {title: 'Kickstart Forms'}
    },
    {
        path: '/ks-select',
        component: PageKsSelect,
        name: 'KsSelect',
        meta: {title: 'Kickstart Selects'}
    },
    {
        path: '/ks-calendar',
        component: PageKsCalendar,
        name: 'KsCalendar',
        meta: {title: 'Kickstart Calendar'}
    },
    {
        path: '/ks-datepicker',
        component: PageKsDatepicker,
        name: 'KsDatepicker',
        meta: {title: 'Kickstart Datepicker'}
    },
    {
        path: '/ks-loaders',
        component: PageKsLoaders,
        name: 'KsLoaders',
        meta: {title: 'Kickstart Loaders'}
    },
    {
        path: '/ks-toast',
        component: PageKsToast,
        name: 'KsToast',
        meta: {title: 'Kickstart Toast'}
    },
    {
        path: '/ks-paginator',
        component: PageKsPaginator,
        name: 'KsPaginator',
        meta: {title: 'Kickstart Paginator'}
    },
    {
        path: '/ks-card',
        component: PageKsCard,
        name: 'KsCard',
        meta: {title: 'Kickstart Card'}
    },
    {
        path: '/ks-styles',
        component: StylesPage,
        name: 'KsStyles',
        meta: {title: 'Kickstart Styles'}
    }
];

export default routes;
