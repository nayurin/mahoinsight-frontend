<template>
  <v-card>
    <v-row>
      <v-col class="px-3 py-0">
        <v-card-title id="princess-ue">
          {{ ueName }}
        </v-card-title>
        <v-card-subtitle>专用装备</v-card-subtitle>
        <v-card-text
          class="pb-1"
          v-text="ueDesc"
        />
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col class="col-auto">
        <v-text-field
          v-model="level"
          label="装备等级"
          :rules="rules"
          hide-details="auto"
          class="pa-4"
        />
      </v-col>
    </v-row>

    <v-row
      no-gutters
      class="pa-3"
    >
      <v-col
        v-for="(value, key) in stats"
        :key="key"
        class="col-auto mx-1"
      >
        <v-btn
          small
          color="primary"
          v-text="key"
        />
        <v-btn
          text
          small
          right
          v-text="value[0]"
        />
        <v-icon>mdi-chevron-double-right</v-icon>
        <v-btn
          text
          small
          right
          v-text="`${value[1]} (+${value[1] - value[0]})`"
        />
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="pa-3"
    >
      <v-col
        class="col-auto mx-1 d-flex align-center"
      >
        <span class="font-weight-light mr-2 text-center">共计消耗</span>
        <v-img
          :src="ueCost(level).mana.src"
          max-width="28"
          max-height="28"
        />
        <v-btn
          text
          small
          v-text="ueCost(level).mana.amount"
        />
      </v-col>
      <v-col
        v-for="item in ['memorypiece', 'heartpiece', 'heart']"
        :key="item"
        class="col-auto mx-1 d-flex align-center"
      >
        <v-img
          :src=ueCost(level)[item].src
          max-width="40"
          max-height="40"
        />
        <v-btn
          text
          small
          v-text="ueCost(level)[item].amount"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'PrincessUniqueEquipment',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      level: 30,
      rules: [
        value => !!value || '不能为空',
        value => !isNaN(Number(value)) && parseInt(Number(value)) >= 1 && parseInt(Number(value)) <= this.maxLevel && Number(value) === parseInt(Number(value)) || `等级只能为 [ 1, ${this.maxLevel} ] 的正整数`,
      ],
      statsMap: {
        hp: '生命值',
        atk: '物理攻击力',
        def: '物理防御力',
        magic_str: '魔法攻击力',
        magic_def: '魔法防御力',
        physical_critical: '物理暴击',
        magic_critical: '魔法暴击',
        wave_hp_recovery: '生命值自动回复',
        wave_energy_recovery: '技能值自动回复',
        dodge: '回避',
        accuracy: '命中',
        physical_penetrate: '物理穿透',
        magic_penetrate: '魔法穿透',
        hp_recovery_rate: '回复量上升',
        energy_recovery_rate: '技能值上升',
        life_steal: '生命值吸收',
        energy_reduce_rate: '技能值消耗降低'
      },
      stats: {}
    }
},
  computed: {
    ueName () {
      return this.$store.getters.getUniqueEquipmentData(this.ueId).equipment_name
    },
    ueDesc () {
      return this.$store.getters.getUniqueEquipmentData(this.ueId).description.replace(/\\n/g, '')
    },
    ueId () {
      const base = (this.id - this.id % 100) / 100
      const tail = base % 1000
      return 130000 + tail * 10 + 1
    },
    maxLevel () {
      return this.$store.state.maxUELevel
    }
  },
  watch: {
    level (val) {
      let error = false
      for (const rule of this.rules) {
        if (rule(val) !== true) {
          error = true
          break
        }
      }
      error ? this.ueStat(NaN) : this.ueStat(val)
    }
  },
  created () {
    this.ueStat(this.level)
  },
  methods: {
    ueStat (level) {
      const data = {}
      for (const type of Object.keys(this.statsMap)) {
        if (!this.$store.getters.getUniqueEquipmentData(this.ueId)[type] && !this.$store.getters.getUniqueEquipmentEnhanceRate(this.ueId)[type]) {
          continue
        } else {
          const baseval = this.$store.getters.getUniqueEquipmentData(this.ueId)[type]
          const enhval = this.$store.getters.getUniqueEquipmentEnhanceRate(this.ueId)[type]
          data[this.statsMap[type]] = [baseval, Math.ceil(baseval + enhval * (level - 1))]
        }
      }
      this.stats = data
    },
    ueCost (level) {
      level = Number(level)
      const baseid = (this.id - this.id % 100) / 100
      if (!level || level > this.maxLevel || level < 1) return {
        mana: { amount: 0, src: `${this.$store.state.CDNBaseURL}/image/bg/mana.png` },
        heart: { amount: 0, src: `${this.$store.state.CDNBaseURL}/image/bg/mana.png` },
        heartpiece: { amount: 0, src: `${this.$store.state.CDNBaseURL}/image/equipments/icon_equipment_140001.png` },
        memorypiece: { amount: 0, src: `${this.$store.state.CDNBaseURL}/image/items/icon_item_${30000 + baseid}.png` }
      }
      const ueCraft = {
        mana: 1000000,
        memorypiece: 50,
        heart: 3
      }
      const limitBreakCost = this.$store.getters.getUniqueEquipmentRankupEX(this.ueId, level).reduce((t, v) => {
        t[`${v.item_id_1}`] = t[`${v.item_id_1}`] ? t[`${v.item_id_1}`] + v.consume_num_1 : v.consume_num_1
        t[`${v.item_id_2}`] = t[`${v.item_id_2}`] ? t[`${v.item_id_2}`] + v.consume_num_2 : v.consume_num_2
        t['crafted_cost'] = t['crafted_cost'] ? t['crafted_cost'] + v.crafted_cost : v.crafted_cost
        return t
      }, {})
      const enhanceManaCost = this.$store.getters.getUniqueEquipmentEnhanceDataEX(level).reduce((t, v) => (t += v.needed_mana * v.needed_point, t), 0)

      return {
        mana: {
          amount: ueCraft.mana + (limitBreakCost.crafted_cost || 0) + (enhanceManaCost || 0),
          src: `${this.$store.state.CDNBaseURL}/image/bg/mana.png`
        },
        heart: {
          amount: ueCraft.heart,
          src: `${this.$store.state.CDNBaseURL}/image/equipments/icon_equipment_140000.png`
        },
        heartpiece: {
          amount: limitBreakCost['140001'] || 0, 
          src: `${this.$store.state.CDNBaseURL}/image/equipments/icon_equipment_140001.png`
        },
        memorypiece: {
          amount: ueCraft.memorypiece + (limitBreakCost[`${30000 + baseid}`] || 0),
          src: `${this.$store.state.CDNBaseURL}/image/items/icon_item_${30000 + baseid}.png`
        }
      }
    }
  }
}
</script>
