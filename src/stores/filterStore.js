import {defineStore} from "pinia";

const GENT_COORDINATES = {lat: 51.053581, lng: 3.722969};

export const useFilterStore = defineStore("main", {
    state: () => {
        return {
            selectedFunctionsState: [],
            location: GENT_COORDINATES,
            rangeInKm: 5
        }
    },
    getters: {},
    actions: {}
});