<template>
  <v-card>
    <v-card-title id="princess-card">
      角色立绘
    </v-card-title>
    <v-img
      :src="sourceURL"
    />
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
    princess: {
      type: Object,
      required: true
    }
  },
  computed: {
    sourceURL () {
      return `/image/character_stills/still_unit_${this.princess.id.toString().replace(/01$/, '31')}.png`
    },
    comment () {
      return this.princess.status.comment.replace(/\\n/g, '<br/>')
    },
    nact () {
      return `${this.princess.status.normal_atk_cast_time}s`
    },
    pos () {
      return {
        1: "/image/bg/front.png",
        2: "/image/bg/middle.png",
        3: "/image/bg/behind.png"
      }[this.$store.getters.getPrincessPositionByName(this.princess.status.unit_name)]
    }
  }
}
</script>
