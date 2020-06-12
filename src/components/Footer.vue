<template>
  <v-footer
    v-if="!$store.state.mobile"
    app
    padless
    dark
    color="pink darken-1"
    class="font-weight-medium"
  >
    <v-col
      class="text-center col-12"
    >
      MahoMaho INSIGHT!! @ {{ this.$store.state.gitcommit.toUpperCase() }}
      <br>
      <span>
        <a
          id="footer-icp"
          href="http://www.beian.miit.gov.cn/"
        >
          浙ICP备20021016号
        </a>
      </span>
    </v-col>
  </v-footer>
</template>

<style scoped>
a#footer-icp {
  text-decoration: none;
  color: white;
  font-size: 0.75em;
}
</style>
