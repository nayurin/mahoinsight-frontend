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
        v-for="id of front"
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
    <v-row>
      <v-card-title>中卫</v-card-title>
      <v-img
        :src="figmiddle"
        max-width=36
        class="ml-3"
        contain
      />
    </v-row>
    <v-row no-gutters>
      <v-col
        v-for="id of middle"
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
    <v-row>
      <v-card-title>后卫</v-card-title>
      <v-img
        :src="figbehind"
        max-width=36
        class="ml-3"
        contain
      />
    </v-row>
    <v-row no-gutters>
      <v-col
        v-for="id of behind"
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
      return this.$store.getters.princessIdList.filter(x => this.$store.getters.getUnitData(x).search_area_width < this.$store.state.widthThreshold[0]).map(x => Number(x))
    },
    middle () {
      return this.$store.getters.princessIdList.filter(x => this.$store.getters.getUnitData(x).search_area_width >= this.$store.state.widthThreshold[0] && this.$store.getters.getUnitData(x).search_area_width < this.$store.state.widthThreshold[1]).map(x => Number(x))
    },
    behind () {
      return this.$store.getters.princessIdList.filter(x => this.$store.getters.getUnitData(x).search_area_width >= this.$store.state.widthThreshold[1]).map(x => Number(x))
    },
    zoom () {
      return this.$store.state.mobile ? "0.35" : "0.6"
    }
  }
}
</script>
