const BASE_URL = "https://data.stad.gent/api/v2/catalog/datasets/speelterreinen-gent/records?";

export function getQuery(functions, page) {
    console.log('executing...');

    let query = BASE_URL;
    query = addFunctions(query, functions);
    query = addPagination(query, page);

    console.log(query);

    return query;
}

function addFunctions(query, functions) {
    if (functions?.length > 0) {
        return query.concat(`where=functies like "${functions.concat(", ")}"`);
    }

    return query;
}

function addPagination(query, pagination = 1) {
    const limit = 10;
    const offset = (pagination - 1) * limit;

    return query.concat(`&limit=${limit}&offset=${offset}`);
}