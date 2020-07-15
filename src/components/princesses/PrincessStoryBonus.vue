<template>
  <v-card>
    <v-card-title
      class="pb-0"
    >
      好感度奖励
    </v-card-title>
    <v-carousel
      id="princess-story-bonus"
      show-arrows-on-hover
      cycle
      hide-delimiters
    >
      <v-carousel-item
        v-for="(value, key) in stories"
        :key="key"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-card-subtitle
          class="py-0"
          v-text="key"
        />
        <v-simple-table
          light
          dense
        >
          <template v-slot:default>
            <tbody>
              <tr
                v-for="(bonus, seq) in value"
                :key="seq"
              >
                <td class="storybonus-text">
                  {{ seq }}
                </td>
                <td>
                  <v-list-item
                    v-for="(itemvalue, itemkey) in bonus"
                    :key="itemkey"
                    dense
                    class="storybonus-text"
                    v-text="`${itemkey} +${itemvalue}`"
                  />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
export default {
  name: 'PrincessStoryBonus',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      stories: {}
    }
  },
  created () {
    this.storyFilter()
  },
  methods: {
    storyFilter () {
      const re = /^(.*)的小故事(.*)$/
      const baseid = (this.id - this.id % 100) / 100
      const storybonus = this.$store.getters.getCharaStoryStatusEX({ baseid })
      for (const story of Object.keys(storybonus)) {
        if (story.match(re) && story.match(re)[1] && !Object.prototype.hasOwnProperty.call(this.stories, story.match(re)[1])) {
          this.$set(this.stories, story.match(re)[1], { [story.match(re)[2]]: storybonus[story] })
        } else if (story.match(re) && Object.keys(this.stories).includes(story.match(re)[1])) {
          this.$set(this.stories[story.match(re)[1]], story.match(re)[2], storybonus[story])
        }
      }
    }
  }
}
</script>

<style scoped>
  .storybonus-text {
    font-size: 0.8em !important;
  }
</style>
