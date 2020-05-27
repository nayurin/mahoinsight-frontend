<template>
  <v-container fluid>
    <v-card>
      <v-toolbar
        color="gray"
        flat
      >
        <v-text-field
          v-model="searchbox"
          class="mx-4"
          flat
          hide-details
          label="可以使用如A-B的格式来查询"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
          clearable
          @input="onSearchboxInputted()"
          @focus="onSearchboxFocused()"
          @blur="onSearchboxBlurred()"
          @click:clear="onSearchboxClearred()"
        >
        </v-text-field>
          <template v-slot:extension>
            <v-overlay
              absolute
              :value="overlay"
              opacity=0.47
            />
            <v-tabs
              centered
            >
              <v-tab
                v-text="`普通难度`"
                @click="onClickOfDiff('normal')"
              />
              <v-tab
                v-text="`困难难度`"
                @click="onClickOfDiff('hard')"
              />
              <v-tab
                v-text="`其他`"
                @click="onClickOfDiff('other')"
              />
            </v-tabs>
          </template>
      </v-toolbar>
    </v-card>

    <v-card
      v-show="diff"
    >
      <v-overlay
        absolute
        :value="overlay"
        opacity=0.47
      />
      <v-tabs
        dark
        v-model="a"
        show-arrows
        background-color="primary"
        slider-color="orange lighten-3"
      >
        <v-tab
          v-for="(value, key) in this[diff]"
          :key="key"
          v-text="value.area_name"
          @click="onClickOfArea(value.area_id)"
        />
      </v-tabs>
      <v-tabs-items v-model="a">
        <v-tab-item
          v-for="(value, key) in this[diff]"
          :key="key"
        >
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <v-row no-gutters>
      <v-col cols="auto">
        <v-card
          v-show="x"
        >
          <v-overlay
            absolute
            :value="overlay"
            opacity=0.47
          />
          <v-tabs
            v-model="q"
            slider-size=4
            slider-color="purple"
            vertical
          >
            <v-tab
              v-for="value of listArea"
              :key="value"
              v-text="$store.getters.getQuestNameById(value)"
              @click="onClickOfQuest(value)"
            >
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="q">
            <v-tab-item
              v-for="value of listArea"
              :key="value"
            >
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <v-card
          v-show="y"
        >
          <v-card-title>{{ $store.getters.getQuestNameById(y) }}</v-card-title>
          <v-card-text>{{ searchbox }} -- {{ search() }} --</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    

    
      
  </v-container>
</template>

<script>
// import ItemFigure from '@/components/ItemFigure'

export default {
  name: 'Quest',
  components: {
    // ItemFigure
  },
  data () {
    return {
      a: null,
      q: null,
      x: 0,
      y: 0,
      diff: 'normal',
      searchbox: '',
      overlay: false,
      axis: {
        x: 0,
        y: 0
      }
    }
  },
  watch: {
  },
  computed: {
    normal () {
      return this.$store.getters.getQuestArea().normal
    },
    hard () {
      return this.$store.getters.getQuestArea().hard
    },
    other () {
      return this.$store.getters.getQuestArea().other
    },
    listArea () {
      // console.log(this.x)
      return this.$store.getters.getQuestListByArea(this.x)
    }
  },
  methods: {
    onClickOfDiff (diff) {
      this.x = 0
      this.y = 0
      this.diff = diff
    },
    onClickOfArea (area) {
      this.x = area
      this.y = 0
    },
    onClickOfQuest (quest) {
      this.y = quest
      // console.log(this.$store.getters.getQuestRewardById(quest))
    },
    onSearchboxFocused () {
      this.overlay = true
      this.axis = {
        x: this.x,
        y: this.y
      }
    },
    onSearchboxBlurred () {
      this.overlay = false
    },
    onSearchboxClearred () {
      this.x = this.axis.x
      this.y = this.axis.y
    },
    onSearchboxInputted () {
      if (this.search()) {
        this.x = Number(this.search().x),
        this.y = Number(this.search().y),
        this.diff = this.search().diff
      }
    },
    search () {
      const regexpQuest = /([1-9]\d{0,})-([1-9]\d{0,})/
      const regexpDiff = /([a-z]{1,})/
      let area = "",
          quest = "",
          id = "",
          diff = this.diff
      if (this.searchbox && this.searchbox.match(regexpQuest) && this.searchbox.match(regexpQuest)[1].length <= 2 && this.searchbox.match(regexpQuest)[2].length <= 2) {
        area = this.searchbox.match(regexpQuest)[1]
        quest = this.searchbox.match(regexpQuest)[2]
      }
      if (this.searchbox && this.searchbox.match(regexpDiff) && this.$store.state.difficulties.includes(this.searchbox.match(regexpDiff)[1])) {
        diff = this.searchbox.match(regexpDiff)[1]
      }
      if (area && quest){
        switch (diff) {
          case "normal":
            id = String(Number(area) * 1000 + Number(quest) + 11000000)
            break
          case "hard":
            id = String(Number(area) * 1000 + Number(quest) + 12000000)
            break
          default:
            id = String(Number(area) * 1000 + Number(quest) + 18000000)
        }
      }
      return this.$store.getters.getQuestNameById(Number(id)) ? {
        diff: diff,
        x: id.substring(0, 5),
        y: id
      } : null
    }
  },
  created () {
    // console.log(this.listArea)
    // console.log(this.$store.getters.getQuestArea())
  }
}
</script>
