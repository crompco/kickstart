const countries = require('../static/countries.json');

const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
function escapeRegExp(str) {
    return str.replace(matchOperatorsRe, '\\$&');
}

export default function (req, res) {
    const protocol = req.connection?.encrypted ? 'https' : 'http';
    const baseUrl = `${protocol}://${req.headers.host}/`;
    const search = new URL(req.url, baseUrl);
    const params = search.searchParams;

    const name_regex = new RegExp('^.*' + escapeRegExp(params.get('q')) + '.*', 'i');
    const limit = 10;
    const page = parseInt(typeof params.get('page') != 'undefined' ? params.get('page') : 1);
    const slice_start = (page - 1) * limit;

    const json = JSON.stringify({
        data: countries.filter(o => !!o.name.match(name_regex))
            .slice(slice_start, slice_start + limit)
    });

    res.end(json)
}
