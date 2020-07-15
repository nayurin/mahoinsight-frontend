<template>
  <v-banner
    v-if="intro && intro !== 'test'"
    single-line
    elevation=3
    class="pa-3 font-italic font-weight-bold"
    v-text="intro"
  />
</template>

<script>
  export default {
    name: 'PrincessBanner',
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    computed: {
      intro () {
        return this.$store.getters.getUnitProfile(this.id).self_text.replace(/\\n/g, '')
      }
    }
  }
</script>
