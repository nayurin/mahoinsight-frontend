<template>
  <v-container>
    <v-card-title>★3</v-card-title>
    <v-row no-gutters>
      <v-col
        v-for="id of star(3)"
        :key="id"
        cols="auto"
      >
        <v-card
          class="ma-1"
          outlined
          tile
        >
          <PrincessFigure
            :id="id"
            :zoom-ratio="zoom"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-card-title>★2</v-card-title>
    <v-row no-gutters>
      <v-col
        v-for="id of star(2)"
        :key="id"
        cols="auto"
      >
        <v-card
          class="ma-1"
          outlined
          tile
        >
          <PrincessFigure
            :id="id"
            :zoom-ratio="zoom"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-card-title>★1</v-card-title>
    <v-row no-gutters>
      <v-col
        v-for="id of star(1)"
        :key="id"
        cols="auto"
      >
        <v-card
          class="ma-1"
          outlined
          tile
        >
          <PrincessFigure
            :id="id"
            :zoom-ratio="zoom"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PrincessFigure from '@/components/global/PrincessFigure'

export default {
  name: 'ListByRarity',
  components: {
    PrincessFigure
  },
  computed: {
    zoom () {
      return this.$store.state.mobile ? "0.35" : "0.6"
    }
  },
  methods: {
    star (stars) {
      return this.$store.getters.princessIdList.filter(x => this.$store.getters.getUnitData(x).rarity === stars).map(x => Number(x))
    }
  }
}
</script>
