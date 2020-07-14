<template>
  <v-container
    v-if="findPromote().length"
  >
    <v-card-title id="item-requirement">
      角色需求
    </v-card-title>
    <v-row>
      <v-col
        v-for="(promoted, i) in findPromote()"
        :key="i"
        cols="auto"        
      >
        <v-card>
          <PrincessFigure
            :princess="promoted.unitId"
            zoom-ratio="0.7"
          >
            <template v-slot:add>
              <v-col>
                <v-chip
                  class="ml-1 pa-2"
                  :color="rankColor(promoted.promotionLevel)"
                  label
                  small
                  text-color="white"
                >
                  Rank {{ promoted.promotionLevel }}
                  <v-icon
                    v-if="promoted.amount !== 1"
                    right
                  >
                    mdi-numeric-{{ promoted.amount }}-box-multiple-outline
                  </v-icon>
                </v-chip>
              </v-col>
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
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    findPromote () {
      // const temp = []
      // let ret = []
      // let count = 1
      // for (const chara of Object.keys(this.$store.state.chara)) {
      //   for (const promoteLevel of Object.keys(this.$store.state.chara[chara].promotion_info)) {
      //     for (let i = 1; i <= 6; i++) {
      //       if (this.$store.state.chara[chara].promotion_info[promoteLevel]['equip_slot_' + i] === this.item.id) {
      //         temp.push([chara, promoteLevel])
      //       }
      //     }
      //   }
      // }
      // for (let i = 0; i < temp.length - 1; i++) {
      //   if (JSON.stringify(temp[i]) === JSON.stringify(temp[i + 1])) {
      //     ++count
      //   } else {
      //     ret.push([...temp[i], count])
      //     count = 1
      //   }
      // }
      // temp.length > 0 ? ret.push([...temp.pop(), count]) : ret = []
      // return ret
      return this.$store.getters.getUnitPromotionEX(this.id)
    },
    rankColor (rank) {
      return this.$store.getters.getRankColor(rank)
    }
  }
}
</script>
