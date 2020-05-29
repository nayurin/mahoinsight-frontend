<template>
  <v-row>
    <v-col
      cols="auto"
      v-for="(value, key) of filtedItem"
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
</template>

<script>
import ItemFigure from '@/components/global/ItemFigure'

export default {
  name: 'ItemFilter',
  components: {
    ItemFigure
  },
  props: {
    filter: {
      type: Array,
      required: true
    }
  },
  computed: {
    filtedItem () {
      let res = this.items
      this.filter.forEach(cond => {
        res = this.filtedByCondition(res, cond)
      })
      return res
    },
    items () {
      const _item = []
      Object.values(this.$store.state.item).map(x=>{
        if (x.id.toString().split('')[1] === '0' || x.id === 140000) {
          _item.push(x)
        }
      })
      return _item.reverse()
    }
  },
  methods: {
    filtedByCondition (obj, cond) {
      return Object.values(obj).filter(x => {
        return x.detail[cond] !== 0
      })
    }
  }
}
</script>
