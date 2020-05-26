<template>
  <v-container>
    <v-card>
      <v-card-title>合成所需的素材</v-card-title>
      <v-row
        class="ml-4"
      >
        <ItemFigure
          v-for="i in craftBy"
          :key="i[0]"
          :item="findItem(i[0])"
          zoomRatio=0.625
          class="mr-2 mb-4"
        >
          <template v-slot:under>
            <v-card-text
              class="pa-1"
              align="center"
              v-text="`×${i[1]}`"
            ></v-card-text>
          </template>
        </ItemFigure>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import ItemFigure from '@/components/global/ItemFigure'
export default {
  name: 'ItemCraft',
  components: {
    ItemFigure
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    craftBy () {
      const craft_by = this._craft(this.item.craft_by).flat(Infinity)
      const ret = []
      for (let i = 0; i < craft_by.length; i = i + 2) {
        ret.push([craft_by[i], craft_by[i + 1]])
      }
      return ret
    }
  },
  methods: {
    isCraft (id) {
      return this.findItem(id).detail.craft_flg === 1 ? true : false 
    },
    _craft (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (this.isCraft(arr[i][0])) {
          arr[i] = this._craft(this.findItem(arr[i][0]).craft_by)
        }
      }
      return arr
    },
    findQuest () {
      return !this.craftBy() ? this.item.source : this.findItem(this.craftBy()[0][0]).source
    },
    findItem (id) {
      return this.$store.getters.getItemById(id)
    }
  }
}
</script>
