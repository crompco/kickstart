const countries = require('../static/countries.json');

const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
function escapeRegExp(str) {
    return str.replace(matchOperatorsRe, '\\$&');
}

exports.handler = async (event, context) => {
    const params = event.queryStringParameters;
    const name_regex = new RegExp('^.*' + escapeRegExp(params.q || '') + '.*', 'i');
    const limit = 10;
    const page = parseInt(typeof params.page != 'undefined' ? params.page : 1);
    const slice_start = (page - 1) * limit;

    return {
        statusCode: 200,
        body: JSON.stringify({
            data: countries.filter(o => !!o.name.match(name_regex))
                .slice(slice_start, slice_start + limit)
        })
    }
}
