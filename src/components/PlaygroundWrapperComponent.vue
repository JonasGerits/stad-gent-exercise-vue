<template>
  <div class="m-6">
    <PlaygroundSearchComponent></PlaygroundSearchComponent>
    <p v-if="loading">Loading playgrounds...</p>
    <div v-if="loading === false && playgrounds.length > 0" class="flex border mt-6">
      <div class="shadow min-w-fit">
        <div class="p-3 flex font-bold text-xl">
          <p>{{totalPlaygrounds}} resultaten gevonden</p>
        </div>
        <ul class="list-none p-0 overflow-auto playground-list">
          <PlaygroundListItem v-for="playground in playgrounds" :key="playground.record.id" v-bind:record="playground.record"></PlaygroundListItem>
        </ul>
      </div>
      <div class="col-span-2">
          <h1>Dit is wat content</h1>
      </div>
    </div>
    <p v-if="error">Oh no an error occured! :(</p>
  </div>
</template>

<style>
ul.playground-list {
  max-height: calc(100vh - 200px);
}
</style>
<script>
import PlaygroundListItem from "@/components/PlaygroundListItem";
import PlaygroundSearchComponent from "@/components/PlaygroundSearchComponent";
import {useFilterStore} from "@/stores/filterStore";

let filterStore;

export default {
  components: {
    PlaygroundListItem,
    PlaygroundSearchComponent,
  },
  setup() {
    filterStore = useFilterStore();

    return {
      filterStore,
    }
  },
  data() {
    return {
      playgrounds: [],
      totalPlaygrounds: 0,
      functions: [],
      loading: false
    }
  },
  computed: {
    selectedFunctionsStore() {
      return this.filterStore.selectedFunctionsState;
    }
  },
  watch: {
    selectedFunctionsStore: async function () {
      this.loading = true;
      try {
        const res = await fetch(`https://data.stad.gent/api/v2/catalog/datasets/speelterreinen-gent/records?where=functies like "${this.filterStore.selectedFunctionsState.concat(", ")}"`)
        const jsonRes = await res.json();
        this.totalPlaygrounds = jsonRes.total_count;
        this.playgrounds = jsonRes.records;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = 'Error! Could not reach the API. ' + error
      }
    },
  },
  created() {
    this.initPlaygrounds();
    this.initPlaygroundFunctions();
  },
  methods: {
    async initPlaygrounds() {
      this.loading = true;
      try {
        const res = await fetch('https://data.stad.gent/api/v2/catalog/datasets/speelterreinen-gent/records')
        const jsonRes = await res.json();
        this.playgrounds = jsonRes.records;
        this.totalPlaygrounds = jsonRes.total_count;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = 'Error! Could not reach the API. ' + error
      }
    },
    async initPlaygroundFunctions() {
      const res = await fetch('https://data.stad.gent/api/v2/catalog/datasets/speelterreinen-gent/aggregates?select=&group_by=functies');
      await res.json().then(response => {
        let uniqueFunctions = [];
        response.aggregations.map(aggregation => {
          let aggregationFunctions = aggregation.functies.split(',');

          aggregationFunctions.map(playgroundFuntion => {
            let trimmedPlaygroundFunction = playgroundFuntion.trim();

            if (!uniqueFunctions.includes(trimmedPlaygroundFunction)) {
              uniqueFunctions.push(trimmedPlaygroundFunction);
            }
          });
        });

        this.functions = uniqueFunctions;
      });
    }
  }
}
</script>