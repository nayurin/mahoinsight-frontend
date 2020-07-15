<template>
  <v-col
    align-self="center"
    cols="auto"
    class="pa-0"
  >
    <v-row 
      no-gutters
    >
      <slot name="beforeImage" />
      <v-img
        contain
        :src="src"
        :style="style"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0 align-center justify-center"
          >
            <v-progress-circular
              indeterminate
              color="cyan"
            />
          </v-row>
        </template>
      </v-img>
      <slot name="afterImage" />
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'SkillFigure',
  props: {
    figure: {
      type: String,
      required: true
    },
    zoomRatio: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      origHeight: 128,
      origWidth: 128
    }
  },
  computed: {
    src () {
      return `${this.$store.state.CDNBaseURL}/image/skills/icon_skill_${this.figure}.png`
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
