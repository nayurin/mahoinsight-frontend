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
          label="举例: A-B [ normal | hard ]"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
          clearable
          @input="onSearchboxInputted()"
          @focus="onSearchboxFocused()"
          @blur="onSearchboxBlurred()"
          @click:clear="onSearchboxClearred()"
        />
        <template v-slot:extension>
          <v-overlay
            absolute
            :value="overlay"
            opacity="0.47"
          />
          <v-tabs
            centered
          >
            <v-tab
              @click="onClickOfDiff('normal')"
              v-text="`普通难度`"
            />
            <v-tab
              @click="onClickOfDiff('hard')"
              v-text="`困难难度`"
            />
            <v-tab
              @click="onClickOfDiff('other')"
              v-text="`其他`"
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
        opacity="0.47"
      />
      <v-tabs
        v-model="area"
        dark
        show-arrows
        background-color="primary"
        slider-color="orange lighten-3"
      >
        <v-tab
          v-for="(value, key) in this[diff]"
          :key="key"
          @click="onClickOfArea(value.area_id)"
          v-text="value.area_name"
        />
      </v-tabs>
      <v-tabs-items v-model="area">
        <v-tab-item
          v-for="(value, key) in this[diff]"
          :key="key"
        />
      </v-tabs-items>
    </v-card>

    <v-row 
      no-gutters
      class="d-flex flex-nowrap"
    >
      <v-col cols="auto">
        <v-card
          v-show="x"
        >
          <v-overlay
            absolute
            :value="overlay"
            opacity="0.47"
          />
          <v-tabs
            v-model="quest"
            slider-size="4"
            slider-color="purple"
            vertical
          >
            <v-tab
              v-for="value of listArea"
              :key="value"
              class="pl-2 pr-2"
              @click="onClickOfQuest(value)"
              v-text="$store.getters.getQuestNameById(value)"
            />
          </v-tabs>
          <v-tabs-items v-model="quest">
            <v-tab-item
              v-for="value of listArea"
              :key="value"
            />
          </v-tabs-items>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <v-card
          v-show="y"
        >
          <v-card-title>{{ $store.getters.getQuestNameById(y) }}</v-card-title>
          <v-expansion-panels
            v-model="panel"
            hover
            focusable
            accordion
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header>基本信息</v-expansion-panel-header>
              <v-expansion-panel-content class="pt-4">
                <v-card
                  outlined
                >
                  <v-row>
                    <v-col cols="auto">
                      <v-list-item
                        v-for="(value, key) in info"
                        :key="key"
                        class="ml-4 pa-0"
                        dense
                      >
                        <v-btn
                          small
                          color="primary"
                          v-text="key"
                        />
                        <v-btn
                          text
                          small
                          v-text="value"
                        />
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>魔物数据</v-expansion-panel-header>
              <v-expansion-panel-content class="pt-4">
                <v-card
                  v-for="(value, key) in enemy"
                  :key="key"
                >
                  <v-row dense>
                    <v-col
                      cols="auto"
                      class="d-flex flex-row flex-wrap align-center"
                    >
                      <v-card-subtitle
                        class="pa-2"
                        v-text="key"
                      />
                      <EnemyFigure
                        v-for="(id, i) of value"
                        :key="i"
                        :enemyid="id"
                        :zoom-ratio="zoom"
                        class="ml-1 mr-1"
                      />
                    </v-col>
                  </v-row>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>道具掉落</v-expansion-panel-header>
              <v-expansion-panel-content class="pt-4">
                <QuestReward
                  v-if="y"
                  :id="y"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QuestReward from '@/components/quests/QuestReward'
import EnemyFigure from '@/components/global/EnemyFigure'

export default {
  name: 'Quest',
  components: {
    QuestReward,
    EnemyFigure
  },
  data () {
    return {
      area: null,
      quest: null,
      x: 0,
      y: 0,
      diff: 'normal',
      searchbox: '',
      overlay: false,
      panel: [2],
      axis: {
        x: 0,
        y: 0
      }
    }
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
      return this.$store.getters.getQuestListByArea(this.x)
    },
    info () {
      return this.y ? {
        体力消耗: this.$store.getters.getQuestInfoById(this.y).stamina,
        每波限时: `${this.$store.getters.getQuestInfoById(this.y).limit_time}s`,
        好感度获得: this.$store.getters.getQuestInfoById(this.y).love,
        主角等级限制: this.$store.getters.getQuestInfoById(this.y).limit_team_level || "不限制",
        角色经验获得: this.$store.getters.getQuestInfoById(this.y).unit_exp,
        主角经验获得: this.$store.getters.getQuestInfoById(this.y).team_exp,
        每日挑战次数: this.$store.getters.getQuestInfoById(this.y).daily_limit || "不限制"
      } : null
    },
    enemy () {
      const enemies = {}
      const re = /^enemy_id_(\d)_in_wave_(\d)$/
      for (const i in this.$store.getters.getQuestEnemyIdById(this.y)) {
        const enemy = this.$store.getters.getQuestEnemyIdById(this.y)[i]
        if (Object.keys(enemy)[0].match(re) && Object.keys(enemy)[0].match(re).length === 3) {
          if (Object.prototype.hasOwnProperty.call(enemies, `第${Object.keys(enemy)[0].match(re)[2]}波`)) {
            enemies[`第${Object.keys(enemy)[0].match(re)[2]}波`].push(Object.values(enemy)[0])
          } else {
            enemies[`第${Object.keys(enemy)[0].match(re)[2]}波`] = [Object.values(enemy)[0]]
          }
        }
      }
      return enemies
    },
    zoom () {
      return this.$store.state.mobile ? "0.45" : "0.6"
    }
  },
  created () {
    if (this.$route.query) this.resolveQuest(this.$route.query.questid)
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
        this.x = this.search().x,
        this.y = this.search().y,
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
        x: Number(id.substring(0, 5)),
        y: Number(id)
      } : null
    },
    resolveQuest (id) {
      if (this.$store.getters.getQuestNameById(Number(id))) {
        this.x = Number(String(id).substring(0, 5))
        this.y = Number(String(id))
      } else {
        this.x = 0
        this.y = 0
      }
    }
  }
}
</script>
