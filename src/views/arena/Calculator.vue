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
      class="my-3"
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
      v-text="result"
    />
    <v-row>
      <v-col
        v-for="(each, i) in [reward.arenaMax, reward.arenaSeason]"
        :key="i"
        class="col-12 col-lg-6"
      >
        <v-card-text
          class="text-center font-weight-black"
          v-text="i === 0 ? '合并了赛季奖励的完整奖励' : '赛季奖励'"
        />
        <v-simple-table>
          <template #default>
            <thead>
              <tr>
                <th>
                  排名区间
                </th>
                <th>
                  奖励内容
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in each"
                :key="item.range[0]"
              >
                <td
                  v-text="item.range[0] === item.range[1] ? `第 ${item.range[0]} 名` : `第 ${item.range[0]} 名至第 ${item.range[1]} 名`"
                />
                <td>
                  {{ item.comment }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
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
      value => !isNaN(Number(value)) && parseInt(Number(value)) >= 1 && parseInt(Number(value)) <= 15001 && Number(value) === parseInt(Number(value)) || `排名只能为[1,15001]的正整数`,
    ],
    reward: {
      arenaMax: [
        {
          range: [1, 10],
          comment: "每一个名次 550 个宝石"
        },
        {
          range: [11, 100],
          comment: "每一个名次 60 个宝石"
        },
        {
          range: [101, 200],
          comment: "每一个名次 35 个宝石"
        },
        {
          range: [201, 500],
          comment: "每一个名次 13 个宝石"
        },
        {
          range: [501, 1000],
          comment: "每一个名次 7 个宝石"
        },
        {
          range: [1001, 2000],
          comment: "每一个名次 5 个宝石"
        },
        {
          range: [2001, 4000],
          comment: "每一个名次 3 个宝石"
        },
        {
          range: [4001, 7999],
          comment: "每一个名次 1 个宝石"
        },
        {
          range: [8000, 11900],
          comment: "每到达一百整数名 95 个宝石"
        },
        {
          range: [12000, 12000],
          comment: "80 个宝石"
        },
        {
          range: [12100, 15000],
          comment: "每到达一百整数名 45 个宝石"
        },
      ],
      arenaSeason: [
        {
          range: [1, 10],
          comment: "每一个名次 50 个宝石"
        },
        {
          range: [11, 100],
          comment: "每一个名次 10 个宝石"
        },
        {
          range: [101, 200],
          comment: "每一个名次 5 个宝石"
        },
        {
          range: [201, 500],
          comment: "每一个名次 3 个宝石"
        },
        {
          range: [501, 2000],
          comment: "每一个名次 2 个宝石"
        },
        {
          range: [2001, 3999],
          comment: "每一个名次 1 个宝石"
        },
        {
          range: [4000, 8000],
          comment: "每到达一百整数名 50 个宝石"
        },
        {
          range: [8100, 15000],
          comment: "每到达一百整数名 15 个宝石"
        },
      ],
      grandArenaMax: [
        {
          range: [1, 10],
          comment: "每一个名次 550 个宝石"
        },
        {
          range: [11, 100],
          comment: "每一个名次 60 个宝石"
        },
        {
          range: [101, 200],
          comment: "每一个名次 35 个宝石"
        },
        {
          range: [201, 500],
          comment: "每一个名次 13 个宝石"
        },
        {
          range: [501, 1000],
          comment: "每一个名次 7 个宝石"
        },
        {
          range: [1001, 2000],
          comment: "每一个名次 5 个宝石"
        },
        {
          range: [2001, 4000],
          comment: "每一个名次 3 个宝石"
        },
        {
          range: [4001, 7999],
          comment: "每一个名次 1 个宝石"
        },
        {
          range: [8000, 11900],
          comment: "每一百整数名 95 个宝石"
        },
        {
          range: [12000, 12000],
          comment: "80 个宝石"
        },
        {
          range: [12100, 15000],
          comment: "每一百整数名 45 个宝石"
        },
      ],
      grandArenaSeason: [
        {
          range: [1, 10],
          comment: "每一个名次 50 个宝石"
        },
        {
          range: [11, 100],
          comment: "每一个名次 10 个宝石"
        },
        {
          range: [101, 200],
          comment: "每一个名次 5 个宝石"
        },
        {
          range: [201, 500],
          comment: "每一个名次 3 个宝石"
        },
        {
          range: [501, 2000],
          comment: "每一个名次 2 个宝石"
        },
        {
          range: [2001, 3999],
          comment: "每一个名次 1 个宝石"
        },
        {
          range: [4000, 8000],
          comment: "每一百整数名 50 个宝石"
        },
        {
          range: [8100, 15000],
          comment: "每一百整数名 15 个宝石"
        },
      ]
    }
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
          this.last = {}
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
