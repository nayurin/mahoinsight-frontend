<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <v-text-field
          v-model="from"
          label="赛季最高排名"
          :rules="rules"
          hide-details="auto"
          @change="check"
        />
      </v-col>
      <v-col cols="auto">
        <v-text-field
          v-model="to"
          label="目标排名"
          :rules="rules"
          hide-details="auto"
          @change="check"
        />
      </v-col>
    </v-row>
    <v-btn
      :disabled="busy || error"
      color="primary"
      @click="calculate"
    >
      计算
    </v-btn>
    <v-row
      v-if="error"
      justify="start"
    >
      <v-chip
        outlined
        label
        small
        color="error"
        class="ma-5"
      >
        目标排名必须高于赛季最高排名且排名为有效输入
      </v-chip>
    </v-row>
    <v-card-text
      v-if="result"
    >
      {{ result }}
    </v-card-text>
  </v-container>
</template>

<script>
import request from '@/util/request.js'

export default {
  name: 'Calculator',
  data: () => ({
    from: null,
    to: null,
    busy: false,
    result: null,
    error: false,
    last: {
      from: null,
      to: null,
      isGrandArena: false
    },
    rules: [
      value => !!value || '不能为空',
      value => (!isNaN(Number(value)) && parseInt(Number(value)) >= 1 && parseInt(Number(value)) <= 15001) && Number(value) === parseInt(Number(value)) || `排名只能为[1,15001]的正整数`,
    ],
  }),
  methods: {
    calculate () {
      const data = {
        from: this.from,
        to: this.to,
        isGrandArena: false
      }
      if (data.from === this.last.from && data.to === this.last.to) return
      this.last = data
      this.busy = true
      setTimeout(() => {
        request.PostGemsCalculate(data).then(resp => {
          this.busy = false
          this.result = `宝石共计 ${resp.data.max} 个，其中包含赛季奖励宝石 ${resp.data.season} 个`
        }).catch(() => {
          this.busy = false
          this.result = "网络错误，与服务端通信出现故障"
        })
      }, 500)
    },
    check () {
      if (Number(this.from) <= Number(this.to)) {
        this.error = true
        return
      }
      this.error = false
      for (const rule of this.rules) {
        if (rule(this.from) !== true || rule(this.to) !== true) {
          this.error = true
          break
        }
      }
    }
  }
}
</script>
