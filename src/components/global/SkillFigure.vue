<template>
  <v-col
    align-self="center"
    cols="auto"
    class="pa-0"
  >
    <v-row 
      no-gutters
    >
      <slot name="beforeImage"/>
      <v-img
        contain
        :src="src()"
        :style="style()"
      />
      <slot name="afterImage"/>
    </v-row>
  </v-col>
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
