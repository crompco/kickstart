import axios from 'axios';
import { afterEach, beforeEach, expect, test } from 'vitest';
import api from '../../src/helpers/api';

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
