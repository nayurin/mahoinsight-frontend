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
      let questName
      for (const diff of Object.values(this.$store.getters.getQuestDataByDiff)) {
        const quest = diff.filter(x => x.quest_id === this.id)
        if (quest.length) {
          questName = quest[0].quest_name 
        } else {
          continue
        }
      }
      return questName
    },
    reward () {
      return this.$store.getters.getQuestRewardById(this.id)
    }
  },
  methods: {
    sortRewards () {
      const arr_0_target = [],
            arr_1_frag = [],
            arr_2_main = [],
            arr_3_other = []
      for (const itemgroup of this.reward) {
        for (const item of itemgroup) {
          if (!item.itemid) continue
          if (item.itemid === this.target) {
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
      }
      return arr_0_target.concat(arr_1_frag).concat(arr_2_main.sort((x, y) => { return y.odds - x.odds })).concat(arr_3_other)
    }
  }
}
</script>
