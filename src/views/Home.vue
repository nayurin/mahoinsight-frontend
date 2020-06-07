<template>
  <v-container fluid>
    <v-card-title class="font-weight-bold">
      MahoMaho INSIGHT!!
    </v-card-title>
    <v-card-text>
      欢迎访问<strong>公主连结Re:Dive 简体中文服</strong>资讯站  MahoMaho INSIGHT!! 真步真步视界术
    </v-card-text>
    <v-chip
      v-for="(value, key) in tags"
      :key="key"
      label
      dark
      class="mx-2"
      :color="value[0]"
      v-text="value[1]"
    />
    <v-row
      v-for="(status, i) in Object.keys(tags)"
      :key="i"
    >
      <v-col
        v-for="event in events[status]"
        :key="event.title"
        cols="12"
        lg="6"
        class="align-self-stretch"
      >
        <v-card>
          <v-chip
            label
            large
            dark
            class="d-flex justify-center align-center"
            :color="tags[status][0]"
            v-text="event.title"
          />
          <v-divider />
          <v-chip
            v-if="event.difftime && status === 'current'"
            label
            dark
            :color="event.difftime < 86400000 ? 'pink darken-1' : ''"
            class="d-flex justify-center align-center"
            v-text="`结束于 ${formatTime(event.difftime)}`"
          />
          <v-chip
            v-if="event.difftime && status === 'incoming'"
            label
            dark
            :color="event.difftime < 86400000 ? 'green darken-2' : ''"
            class="d-flex justify-center align-center"
            v-text="`开始于 ${formatTime(event.difftime)}`"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      tags: {
        outdated: ['gray darken-3', '已经结束的活动'],
        current: ['green darken-2', '正在进行的活动'],
        incoming: ['primary', '即将到来的活动']
      },
      events: {
        outdated: [],
        current: [],
        incoming: []
      }
    }
  },
  created () {
    this.sortEvents()
    this.countdown()
  },
  destroyed () {
    clearInterval(this.counter)
  },
  methods: {
    sortEvents () {
      const now = new Date()
      const re = /^(\d{4})\/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{1,2})$/
      for (let i in this.$store.state.events) {
        const event = this.$store.state.events[i]
        if (event.start.match(re) && event.end.match(re)) {
          let starttime = event.start.match(re).splice(1, 5), endtime = event.end.match(re).splice(1, 5)
          starttime[1] -= 1, endtime[1] -= 1
          starttime = new Date(...starttime)
          endtime = new Date(...endtime)
          if (now.getTime() - starttime.getTime() >= 0 && now.getTime() - endtime.getTime() < 0) {
            this.$set(event, 'difftime', endtime.getTime() - now.getTime())
            this.events.current.push(event)
          }
          else if (now.getTime() - starttime.getTime() < 0) {
            this.$set(event, 'difftime', starttime.getTime() - now.getTime())
            this.events.incoming.push(event)
          }
          else if (now.getTime() - endtime.getTime() >= 0) {
            this.events.outdated.push(event)
          }
        }
      }
    },
    formatTime (time) {
      const days = Math.floor(time / (3600 * 1000 * 24))
      const hours = Math.floor(time / (3600 * 1000) % 24)
      const mins = Math.floor(time / (60 * 1000) % 60)
      const secs = Math.round(time / 1000 % 60)
      const formatted = [[days, '天'], [hours, '小时'], [mins, '分'], [secs, '秒']].filter(x => {
        return x[0] !== 0
      })
      return formatted.flat().join('')
    },
    countdown () {
      this.counter = setInterval(() => {
        for (let i in this.events.current) {
          this.events.current[i].difftime -= 1000
          if (this.events.current[i].difftime <= 0) {
            this.events.outdated.push(this.events.current[i])
            this.events.current.splice(i, 1)
          }
        }
        for (let i in this.events.incoming) {
          this.events.incoming[i].difftime -= 1000
          if (this.events.incoming[i].difftime <= 0) {
            this.events.current.push(this.events.incoming[i])
            this.events.incoming.splice(i, 1)
          }
        }
      }, 1000)
    }
  }
}
</script>
