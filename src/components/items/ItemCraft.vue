<template>
  <v-container class="pa-0">
    <v-card v-if="isCraft(item.id)">
      <v-card-title
        id="item-craft"
        v-text="`合成所需的素材`"
      />
      <v-row
        no-gutters
        class="ml-4"
      >
        <ItemFigure
          v-for="i in craftBy"
          :id="i[0]"
          :key="i[0]"
          zoom-ratio="0.625"
          class="mr-2 mb-4"
        >
          <template v-slot:under>
            <v-card-text
              class="pa-1"
              align="center"
              v-text="`×${i[1]}`"
            />
          </template>
        </ItemFigure>
      </v-row>
    </v-card>
    <v-card v-if="!isCraft(item.id)">
      <v-card-title
        id="item-craft"
        v-text="`能够合成的装备`"
      />
      <v-row
        no-gutters
        class="ml-4"
      >
        <v-col
          v-for="id in craftTo"
          :key="id"
          cols="auto"
        >
          <ItemFigure
            :id="id"
            zoom-ratio="0.625"
            class="mr-2 mb-4"
          >
            <template v-slot:under>
              <v-card-text
                class="pa-2 caption text-center"
                v-text="$store.getters.getItemNameById(id)"
              />
            </template>
          </ItemFigure>
        </v-col>
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
      const by = this._craft(this.item.craft_by).flat(Infinity)
      const item = [], amount = [], combined = []
      for (let i = 0; i < by.length; i = i + 2) {
        if (item.indexOf(by[i]) !== -1) {
          amount[item.indexOf(by[i])] += by[i + 1]
        } else {
          item.push(by[i])
          amount.push(by[i + 1])
        }
      }
      for (let i = 0; i < item.length; i++) {
        combined.push([item[i], amount[i]])
      }
      return combined
    },
    craftTo () {
      const to = []
      for (const item of Object.values(this.$store.state.item)) {
        if (this.isCraft(item.id) && this._craft(this.findItem(item.id).craft_by).flat(Infinity).includes(this.item.id)) {
          to.push(item.id)
        }
      }
      return to
    }
  },
  methods: {
    isCraft (id) {
      return this.findItem(id) && this.findItem(id).detail.craft_flg === 1 ? true : false 
    },
    _craft (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (this.isCraft(arr[i][0])) {
          arr[i] = this._craft(this.findItem(arr[i][0]).craft_by)
        }
      }
      return arr
    },
    findItem (id) {
      return this.$store.getters.getItemById(id)
    }
  }
}
</script>
