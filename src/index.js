import * as components from './components';
import { install } from './install';

export * from './components';

export { install };

export default {
    ...Object.fromEntries(Object.entries(components).filter(([name]) => name.startsWith('Ks'))),
    install,
};
