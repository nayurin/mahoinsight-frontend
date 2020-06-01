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
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    fragId () {
      return this.item.detail.craft_flg ? this.item.craft_by[0][0] : this.item.id
    }
  },
  mounted () {
    this.findQuest().sort((x, y) => {
      return y.odds - x.odds
    })
  },
  methods: {
    findQuest () {
      return this.item.detail.craft_flg ? this.$store.getters.getItemById(this.item.craft_by[0][0]).source : this.item.source
    }
  }
}
</script>
