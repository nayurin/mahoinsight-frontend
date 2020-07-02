<template>
  <v-btn-toggle
    v-model="select"
    multiple
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
</template>

<script>
export default {
  name: 'EquipmentSelector',
  props: {
    princess: {
      type: Object,
      required: true
    },
    from: {
      type: Boolean,
      default: false,
    },
    to: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      select: [0, 1, 2, 3, 4, 5],
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
    rank () {
      if (this.from && !this.to) {
        return this.$store.getters.curRank({ from: true })
      } else if (this.to && !this.from) {
        return this.$store.getters.curRank({ to: true })
      } else {
        return this.$store.getters.curRank({})
      }
    },
    promotion () {
      const promotion = this.princess.promotion_info
      if (!Object.prototype.hasOwnProperty.call(promotion, String(this.rank))) {
        this.$set(promotion, this.rank, this.unknownRank)
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
    rank (cur, prev) {
      if (Number(cur) !== Number(prev)) this.setEquipBtn()
    },
    select (cur, prev) {
      if (JSON.stringify(cur) !== JSON.stringify(prev)) {
        if (this.from && !this.to) {
          this.$store.commit('updateState', { key: 'equipSelectedFrom', value: cur })
        } else if (this.to && !this.from) {
          this.$store.commit('updateState', { key: 'equipSelectedTo', value: cur })
        } else {
          this.$store.commit('updateState', { key: 'equipSelected', value: cur })
        }
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$store.commit('updateState', { key: 'curRank', value: this.$store.state.maxRank })
      this.$store.commit('updateState', { key: 'rankFrom', value: this.$store.state.maxRank })
      this.$store.commit('updateState', { key: 'rankTo', value: this.$store.state.maxRank })
      this.$store.commit('updateState', { key: 'equipSelected', value: this.select })
      this.$store.commit('updateState', { key: 'equipSelectedFrom', value: this.select })
      this.$store.commit('updateState', { key: 'equipSelectedTo', value: this.select })
      this.setEquipBtn()
    },
    setEquipBtn () {
      this.select = [0, 1, 2, 3, 4, 5]
      for (let i = 1; i <= 6; i++) {
        if (this.promotion[String(this.rank)][`equip_slot_${i}`] === 999999) {
          this.$set(this.icons[i - 1], 'disabled', true)
        } else {
          this.$set(this.icons[i - 1], 'disabled', false)
        }
      }
    }
  }
}
</script>