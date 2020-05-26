<template>
  <v-container>
    <v-card-title>主要素材来源</v-card-title>
    <v-row>
      <v-col>
        <v-card
          v-for="(q, i) in findQuest()"
          :key="i"
        >
          <v-card-text
            v-for="(_q, j) in q.quest"
            :key="j"
          >
            {{ q.odds }} - {{_q.quest_name}}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ItemSource',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    findQuest () {
      return this.item.detail.craft_flg ? this.$store.getters.getItemById(this.item.craft_by[0][0]).source : this.item.source
    }
  },
  mounted () {
    console.log(this.findQuest())
  }
}
</script>
