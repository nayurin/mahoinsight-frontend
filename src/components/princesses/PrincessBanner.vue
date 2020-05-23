<template>
  <v-banner
    v-if="intro()"
    elevation=3
    class="pa-3 font-italic font-weight-bold"
    v-html="intro()"
    single-line
  />
</template>

<script>
  export default {
    name: 'PrincessBanner',
    props: {
      princess: {
        type: Object,
        required: true
      }
    },
    methods: {
      intro () {
        return this.princess.profile.self_text.replace(/\\n/g, '')
      }
    }
  }
</script>
