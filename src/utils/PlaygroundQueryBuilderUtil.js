const BASE_URL = "https://data.stad.gent/api/v2/catalog/datasets/speelterreinen-gent/records?";

export function getQuery(functions, page, geoLocation, rangeInKm) {
    let query = BASE_URL;

    query = addFunctions(query, functions);
    query = addGeoLocation(query, functions, geoLocation, rangeInKm)
    query = addPagination(query, page);

    return query;
}

function addFunctions(query, functions) {
    if (functions?.length > 0) {
        return query.concat(`where=functies like "${functions.concat(", ")}"`);
    }

    return query;
}

function addGeoLocation(query, functions, geoLocation, rangeInKm) {
    if (geoLocation.lat && geoLocation.lng) {
        functions?.length > 0 ? query = query.concat(`and `) : query = query.concat(`where=`);

        query = query.concat(`distance(geo_point_2d, geom'POINT(${geoLocation.lng} ${geoLocation.lat})', ${rangeInKm}km)`);
    }

    return query;
}

function addPagination(query, pagination = 1) {
    const limit = 10;
    const offset = (pagination - 1) * limit;

    return query.concat(`&limit=${limit}&offset=${offset}`);
}