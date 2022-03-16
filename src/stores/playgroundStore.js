import {defineStore} from "pinia";
import * as PlaygroundService from "@/services/playground-service";

export const usePlaygroundStore = defineStore("playgrounds", {
    state: () => {
        return {
            totalPlaygrounds: 0,
            playgrounds: [],
            selectedPlayground: {}
        }
    },
    getters: {},
    actions: {
        async updatePlaygrounds(selectedFunctions, page, location, rangeInKm) {
            const response = await PlaygroundService.getPlaygrounds(selectedFunctions, page, location, rangeInKm)

            this.totalPlaygrounds = response.total_count;
            this.playgrounds = response.records;
        }
    }
});