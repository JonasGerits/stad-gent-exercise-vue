<template>
  <div class="m-6">
    <PlaygroundSearchComponent></PlaygroundSearchComponent>
    <p v-if="loading">Loading playgrounds...</p>
    <div v-if="loading === false && playgrounds.length > 0" class="flex border mt-6">
      <div class="shadow min-w-fit">
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

export default {
  components: {
    PlaygroundListItem,
    PlaygroundSearchComponent,
  },
  data() {
    return {
      playgrounds: [],
      functions: [],
      loading: false
    }
  },
  watch: {},
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
        this.loading = false;
        console.log(jsonRes);
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