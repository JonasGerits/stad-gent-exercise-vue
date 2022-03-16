import * as PlaygroundQueryBuilder from "@/utils/playground-query-builder";

export async function getPlaygrounds(selectedFunctions, page, location, rangeInKm) {
    const url = PlaygroundQueryBuilder.getQuery(selectedFunctions, page, location, rangeInKm)
    const res = await fetch(url);

    return await res.json();
}