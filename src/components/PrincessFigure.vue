<template>
  <router-link :to='link()'>
    <span>
      <img
        :src="src()"
        :alt="princessName()"
        class=""
        :style="style()"
      >
      <p
        v-text="princessName()"
      ></p>
    </span>
  </router-link>
</template>

<script>
export default {
  name: 'PrincessFigure',
  props: {
    princess: {
      type: Object,
      required: true
    },
    zoomRatio: {
      type: String,
      default: '1'
    },
    enableHover: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      origHeight: 128,
      origWidth: 128
    }
  },
  methods: {
    princessName () {
      return this.princess.status.unit_name
    },
    princessId () {
      return this.princess.id
    },
    link () {
      return `/princess/detail/${this.princessName()}`
    },
    src () {
      return `/image/character_favicons/fav_push_notif_${this.princessId()}.png`
    },
    style () {
      return {
        height: `${this.origHeight * parseFloat(this.zoomRatio)}px`,
        width: `${this.origWidth * parseFloat(this.zoomRatio)}px`
      }
    }
  }
}
</script>

<style scoped>

</style>
