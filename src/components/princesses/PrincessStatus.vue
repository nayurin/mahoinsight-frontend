<template>
  <v-card>
    <v-card-title id="princess-status">
      角色属性
    </v-card-title>
    <v-card-subtitle>
      注：以下属性未计入装备加成以及好感度剧情奖励
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="level"
            label="等级"
            :rules="rulesOfLevel"
            hide-details="auto"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="rank"
            label="RANK"
            :rules="rulesOfRank"
            hide-details="auto"
          />
        </v-col>
      </v-row>
      <v-row
        class="pa-3"
      >
        ★数
        <v-rating
          v-model="rarity"
          dense
          hover
          small
          color="yellow darken-2"
        />
      </v-row>
      <v-row>
        <v-col
          v-for="(value, key) in princessStatus(...status)"
          :key="key"
          cols="6"
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
            v-text="value"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PrincessStatus',
  props: {
    princess: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      rulesOfLevel: [
        value => !!value || '请写点什么吧，王子大人',
        value => (!isNaN(Number(value)) && parseInt(Number(value)) > 0 && parseInt(Number(value)) <= this.maxLevel) || `王子大人，等级不能超过${this.maxLevel}呀`,
      ],
      rulesOfRank: [
        value => !!value || '请写点什么吧，王子大人',
        value => (!isNaN(Number(value)) && parseInt(Number(value)) > 0 && parseInt(Number(value)) <= this.maxRank) || `王子大人，Rank不能超过${this.maxRank}呀`,
      ],
      rarity: 5
    }
  },
  computed: {
    status () {
      return this.level > 0 && this.level <= this.maxLevel && this.rank > 0 && this.rank <= this.maxRank && this.rarity > 0 ? [this.level, this.rank, this.rarity] : [undefined, undefined, undefined]
    },
    rank: {
      get () {
        return this.$store.getters.curRank
      },
      set (value) {
        this.$store.commit('updateCurrentRank', value)
        this.updateAtk()
      }
    },
    level: {
      get () {
        return this.$store.getters.curLevel
      },
      set (value) {
        this.$store.commit('updateCurrentLevel', value)
        this.updateAtk()
      }
    },
    maxRank () {
      return this.$store.state.maxRank
    },
    maxLevel () {
      return this.$store.state.maxLevel
    }
  },
  watch: {
    rarity () {
      this.updateAtk()
    }
  },
  created () {
    this.updateAtk()
  },
  methods: {
    updateAtk () {
      if (this.princess.status.atk_type === 1) {
        this.$store.commit('updateCurrentAtk', this.princessStatus(this.level, this.rank, this.rarity)['物理攻击力'])
      } else if (this.princess.status.atk_type === 2) {
        this.$store.commit('updateCurrentAtk', this.princessStatus(this.level, this.rank, this.rarity)['魔法攻击力'])
      }
    },
    rarityStatus (rarity, type) {
      return this.princess.growth.rarity[rarity][type]
    },
    promotionStatus (rank, type) {
      return rank === 1 ? 0 : this.princess.growth.promotion[rank][type]
    },
    princessStatus (level, rank, rarity) {
      return level && rank && rarity ? {
        生命值: Math.round(this.rarityStatus(rarity, 'hp') + this.promotionStatus(rank, 'hp') + this.rarityStatus(rarity, 'hp_growth') * (this.level + this.rank)),
        索敌半径: this.princess.status.search_area_width,
        物理攻击力: Math.round(this.rarityStatus(rarity, 'atk') + this.promotionStatus(rank, 'atk') + this.rarityStatus(rarity, 'atk_growth') * (this.level + this.rank)),
        物理防御力: Math.round(this.rarityStatus(rarity, 'magic_def') + this.promotionStatus(rank, 'magic_def') + this.rarityStatus(rarity, 'magic_def_growth') * (this.level + this.rank)),
        魔法攻击力: Math.round(this.rarityStatus(rarity, 'magic_str') + this.promotionStatus(rank, 'magic_str') + this.rarityStatus(rarity, 'magic_str_growth') * (this.level + this.rank)),
        魔法防御力: Math.round(this.rarityStatus(rarity, 'def') + this.promotionStatus(rank, 'def') + this.rarityStatus(rarity, 'def_growth') * (this.level + this.rank)),
        物理暴击: Math.round(this.rarityStatus(rarity, 'physical_critical') + this.promotionStatus(rank, 'physical_critical') + this.rarityStatus(rarity, 'physical_critical_growth') * (this.level + this.rank)),
        魔法暴击: Math.round(this.rarityStatus(rarity, 'magic_critical') + this.promotionStatus(rank, 'magic_critical') + this.rarityStatus(rarity, 'magic_critical_growth') * (this.level + this.rank)),
        生命值自动回复: Math.round(this.rarityStatus(rarity, 'wave_hp_recovery') + this.promotionStatus(rank, 'wave_hp_recovery') + this.rarityStatus(rarity, 'wave_hp_recovery_growth') * (this.level + this.rank)),
        技能值自动回复: Math.round(this.rarityStatus(rarity, 'wave_energy_recovery') + this.promotionStatus(rank, 'wave_energy_recovery') + this.rarityStatus(rarity, 'wave_energy_recovery_growth') * (this.level + this.rank)),
        回避: Math.round(this.rarityStatus(rarity, 'dodge') + this.promotionStatus(rank, 'dodge') + this.rarityStatus(rarity, 'dodge_growth') * (this.level + this.rank)),
        命中: Math.round(this.rarityStatus(rarity, 'accuracy') + this.promotionStatus(rank, 'accuracy') + this.rarityStatus(rarity, 'accuracy_growth') * (this.level + this.rank)),
        物理穿透: Math.round(this.rarityStatus(rarity, 'physical_penetrate') + this.promotionStatus(rank, 'physical_penetrate') + this.rarityStatus(rarity, 'physical_penetrate_growth') * (this.level + this.rank)),
        魔法穿透: Math.round(this.rarityStatus(rarity, 'magic_penetrate') + this.promotionStatus(rank, 'magic_penetrate') + this.rarityStatus(rarity, 'magic_penetrate_growth') * (this.level + this.rank)),
        回复量上升: Math.round(this.rarityStatus(rarity, 'hp_recovery_rate') + this.promotionStatus(rank, 'hp_recovery_rate') + this.rarityStatus(rarity, 'hp_recovery_rate_growth') * (this.level + this.rank)),
        技能值上升: Math.round(this.rarityStatus(rarity, 'energy_recovery_rate') + this.promotionStatus(rank, 'energy_recovery_rate') + this.rarityStatus(rarity, 'energy_recovery_rate_growth') * (this.level + this.rank)),
        生命值吸收: Math.round(this.rarityStatus(rarity, 'life_steal') + this.promotionStatus(rank, 'life_steal') + this.rarityStatus(rarity, 'life_steal_growth') * (this.level + this.rank)),
        技能值消耗降低: Math.round(this.rarityStatus(rarity, 'energy_reduce_rate') + this.promotionStatus(rank, 'energy_reduce_rate') + this.rarityStatus(rarity, 'energy_reduce_rate_growth') * (this.level + this.rank))
      } : {
        生命值: NaN,
        索敌半径: this.princess.status.search_area_width,
        物理攻击力: NaN,
        物理防御力: NaN,
        魔法攻击力: NaN,
        魔法防御力: NaN,
        物理暴击: NaN,
        魔法暴击: NaN,
        生命值自动回复: NaN,
        技能值自动回复: NaN,
        回避: NaN,
        命中: NaN,
        物理穿透: NaN,
        魔法穿透: NaN,
        回复量上升: NaN,
        技能值上升: NaN,
        生命值吸收: NaN,
        技能值消耗降低: NaN,
      }
    }
  }
}
</script>
