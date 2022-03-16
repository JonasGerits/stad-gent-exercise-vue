import {defineStore} from "pinia";

export const useMobileViewStore = defineStore("mobileViewStore", {
    state: () => {
        return {
            playgroundsOpened: true
        }
    },
    getters: {},
    actions: {
        togglePlaygroundsOpened() {
            this.playgroundsOpened = !this.playgroundsOpened;
        }
    }
});