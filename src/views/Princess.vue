<template>
  <v-container fluid>
    <h3>角色列表</h3>
    <v-row>
      <v-col
        cols="auto"
        v-for="chara of princess()"
        :key="chara.id"
      >
        <v-card
          class="ma-1"
          outlined
          tile
        >
          <PrincessFigure
            :princess="chara"
            zoomRatio="0.8"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PrincessFigure from '@/components/global/PrincessFigure'

export default {
  name: 'Princess',
  components: {
    PrincessFigure
  },
  methods: {
    princess () {
      return this.$store.state.chara
    }
  },
  created () {
    // if (!Object.keys(this.princess()).length) {
    //   this.$store.commit('loadObjects', 'chara')
    // }
  }
}
</script>

<style>

</style>
