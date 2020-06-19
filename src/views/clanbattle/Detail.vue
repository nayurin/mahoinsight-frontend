<template>
  <v-container>
    <v-card-title>
      {{ this.$route.params.clanBattlePhase }}
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
            v-for="(mapBossSeq, i) in bossfilter(seq)"
            :key="i"
          >
            <v-row>
              <v-col
                v-for="(boss, j) in mapBossSeq.enemy"
                :key="j"
                class="col-12"
              >
                <v-card>
                  <v-card-title>
                    {{ boss.name }}
                  </v-card-title>
                  <v-card-subtitle>
                    点数倍率： {{ mapBossSeq.score_coefficient }}
                  </v-card-subtitle>
                  <v-img
                    class="mx-4"
                    :src="src(boss.unit_id)"
                    :alt="boss.name"
                    width="96"
                    height="96"
                  />
                  <v-card-text
                    v-html="boss.comment.replace(/\\n/g, '<br>')"
                  />
                  <v-row
                    no-gutters
                    class="d-flex flex-row"
                  >
                    <v-col
                      v-for="(value, key) in stats(boss)"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ClanBattleDetail',
  data () {
    return {
      id: null,
      phase: null,
      bossgroup: null,
      schedule: {
        '2020.5「团队战」白羊座': 1001,
        '2020.6「团队战」金牛座': 1002,
        '2020.7「团队战」双子座': 1003,
        '2020.8「团队战」巨蟹座': 1004,
        '2020.9「团队战」狮子座': 1005,
        '2020.10「团队战」处女座': 1006,
        '2020.11「团队战」天秤座': 1007,
        '2020.12「团队战」天蝎座': 1008,
        '2021.1「团队战」射手座': 1009,
        '2021.2「团队战」摩羯座': 1010,
        '2021.3「团队战」水瓶座': 1011,
        '2021.4「团队战」双鱼座': 1012,
        '2021.5「团队战」白羊座': 1013
      },
      show: [],
      btnicon: ['mdi-numeric-1', 'mdi-numeric-2','mdi-numeric-3','mdi-numeric-4','mdi-numeric-5']
    }
  },
  computed: {
    lapinfo () {
      const from = this.$store.getters.getClanBattleMapById(this.id)[this.phase].lap_num_from
      const to = this.$store.getters.getClanBattleMapById(this.id)[this.phase].lap_num_to
      let info = ''
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
      this.phase = Number(this.$route.params.clanBattlePhase.match(re)[2]) - 1
      this.bossgroup = this.$store.getters.getClanBattleBossGroup(this.id, this.phase)
      this.show = this.$store.state.mobile ? [] : [0, 1, 2, 3 ,4]
    },
    bossfilter (seq) {
      return this.bossgroup.filter(x => x.order_num === seq)
    },
    src (id) {
      return `${this.$store.state.CDNBaseURL}/image/enemies/icon_unit_${id}.png`
    },
    stats (obj) {
      return obj ? {
        等级: obj.level,
        生命值: obj.hp,
        物理攻击力: obj.atk,
        物理防御力: obj.def,
        魔法攻击力: obj.magic_str,
        魔法防御力: obj.magic_def,
        物理暴击: obj.physical_critical,
        魔法暴击: obj.magic_critical,
        回避: obj.dodge,
        命中: obj.accuracy,
        回复量上升: obj.hp_recovery_rate,
        技能值上升: obj.energy_recovery_rate,
        生命值吸收: obj.life_steal,
        技能值消耗降低: obj.energy_reduce_rate,
        物理穿透: obj.physical_penetrate,
        魔法穿透: obj.magic_penetrate
      } : null
    },
    onClick () {
      this.$router.push({
        name: 'ClanBattlePeriods'
      })
    }
  }
}
</script>
