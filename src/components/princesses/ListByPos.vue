<template>
  <v-container>
    <v-row>
      <v-card-title>前卫</v-card-title>
      <v-img
        :src="figfront"
        max-width=36
        class="ml-3"
        contain
      />
    </v-row>
    <v-row no-gutters>
      <v-col
        v-for="chara of front"
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
    <v-row>
      <v-card-title>中卫</v-card-title>
      <v-img
        :src="figmiddle"
        max-width=36
        class="ml-3"
        contain
      />
    </v-row>
    <v-row dense>
      <v-col
        v-for="chara of middle"
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
    <v-row>
      <v-card-title>后卫</v-card-title>
      <v-img
        :src="figbehind"
        max-width=36
        class="ml-3"
        contain
      />
    </v-row>
    <v-row dense>
      <v-col
        v-for="chara of behind"
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
  name: 'ListByPos',
  components: {
    PrincessFigure
  },
  data () {
    return {
      figfront: "/image/bg/front.png",
      figmiddle: "/image/bg/middle.png",
      figbehind: "/image/bg/behind.png"
    }
  },
  computed: {
    front () {
      return Object.values(this.$store.state.chara).filter(x => {
        return x.status.search_area_width < this.$store.state.widthThreshold[0]
      })
    },
    middle () {
      return Object.values(this.$store.state.chara).filter(x => {
        return x.status.search_area_width >= this.$store.state.widthThreshold[0] && x.status.search_area_width < this.$store.state.widthThreshold[1]
      })
    },
    behind () {
      return Object.values(this.$store.state.chara).filter(x => {
        return x.status.search_area_width >= this.$store.state.widthThreshold[1]
      })
    }
  }
}
</script>
