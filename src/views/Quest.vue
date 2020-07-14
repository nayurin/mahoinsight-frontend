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
          label="用法: A-B [ normal | hard ]"
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
            v-model="diff_"
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
        v-model="x"
        dark
        show-arrows
        background-color="primary"
        slider-color="orange lighten-3"
      >
        <v-tab
          v-for="(value, key) in listArea[diff]"
          :key="key"
          v-text="value.area_name"
        />
      </v-tabs>
      <v-tabs-items v-model="x">
        <v-tab-item
          v-for="(value, key) in listArea[diff]"
          :key="key"
        />
      </v-tabs-items>
    </v-card>

    <v-row
      no-gutters
      class="d-flex flex-nowrap"
    >
      <v-col
        v-show="showQuestTabs"
        cols="12"
        lg="auto"
      >
        <v-card>
          <v-overlay
            absolute
            :value="overlay"
            opacity="0.47"
          />
          <v-tabs
            v-model="y"
            slider-size="4"
            slider-color="purple"
            vertical
            :grow="$store.state.mobile ? true : false"
          >
            <v-tab
              v-for="value of listQuest"
              :key="value"
              class="pl-2 pr-2"
              v-text="getQuestName(value)"
            />
          </v-tabs>
          <v-tabs-items v-model="y">
            <v-tab-item
              v-for="value of listQuest"
              :key="value"
            />
          </v-tabs-items>
        </v-card>
      </v-col>
      <v-col
        v-show="showQuestDetails"
        cols="12"
        lg="auto"
      >
        <v-card>
          <v-card-title>
            <v-btn
              v-if="$store.state.mobile"
              color="success"
              small
              rounded
              class="mx-2"
              @click="quest = 0"
            >
              <v-icon>mdi-arrow-left-drop-circle-outline</v-icon>
            </v-btn>
            {{ getQuestName(quest) }}
          </v-card-title>
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
                      <v-row
                        v-for="(group, groupid) of value"
                        :key="groupid"
                      >
                        <v-col class="col-auto d-flex flex-row flex-wrap align-center">
                          <EnemyFigure
                            v-for="(enemyid, i) of listEnemies(group)"
                            :key="i"
                            :enemyid="enemyid"
                            :zoom-ratio="zoom"
                            class="ml-1 mr-1"
                          />
                        </v-col>
                        <v-card-text
                          class="py-0 px-5 font-weight-light"
                        >
                          该魔物配置出现几率： {{ group.odds }} %
                        </v-card-text>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>道具掉落</v-expansion-panel-header>
              <v-expansion-panel-content class="pt-4">
                <QuestReward
                  v-if="quest"
                  :id="quest"
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
        diff_: 0,
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
      listAll () {
        return this.$store.getters.getQuestDataByDiff
      },
      listArea () {
        return this.$store.getters.getQuestAreaDataByDiff
      },
      listQuest () {
        return this.listAll[this.diff].filter(i => i.area_id === Number(this.area)).map(i => i.quest_id)
      },
      info () {
        const quest = this.$store.getters.getQuestData(this.quest)
        return quest ? {
          体力消耗: quest.stamina,
          每波限时: `${quest.limit_time}s`,
          好感度获得: quest.love,
          主角等级限制: quest.limit_team_level || "不限制",
          角色经验获得: quest.unit_exp,
          主角经验获得: quest.team_exp,
          每日挑战次数: quest.daily_limit || "不限制"
        } : null
      },
      enemy () {
        const enemies = {}
        const quest = this.$store.getters.getQuestData(this.quest)
        const waves = [
          quest?.wave_group_id_1,
          quest?.wave_group_id_2,
          quest?.wave_group_id_3
        ]
        for (let i = 1; i <= 3; i++) {
          enemies[`第${i}波`] = this.$store.getters.getWaveGroupData(waves[i - 1])
        }
        console.log(enemies)
        return enemies
      },
      zoom () {
        return this.$store.state.mobile ? "0.45" : "0.6"
      },
      showQuestTabs () {
        if (this.$store.state.mobile && !this.area) return false
        if (this.$store.state.mobile && this.area && this.quest) return false
        return true
      },
      showQuestDetails () {
        return this.quest ? true : false
      }
    },
    watch: {
      area (val) {
        this.x = val % 100 - 1
      },
      quest (val) {
        this.x = (val - val % 100) / 1000 % 100 - 1
        this.y = val % 100 - 1
      },
      x (val) {
        switch (this.diff) {
          case 'normal':
            this.area = 11000 + val + 1
            break
          case 'hard':
            this.area = 12000 + val + 1
            break
          case 'other':
            this.area = 18000 + val + 1
            break
          default:
            break
        }
        this.quest = this.area * 1000 + this.y + 1
      },
      y (val) {
        this.quest = this.area * 1000 + val + 1
      },
      diff (val) {
        switch (val) {
          case 'normal':
            this.diff_ = 0
            break
          case 'hard':
            this.diff_ = 1
            break
          case 'other':
            this.diff_ = 2
            break
          default:
            break
        }
      }
    },
    created () {
      if (this.$route.query) {
        this.resolveQuest(this.$route.query.questid)
      }
      console.log(this.diff)
    },
    methods: {
      onClickOfDiff (diff) {
        if (this.diff === diff) return
        this.diff = diff
        const area = this.listAll[diff][0].area_id
        this.area = area
        this.quest = Number(area) * 1000 + 1
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
          this.area = this.search().area,
          this.quest = this.search().quest,
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
        return this.$store.getters.getQuestData(id) ? {
          diff: diff,
          area: Number(id.substring(0, 5)),
          quest: Number(id)
        } : null
      },
      getQuestName (id) {
        const quest = this.$store.getters.getQuestDataByDiff[this.diff].filter(i => i.quest_id === id)[0]
        if (!quest) return
        return quest.quest_name
      },
      resolveQuest (id) {
        if (this.$store.getters.getQuestData(id)) {
          this.area = Number(String(id).substring(0, 5))
          this.quest = Number(id)
          switch (String(this.area).substring(0, 2)) {
            case '11':
              this.diff = 'normal'
              break
            case '12':
              this.diff = 'hard'
              break
            default:
              this.diff = 'other'
          }
        } else {
          const area = this.listAll['normal'][0]?.area_id
          this.area = area
          this.quest = area * 1000 + 1
          this.diff = 'normal'
        }
      },
      listEnemies (group) {
        return [
          group.enemy_id_1,
          group.enemy_id_2,
          group.enemy_id_3,
          group.enemy_id_4,
          group.enemy_id_5
        ].filter(i => i)
      }
    }
  }
</script>
