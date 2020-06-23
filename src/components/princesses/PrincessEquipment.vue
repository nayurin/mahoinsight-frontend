<template>
  <v-card>
    <v-card-title id="princess-equipment">
      角色装备 [Rank {{ curRank }}]
      <v-btn-toggle
        v-model="equipSelected"
        multiple
        class="ml-8"
      >
        <v-btn
          v-for="(icon, i) in icons"
          :key="i"
          :disabled="icon.disabled"
          small
        >
          <v-icon>{{ icon.name }}</v-icon>
        </v-btn>
      </v-btn-toggle>
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
  data () {
    return {
      equipSelected: [0, 1, 2, 3, 4, 5],
      icons: [
        {
          name: 'mdi-arrow-top-left-thick',
          disabled: false
        },
        {
          name: 'mdi-arrow-top-right-thick',
          disabled: false
        },
        {
          name: 'mdi-arrow-left-thick',
          disabled: false
        },
        {
          name: 'mdi-arrow-right-thick',
          disabled: false
        },
        {
          name: 'mdi-arrow-bottom-left-thick',
          disabled: false
        },
        {
          name: 'mdi-arrow-bottom-right-thick',
          disabled: false
        }
      ]
    }
  },
  computed: {
    curRank () {
      return this.$store.getters.curRank
    },
    promotion () {
      const promotion = this.princess.promotion_info
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
  watch: {
    curRank () {
      this.setEquipBtn()
    },
    equipSelected (val) {
      this.$store.commit('updateState', { key: 'equipSelected', value: val.map(x => this.promotion[this.$store.getters.curRank][`equip_slot_${x + 1}`]) })
    }
  },
  mounted () {
    this.setEquipBtn()
    this.$store.commit('updateState', { key: 'equipSelected', value: this.equipSelected.map(x => this.promotion[this.$store.getters.curRank][`equip_slot_${x + 1}`]) })
  },
  methods: {
    onClick (rank) {
      if (parseInt(Number(rank)) > 0 && parseInt(Number(rank)) <= this.$store.state.maxRank) {
        this.$store.commit('updateState', { key: 'curRank', value: parseInt(Number(rank)) })
      }
    },
    setEquipBtn () {
      this.equipSelected = [0, 1, 2, 3, 4, 5]
      for (let i = 1; i <= 6; i++) {
        if (this.promotion[this.$store.getters.curRank][`equip_slot_${i}`] === 999999) {
          this.$set(this.icons[i - 1], 'disabled', true)
        } else {
          this.$set(this.icons[i - 1], 'disabled', false)
        }
      }
    }
  }
}
</script>
