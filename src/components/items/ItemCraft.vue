<template>
  <v-container class="pa-0">
    <v-card v-if="needCraft(id)">
      <v-card-title
        id="item-craft"
      >
        合成所需的素材
      </v-card-title>
      <v-row
        no-gutters
        class="ml-4 pb-4"
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
    <v-card v-if="!needCraft(id)">
      <v-card-title
        id="item-craft"
      >
        能够合成的装备
      </v-card-title>
      <v-row
        no-gutters
        class="ml-4 pb-4"
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
              >
                <span>{{ $store.getters.getEquipmentData(id).equipment_name }}</span>
                <br>
                <span>Rank </span>
                <span class="font-weight-bold">{{ equipmentPromotionLevel(id) }}</span>
              </v-card-text>
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
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    craftBy () {
      const by = this._craft(this.findCraft(this.id)).flat(Infinity)
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
      for (const itemid of Object.keys(this.$store.state.database['master'].equipment_data).filter(x => x[1] === '0')) {
        if (
          this._craft(this.findCraft(itemid))
            .flat(Infinity)
            .filter(x => String(x).length === 6)
            .includes(this.id)
        ) {
          to.push(Number(itemid))
        }
      }
      return to
    }
  },
  methods: {
    needCraft (id) {
      return this.findEquipment(id)?.craft_flg === 1
    },
    _craft (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (this.needCraft(arr[i][0])) {
          arr[i] = this._craft(this.findCraft(arr[i][0]))
        }
      }
      return arr
    },
    findEquipment (id) {
      return this.$store.getters.getEquipmentData(id)
    },
    findCraft (id) {
      return this.$store.getters.getEquipmentCraftBy(id)
    },
    equipmentPromotionLevel (id) {
      const level = Object.values(this.$store.getters.getUnitPromotionEX(id, true)).reduce((t, v) => {
        if (!t) {
          return v.promotionLevel
        } else {
          return t - v.promotionLevel > 0 ? v.promotionLevel : t
        }
      }, 0)
      return this.$store.getters.get1stEquipmentList(true).includes(id) ? level + 1 : level
    }
  }
}
</script>
