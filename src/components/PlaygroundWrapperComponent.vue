<template>
 <p v-if="loading">Loading playgrounds...</p>
  <div v-if="loading === false && playgrounds.length > 0">
    <ul class="list-none p-0" v-for="playground in playgrounds" :key="playground.record.id">
      <PlayGroundListItem v-bind:record="playground.record"></PlayGroundListItem>
    </ul>
  </div>
 <p v-if="error">Oh no an error occured! :(</p>
</template>

<script>
import PlayGroundListItem from "@/components/PlaygroundListItem";

export default {
  components: {
    PlayGroundListItem
  },
  data() {
    return {
      playgrounds: [],
      loading: false
    }
  },
  watch: {
  },
  created() {
    this.initPlaygrounds()
  },
  methods: {
    async initPlaygrounds() {
      this.loading = true;
      try {
        const res = await fetch('https://data.stad.gent/api/v2/catalog/datasets/speelterreinen-gent/records')
        const jsonRes = await res.json();
        this.playgrounds = jsonRes.records;
        this.loading = false;
        console.log(jsonRes.records);
      } catch (error) {
        this.loading = false;
        this.error = 'Error! Could not reach the API. ' + error
      }
    }
  }
}
</script>