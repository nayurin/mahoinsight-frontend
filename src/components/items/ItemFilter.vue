<template>
  <v-row no-gutters>
    <v-col
      v-for="(id, i) of filtedItem"
      :key="i"
      cols="auto"
      class="pa-2"
    >
      <v-card
        outlined
        tile
      >
        <ItemFigure
          :id="id"
          zoom-ratio="0.75"
        >
          <template #under>
            <v-card-text
              class="pa-2 text-caption text-center"
              v-text="$store.getters.getEquipmentData(id).equipment_name"
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
      default: function () {
        return []
      }
    },
    search: {
      type: String,
      default: ''
    }
  },
  computed: {
    filtedItem () {
      let items = JSON.parse(JSON.stringify(this.items))
      this.filter.forEach(cond => {
        items = this.filtedByCondition(items, cond)
      })
      return this.search === '' ? items : items.filter(x => this.$store.getters.getEquipmentData(x).equipment_name.match(this.search))
    },
    items () {
      return this.$store.getters.equipmentIdListEX.map(x => Number(x)).sort((x, y) => y - x)
    }
  },
  methods: {
    filtedByCondition (arr, cond) {
      return arr.filter(x => this.$store.getters.getEquipmentData(x)[cond] && this.$store.getters.getEquipmentData(x)[cond] !== 0 )
    }
  }
}
</script>
