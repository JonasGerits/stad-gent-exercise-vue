import {defineStore} from "pinia";

export const usePlaygroundStore = defineStore("playgrounds", {
    state: () => {
        return {
            playgrounds: [],
            selectedPlayground: {}
        }
    },
    getters: {},
    actions: {}
});