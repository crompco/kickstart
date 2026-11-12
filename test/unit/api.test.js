import axios from 'axios';
import { afterEach, beforeEach, expect, test } from 'vitest';
import api, { serializeParams } from '../../src/helpers/api';

let requests;

function respondWith(handler) {
    api.getInstance().defaults.adapter = (config) => {
        requests.push(config);

        return handler(config);
    };
}

function ok(config, data = { ok: true }) {
    return Promise.resolve({ data, status: 200, statusText: 'OK', headers: {}, config });
}

function fail(config, status) {
    const error = new axios.AxiosError('failed', 'ERR', config, null, { status, data: {}, headers: {}, config });

    return Promise.reject(error);
}

beforeEach(() => {
    requests = [];
    api.createFromConfig();
    delete axios.defaults.baseURL;
});

afterEach(() => {
    delete axios.defaults.baseURL;
});

test('get resolves the response data and post resolves the response', async () => {
    respondWith(config => ok(config, { id: 5 }));

    await expect(api.get('/things', { params: { page: 2 } })).resolves.toEqual({ id: 5 });
    expect(requests[0].params).toEqual({ page: 2 });

    const response = await api.post('/things', { name: 'x' });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ id: 5 });
});

test('baseUrl applies to the current instance and to later instances', async () => {
    api.baseUrl('http://fossa.test/api');
    respondWith(config => ok(config));
    await api.get('/things');
    expect(requests[0].baseURL).toBe('http://fossa.test/api');

    api.createFromConfig({ timeout: 5 });
    respondWith(config => ok(config));
    await api.get('/things');
    expect(requests[1].baseURL).toBe('http://fossa.test/api');
});

test('a per request baseURL still wins', async () => {
    api.baseUrl('http://fossa.test/api');
    respondWith(config => ok(config));

    await api.post('/logout', {}, { baseURL: '/' });
    expect(requests[0].baseURL).toBe('/');
});

test('a response onRejected promise can retry the request', async () => {
    let calls = 0;
    respondWith(config => ++calls === 1 ? fail(config, 401) : ok(config, { retried: true }));

    api.interceptors.response(
        response => response,
        error => api.getInstance().request(error.config),
    );

    await expect(api.get('/things')).resolves.toEqual({ retried: true });
});

test('a response onRejected value becomes the rejection reason', async () => {
    respondWith(config => fail(config, 500));

    api.interceptors.response(response => response, () => 'handled');

    await expect(api.get('/things')).rejects.toBe('handled');
});

test('an onRejected handler without a return value keeps the error', async () => {
    respondWith(config => fail(config, 500));

    api.interceptors.response(response => response, () => {});

    await expect(api.get('/things')).rejects.toBeInstanceOf(axios.AxiosError);
});

test('request interceptors can change the config', async () => {
    respondWith(config => ok(config));

    api.interceptors.request((config) => {
        config.headers.set('X-Test', 'yes');

        return config;
    });
    api.interceptors.request();

    await api.get('/things');
    expect(requests[0].headers.get('X-Test')).toBe('yes');
});

test('isCancel detects aborted requests', async () => {
    respondWith(config => new Promise((resolve, reject) => {
        config.signal.addEventListener('abort', () => reject(new axios.CanceledError()));
    }));

    const controller = new AbortController();
    const request = api.get('/things', { signal: controller.signal });
    controller.abort();

    await request.catch(error => expect(api.isCancel(error)).toBe(true));
});

// Expected strings are the output of axios 0.15.3 lib/helpers/buildURL.js (kickstart 2.x) for the same params
test.each([
    ['an object as JSON', { nearby: { bounds: { north: 1.5, south: -2, east: 3, west: 4 } } }, 'nearby=%7B%22bounds%22:%7B%22north%22:1.5,%22south%22:-2,%22east%22:3,%22west%22:4%7D%7D'],
    ['an array as key[]', { ids: [1, 2, 3] }, 'ids[]=1&ids[]=2&ids[]=3'],
    ['objects in an array as JSON', { sort: [{ field: 'a', dir: 'asc' }] }, 'sort[]=%7B%22field%22:%22a%22,%22dir%22:%22asc%22%7D'],
    ['no null or undefined values', { a: null, b: undefined, c: '', d: 0, e: false }, 'c=&d=0&e=false'],
    ['a Date as an ISO string', { d: new Date(Date.UTC(2026, 0, 2, 3, 4, 5)) }, 'd=2026-01-02T03:04:05.000Z'],
    ['the 2.x encoding', { q: 'a b@c:d$e,f[g]h&i=j/k?l#m+n' }, 'q=a+b@c:d$e,f[g]h%26i%3Dj%2Fk%3Fl%23m%2Bn'],
])('serializes %s like 2.x', (name, params, expected) => {
    expect(serializeParams(params)).toBe(expected);
});

test('the shared instance sends params in the 2.x format', async () => {
    respondWith(ok);

    await api.get('/visits', { params: { nearby: { bounds: { north: 1 } }, ids: [1, 2] } });

    expect(api.getInstance().getUri(requests[0])).toBe('/visits?nearby=%7B%22bounds%22:%7B%22north%22:1%7D%7D&ids[]=1&ids[]=2');
});

test('createFromConfig keeps the 2.x format unless the config has its own paramsSerializer', () => {
    api.createFromConfig({ baseURL: '/api' });
    expect(api.getInstance().getUri({ url: '/x', params: { a: { b: 1 } } })).toBe('/api/x?a=%7B%22b%22:1%7D');

    api.createFromConfig({ paramsSerializer: undefined });
    expect(api.getInstance().getUri({ url: '/x', params: { a: { b: 1 } } })).toBe('/x?a=%7B%22b%22:1%7D');

    api.createFromConfig({ paramsSerializer: () => 'custom=1' });
    expect(api.getInstance().getUri({ url: '/x', params: { a: { b: 1 } } })).toBe('/x?custom=1');
});
