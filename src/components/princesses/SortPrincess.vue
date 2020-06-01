<template>
  <v-row>
    <v-col
      v-for="(chara, key) of sorted"
      :key="key"
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
        >
          <template v-slot:add>
            <v-chip
              label
              small
              outlined
              class="px-2"
              v-text="profile(chara)"
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
      return Object.values(this.$store.state.chara).sort((x, y) => {
        return Number(y.profile[this.sortby]) - Number(x.profile[this.sortby])
      })
    },
    down2up () {
      return Object.values(this.$store.state.chara).sort((x, y) => {
        return Number(x.profile[this.sortby]) - Number(y.profile[this.sortby])
      })
    },
    sorted () {
      switch (this.sortby) {
        case 'saw':
          return this.sort ? Object.values(this.$store.state.chara).sort((x, y) => {
            return Number(x.status.search_area_width) - Number(y.status.search_area_width)
          }) : Object.values(this.$store.state.chara).sort((x, y) => {
            return Number(y.status.search_area_width) - Number(x.status.search_area_width)
          })
        default:
          return this.sort ? this.down2up : this.up2down
      }
    }
  },
  methods: {
    profile (obj) {
      switch (this.sortby) {
        case 'age':
        return `${obj.profile.age}岁`
        case 'weight':
          return `${obj.profile.weight}kg`
        case 'height':
          return `${obj.profile.height}cm`
        case 'saw':
          return obj.status.search_area_width
        default:
          console.log('invalid param of [sortby]')
      }
    }
  }
}
</script>
