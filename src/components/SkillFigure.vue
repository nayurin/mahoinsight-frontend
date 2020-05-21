<template>
  <span>
    <img
      :src="src()"
      class=""
      :style="style()"
    >
    <!-- <p
      v-text="princessName()"
    ></p> -->
  </span>
</template>

<script>
export default {
  name: 'PrincessFigure',
  props: {
    id: {
      type: String,
      required: true
    },
    zoomRatio: {
      type: String,
      default: '1'
    },
    enableHover: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      origHeight: 128,
      origWidth: 128
    }
  },
  methods: {
    src () {
      return `/image/skills/icon_skill_${this.id}.png`
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

<style>

</style>
