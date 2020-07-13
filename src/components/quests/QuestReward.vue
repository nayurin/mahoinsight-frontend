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
        :link="link"
        :to="link ? {'path': '/quest', 'query': {'questid': id}} : ''"
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
    },
    link: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    name () {
      return this.$store.getters.getQuestData(this.id).quest_name
    },
    reward () {
      const rewards = []
      const waves = [
        this.$store.getters.getQuestData(this.id)?.wave_group_id_1,
        this.$store.getters.getQuestData(this.id)?.wave_group_id_2,
        this.$store.getters.getQuestData(this.id)?.wave_group_id_3
      ]
      for (const wavegroupid of waves) {
        for (const wave of this.$store.getters.getWaveGroupData(wavegroupid)) {
          [
            wave.drop_reward_id_1,
            wave.drop_reward_id_2,
            wave.drop_reward_id_3,
            wave.drop_reward_id_4,
            wave.drop_reward_id_5,
          ]
            .filter(x => x)
            .map(x => {
            const reward = this.$store.getters.getEnemyRewardData(x)
            for (let i = 1; i <= 5; i++) {
              if (reward[`reward_id_${i}`]){
                rewards.push({
                  itemid: reward[`reward_id_${i}`],
                  odds: reward[`odds_${i}`] * wave.odds / 100
                })
              }
            }
          })
        }
      }
      return rewards
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
