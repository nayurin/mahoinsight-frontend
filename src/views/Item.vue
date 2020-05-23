<template>
  <v-container>
    <div class="item-main">
      <div>
        <h3>装备列表</h3>
        <div>
          <ItemFigure
            v-for='item of Object.values(this.$store.state.item)'
            :key='item.id'
            :item='item'
            zoomRatio='0.7'
          />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import ItemFigure from '@/components/global/ItemFigure'

export default {
  name: 'Item',
  components: {
    ItemFigure
  },
  computed: {
  },
  methods: {
  },
  created () {
    if (!Object.keys(this.$store.state.item).length) {
      this.$store.commit('loadObjects', 'item')
    }
  }
}
</script>

<style scoped>

</style>
