<template>
  <v-container
    v-if="findPromote.length"
  >
    <v-card-title id="item-requirement">
      角色需求
    </v-card-title>
    <v-row>
      <v-col
        v-for="(promoted, i) in findPromote"
        :key="i"
        class="col-auto pa-0 ma-0"
      >
        <v-card
          v-if="exist(promoted.unitId)"
          class="ma-2"
        >
          <PrincessFigure
            :id="promoted.unitId"
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
  computed: {
    findPromote () {
      return this.$store.getters.getUnitPromotionEX(this.id)
    }    
  },
  methods: {
    rankColor (rank) {
      return this.$store.getters.getRankColor(rank)
    },
    exist (unitId) {
      return this.$store.getters.getUnitData(unitId) ? true : false
    }
  }
}
</script>
