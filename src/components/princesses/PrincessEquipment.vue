<template>
  <v-card>
    <v-card-title id="princess-equipment">
      角色装备 [Rank {{ curRank }}]
    </v-card-title>
    <v-card-text>
      <v-btn
        v-for="(value, key) in promotion()"
        :key="key"
        text
        small
        color="primary"
        @click="onClick(key)"
      >
        Rank {{ key }}
      </v-btn>
      <v-row>
        <PrincessEquipmentFig
          :equips="promotion()[curRank]"
        />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import PrincessEquipmentFig from '@/components/princesses/PrincessEquipmentFig'

export default {
  name: 'PrincessEquipment',
  components: {
    PrincessEquipmentFig
  },
  props: {
    princess: {
      type: Object,
      required: true
    }
  },
  computed: {
    curRank () {
      return this.$store.getters.curRank
    }
  },
  methods: {
    onClick (rank) {
      this.$store.commit('updateCurrentRank', rank)
    },
    promotion() {
      return this.princess.promotion_info
    },
  }
}
</script>
