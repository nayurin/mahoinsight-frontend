<template>
  <v-card
    class="pa-0"
  >
    <v-row
      class="d-flex align-center"
      dense
    >
      <v-chip
        label
        class="ma-4"
        color="primary"
        v-text="name"
      />
      <ItemFigure
        v-for="(value, i) of sortRewards()"
        :id="value.itemid"
        :key="i"
        zoom-ratio="0.5"
      >
        <template v-slot:under>
          <v-card-text
            class="pa-1"
            :class="value.itemid === target ? 'font-weight-black primary--text' : ''"
            align="center"
            v-text="`${value.odds}%`"
          />
        </template>
      </ItemFigure>
    </v-row>
  </v-card>
</template>

<script>
import ItemFigure from '@/components/global/ItemFigure'

export default {
  name: 'QuestReward',
  components: {
    ItemFigure
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    target: {
      type: Number,
      default: 0
    }
  },
  computed: {
    name () {
      return this.$store.getters.getQuestNameById(this.id)
    },
    reward () {
      const arr = []
      this.$store.getters.getQuestRewardById(this.id).map(drop => {
        for (let i = 1; i <= 5; i++) {
          if (drop[`odds_${i}`] && drop[`reward_id_${i}`] && drop[`reward_num_${i}`]) {
            arr.push({
              itemid: drop[`reward_id_${i}`],
              odds: drop[`odds_${i}`]
            })
          }
        }
      })
      return arr
    }
  },
  methods: {
    sortRewards () {
      const arr_0_target = [],
            arr_1_frag = [],
            arr_2_main = [],
            arr_3_other = []
      for (const item of this.reward) {
        if (item.itemid == this.target) {
          arr_0_target.push(item)
          continue
        }
        if (String(item.itemid).length === 5 && String(item.itemid).substring(0, 1) === "3") {
          arr_1_frag.push(item)
          continue
        }
        if (String(item.itemid).length === 5 && String(item.itemid).substring(0, 1) !== "3") {
          arr_3_other.push(item)
          continue
        }
        arr_2_main.push(item)
      }
      return arr_0_target.concat(arr_1_frag).concat(arr_2_main.sort((x, y) => { return y.odds - x.odds })).concat(arr_3_other)
    }
  }
}
</script>
