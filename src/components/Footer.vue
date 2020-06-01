<template>
  <v-footer
    absolute
    padless
    dark
    class="font-weight-medium"
  >
    <v-col
      class="text-center"
      cols="12"
    >
      MahoMaho INSIGHT!! @ {{ this.$store.state.gitcommit.toUpperCase() }}
    </v-col>
  </v-footer>
</template>

<script>

</script>
