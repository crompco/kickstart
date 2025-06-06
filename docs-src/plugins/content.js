import content from '../generated/generated-content';

function clone (arr) {
    return JSON.parse(JSON.stringify(arr));
}

export default {
    get(section) {
        let list = clone(
            content
                .filter(r => !section || r.meta.section === section)
                .map(r => ({ ...r.meta, path: r.path, data: r.data, body: r.content }))
        );

        const api = {
            only (keys) {
                list = list.map(item => keys.reduce((o, k) => (o[k] = item[k], o), {}));
                return api;
            },
            sortBy (prop) {
                list.sort((a, b) => {
                    const A = a[prop], B = b[prop];
                    return (A > B) - (A < B);
                });
                return api;
            },
            fetch (path = null) {
                if (path === null) {
                    return Promise.resolve(list);
                }

                const component = list.filter(r => r.path === path)?.[0];

                return Promise.resolve(component);
            }
        };

        return api;
    }
};