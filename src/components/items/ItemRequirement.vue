<template>
  <v-container
    v-if="findPromote().length"
  >
    <v-card-title>角色需求</v-card-title>
    <v-row>
      <v-col
        cols="auto"
        v-for="(value, key) in findPromote()"
        :key="key"
      >
        <v-card>
          <PrincessFigure
            :princess="$store.getters.getPrincessByName(value[0])"
            zoomRatio="0.7"
          >
            <template v-slot:add>
              <v-chip
                class="ml-1 pa-2"
                :color="rankColor(value[1])"
                label
                small
                text-color="white"
              >
                Rank {{ value[1] }}
                <v-icon
                  v-if="value[2] != 1"
                  right
                >mdi-numeric-{{ value[2] }}-box-multiple-outline</v-icon>
              </v-chip>
            </template>
          </PrincessFigure>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PrincessFigure from '@/components/global/PrincessFigure'

export default {
  name: 'ItemRequirement',
  components: {
    PrincessFigure
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    findPromote () {
      const temp = []
      let ret = []
      let count = 1
      for (const chara of Object.keys(this.$store.state.chara)) {
        for (const promoteLevel of Object.keys(this.$store.state.chara[chara].promotion_info)) {
          for (let i = 1; i <= 6; i++) {
            if (this.$store.state.chara[chara].promotion_info[promoteLevel]['equip_slot_' + i] === this.item.id) {
              temp.push([chara, promoteLevel])
            }
          }
        }
      }
      for (let i = 0; i < temp.length - 1; i++) {
        if (JSON.stringify(temp[i]) === JSON.stringify(temp[i + 1])) {
          ++count
        } else {
          ret.push([...temp[i], count])
          count = 1
        }
      }
      temp.length > 0 ? ret.push([...temp.pop(), count]) : ret = []
      return ret
    },
    rankColor (rank) {
      return this.$store.getters.getRankColor(rank)
    }
  }
}
</script>
