const FUNCTIONS_ENDPOINT = "https://data.stad.gent/api/v2/catalog/datasets/speelterreinen-gent/aggregates?select=&group_by=functies";

export async function getUniqueFunctions() {
    const res = await fetch(FUNCTIONS_ENDPOINT);

    let uniqueFunctions = [];

    await res.json().then(response => {
        response.aggregations.map(aggregation => {
            let aggregationFunctions = aggregation.functies.split(',');

            aggregationFunctions.map(playgroundFuntion => {
                let trimmedPlaygroundFunction = playgroundFuntion.trim();

                if (!uniqueFunctions.includes(trimmedPlaygroundFunction)) {
                    uniqueFunctions.push(trimmedPlaygroundFunction);
                }
            });
        });
    });

    return uniqueFunctions;
}