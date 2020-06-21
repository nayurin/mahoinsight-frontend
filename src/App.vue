<template>
  <v-app>
    <v-app-bar
      app
      light
      clipped-left
      class="app-header"
    >
      <v-app-bar-nav-icon color="secondary" @click="nav = !nav" />
      <v-img
        :src="`${$store.state.CDNBaseURL}/image/bg/favicon.png`"
        contain
        max-width="48"
      />
      <Breadcrumbs light />
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
    <v-main>
      <v-container
        v-if='loaded'
        fluid
      >
        <router-view />
      </v-container>
    </v-main>
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
  computed: {
    loaded () {
      return this.$store.state.loaded
    }
  },
  created () {
    this.routes = this.$router.options.routes.filter(x => !x.meta || !x.meta.hidden);
    this.$store.dispatch('loadAll')
    this.$store.commit('updateState', { key: 'gitcommit', value: GIT_COMMIT.trim() })
    if (/Android|webOS|iPhone|iPod|BlackBerry|MuMu/i.test(navigator.userAgent)) this.$store.commit('updateState', { key: 'mobile', value: true })
    this.nav = !this.$store.state.mobile
  }
}
</script>
<style lang="scss">
  .v-main {
    background-image:url("https://static.biligame.com/pcr/gw/pc/images/p5/bg.jpg?85b29228");
  }
  .v-navigation-drawer {
    background-color: rgba(255,255,255,0.8) !important;
  }
  .app-header {
    background-color: rgba(255,255,255,0.8) !important;
    .v-toolbar__content {
      background-image: url('../public/image/common/AtlasTitle.png');
      background-size: 300px 300px;
      background-repeat: no-repeat;
      background-position: 0 500px;
    }
  }
</style>
