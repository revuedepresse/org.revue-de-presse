<template>
  <highlist-list></highlist-list>
</template>

<script lang="ts">
import Vue from 'vue'
import HighlistList from "../components/highlight-list/highlight-list.vue";
import VueRouter from 'vue-router';
import routes from '../modules/routes';
import {RouterMode} from "vue-router/types/router";

Vue.use(VueRouter);

const mode: RouterMode = 'history'
const routingOptions = {
  routes,
  mode
};

const router = new VueRouter(routingOptions);

export default Vue.extend({
  key(route) {
    return route.fullPath
  },
  components: {HighlistList}
})
</script>

<style>
</style>
