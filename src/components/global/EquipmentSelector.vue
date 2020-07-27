<template>
  <v-row
    no-gutters
  >
    <v-col class="col-auto">
      <v-btn-toggle
        v-model="select"
        multiple
      >
        <v-tooltip
          v-for="(icon, i) in icons"
          :key="i"
          top
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :disabled="icon.disabled"
              small
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>{{ icon.name }}</v-icon>
            </v-btn>
          </template>
          <span
            v-html="comment(i)"
          />
        </v-tooltip>
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'EquipmentSelector',
  props: {
    id: {
      type: Number,
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
        return this.activeProfileChara?.rank ?? this.$store.getters.curRank({ from: true })
      } else if (this.to && !this.from) {
        return this.activeProfileChara?.rank ?? this.$store.getters.curRank({ to: true })
      } else {
        return this.activeProfileChara?.rank ?? this.$store.getters.curRank({})
      }
    },
    promotion () {
      const promotion = this.ngFlag ? this.$store.getters.getUnitPromotionFullNG(this.id) : this.$store.getters.getUnitPromotionFull(this.id)
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
    },
    ngFlag () {
      return this.$store.state.ngFlag
    },
    activeProfileChara () {
      return this.$store.state.profile[this.$store.state.activeProfile]?.princess ? this.$store.state.profile[this.$store.state.activeProfile]?.princess[String(this.id)] : null
    },
    activeProfileEquipSlot () {
      return this.activeProfileChara?.equipment?.filter(x => x !== 999999).map(x => {
        for (let i = 1; i <= 6; i++) {
          if (this.$store.getters.getUnitPromotion(this.id, this.rank)[`equip_slot_${i}`] === Number(x)) {
            return i - 1
          }
        }
      })
    }
  },
  watch: {
    rank (cur, prev) {
      if (Number(cur) !== Number(prev)) {
        this.select = [0, 1, 2, 3, 4, 5]
        this.setEquipBtn()
      }
    },
    select (cur, prev) {
      if (JSON.stringify(cur) !== JSON.stringify(prev)) {
        if (this.from && !this.to) {
          this.$store.commit('updateContext', { key: String(this.id), value: { eFrom: cur }})
        } else if (this.to && !this.from) {
          this.$store.commit('updateContext', { key: String(this.id), value: { eTo: cur }})
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
      this.select = !this.to && this.activeProfileEquipSlot ? this.activeProfileEquipSlot : [0, 1, 2, 3, 4, 5]
      if (this.from && !this.to) {
        this.$store.commit('updateContext', { key: String(this.id), value: {
          eFrom: this.select,
          // rFrom: String(this.$store.state.maxRank)
        }})
      } else if (this.to && !this.from) {
        this.$store.commit('updateContext', { key: String(this.id), value: {
          eTo: this.select,
          // rTo: String(this.$store.state.maxRank)
        }})
      } else {
        if (this.activeProfileChara?.rank) {
          this.$store.commit('updateState', { key: 'curRank', value: this.activeProfileChara.rank })
        } else {
          this.$store.commit('updateState', { key: 'curRank', value: String(this.$store.state.maxRank) })
        }
        this.$store.commit('updateState', { key: 'equipSelected', value: this.select })
      }
      this.setEquipBtn()
    },
    setEquipBtn () {
      this.select = !this.to && this.activeProfileEquipSlot ? this.activeProfileEquipSlot : [0, 1, 2, 3, 4, 5]
      for (let i = 1; i <= 6; i++) {
        if (this.promotion[String(this.rank)][`equip_slot_${i}`] === 999999) {
          this.$set(this.icons[i - 1], 'disabled', true)
        } else {
          this.$set(this.icons[i - 1], 'disabled', false)
        }
      }
    },
    comment (index) {
      const equipid = this.promotion[String(this.rank)][`equip_slot_${index + 1}`]
      const selected = this.select.includes(index) ? "【已装备】" : "【未装备】"
      let comment
      if (!equipid || equipid === 999999) {
        return "暂未开放"
      } else {
        comment = `${this.$store.getters.getEquipmentData(equipid).equipment_name} ${selected}<br>`
        const stats = this.$store.getters.getEquipmentStatsById(equipid)
        for (const statskey of Object.keys(stats)) {
          comment += `<br>${statskey}：${stats[statskey]}`
        }
      }
      return comment
    }
  }
}
</script>
