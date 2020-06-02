<template>
  <v-card
    :href="id != 999999 && String(id).length !== 5 ? link : ''"
    :max-width="origWidth * parseFloat(zoomRatio)"
  >
    <v-img
      :src="src"
      :alt="alt"
      :style="style"
    />
    <slot name="under" />
  </v-card>
</template>

<script>
export default {
  name: 'ItemFigure',
  props: {
    id: {
      type: Number,
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
    style () {
      return {
        height: `${this.origHeight * parseFloat(this.zoomRatio)}px`,
        width: `${this.origWidth * parseFloat(this.zoomRatio)}px`
      }
    },
    link () {
      return this.id === 999999 ? '.' : `/item/detail/${this.$store.getters.getItemNameById(this.id)}`
    },
    src () {
      return String(this.id).length === 6 ? `/image/equipments/icon_equipment_${this.id}.png` : `/image/items/icon_item_${this.id}.png`
    },
    alt () {
      return this.id === 999999 ? null : this.$store.getters.getItemNameById(this.id)
    }
  }
}
</script>
