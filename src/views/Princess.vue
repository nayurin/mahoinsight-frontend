<template>
  <v-container fluid>
    <v-card-title>角色列表</v-card-title>
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
            zoomRatio="0.6"
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
  }
}
</script>

<style>

</style>
