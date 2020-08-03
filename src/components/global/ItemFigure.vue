<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-card
        :to="noRoute ? '' : route"
        :max-width="origWidth * parseFloat(zoomRatio)"
        v-bind="attrs"
        v-on="on"
      >
        <v-img
          :src="src"
          :alt="alt"
          :style="style"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0 align-center justify-center"
            >
              <v-progress-circular
                indeterminate
                color="primary"
              />
            </v-row>
          </template>
          <slot name="inner" />
        </v-img>
        <slot name="under" />
      </v-card>
    </template>
    <span
      v-html="comment"
    />
  </v-tooltip>
</template>

<script>
export default {
  name: 'ItemFigure',
  props: {
    id: {
      type: Number,
      required: true,
    },
    zoomRatio: {
      type: String,
      default: '1'
    },
    noRoute: {
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
  computed: {
    style () {
      return {
        height: `${this.origHeight * parseFloat(this.zoomRatio)}px`,
        width: `${this.origWidth * parseFloat(this.zoomRatio)}px`
      }
    },
    route () {
      return this.id !== 999999 && String(this.id).length !== 5 ? {
        name: 'ItemDetail',
        params: { itemName: this.$store.getters.getEquipmentData(this.id)?.equipment_name }
      } : null
    },
    src () {
      return String(this.id).length === 6 ? 
        `${this.$store.state.CDNBaseURL}/image/equipments/icon_equipment_${this.id}.png` :
        `${this.$store.state.CDNBaseURL}/image/items/icon_item_${this.id}.png`
    },
    alt () {
      return this.id === 999999 ? null : this.$store.getters.getCraftedEquipmentNameByItemId(this.id)
    },
    comment () {
      if (this.id === 999999) {
        return '暂未开放'
      } else if (String(this.id.length) === 5) {
        if (this.id === 91001 || this.id === 91002) {
          return '宝石'
        } else {
          return this.$store.getters.getItemNameById(this.id)
        }
      } else {
        const stats = this.$store.getters.getEquipmentStatsById(this.id, true)
        if (stats === {}) return
        let comment = `${this.$store.getters.getCraftedEquipmentNameByItemId(this.id)}<br>`
        for (const key of Object.keys(stats)) {
          comment += `<br>${key}：${stats[key]} (${stats[key] * 2})`
        }
        return comment
      }
    }
  }
}
</script>
