<template>
  <v-row no-gutters>
    <v-col
      v-for="(id, i) of sorted"
      :key="i"
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
        >
          <template #add>
            <v-card-text
              class="pa-0 ma-0 text-center font-weight-bold"
              v-text="profile(id)"
            />
          </template>
        </PrincessFigure>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PrincessFigure from '@/components/global/PrincessFigure'

export default {
  name: 'SortPrincess',
  components: {
    PrincessFigure
  },
  props: {
    sortby: {
      type: String,
      required: true
    },
    sort: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    up2down () {
      const list = JSON.parse(JSON.stringify(this.$store.getters.princessIdList.map(x => Number(x))))
      return list.sort((x, y) => {
        x = Number(this.$store.getters.getUnitProfile(x)[this.sortby]) || 10000000
        y = Number(this.$store.getters.getUnitProfile(y)[this.sortby]) || 10000000
        return y - x
      })
    },
    down2up () {
      const list = JSON.parse(JSON.stringify(this.$store.getters.princessIdList.map(x => Number(x))))
      return list.sort((x, y) => {
        x = Number(this.$store.getters.getUnitProfile(x)[this.sortby]) || 10000000
        y = Number(this.$store.getters.getUnitProfile(y)[this.sortby]) || 10000000
        return x - y
      })
    },
    sorted () {
      const list = JSON.parse(JSON.stringify(this.$store.getters.princessIdList.map(x => Number(x))))
      switch (this.sortby) {
        case 'saw':
          return this.sort ?
          list.sort((x, y) => this.$store.getters.getUnitData(x).search_area_width - this.$store.getters.getUnitData(y).search_area_width) :
          list.sort((x, y) => this.$store.getters.getUnitData(y).search_area_width - this.$store.getters.getUnitData(x).search_area_width)
        default:
          return this.sort ? this.down2up : this.up2down
      }
    },
    zoom () {
      return this.$store.state.mobile ? "0.55" : "0.6"
    }
  },
  methods: {
    profile (id) {
      switch (this.sortby) {
        case 'age':
        return `${this.$store.getters.getUnitProfile(id).age}岁`
        case 'weight':
          return `${this.$store.getters.getUnitProfile(id).weight}kg`
        case 'height':
          return `${this.$store.getters.getUnitProfile(id).height}cm`
        case 'saw':
          return this.$store.getters.getUnitData(id).search_area_width
        default:
          return
      }
    }
  }
}
</script>
