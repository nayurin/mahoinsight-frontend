<template>
  <div class="equip-main">
    <div class="equip-1st">
      <ItemFigure
        :item="findItem(this.equips.equip_slot_1)"
        zoomRatio="0.625"
      />
    </div>
    <div class="equip-2nd">
      <ItemFigure
        :item="findItem(this.equips.equip_slot_2)"
        zoomRatio="0.625"
      />
    </div>
    <div class="equip-3rd">
      <ItemFigure
        :item="findItem(this.equips.equip_slot_3)"
        zoomRatio="0.625"
      />
    </div>
    <div class="equip-4th">
      <ItemFigure
        :item="findItem(this.equips.equip_slot_4)"
        zoomRatio="0.625"
      />
    </div>
    <div class="equip-5th">
      <ItemFigure
        :item="findItem(this.equips.equip_slot_5)"
        zoomRatio="0.625"
      />
    </div>
    <div class="equip-6th">
      <ItemFigure
        :item="findItem(this.equips.equip_slot_6)"
        zoomRatio="0.625"
      />
    </div>
  </div>
</template>

<script>
import ItemFigure from '@/components/ItemFigure'

export default {
  name: 'PrincessFigure',
  components: {
    ItemFigure
  },
  props: {
    equips: {
      type: Object,
      required: true
    }
  },
  methods: {
    findItem (id) {
      for (const item of Object.values(this.$store.state.item)) {
        if (item.id === id) {
          return item
        }
      }
      return { id: id }
    }
  },
  created () {
    if (!Object.keys(this.$store.state.item).length) {
      this.$store.commit('loadObjects', 'item')
    }
  }
}
</script>

<style scoped>
  .equip-main {
    position: relative;
    background-image: url(/image/bg/bg_530011_front.png);
    background-size: cover;
    background-repeat: no-repeat;
    width: 512px;
    height: 512px;
  }

  .equip-1st {
    position: absolute;
    z-index: 10;
    left: 100px;
    top: 80px;
    display: inline-block;
  }

  .equip-2nd {
    position: absolute;
    z-index: 10;
    right: 100px;
    top: 80px;
    display: inline-block;
  }

  .equip-3rd {
    position: absolute;
    z-index: 10;
    left: 40px;
    top: 215px;
    display: inline-block;
  }

  .equip-4th {
    position: absolute;
    z-index: 10;
    right: 40px;
    top: 215px;
    display: inline-block;
  }

  .equip-5th {
    position: absolute;
    z-index: 10;
    left: 100px;
    bottom: 80px;
    display: inline-block;
  }

  .equip-6th {
    position: absolute;
    z-index: 10;
    right: 100px;
    bottom: 80px;
    display: inline-block;
  }
</style>
