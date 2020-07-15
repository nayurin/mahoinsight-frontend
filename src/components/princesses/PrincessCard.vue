<template>
  <v-card>
    <v-card-title id="princess-card">
      角色立绘
    </v-card-title>
    <v-img
      :src="sourceURL"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0 align-center justify-center"
        >
          <v-progress-circular
            indeterminate
            color="pink"
          />
        </v-row>
      </template>
    </v-img>
    <v-row no-gutters>
      <v-col>
        <v-card-text
          v-html="comment"
        />
      </v-col>
      <v-col
        class="d-flex flex-row"
      >
        <v-list-item
          class="ml-4 pa-0"
        >
          <v-btn
            small
            color="primary"
            v-text="`攻击动作时间`"
          />
          <v-btn
            text
            small
            v-text="nact"
          />
        </v-list-item>
        <v-list-item
          class="ml-4 pa-0"
        >
          <v-btn
            small
            color="primary"
            v-text="`位置`"
          />
          <v-img
            :src="pos"
            max-width="36"
            class="ml-3"
          />
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'PrincessCard',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    sourceURL () {
      return `${this.$store.state.CDNBaseURL}/image/character_stills/still_unit_${String(this.id).replace(/01$/, '31')}.png`
    },
    comment () {
      return this.$store.getters.getUnitData(this.id)?.comment.replace(/\\n/g, '<br/>')
    },
    nact () {
      return `${this.$store.getters.getUnitData(this.id)?.normal_atk_cast_time}s`
    },
    pos () {
      return {
        1: `${this.$store.state.CDNBaseURL}/image/bg/front.png`,
        2: `${this.$store.state.CDNBaseURL}/image/bg/middle.png`,
        3: `${this.$store.state.CDNBaseURL}/image/bg/behind.png`
      }[this.$store.getters.getPrincessPosition(this.id)]
    }
  }
}
</script>
