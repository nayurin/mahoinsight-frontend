<template>
  <v-container>
    <v-card-title>
      团队战活动介绍
    </v-card-title>
    <v-row class="text-center">
      <v-col
        v-for="(title, id) in schedule"
        :key="id"
        class="col-12 col-lg-4"
      >
        <v-card>
          <v-card-text
            class="title"
            v-text="`${event(id)[0]}  ${event(id)[1]}`"
          />
          <v-card-text
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
                v-for="(value, i) in $store.getters.getClanBattleMapData(id)"
                :key="i"
                :color="phase[i]"
                class="mx-2 my-2"
                @click="onClick(id, i)"
                v-text="`阶段 ${i + 1}`"
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
        1001: ['2020.5', '「团队战」白羊座'],
        1002: ['2020.6', '「团队战」金牛座'],
        1003: ['2020.7', '「团队战」双子座'],
        1004: ['2020.8', '「团队战」巨蟹座'],
        1005: ['2020.9', '「团队战」狮子座'],
        1006: ['2020.10', '「团队战」处女座'],
        1007: ['2020.11', '「团队战」天秤座'],
        1008: ['2020.12', '「团队战」天蝎座'],
        1009: ['2021.1', '「团队战」射手座'],
        1010: ['2021.2', '「团队战」摩羯座'],
        1011: ['2021.3', '「团队战」水瓶座'],
        1012: ['2021.4', '「团队战」双鱼座'],
        1013: ['2021.5', '「团队战」白羊座']
      },
      phase: ["success", "primary", "warning", "error"]
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
          clanBattlePhase: `${this.schedule[id][0]}${this.schedule[id][1].substring(5)}第${phase + 1}阶段`
        }
      })
    }
  }
}
</script>
