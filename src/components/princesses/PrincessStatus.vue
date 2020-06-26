<template>
  <v-card>
    <v-card-title id="princess-status">
      角色属性
    </v-card-title>
    <v-card-subtitle>
      注：装备属性默认为满强化属性。点击角色装备卡片中的按钮修改当前装备
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
        <v-col
          class="col-12 pb-0"
        >
          <v-combobox
            v-model="selectstory"
            :filter="filter"
            :hide-no-data="!search"
            :items="stories"
            :search-input.sync="search"
            hide-selected
            label="选择好感剧情"
            multiple
            small-chips
          >
            <template v-slot:selection="{ attrs, item, parent, selected }">
              <v-chip
                v-if="item === Object(item)"
                v-bind="attrs"
                :color="`${item.color} lighten-3`"
                :input-value="selected"
                label
                small
              >
                <span class="pr-2">
                  {{ item.text }}
                </span>
                <v-icon
                  small
                  @click="parent.selectItem(item)"
                >
                  mdi-close
                </v-icon>
              </v-chip>
            </template>
            <template v-slot:item="{ index, item }">
              <v-chip
                :color="`${item.color} lighten-3`"
                dark
                label
                small
              >
                {{ item.text }}
              </v-chip>
            </template>
          </v-combobox>
        </v-col>
      </v-row>
      <v-row
        class="pa-3 pt-0"
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
            v-text="value"
          />
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-show="equipStats[key]"
                text
                small
                color="success"
                class="pa-0"
                v-bind="attrs"
                v-on="on"
                v-text="`(+${equipStats[key]})`"
              />
            </template>
            <span
              v-text="`装备加成`"
            />
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-show="storyBonusStats[key]"
                text
                small
                color="pink darken-1"
                class="pa-0"
                v-bind="attrs"
                v-on="on"
                v-text="`(+${storyBonusStats[key]})`"
              />
            </template>
            <span
              v-text="`好感剧情加成`"
            />
          </v-tooltip>
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
        value => (!isNaN(Number(value)) && parseInt(Number(value)) > 0 && parseInt(Number(value)) <= this.maxLevel) && Number(value) === parseInt(Number(value)) || `王子大人，等级不能超过${this.maxLevel}呀`,
      ],
      rulesOfRank: [
        value => !!value || '请写点什么吧，王子大人',
        value => (!isNaN(Number(value)) && parseInt(Number(value)) > 0 && parseInt(Number(value)) <= this.maxRank) && Number(value) === parseInt(Number(value)) || `王子大人，Rank不能超过${this.maxRank}呀`,
      ],
      rarity: 5,
      selectstory: [],
      stories: [],
      search: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange']
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
        if (parseInt(Number(value)) > 0 && parseInt(Number(value)) <= this.$store.state.maxRank) {
          this.$store.commit('updateState', { key: 'curRank', value: parseInt(Number(value)) })
        }
        this.updateAtk()
      }
    },
    level: {
      get () {
        return this.$store.getters.curLevel
      },
      set (value) {
        if (parseInt(Number(value)) > 0 && parseInt(Number(value)) <= this.$store.state.maxLevel) {
          this.$store.commit('updateState', { key: 'curLevel', value: parseInt(Number(value)) })
        }
        this.updateAtk()
      }
    },
    maxRank () {
      return this.$store.state.maxRank
    },
    maxLevel () {
      return this.$store.state.maxLevel
    },
    equipStats () {
      const stats = {}
      for (const equipid of this.$store.state.equipSelected) {
        if (equipid === 999999) continue
        const item = this.$store.getters.getItemStatsById(equipid)
        for (const stattype of Object.keys(item)) {
          if (Object.keys(stats).includes(stattype)) {
            stats[stattype] += parseFloat(item[stattype] * 2)
          } else {
            stats[stattype] = parseFloat(item[stattype] * 2)
          }
        }
      }
      return stats
    },
    storyBonusStats () {
      const selectstory = this.selectstory.map(x => x.text)
      const re = /^(.*?)的小故事/
      const bonus = {}
      selectstory.forEach(chara => {
        const series = Object.keys(this.princess.storybonus).filter(x => chara === x.match(re)[1])
        series.forEach(story => {
          for (const type of Object.keys(this.princess.storybonus[story])) {
            bonus[type] = bonus[type] ? bonus[type] + this.princess.storybonus[story][type] : this.princess.storybonus[story][type]
          }
        })
      })
      return bonus
    }
  },
  watch: {
    rarity () {
      this.updateAtk()
    },
    selectstory (newVal, oldVal) {
      if (newVal.length === oldVal.length) return
      this.selectstory = newVal.map(x => {
        if (typeof(x) === 'string') {
          this.selectstory.push(x)
        }
        return x
      })
    }
  },
  created () {
    this.updateAtk()
    this.storyBonusCategory()
  },
  methods: {
    filter (item, queryText, itemText) {
      if (item.header) return false
      const hasValue = val => val != null ? val : ''
      const text = hasValue(itemText)
      const query = hasValue(queryText)
      return text.toString().indexOf(query.toString()) > -1
    },
    storyBonusCategory () {
      const item = [{ header: '请选择角色的好感剧情奖励' }]
      const re = /^(.*?)的小故事/
      const set = []
      let colorindex = 0
      for (const name of Object.keys(this.princess.storybonus).map(x => x.match(re)[1])) {
        if (!set.includes(name)) {
          set.push(name)
          item.push({ text: name, color: this.colors[colorindex] })
          colorindex = colorindex === this.colors.length ? 0 : colorindex + 1
        }
      }
      this.stories = item
      this.selectstory = item.filter(x => !x.header)
    },
    updateAtk () {
      if (this.princess.status.atk_type === 1) {
        this.$store.commit('updateState', { key: 'curAtk', value: this.princessStatus(this.level, this.rank, this.rarity)['物理攻击力']})
      } else if (this.princess.status.atk_type === 2) {
        this.$store.commit('updateState', { key: 'curAtk', value: this.princessStatus(this.level, this.rank, this.rarity)['魔法攻击力']})
      }
    },
    rarityStatus (rarity, type) {
      return this.princess.growth.rarity[rarity][type]
    },
    promotionStatus (rank, type) {
      return rank === 1 ? 0 : this.princess.growth.promotion[rank][type]
    },
    princessStatus (level, rank, rarity) {
      const stats = level && rank && rarity ? {
        生命值: this.rarityStatus(rarity, 'hp') + this.promotionStatus(rank, 'hp') + this.rarityStatus(rarity, 'hp_growth') * (this.level + this.rank),
        索敌半径: this.princess.status.search_area_width,
        物理攻击力: this.rarityStatus(rarity, 'atk') + this.promotionStatus(rank, 'atk') + this.rarityStatus(rarity, 'atk_growth') * (this.level + this.rank),
        物理防御力: this.rarityStatus(rarity, 'def') + this.promotionStatus(rank, 'def') + this.rarityStatus(rarity, 'def_growth') * (this.level + this.rank),
        魔法攻击力: this.rarityStatus(rarity, 'magic_str') + this.promotionStatus(rank, 'magic_str') + this.rarityStatus(rarity, 'magic_str_growth') * (this.level + this.rank),
        魔法防御力: this.rarityStatus(rarity, 'magic_def') + this.promotionStatus(rank, 'magic_def') + this.rarityStatus(rarity, 'magic_def_growth') * (this.level + this.rank),
        物理暴击: this.rarityStatus(rarity, 'physical_critical') + this.promotionStatus(rank, 'physical_critical') + this.rarityStatus(rarity, 'physical_critical_growth') * (this.level + this.rank),
        魔法暴击: this.rarityStatus(rarity, 'magic_critical') + this.promotionStatus(rank, 'magic_critical') + this.rarityStatus(rarity, 'magic_critical_growth') * (this.level + this.rank),
        生命值自动回复: this.rarityStatus(rarity, 'wave_hp_recovery') + this.promotionStatus(rank, 'wave_hp_recovery') + this.rarityStatus(rarity, 'wave_hp_recovery_growth') * (this.level + this.rank),
        技能值自动回复: this.rarityStatus(rarity, 'wave_energy_recovery') + this.promotionStatus(rank, 'wave_energy_recovery') + this.rarityStatus(rarity, 'wave_energy_recovery_growth') * (this.level + this.rank),
        回避: this.rarityStatus(rarity, 'dodge') + this.promotionStatus(rank, 'dodge') + this.rarityStatus(rarity, 'dodge_growth') * (this.level + this.rank),
        命中: this.rarityStatus(rarity, 'accuracy') + this.promotionStatus(rank, 'accuracy') + this.rarityStatus(rarity, 'accuracy_growth') * (this.level + this.rank),
        物理穿透: this.rarityStatus(rarity, 'physical_penetrate') + this.promotionStatus(rank, 'physical_penetrate') + this.rarityStatus(rarity, 'physical_penetrate_growth') * (this.level + this.rank),
        魔法穿透: this.rarityStatus(rarity, 'magic_penetrate') + this.promotionStatus(rank, 'magic_penetrate') + this.rarityStatus(rarity, 'magic_penetrate_growth') * (this.level + this.rank),
        回复量上升: this.rarityStatus(rarity, 'hp_recovery_rate') + this.promotionStatus(rank, 'hp_recovery_rate') + this.rarityStatus(rarity, 'hp_recovery_rate_growth') * (this.level + this.rank),
        技能值上升: this.rarityStatus(rarity, 'energy_recovery_rate') + this.promotionStatus(rank, 'energy_recovery_rate') + this.rarityStatus(rarity, 'energy_recovery_rate_growth') * (this.level + this.rank),
        生命值吸收: this.rarityStatus(rarity, 'life_steal') + this.promotionStatus(rank, 'life_steal') + this.rarityStatus(rarity, 'life_steal_growth') * (this.level + this.rank),
        技能值消耗降低: this.rarityStatus(rarity, 'energy_reduce_rate') + this.promotionStatus(rank, 'energy_reduce_rate') + this.rarityStatus(rarity, 'energy_reduce_rate_growth') * (this.level + this.rank)
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
      for (const stattype of Object.keys(stats)) {
        if (this.equipStats[stattype]) stats[stattype] += this.equipStats[stattype]
        if (this.storyBonusStats[stattype]) stats[stattype] += this.storyBonusStats[stattype]
        stats[stattype] = Math.ceil(stats[stattype])
      }
      return stats
    }
  }
}
</script>
