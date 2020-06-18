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
  </v-card>
</template>

<script>
export default {
  name: 'PrincessUniqueEquipment',
  props: {
    princess: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      level: 30,
      rules: [
        value => !!value || '不能为空',
        value => !isNaN(Number(value)) && parseInt(Number(value)) >= 1 && parseInt(Number(value)) <= this.maxLevel && Number(value) === parseInt(Number(value)) || `等级只能为[1,100]的正整数`,
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
      return this.princess.unique_equipment.data.equipment_name
    },
    ueDesc () {
      return this.princess.unique_equipment.data.description.replace(/\\n/g, '')
    },
    ueId () {
      return this.princess.unique_equipment.data.equipment_id
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
        if (!this.princess.unique_equipment.data[type] && !this.princess.unique_equipment.enhance_rate[type]) {
          continue
        } else {
          const baseval = this.princess.unique_equipment.data[type]
          const enhval = this.princess.unique_equipment.enhance_rate[type]
          data[this.statsMap[type]] = [baseval, Math.round(baseval + enhval * level)]
        }
      }
      this.stats = data
    }
  }
}
</script>
