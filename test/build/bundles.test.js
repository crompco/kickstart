import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { expect, test } from 'vitest';

const require = createRequire(import.meta.url);
const root = process.cwd();
const built = existsSync(`${root}/dist/kickstart-ui.min.js`) && existsSync(`${root}/lib/dates.js`);
test.skipIf(!built)('umd default + named', () => {
    const umd = require(`${root}/dist/kickstart-ui.min.js`);
    expect(typeof umd.default.install).toBe('function');
    expect(typeof umd.KsModal).toBe('object');
});
test.skipIf(!built)('esm + lib', async () => {
    const esm = await import(`${root}/dist/kickstart-ui.esm.js`);
    const Vue = (await import('vue')).default;
    Vue.use(esm.default);
    expect(Vue.options.components['ks-modal']).toBeTruthy();
    expect(typeof Vue.filter('currency')).toBe('function');
    const dates = await import(`${root}/lib/dates.js`);
    expect(dates.formatDate(new Date(Date.UTC(2017, 0, 5)), 'm/d/Y')).toBe('01/05/2017');
    const api = await import(`${root}/lib/api.js`);
    expect(typeof api.default.getInstance).toBe('function');
});
