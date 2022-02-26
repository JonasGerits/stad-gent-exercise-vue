<template>
  <HeaderComponent/>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HeaderComponent from './components/HeaderComponent'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    HeaderComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
