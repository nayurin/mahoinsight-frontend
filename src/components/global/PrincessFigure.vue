<template>
  <v-card
    :href="link"
  >
    <v-img
      :src="src"
      :alt="princessName"
      :style="style"
    />
    <v-row
      class="d-flex justify-center align-center"
    >
      <v-chip
        v-text="princessName"
        label
        color="white"
        class="pa-0"
      />
      <slot name="add" />
    </v-row>
  </v-card>
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
    }
  },
  data () {
    return {
      origHeight: 180,
      origWidth: 180
    }
  },
  computed: {
    princessName () {
      return this.princess.status.unit_name
    },
    princessId () {
      return this.princess.id
    },
    link () {
      return `/princess/detail/${this.princessName}`
    },
    src () {
      return `/image/character_favicons/fav_push_notif_${this.princessId}.png`
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
