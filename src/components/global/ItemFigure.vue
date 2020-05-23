<template>
  <div v-if="item.id != 999999">
    <router-link
      :to='link'>
      <span>
        <img
          :src="src"
          :alt="alt"
          class="known-equip"
          :style="style"
        >
      </span>
    </router-link>
  </div>
  <div v-else>
    <span>
      <img
        :src="src"
        :alt="alt"
        class="unknown-equip"
        :style="style"
      >
    </span>
  </div>
</template>

<script>
export default {
  name: 'ItemFigure',
  props: {
    item: {
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
  computed: {
    style () {
      return {
        height: `${this.origHeight * parseFloat(this.zoomRatio)}px`,
        width: `${this.origWidth * parseFloat(this.zoomRatio)}px`
      }
    },
    link () {
      return this.item.id === 999999 ? '.' : `/item/detail/${this.item.detail.equipment_name}`
    },
    src () {
      return `/image/equipments/icon_equipment_${this.item.id}.png`
    },
    alt () {
      return this.item.id === 999999 ? null : this.item.detail.equipment_name
    }
  }
}
</script>
