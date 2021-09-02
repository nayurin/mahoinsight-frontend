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
      <span>MahoMaho INSIGHT!! @ {{ this.$store.state.gitcommit.toUpperCase() }} · </span>
      <span>
        <a
          id="footer-icp"
          target="_blank"
          href="http://beian.miit.gov.cn/"
        >
          浙ICP备20021016号-1
        </a>
      </span>
      <span>·</span>
      <span>
        <a
          id="footer-wangan"
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011802002039"
        >
          <img
            src="/nism-icon.png"
            style="width: 14px; height: 14px;"
          >
          浙公网安备 33011802002039号
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

a#footer-wangan {
  text-decoration: none;
  color: white;
  font-size: 0.75em;
}
</style>
