<template>
  <v-card
    :to="route"
  >
    <v-img
      :src="src"
      :alt="name"
      :style="style"
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
    <v-row
      class="d-flex justify-center align-center"
      no-gutters
    >
      <v-col>
        <v-btn
          small
          block
          :color="$store.getters.getUnitData(id).atk_type === 1 ? 'pink' : 'indigo'"
          class="pa-0 font-weight-light white--text"
          v-text="name"
        />
      </v-col>
      <slot name="add" />
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'PrincessFigure',
  props: {
    id: {
      type: Number,
      required: true
    },
    zoomRatio: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      origHeight: 180,
      origWidth: 180
    }
  },
  computed: {
    name () {
      return this.$store.getters.getUnitData(this.id)?.unit_name
    },
    route () {
      return {
        name: 'PrincessDetail',
        params: { princessName: this.name }
      }  
    },
    src () {
      return `${this.$store.state.CDNBaseURL}/image/character_favicons/fav_push_notif_${this.id}.png`
    },
    style () {
      return {
        height: `${this.origHeight * parseFloat(this.zoomRatio)}px`,
        width: `${this.origWidth * parseFloat(this.zoomRatio)}px`
      }
    }
  }
}
</script>
