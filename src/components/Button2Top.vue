<template>
  <v-btn
    v-if="show"
    bottom
    right
    dark
    fab
    fixed
    color="blue darken-2"
    @click="onClick()"
  >
    <v-icon>mdi-chevron-up</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'Button2Top',
  data () {
    return {
      show: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.showButton)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.showButton)
  },
  methods: {
    onClick () {
      const timer = setInterval(() => {
        const top = document.documentElement.scrollTop
        const speed = Math.ceil(top / 5)
        document.documentElement.scrollTop = top - speed
        if (top === 0) {
          clearInterval(timer)
        }
      }, 20)
    },
    showButton () {
      this.show = document.documentElement.scrollTop > 300 ? true : false
    }
  }
}
</script>
