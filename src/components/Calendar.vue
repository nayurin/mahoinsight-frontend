<template>
  <v-row
    class="fill-height"
  >
    <v-col>
      <v-sheet
        height="64"
      >
        <v-toolbar
          flat
          color="white"
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title
            v-if="$refs.calendar"
          >
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer />
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>
                  {{ typeToLabel[type] }}
                </span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        />
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-toolbar-title
                v-html="selectedEvent.name"
              />
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <span
                v-html="eventDetail(selectedEvent)"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                关闭
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Calendar',
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day'
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange'],
    difftime: 0
  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    eventDetail (event) {
      if (Object.prototype.toString.call(event)== '[object Object]' && Object.values(event).length) {
        const start = `${event.start.toLocaleDateString()} ${event.start.toLocaleTimeString()}`
        const end = `${event.end.toLocaleDateString()} ${event.end.toLocaleTimeString()}`
        return event.desc ?
        `<strong>${event.status}</strong><br><br>${event.desc}<br><br>活动开始时间：${start}<br>活动结束时间：${end}` :
        `<strong>${event.status}</strong><br><br>活动开始时间：${start}<br>活动结束时间：${end}`
      }
    },
    updateRange () {
      const events = []
      const re = /^(\d{4})\/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{1,2})$/
      const now = new Date()
      const tzoffset = -480 - now.getTimezoneOffset()

      for (const event of Object.values(this.$store.state.events)) {
        let starttime = event.start.match(re).splice(1, 5), endtime = event.end.match(re).splice(1, 5)
        let status = ''
        starttime[1] -= 1, endtime[1] -= 1
        starttime = new Date(...starttime)
        endtime = new Date(...endtime)
        starttime.setTime(starttime.getTime() + (tzoffset * 1000 * 60))
        endtime.setTime(endtime.getTime() + (tzoffset * 1000 * 60))

        if (now.getTime() - starttime.getTime() >= 0 && now.getTime() - endtime.getTime() < 0) {
          status = '活动进行中'
        }
        else if (now.getTime() - starttime.getTime() < 0) {
          status = '活动即将到来'
        }
        else if (now.getTime() - endtime.getTime() >= 0) {
          status = '活动已结束'
        }
        
        events.push({
          name: event.title,
          start: starttime,
          end: endtime,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          status: status,
          desc: event.desc ? event.desc : null
        })
      }
      this.events = events
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    }
  }
}
</script>
