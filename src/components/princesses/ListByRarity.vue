<template>
  <v-container>
    <v-card-title>★3</v-card-title>
    <v-row no-gutters>
      <v-col
        v-for="chara of star(3)"
        :key="chara.id"
        cols="auto"
      >
        <v-card
          class="ma-1"
          outlined
          tile
        >
          <PrincessFigure
            :princess="chara"
            zoom-ratio="0.6"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-card-title>★2</v-card-title>
    <v-row dense>
      <v-col
        v-for="chara of star(2)"
        :key="chara.id"
        cols="auto"
      >
        <v-card
          class="ma-1"
          outlined
          tile
        >
          <PrincessFigure
            :princess="chara"
            zoom-ratio="0.6"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-card-title>★1</v-card-title>
    <v-row dense>
      <v-col
        v-for="chara of star(1)"
        :key="chara.id"
        cols="auto"
      >
        <v-card
          class="ma-1"
          outlined
          tile
        >
          <PrincessFigure
            :princess="chara"
            zoom-ratio="0.6"
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
  methods: {
    star (stars) {
      return Object.values(this.$store.state.chara).filter(x => {
        return x.status.rarity === stars
      })
    }
  }
}
</script>
