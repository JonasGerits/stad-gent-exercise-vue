import {defineStore} from "pinia";

export const useFilterStore = defineStore("main", {
   state: () =>  {
       return {
           selectedFunctionsState: [],
           location: {},
           rangeInKm: 5
       }
   },
    getters: {
    },
    actions: {
    }
});