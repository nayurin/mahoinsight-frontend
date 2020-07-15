<template>
  <v-card>
    <v-card-title id="princess-equipment">
      角色装备 [Rank {{ curRank }}]
      <EquipmentSelector
        :id="id"
        class="ml-8"
      />
    </v-card-title>
    <v-card-text>
      <v-btn
        v-for="(value, key) in promotion"
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
          :equips="promotion[curRank]"
        />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import PrincessEquipmentFig from '@/components/princesses/PrincessEquipmentFig'
import EquipmentSelector from '@/components/global/EquipmentSelector'

export default {
  name: 'PrincessEquipment',
  components: {
    PrincessEquipmentFig,
    EquipmentSelector
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    curRank () {
      return this.$store.getters.curRank({})
    },
    promotion () {
      const promotion = this.$store.getters.getUnitPromotionFull(this.id)
      for (let i = this.curRank; i >= 1; i--) {
        if (!promotion[i]) {
          this.$set(promotion, i, this.unknownRank)
        }
      }
      return promotion
    },
    unknownRank () {
      const promotion = {}
      Array(1, 2, 3, 4, 5, 6).map(x => {
        promotion[`equip_slot_${x}`] = 999999
      })
      return promotion
    }
  },
  methods: {
    onClick (rank) {
      if (parseInt(Number(rank)) > 0 && parseInt(Number(rank)) <= this.$store.state.maxRank) {
        this.$store.commit('updateState', { key: 'curRank', value: parseInt(Number(rank)) })
      }
    }
  }
} 
</script>
