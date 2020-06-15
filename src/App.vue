<template>
  <v-app>
    <v-app-bar
      app
      dark
      color="primary"
      clipped-left
    >
      <v-app-bar-nav-icon @click="nav = !nav" />
      <v-img
        :src="`${$store.state.CDNBaseURL}/image/bg/favicon.png`"
        contain
        max-width="48"
      />
      <Breadcrumbs />
    </v-app-bar>
    <v-card
      class="overflow-hidden"
    >
      <v-navigation-drawer
        v-model="nav"
        app
        clipped
      >
        <Navigator
          v-for="route in routes"
          :key="route.name"
          :route="route"
        />
      </v-navigation-drawer>
    </v-card>
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <Footer />
    <Button2Top />
  </v-app>
</template>

<script>
import Navigator from '@/components/Navigator'
import Breadcrumbs from '@/components/Breadcrumbs'
import Footer from '@/components/Footer'
import Button2Top from '@/components/Button2Top'

export default {
  name: 'App',

  components: {
    Navigator,
    Breadcrumbs,
    Footer,
    Button2Top
  },

  data: () => ({
    routes: [],
    nav: false
  }),
  created () {
    this.routes = this.$router.options.routes.filter(x => !x.meta || !x.meta.hidden);
    this.$store.commit('loadObjects', 'chara')
    this.$store.commit('loadObjects', 'item')
    this.$store.commit('loadObjects', 'quest')
    this.$store.commit('loadObjects', 'events')
    this.$store.commit('loadGitCommit', GIT_COMMIT.trim())
    if (/Android|webOS|iPhone|iPod|BlackBerry|MuMu/i.test(navigator.userAgent)) this.$store.commit('change2MobileMode')
    this.nav = !this.$store.state.mobile
  }
}
</script>
