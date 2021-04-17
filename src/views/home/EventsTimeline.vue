<template>
  <v-timeline
    align-top
    :dense="$vuetify.breakpoint.smAndDown"
  >
    <v-timeline-item
      v-for="(event, i) in events.jp"
      :key="i"
      :color="items[event.category].color"
      :icon="items[event.category].icon"
      fill-dot
    >
      <v-card
        :color="items[event.category].color"
        dark
      >
        <v-card-title
          class="text-h6"
          v-text="`【${eventstype[event.category]}】${event.title}`"
        />
        <v-card-subtitle
          v-if="event.category === 'sidestory'"
          class="text-subtitle-1"
          v-text="`活动碎片奖励： ${event.rewards.join('，')}`"
        />
        <v-card-text
          v-html="comment(i)"
        />
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  name: 'EventsTimeline',
  data () {
    return {
      items: {
        gacha: {
          color: 'red lighten-2',
          icon: 'mdi-dice-d10',
        },
        clanbattle: {
          color: 'indigo',
          icon: 'mdi-chess-king',
        },
        sidestory: {
          color: 'green lighten-1',
          icon: 'mdi-star',
        }
      },
      servers: ['tw', 'jp'],
      eventstype: {
        gacha: '扭蛋',
        clanbattle: '团队战',
        sidestory: '活动剧情'
      },
      events: {
        cn: [],
        tw: [],
        jp: []
      },
      offset: 60 * 60 * 24 * 60 * 1000,
      msToDays: 60 * 60 * 24 * 1000,
      GMT8Time: new Date().getTime() - ((-480 - new Date().getTimezoneOffset()) * 1000 * 60)
    }
  },
  computed: {
    baseAnchor () {
      const re = /^(\d{4})\/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{1,2})(:\d{1,2})?$/
      for (let event of this.$store.state.events.cn) {
        event = JSON.parse(JSON.stringify(event))
        let starttime = event.start.match(re).splice(1, 5), endtime = event.end.match(re).splice(1, 5)
        starttime[1] -= 1, endtime[1] -= 1
        starttime = new Date(...starttime).getTime()
        endtime = new Date(...endtime).getTime()
        if (this.GMT8Time - starttime >= 0 && this.GMT8Time - endtime < 0) {
          if (event.anchorid) {
            return {
              id: event.anchorid,
              starttime: starttime
            }
          }
        }
      }
      return null
    },
    anchorEvent () {
      return {
        tw: this.$store.state.events.tw.filter(x => x.anchorid === this.baseAnchor.id)[0],
        jp: this.$store.state.events.jp.filter(x => x.anchorid === this.baseAnchor.id)[0]
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    eventsfilterCN () {
      const re = /^(\d{4})\/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{1,2})(:\d{1,2})?$/
      for (let event of this.$store.state.events.cn) {
        event = JSON.parse(JSON.stringify(event))
        if (!Object.prototype.hasOwnProperty.call(this.eventstype, event.category)) {
          continue
        }
        let [starttime, endtime] = [event.start.match(re).splice(1, 5), event.end.match(re).splice(1, 5)]
          .map(x => (x[1] -= 1, x))
          .map(x => new Date(...x))
        event.starttime = starttime.getTime()
        event.duration = [2, 3, 4].includes(endtime.getHours()) ? Math.floor((endtime.getTime() - starttime.getTime()) / this.msToDays) : Math.ceil((endtime.getTime() - starttime.getTime()) / this.msToDays)
        if ((this.GMT8Time - starttime.getTime() >= 0 && this.GMT8Time - endtime.getTime() < 0) || (this.baseAnchor.starttime - event.starttime <= 0)) {
          this.events.cn.push(event)
        }
      }
    },
    eventsFilter (server, event) {
      const re = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/
      let anchorstart = this.anchorEvent[server].start.match(re).splice(1, 3)
      event = JSON.parse(JSON.stringify(event))
      anchorstart[1] -= 1
      anchorstart = new Date(...anchorstart).getTime()
      if (event.start.match(re) && event.end.match(re)) {
        let starttime = event.start.match(re).splice(1, 3), endtime = event.end.match(re).splice(1, 3)
        starttime[1] -= 1, endtime[1] -= 1
        event.starttime = new Date(...starttime).getTime()
        endtime = new Date(...endtime).getTime()
        event.duration = (endtime - event.starttime) / this.msToDays
        if ((anchorstart - event.starttime >= 0 && anchorstart - endtime < 0) || (anchorstart - event.starttime > -this.offset && anchorstart - event.starttime <= 0)) {
          if (Object.prototype.hasOwnProperty.call(this.eventstype, event.category)) this.events[server].push(event)
        }
      }
    },
    eventsSort () {
      for (const server of this.servers.concat('cn')) {
        this.events[server] = this.events[server].sort((x, y) => x.starttime - y.starttime)
      }
    },
    init () {
      for (const server of this.servers) {
        this.$store.state.events[server].forEach(event => this.eventsFilter(server, event))
      }
      this.eventsfilterCN()
      this.eventsSort()
    },
    comment (index) {
      let comment = ''
      for (const server of ['cn', 'tw', 'jp']) {
        if (this.events[server][index]) {
          comment += `${server.toUpperCase()}：【${this.eventstype[this.events[server][index].category]}】${this.events[server][index].title}<br>`
          comment += `活动开始时间：${this.events[server][index].start}<br>`
          comment += `活动结束时间：${this.events[server][index].end}<br>`
          comment += `持续：${this.events[server][index].duration} 天<br>`
          comment += '<br>'
        }
      }
      return comment.substring(0, comment.length - 4)
    }
  }
}
</script>
