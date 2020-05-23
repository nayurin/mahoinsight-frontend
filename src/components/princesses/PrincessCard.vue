<template>
  <v-card>
    <v-card-title>角色立绘</v-card-title>
    <v-img
      :src="sourceURL()"
    />
    <v-card-text
      v-html="comment()"
    />
  </v-card>
</template>

<script>
export default {
  name: 'PrincessCard',
  props: {
    princess: {
      type: Object,
      required: true
    }
  },
  methods: {
    sourceURL () {
      return `/image/character_stills/still_unit_${this.princess.id.toString().replace(/01$/, '31')}.png`
    },
    comment () {
      return this.princess.status.comment.replace(/\\n/g, '<br/>')
    }
  }
}
</script>
