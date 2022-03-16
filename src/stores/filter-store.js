import {defineStore} from "pinia";

const GENT_COORDINATES = {lat: 51.053581, lng: 3.722969};

export const useFilterStore = defineStore("filters", {
    state: () => {
        return {
            page: 1,
            selectedFunctions: [],
            location: GENT_COORDINATES,
            rangeInKm: 5
        }
    },
    getters: {},
    actions: {
        resetFilters() {
            this.page = 1;
            this.selectedFunctions = [];
            this.location = GENT_COORDINATES;
            this.rangeInKm = 5;
        }
    }
});