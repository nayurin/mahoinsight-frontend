<template>
  <v-container fluid>
    <v-card-title class="font-weight-bold">
      MahoMaho INSIGHT!!
    </v-card-title>
    <v-card-text>
      欢迎访问<strong>公主连结Re:Dive 简体中文服</strong>资讯站  MahoMaho INSIGHT!! 真步真步视界术
    </v-card-text>
    <v-tabs
      id="tab--home"
      v-model="tab"
      class="px-5"
    >
      <v-tab>
        活动日历
      </v-tab>
      <v-tab>
        时间线
      </v-tab>
    </v-tabs>
    <v-tabs-items
      id="tab--home-items"
      v-model="tab"
    >
      <v-tab-item>
        <EventsCounter />
      </v-tab-item>
      <v-tab-item>
        <EventsTimeline />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import EventsCounter from '@/views/home/EventsCounter'
import EventsTimeline from '@/views/home/EventsTimeline'

export default {
  name: 'Home',
  components: {
    EventsCounter,
    EventsTimeline
  },
  data () {
    return {
      tab: 0
    }
  }
}
</script>

<style>
  div#tab--home>.v-tabs-bar,#tab--home-items {
    background-color: rgba(0, 0, 0, 0);
  }
</style>
