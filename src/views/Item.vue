<template>
  <v-container fluid>
    <v-card-title>装备列表</v-card-title>
    <v-row>
      <v-col
        cols="auto"
        v-for="(value, key) of items()"
        :key="key"
        class="pa-1"
      >
        <v-card
          class="ma-1"
          outlined
          tile
          max-width=96
        >
          <ItemFigure
            :id="value.id"
            zoomRatio="0.75"
          >
            <template v-slot:under>
              <v-card-text
                v-text="value.detail.equipment_name"
                class="pa-2 caption text-center"
              />
            </template>
          </ItemFigure>
        </v-card>
      </v-col>
    </v-row>
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
    items () {
      const _item = {}
      Object.values(this.$store.state.item).map(x=>{
        if (x.id.toString().split('')[1] === '0' || x.id === 140000) {
          _item[x.detail.equipment_name] = x
        }
      })
      return _item
    }
  }
}
</script>

<style scoped>

</style>
