<template>
  <div class="m-6">
    <PlaygroundSearchComponent></PlaygroundSearchComponent>
    <div class="flex border mt-6">
      <PlaygroundList></PlaygroundList>
      <div class="col-span-2 w-full">
          <MapComponent />
      </div>
    </div>
  </div>
</template>

<script>
import PlaygroundSearchComponent from "@/components/PlaygroundSearchComponent";
import {useFilterStore} from "@/stores/filterStore";
import PlaygroundList from "@/components/PlaygroundList";
import MapComponent from "@/components/GoogleMaps/MapComponent";

let filterStore;

export default {
  components: {
    MapComponent,
    PlaygroundList,
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

  },
  created() {
    this.initPlaygroundFunctions();
  },
  methods: {
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