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
import PageKsActionMenu from './pages/PageKsActionMenu.vue';
import PageKsGrid from './pages/PageKsGrid.vue';
import PageKsStepThrough from './pages/PageKsStepThrough.vue';
import PageKsAccordion from './pages/PageKsAccordion.vue';
import PageKsRadio from './pages/PageKsRadio.vue';
import PageKsCheckbox from './pages/PageKsCheckbox.vue';
import PageKsTable from './pages/PageKsTable.vue';
import PageKsButton from './pages/PageKsButton.vue';
import PageKsTooltip from './pages/PageKsTooltip.vue';

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
        path: '/ks-button',
        component: PageKsButton,
        name: 'KsButton',
        meta: {title: 'Kickstart Button'}
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
        path: '/ks-radio',
        component: PageKsRadio,
        name: 'KsRadio',
        meta: {title: 'Kickstart Radio Buttons'}
    },
    {
        path: '/ks-checkbox',
        component: PageKsCheckbox,
        name: 'KsCheckbox',
        meta: {title: 'Kickstart Radio Buttons'}
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
        path: '/ks-action-menu',
        component: PageKsActionMenu,
        name: 'KsActionMenu',
        meta: {title: 'Kickstart Action Menu'}
    },
    {
        path: '/ks-styles',
        component: StylesPage,
        name: 'KsStyles',
        meta: {title: 'Kickstart Styles'}
    },
    {
        path: '/ks-grid',
        component: PageKsGrid,
        name: 'KsGrid',
        meta: {title: 'Kickstart Grid'}
    },
    {
        path: '/ks-step-through',
        component: PageKsStepThrough,
        name: 'KsStepThrough',
        meta: {title: 'Kickstart Step Through'}
    },
    {
        path: '/ks-accordion',
        component: PageKsAccordion,
        name: 'KsAccordion',
        meta: {title: 'Kickstart Accordion'}
    },
    {
        path: '/ks-tables',
        component: PageKsTable,
        name: 'KsTable',
        meta: {title: 'Kickstart Tables'}
    },
    {
        path: '/ks-tooltip',
        component: PageKsTooltip,
        name: 'KsTooltip',
        meta: {title: 'Kickstart Tooltip'}
    }
];

export default routes;
