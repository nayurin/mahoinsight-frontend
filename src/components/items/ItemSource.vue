<template>
  <v-container>
    <v-card-title id="item-source">
      主要素材来源
    </v-card-title>
    <v-row
      v-for="(q, i) in findQuest()"
      :key="i"
    >
      <v-col
        v-for="(_q, j) in q.quest"
        :key="j"
        cols="12"
      >
        <QuestReward
          :id="_q.quest_id"
          :target="fragId"
          :link="Boolean(true)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QuestReward from '@/components/quests/QuestReward'

export default {
  name: 'ItemSource',
  components: {
    QuestReward
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    fragId () {
      return this.$store.getters.getEquipmentData(this.id).craft_flg ? this.$store.getters.getEquipmentCraftBy(this.id)[0][0] : this.id
    }
  },
  methods: {
    findQuest () {
      const sorted = this.$store.getters.getEquipmentSource(this.fragId).sort((x, y) => y.odds - x.odds)
      const arrRepeated = []
      let arrFull = []
      for (const reward of sorted) {
        const quests = reward.quest.reduce((t, v) => (t.push(v.quest_id), t), [])
        arrFull = [...arrFull, ...quests]
      }
      arrFull = arrFull.sort((x, y) => x - y)
      for (let i = 0; i < arrFull.length - 1; i++) {
        if (arrFull[i] === arrFull[i + 1]) {
          arrRepeated.push(arrFull[i])
        }
      }
      for (const repeatedQuest of arrRepeated) {
        for (const reward of sorted) {
          if (reward.quest.length === 1) {
            continue
          } else {
            for (let i = reward.quest.length - 1; i >= 0; i--) {
              if (repeatedQuest === reward.quest[i].quest_id) {
                reward.quest.splice(i, 1)
              }
            }
          }
        }
      }
      return sorted
    }
  }
}
</script>
