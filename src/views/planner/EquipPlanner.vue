<template>
  <v-container id="planner-container">
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step
          :complete="step > 1"
          editable
          step="1"
        >
          选择角色
          <small>（可跳过）</small>
        </v-stepper-step>
        <v-divider />
        <v-stepper-step
          :complete="step > 2"
          editable
          step="2"
        >
          选择装备
        </v-stepper-step>
        <v-divider />
        <v-stepper-step
          step="3"
        >
          开始模拟
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
            class="mb-12"
            color="grey lighten-1"
          >
            <v-card-subtitle>
              装备需求
            </v-card-subtitle>
            <v-row
              v-for="(equips, chara) in requirement"
              :key="chara"
              no-gutters
              class="px-4 py-3"
            >
              <v-col
                class="col-12 py-2"
              >
                <v-chip
                  label
                  color="primary"
                  v-text="$store.getters.getPrincessNameById(Number(chara))"
                />
              </v-col>
              <v-col
                v-for="(amount, itemid) in equips"
                :key="itemid"
                class="col-auto"
              >
                <ItemFigure
                  v-if="Number(itemid) !== 999999"
                  :id="Number(itemid)"
                  zoom-ratio="0.5"
                >
                  <template v-slot:inner>
                    <v-badge
                      inline
                      bordered
                      color="light-green darken-2"
                      :content="amount"
                    />
                  </template>
                </ItemFigure>
              </v-col>
            </v-row>
          </v-card>
          <v-switch
            v-model="step1switch"
            label="从用户档案中选择"
            class="mx-5"
          />
          <v-card
            v-if="step1switch"
            class="mb-12"
          >
            <v-card-title>
              用户档案
            </v-card-title>
            <v-row>
              <v-col
                v-for="(item, i) in storagedPrincess"
                :key="i"
                class="col-auto"
              >
                <PrincessPlate
                  :id="item"
                  fromto
                  zoom-ratio="0.5"
                />
              </v-col>
            </v-row>
          </v-card>
          <v-card
            v-else
            class="mb-12"
          >
            <v-card-title>
              全部角色
            </v-card-title>
            <v-row>
              <v-col
                v-for="(item, i) in fullPrincess"
                :key="i"
                class="col-auto"
              >
                <PrincessPlate
                  :id="item"
                  fromto
                  zoom-ratio="0.5"
                />
              </v-col>
            </v-row>
          </v-card>
          <v-btn
            color="primary"
            @click="step = 2"
          >
            下一步
          </v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            color="grey lighten-1"
          >
            <v-card-subtitle>
              已选择装备
            </v-card-subtitle>
            <v-row
              no-gutters
              class="px-4 py-3"
            >
              <v-col
                v-for="(amount, itemid) in mergedReq"
                :key="itemid"
                class="col-auto pa-0"
              >
                <v-dialog
                  v-model="editing"
                  :width="$store.state.mobile ? '350' : '380'"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-card
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    >
                      <ItemFigure
                        v-if="Number(itemid) !== 999999"
                        :id="Number(itemid)"
                        no-route
                        zoom-ratio="0.5"
                      >
                        <template v-slot:inner>
                          <v-badge
                            inline
                            bordered
                            color="light-green darken-2"
                            :content="amount"
                          />
                        </template>
                      </ItemFigure>
                    </v-card>
                  </template>
                  <v-card>
                    <v-row no-gutters>
                      <v-col
                        class="col-auto pa-5"
                      >
                        <ItemFigure
                          :id="Number(itemid)"
                          no-route
                          zoom-ratio="0.8"
                        />
                      </v-col>
                      <v-col>
                        <v-card-title>
                          {{ $store.getters.getItemNameById(itemid) }}
                        </v-card-title>
                        <!-- <v-card-subtitle>
                          {{ $store.getters.getItemById(itemid).detail.description.replace(/\\n/g, '') }}
                        </v-card-subtitle> -->
                      </v-col>
                    </v-row>
                    <v-row
                      no-gutters
                      class="justify-center"
                    >
                      <v-col class="col-6">
                        <v-text-field
                          v-model="mergedReq[itemid]"
                          dense
                          :rules="[rules.required, rules.range]"
                          label="数量"
                          @blur="mergedReq[itemid] = mergedReq[itemid] === '' ? 1 : mergedReq[itemid]"
                        />
                      </v-col>
                    </v-row>
                    <v-card-actions class="justify-center">
                      <v-btn
                        color="light-gray"
                        @click="onUpdate(itemid, amount)"
                      >
                        <v-icon left>
                          mdi-text-box-plus-outline
                        </v-icon>
                        修改
                      </v-btn>
                      <v-btn
                        color="light-gray"
                        @click="onRemove(itemid)"
                      >
                        <v-icon left>
                          mdi-text-box-remove-outline
                        </v-icon>
                        删除
                      </v-btn>
                      <v-btn
                        color="light-gray"
                        @click="editing = false"
                      >
                        <v-icon left>
                          mdi-close-box-outline
                        </v-icon>
                        取消
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card>
          <v-card
            class="mb-12"
            color="grey lighten-1"
          >
            <v-card-subtitle>
              需求计算
            </v-card-subtitle>
          </v-card>
          <v-btn
            color="primary"
            @click="step = 3"
          >
            下一步
          </v-btn>
          <v-btn
            text
            @click="showd5g"
          >
            上一步
          </v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="3">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          ></v-card>
          <v-btn
            color="primary"
            @click="batchGathering"
          >
            开始计算
          </v-btn>
          <v-btn
            text
            @click="step = 2"
          >
            上一步
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-banner
      v-if="pending"
      sticky
      :single-line="!$store.state.mobile"
    >
      <v-row class="d-flex">
        <v-col
          v-for="(amount, item) in requirement"
          :key="item"
          class="col-auto"
        >
          <ItemFigure
            :id="Number(item)"
            zoom-ratio="0.5"
          >
            <template v-slot:inner>
              <v-badge
                inline
                bordered
                color="light-green darken-2"
                :content="amount"
              />
            </template>
          </ItemFigure>
        </v-col>
      </v-row>
    </v-banner>
    <v-dialog
      v-model="completed"
      :max-width="$store.state.mobile ? '400' : '600'"
    >
      <v-card>
        <v-card-title>
          数据摘要
        </v-card-title>
        <v-card-subtitle
          v-text="`总计扫荡次数：${times}，体力消耗：${stamina}`"
        />
        <v-row
          no-gutters
          class="px-6 py-3"
        >
          <v-col
            v-for="(amount, item) in lootsTotal"
            :key="item"
            class="col-auto"
          >
            <ItemFigure
              :id="Number(item)"
              zoom-ratio="0.5"
            >
              <template v-slot:inner>
                <v-badge
                  inline
                  bordered
                  color="light-green darken-2"
                  :content="amount"
                />
              </template>
            </ItemFigure>
          </v-col>
        </v-row>
        <v-card-actions class="justify-center">
          <v-btn
            color="primary"
            @click="completed = false"
          >
            返回
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col
        class="col-auto"
      >
        <v-card
          v-for="(text, i) in comments"
          :key="i"
          class="px-4 pb-2 my-2"
        >
          <v-row
            no-gutters
            class="d-flex align-center"
          >
            <v-col class="col-auto">
              <v-chip
                label
                color="primary"
                link
                @click="routeToQuest(quests[i])"
                v-text="$store.getters.getQuestNameById(quests[i])"
              />
            </v-col>
            <v-col class="col-auto">
              <v-card-text
                v-text="text"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              v-for="(amount, item) in rewards[i]"
              :key="item"
              class="col-auto"
            >
              <ItemFigure
                :id="Number(item)"
                zoom-ratio="0.5"
              >
                <template v-slot:inner>
                  <v-badge
                    inline
                    bordered
                    color="light-green darken-2"
                    :content="amount"
                  />
                </template>
              </ItemFigure>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemFigure from '@/components/global/ItemFigure'
