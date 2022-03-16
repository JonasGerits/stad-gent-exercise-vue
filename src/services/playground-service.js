import * as PlaygroundQueryBuilderUtil from "@/utils/PlaygroundQueryBuilderUtil";

export async function getPlaygrounds(selectedFunctions, page, location, rangeInKm) {
    const url = PlaygroundQueryBuilderUtil.getQuery(selectedFunctions, page, location, rangeInKm)
    const res = await fetch(url);

    return await res.json();
}