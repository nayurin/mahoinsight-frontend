<template>
  <v-container>
    <v-card-title>
      {{ $route.params.clanBattlePhase }}
      <v-btn
        color="success"
        small
        rounded
        class="mx-3"
        @click="onClick"
      >
        <v-icon>mdi-arrow-left-drop-circle-outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      {{ lapinfo }}
    </v-card-subtitle>
    <v-row no-gutters>
      <v-col class="px-4">
        <v-btn-toggle
          v-model="show"
          multiple
        >
          <v-btn
            v-for="(icon, i) in btnicon"
            :key="i"
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col
        v-for="seq in sorted"
        :key="seq"
        class="ma-3"
      >
        <v-row no-gutters>
          <v-col
            v-for="(boss, i) in bossParameter(seq)"
            :key="i"
          >
            <v-card>
              <v-card-title>
                {{ boss.parameter.name }}
              </v-card-title>
              <v-card-subtitle>
                点数倍率： {{ bossgroup[0][`score_coefficient_${seq}`] }}
              </v-card-subtitle>
              
              <BossDialog
                :bossdetail="boss"
              />
              
              <v-card-text
                v-html="boss.parameter.comment.replace(/\\n/g, '<br>')"
              />
              <v-row
                no-gutters
                class="d-flex flex-row"
              >
                <v-col
                  v-for="(value, key) in stats(boss.parameter)"
                  :key="key"
                  class="col-12 mx-4 my-2"
                >
                  <v-chip
                    small
                    label
                    color="primary"
                    v-text="key"
                  />
                  <v-chip
                    small
                    label
                    outlined
                    v-text="value"
                  />
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BossDialog from '@/views/clanbattle/BossDialog'

export default {
  name: 'ClanBattleDetail',
  components: {
    BossDialog
  },
  data () {
    return {
      id: null,
      phase: null,
      bossgroup: [],
      schedule: {
        '2020白羊座': 1001,
        '2020金牛座': 1002,
        '2020双子座': 1003,
        '2020巨蟹座': 1004,
        '2020狮子座': 1005,
        '2020处女座': 1006,
        '2020天秤座': 1007,
        '2020天蝎座': 1008,
        '2020射手座': 1009,
        '2021摩羯座': 1010,
        '2021水瓶座': 1011,
        '2021双鱼座': 1012,
        '2021白羊座': 1013,
        '2021金牛座': 1014,
        '2021双子座': 1015,
        '2021巨蟹座': 1016,
        '2021狮子座': 1017,
        '2021处女座': 1018,
        '2021天秤座': 1019,
        '2021天蝎座': 1020,
        '2021射手座': 1021,
        '2022摩羯座': 1022,
        '2022水瓶座': 1023,
        '2022双鱼座': 1024
      },
      show: [],
      btnicon: ['mdi-numeric-1', 'mdi-numeric-2','mdi-numeric-3','mdi-numeric-4','mdi-numeric-5']
    }
  },
  computed: {
    lapinfo () {
      let from = ''
      let to = ''
      let info = ''
      const phase = this.$store.getters.getClanBattle2MapData(this.id).filter(x => x.phase === this.phase)
      if (this.id > 1010) {
        if (phase.length > 1) {
          from = phase.reduce((t, v) => t !== 0 && t < v.lap_num_from ? t : v.lap_num_from, 0)
          to = phase.reduce((t, v) => t !== -1 && (t < v.lap_num_to || v.lap_num_to === -1) ? v.lap_num_to : t, 0)
        } else if (phase.length === 1) {
          from = phase[0].lap_num_from
          to = phase[0].lap_num_to
        }
      } else {
        from = this.$store.getters.getClanBattle2MapData(this.id)[this.phase - 1].lap_num_from
        to = this.$store.getters.getClanBattle2MapData(this.id)[this.phase - 1].lap_num_to
      }
      
      if (from === to) {
        info = `${from} 周目`
      } else {
        if (to === -1) {
          info = `${from} 周目以后`
        } else {
          info = `${from} 周目到 ${to} 周目`
        }
      }
      return from && to ? info : ''
    },
    sorted () {
      const sorted = this.show
      sorted.sort((x, y) => x - y)
      return sorted.map(x => x + 1)
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const re = /^(.*)第(\d{1})阶段$/
      this.id = this.schedule[this.$route.params.clanBattlePhase.match(re)[1]]
      this.phase = Number(this.$route.params.clanBattlePhase.match(re)[2])
      this.bossgroup = this.$store.getters.getClanBattle2MapData(this.id).filter(x => x.phase === this.phase)
      this.show = this.$store.state.mobile ? [] : [0, 1, 2, 3 ,4]
    },
    bossParameter (seq) {
      const waveDetail = this.$store.getters.getWaveGroupData(this.bossgroup[0][`wave_group_id_${seq}`])
      switch (waveDetail.length) {
        case 1:
          return [waveDetail[0].enemy_id_1, waveDetail[0].enemy_id_2, waveDetail[0].enemy_id_3, waveDetail[0].enemy_id_4, waveDetail[0].enemy_id_5]
            .filter(x => x !== 0)
            .map(x => this.$store.getters.getEnemyDetailsByEnemyId(x))
        default:
          return []
      }
    },
    stats (obj) {
      const stats = obj ? {
        等级: obj.level,
        生命值: obj.hp,
        物理攻击力: obj.atk,
        物理防御力: obj.def,
        魔法攻击力: obj.magic_str,
        魔法防御力: obj.magic_def,
        物理暴击: obj.physical_critical,
        魔法暴击: obj.magic_critical,
        技能值上升: obj.energy_recovery_rate,
        回避: obj.dodge,
        命中: obj.accuracy,
        回复量上升: obj.hp_recovery_rate,
        生命值吸收: obj.life_steal,
        技能值消耗降低: obj.energy_reduce_rate,
        物理穿透: obj.physical_penetrate,
        魔法穿透: obj.magic_penetrate
      } : null
      for (const key of Object.keys(stats)) {
        if (stats[key] === 0) {
          delete stats[key]
        }
      }
      return stats
    },
    onClick () {
      this.$router.push({
        name: 'ClanBattlePeriods'
      })
    }
  }
}
</script>