import PrincessPlate from '@/components/global/PrincessPlate'

export default {
  name: 'EquipPlanner',
  components: {
    ItemFigure,
    PrincessPlate
  },
  data () {
    return {
      step: 1,
      step1switch: false,
      editing: false,
      pending: false,
      completed: false,
      itemAmount: 1,
      times: 0,
      multiplier: 2,
      lootsTotal: {},
      comments: [],
      rewards: [],
      quests: [],
      requirement: {},
      mergedReq: {},
      reqPieces: {},
      stamina: 0,
      rules: {
        required: value => !!value || '数量不能为空',
        range: value => value > 0 || '数量不能为负',
      },
    }
  },
  computed: {
    storagedPrincess () {
      return Object.keys(this.profile).length && this.profile.princess && Object.prototype.toString.call(this.profile.princess) === '[object Object]' ? Object.keys(this.profile.princess).map(x => Number(x)) : []
    },
    fullPrincess () {
      return this.$store.getters.getPrincessIdList
    },
    profile () {
      return this.$store.state.profile
    },
    dim5Group () {
      return {
        rFrom: this.$store.state.rankFrom,
        rTo: this.$store.state.rankTo,
        eFrom: this.$store.state.equipSelectedFrom,
        eTo: this.$store.state.equipSelectedTo,
        chara: this.$store.state.lastUpdatedChara
      }
    }
  },
  watch: {
    lootsTotal () {
      document.getElementById('planner-container').scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      })
    },
    dim5Group: {
      handler (cur, prev) {
        if (Object.keys(cur).filter(x => cur[x] !== prev[x]).length) {
          this.equips4Promotion()
        }
      },
      deep: true
    },
    requirement: {
      handler () {
        this.mergeRequirements()
      },
      deep: true
    }
  },
  mounted () {
    this.$store.commit('updateState', { key: 'lastUpdatedChara', value: 0 })
  },
  methods: {
    sleep (t) {
      return new Promise(resolve => {
        setTimeout(() => resolve(), t)
      })
    },
    mergeRequirements () {
      this.mergedReq = {}
      for (const itemset of Object.values(this.requirement)) {
        for (const itemid of Object.keys(itemset)) {
          if (itemid === '999999') continue
          if (Object.prototype.hasOwnProperty.call(this.mergedReq, itemid)) {
            this.mergedReq[itemid] += itemset[itemid]
          } else {
            this.$set(this.mergedReq, itemid, itemset[itemid])
          }
        }
      }
    },
    onUpdate (id, amount) {
      this.$set(this.mergedReq, id, Number(amount))
      this.editing = false
    },
    onRemove (id) {
      this.$delete(this.mergedReq, id)
      this.editing = false
    },
    routeToQuest (questid) {
      this.$router.push({
        path: '/quest',
        query: { questid }
      })
    },
    sortByAmount (obj) {
      return Object.keys(obj).sort((x, y) => obj[y] - obj[x])
    },
    parseSourcesEfficiency (id, amount) {
      const sources = []
      const equipSource = this.$store.getters.getItemById(id).source
      equipSource.forEach(source => {
        source.quest.forEach(quest => {
          if (quest.area_id % 1000 <= this.$store.state.furthestArea) {
            sources.push({
              id: quest.quest_id,
              drop_count: source.drop_count,
              reward_num: source.reward_num,
              name: quest.quest_name,
              stamina: quest.stamina,
              odds: source.odds,
              efficiency: (source.drop_count * source.reward_num * source.odds) / quest.stamina,
              times: amount
            })
          }
        })
      })
      return sources
    },
    questPriority (sources, items) {
      items = JSON.parse(JSON.stringify(items))
      delete items[this.sortByAmount(items)[0]]
      sources.forEach(source => {
        const rewards = this.$store.getters.getQuestRewardById(source.id)
        for (const reward of Object.values(rewards)) {
          for (let i = 1; i <= 5; i++) {
            if (Object.prototype.hasOwnProperty.call(items, String(reward[`reward_id_${i}`]))) {
              source.efficiency += (reward.drop_count * reward[`reward_num_${i}`] * reward[`odds_${i}`]) / this.$store.getters.getQuestInfoById(source.id).stamina
              source.times = !source.times || source.times > items[String(reward[`reward_id_${i}`])] ? items[String(reward[`reward_id_${i}`])] : source.times
            }
          }
        }
      })
      return sources.sort((x, y) => y.efficiency - x.efficiency)   
    },
    async batchGathering () {
      this.pending = true
      this.completed = false
      while (Object.keys(this.requirement).length > 0) {
        const item = this.sortByAmount(this.requirement)[0]
        const amount = this.requirement[item]

        const targetQuest = this.questPriority(this.parseSourcesEfficiency(item, amount), this.requirement)[0]
        await this.sleep(500)
        
        const once = this.$store.getters.getLootSimulation({
          questid: targetQuest.id,
          times: targetQuest.times,
          multiplier: this.multiplier
        })
        
        for (const loot of Object.keys(once.loots)) {
          if (Object.prototype.hasOwnProperty.call(this.requirement, loot)) {
            if (this.requirement[loot] - once.loots[loot] > 0) {
              this.requirement[loot] -= once.loots[loot]
            } else {
              this.$delete(this.requirement, loot)
            }
          }
          if (Object.prototype.hasOwnProperty.call(this.lootsTotal, loot)) {
            this.lootsTotal[loot] += once.loots[loot]
          } else {
            this.lootsTotal[loot] = once.loots[loot]
          }
        }

        this.times += targetQuest.times
        this.stamina += targetQuest.times * targetQuest.stamina
        this.rewards.push(once.loots)
        this.comments.push(`扫荡次数：${once.times}，消耗体力：${once.stamina * once.times}`)
        this.quests.push(targetQuest.id)
      }
      this.pending = false
      this.completed = true
    },
    equips4Promotion () {
      if (!this.dim5Group.chara) return
      const chara = this.dim5Group.chara
      const promotion = this.$store.getters.getPrincessById(chara).promotion_info
      const rFrom = Number(this.dim5Group.rFrom)
      const rTo = Number(this.dim5Group.rTo)
      const eFrom = rFrom ? this.dim5Group.eFrom.map(x => promotion[rFrom][`equip_slot_${x + 1}`]) : eFrom
      const eTo = rTo ? JSON.parse(JSON.stringify(this.dim5Group.eTo)).map(x => promotion[rTo][`equip_slot_${x + 1}`]) : eTo
      const checkValid = () => {
        if (rFrom && rTo) {
          if (rFrom < 1 || rFrom > this.$store.state.maxRank) return false
          if (rTo < 1 || rTo > this.$store.state.maxRank) return false
          if (rFrom > rTo) return false
          if (rFrom === rTo) {
            for (const item of eFrom) {
              if (eTo.indexOf(item) === -1) {
                return false
              } else {
                eTo.splice(eTo.indexOf(item), 1)
              }
            }
          }
        } else {
          if (!rFrom && !rTo) return true
          else return false
        }
        return true
      }
      const flag = checkValid()
      if (!flag) return
      if (!rFrom && !rTo) {
        if (Object.prototype.hasOwnProperty.call(this.requirement, chara)) {
          this.$delete(this.requirement, chara)
        }
        return
      }
      this.$set(this.requirement, chara, {})
      if (rFrom === rTo) {
        for (const item of eTo) {
          if (Object.prototype.hasOwnProperty.call(this.requirement[chara], item)) {
            this.requirement[chara][item]++
          } else {
            this.$set(this.requirement[chara], item, 1)
          }
        }
      } else {
        const eFromFull = Object.values(promotion[rFrom])
        for (const item of eFrom) {
          eFromFull.splice(eFromFull.indexOf(item), 1)
        }
        for (const item of eFromFull) {
          if (Object.prototype.hasOwnProperty.call(this.requirement[chara], item)) {
            this.requirement[chara][item]++
          } else {
            this.$set(this.requirement[chara], item, 1)
          }
        }
        for (const item of eTo) {
          if (Object.prototype.hasOwnProperty.call(this.requirement[chara], item)) {
            this.requirement[chara][item]++
          } else {
            this.$set(this.requirement[chara], item, 1)
          }
        }
        for (let i = 1; i <= Object.keys(promotion).length; i++) {
          if (i > rFrom && i < rTo) {
            for (const item of Object.values(promotion[String(i)])) {
              if (Object.prototype.hasOwnProperty.call(this.requirement[chara], item)) {
                this.requirement[chara][item]++
              } else {
                this.$set(this.requirement[chara], item, 1)
              }
            }
          }
        }
      }
    },
    showd5g () {
      // console.log(this.dim5Group)
      console.log(this.requirement)
      console.log(this.mergedReq)
    }
  }
}
</script>
