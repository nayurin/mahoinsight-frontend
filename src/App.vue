<template>
  <v-app>
    <!-- <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar> -->
    <v-card
      class="overflow-hidden"
    >
      <v-navigation-drawer
        app
      >
        <Navigation
          v-for="route in routes"
          :key="route.name"
          :route="route"
        />
      </v-navigation-drawer>
    </v-card>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation';

export default {
  name: 'App',

  components: {
    Navigation
  },

  data: () => ({
    routes: []
  }),
  created () {
    // this.routes = this.$router.options.routes.filter(el => !el.meta.hide);
    this.routes = this.$router.options.routes;
    // console.log(this.routes)
    // this.$store.dispatch("data/fetch", false);
    this.$store.commit('loadObjects', 'chara')
    this.$store.commit('loadObjects', 'item')
    this.$store.commit('loadObjects', 'quest')
  }
};
</script>
