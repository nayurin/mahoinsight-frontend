<template>
  <v-container>
    <p class="text-h6 font-weight-light">
      团队战活动计划
    </p>
    <v-chip
      label
      color="primary"
      class="font-weight-light text-body-2 my-3"
    >
      当期
    </v-chip>
    <v-row class="text-center">
      <v-col class="col-12 col-lg-4">
        <v-card>
          <v-card-text
            class="text-h6 font-weight-light"
            v-text="`${schedule[recentEventId][0]} ${event(recentEventId)[1]}`"
          />
          <v-card-text
            class="font-weight-light"
            v-html="comment(recentEventId)"
          />
          <v-card-text class="py-0">
            奖励内容
          </v-card-text>
          <v-row no-gutters>
            <v-col
              class="d-flex flex-row px-3 justify-center"
            >
              <ItemFigure
                v-for="(value, i) of $store.getters.getClanBattlePeriodRankReward(recentEventId)"
                :id="value"
                :key="i"
                zoom-ratio="0.5"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="py-2">
              <v-card-text class="pa-2 px-4">
                Boss设置
              </v-card-text>
              <v-btn
                v-for="(text, i) in phaseText(recentEventId)"
                :key="i"
                :color="phase[text]"
                class="mx-2 my-2"
                @click="onClick(recentEventId, text)"
                v-text="`阶段 ${text}`"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    
    <v-chip
      label
      color="warning"
      class="font-weight-light text-body-2 my-3"
    >
      预期
    </v-chip>
    <v-row class="text-center">
      <v-col
        v-for="(id, i) in Object.keys(schedule).filter(x => x > recentEventId)"
        :key="i"
        class="col-12 col-lg-4"
      >
        <v-card>
          <v-card-text
            class="text-h6 font-weight-light"
            v-text="`${schedule[id][0]} ${event(id)[1]}`"
          />
          <v-card-text
            class="font-weight-light"
            v-html="comment(id)"
          />
          <v-card-text class="py-0">
            奖励内容
          </v-card-text>
          <v-row no-gutters>
            <v-col
              class="d-flex flex-row px-3 justify-center"
            >
              <ItemFigure
                v-for="(value, i) of $store.getters.getClanBattlePeriodRankReward(id)"
                :id="value"
                :key="i"
                zoom-ratio="0.5"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="py-2">
              <v-card-text class="pa-2 px-4">
                Boss设置
              </v-card-text>
              <v-btn
                v-for="(text, i) in phaseText(id)"
                :key="i"
                :color="phase[text]"
                class="mx-2 my-2"
                @click="onClick(id, text)"
                v-text="`阶段 ${text}`"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-chip
      label
      color="success"
      class="font-weight-light text-body-2 my-3"
    >
      往期
    </v-chip>
    <v-row class="text-center">
      <v-col
        v-for="(id, i) in Object.keys(schedule).filter(x => x < recentEventId)"
        :key="i"
        class="col-12 col-lg-4"
      >
        <v-card>
          <v-card-text
            class="text-h6 font-weight-light"
            v-text="`${schedule[id][0]} ${event(id)[1]}`"
          />
          <v-card-text
            class="font-weight-light"
            v-html="comment(id)"
          />
          <v-card-text class="py-0">
            奖励内容
          </v-card-text>
          <v-row no-gutters>
            <v-col
              class="d-flex flex-row px-3 justify-center"
            >
              <ItemFigure
                v-for="(value, i) of $store.getters.getClanBattlePeriodRankReward(id)"
                :id="value"
                :key="i"
                zoom-ratio="0.5"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="py-2">
              <v-card-text class="pa-2 px-4">
                Boss设置
              </v-card-text>
              <v-btn
                v-for="(text, i) in phaseText(id)"
                :key="i"
                :color="phase[text]"
                class="mx-2 my-2"
                @click="onClick(id, text)"
                v-text="`阶段 ${text}`"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemFigure from '@/components/global/ItemFigure'

export default {
  name: 'Periods',
  components: {
    ItemFigure
  },
  data () {
    return {
      schedule: {
        1001: ['2020', '「团队战」白羊座 ♈'],
        1002: ['2020', '「团队战」金牛座 ♉'],
        1003: ['2020', '「团队战」双子座 ♊'],
        1004: ['2020', '「团队战」巨蟹座 ♋'],
        1005: ['2020', '「团队战」狮子座 ♌'],
        1006: ['2020', '「团队战」处女座 ♍'],
        1007: ['2020', '「团队战」天秤座 ♎'],
        1008: ['2020', '「团队战」天蝎座 ♏'],
        1009: ['2020', '「团队战」射手座 ♐'],
        1010: ['2021', '「团队战」摩羯座 ♑'],
        1011: ['2021', '「团队战」水瓶座 ♒'],
        1012: ['2021', '「团队战」双鱼座 ♓'],
        1013: ['2021', '「团队战」白羊座 ♈'],
        1014: ['2021', '「团队战」金牛座 ♉'],
        1015: ['2021', '「团队战」双子座 ♊'],
        1016: ['2021', '「团队战」巨蟹座 ♋'],
        1017: ['2021', '「团队战」狮子座 ♌'],
        1018: ['2021', '「团队战」处女座 ♍'],
        1019: ['2021', '「团队战」天秤座 ♎'],
        1020: ['2021', '「团队战」天蝎座 ♏'],
        1021: ['2021', '「团队战」射手座 ♐'],
        1022: ['2022', '「团队战」摩羯座 ♑'],
        1023: ['2022', '「团队战」水瓶座 ♒'],
        1024: ['2022', '「团队战」双鱼座 ♓']
      },
      phase: [null, "success", "primary", "warning", "error"]
    }
  },
  computed: {
    recentEventId () {
      let eventId = 0
      for (const id of Object.keys(this.schedule).sort((x, y) => y - x)) {
        if (this.$store.getters.getClanBattlePeriod(id)) {
          eventId = id
          break
        }
      }
      return eventId
    }
  },
  methods: {
    event (id) {
      return this.$store.getters.getClanBattlePeriod(id) ? this.schedule[id] : this.schedule[id].map(x => `${x}（暂定）`)
    },
    comment (id) {
      const sche = this.$store.getters.getClanBattlePeriod(id)
      return sche ? `${sche.start_time} ~ ${sche.end_time}<br>${sche.period_detail.replace(/\\n/g, '')}` : null
    },
    onClick (id, phase) {
      this.$router.push({
        name: 'ClanBattleDetail',
        params: {
          clanBattlePhase: `${this.schedule[id][0]}${this.schedule[id][1].substring(5, 8)}第${phase}阶段`
        }
      })
    },
    phaseText (id) {
      const battle = this.$store.getters.getClanBattle2MapData(id)
      return battle.reduce((t, v, i) => {
        if (id > 1010) {
          if (!t.includes(v.phase)) {
            t.push(v.phase)
          }
        } else {
          t.push(i + 1)
        }
        return t
      }, [])
    }
  }
}
</script>
