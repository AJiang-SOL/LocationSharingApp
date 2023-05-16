<template>
<div class="columns is-mobile is-centered">
  <div class=" box column is-half">
    <userform></userform>
  </div>
</div>
<googleMap></googleMap>
</template>

<script>
/* eslint-disable */
import userform from './components/userForm.vue'
import googleMap from './components/googleMap.vue'
import '@oruga-ui/theme-bulma/dist/bulma.css'
import '@oruga-ui/oruga-next/dist/oruga-full-vars.css'
export default {
  name: 'App',
  components:{
    userform,
    googleMap,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
