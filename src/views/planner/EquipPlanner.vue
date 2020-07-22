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
                  v-text="charaName(chara)"
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
          <v-row>
            <v-col class="col-auto">
              <v-switch
                v-model="fromProfile"
                label="从用户档案中选择"
                class="mx-5"
              />
            </v-col>
            <v-col class="col-auto">
              <v-switch
                v-model="syncModifySelected"
                label="同步修改已选择的全部角色"
                color="purple darken-2"
                class="mx-5"
              >
                <template v-slot:append>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-information-outline
                      </v-icon>
                    </template>
                    <span
                      v-html="`启用此开关在编辑角色信息时，会将该角色的【Rank】和【装备位置】同步给【已经选择】的全部角色。<br>请注意：该功能有可能导致【删除】所有已配置的角色，请务必小心操作。`"
                    />
                  </v-tooltip>
                </template>
              </v-switch>
            </v-col>
            <v-col class="col-auto">
              <v-switch
                v-model="syncModifyProfile"
                label="同步修改用户档案的全部角色"
                color="red"
                class="mx-5"
              >
                <template v-slot:append>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-information-outline
                      </v-icon>
                    </template>
                    <span
                      v-html="`启用此开关在编辑角色信息时，会将该角色的【Rank】和【装备位置】同步给【用户档案】的全部角色。<br>请注意：该功能有可能导致【删除】所有已配置的角色，请务必小心操作。`"
                    />
                  </v-tooltip>
                </template>
              </v-switch>
            </v-col>
            <v-col class="col-auto">
              <v-switch
                v-model="ngFlag"
                label="未来视"
                color="indigo"
                class="mx-5"
              >
                <template v-slot:append>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-information-outline
                      </v-icon>
                    </template>
                    <span
                      v-html="ngComment"
                    />
                  </v-tooltip>
                </template>
              </v-switch>
            </v-col>
          </v-row>
          <v-card
            v-if="fromProfile"
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
                  :syncflag="syncModifySelected || syncModifyProfile"
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
                <EditableItemFigure 
                  :id="Number(itemid)"
                  @update="onUpdate(itemid, amount)"
                  @remove="onRemove(itemid)"
                >
                  <template v-slot:content>
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
                  </template>
                  <template v-slot:inner>
                    <v-badge
                      inline
                      bordered
                      color="light-green darken-2"
                      :content="amount"
                    />
                  </template>
                </EditableItemFigure>
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
            <v-switch
              v-model="mainPiece"
              label="仅计算主要素材"
              color="green lighten-1"
              class="mx-3"
              hide-details
            />
            <v-row
              no-gutters
              class="px-4 py-3"
            >
              <v-col
                v-for="(amount, itemid) in reqPieces"
                :key="itemid"
                class="col-auto"
              >
                <ItemFigure
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
              </v-col>
            </v-row>
          </v-card>
          <v-row no-gutters>
            <v-toolbar
              color="gray"
              flat
            >
              <v-text-field
                v-model="searchbox"
                class="mx-0"
                flat
                hide-details
                label="输入装备名称"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
                clearable
                @click:clear="searchbox = ''"
              />
            </v-toolbar>
          </v-row>
          <v-row
            no-gutters
            class="px-4 py-3"
          >
            <v-col
              v-for="(item, i) in filtedItem"
              :key="i"
              class="col-auto pa-0"
            >
              <EditableItemFigure 
                :id="Number(item)"
                @update="onUpdate(item, itemAmount)"
                @remove="onRemove(item)"
              >
                <template v-slot:content>
                  <v-row
                    no-gutters
                    class="justify-center"
                  >
                    <v-col class="col-6">
                      <v-text-field
                        v-model="itemAmount"
                        dense
                        :rules="[rules.required, rules.range]"
                        label="数量"
                        @blur="itemAmount = itemAmount === '' ? 1 : itemAmount"
                      />
                    </v-col>
                  </v-row>
                </template>
              </EditableItemFigure>
            </v-col>
          </v-row>

          <v-btn
            color="primary"
            @click="step = 3"
          >
            下一步
          </v-btn>
          <v-btn
            text
            @click="step = 1"
          >
            上一步
          </v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="3">
          <v-card
            class="mb-12"
            color="grey lighten-1"
          >
            <v-row no-gutters>
              <v-col class="col-auto">
                <v-chip
                  label
                  color="primary"
                  class="ma-4"
                >
                  素材的最终确认
                </v-chip>
              </v-col>
              <v-col class="col-auto">
                <v-switch
                  v-model="bonus2x"
                  label="庆典：双倍"
                  color="light-blue"
                  class="mx-3"
                  hide-details
                />
              </v-col>
              <v-col class="col-auto">
                <v-switch
                  v-model="bonus3x"
                  label="庆典：三倍"
                  color="red"
                  class="mx-3"
                  hide-details
                />
              </v-col>
            </v-row>
            <v-row
              no-gutters
              class="px-4 py-3"
            >
              <v-col
                v-for="(amount, itemid) in reqPieces"
                :key="itemid"
                class="col-auto"
              >
                <ItemFigure
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
              </v-col>
            </v-row>
          </v-card>
          <v-btn
            color="primary"
            :disabled="pending || completed"
            @click="batchGathering"
            v-text="startbutton"
          />
          <v-btn
            text
            :disabled="pending || completed"
            @click="step = 2"
          >
            上一步
          </v-btn>
          <v-btn
            v-if="completed"
            color="success"
            @click="reInit"
          >
            清除统计
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-dialog
      v-model="summary"
      :max-width="$store.state.mobile ? '400' : '600'"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-row class="justify-center py-3">
          <v-btn
            v-if="completed"
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            显示摘要
          </v-btn>
        </v-row>
      </template>
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
            @click="summary = false"
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
                v-text="questName(quests[i])"
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
import EditableItemFigure from '@/components/global/EditableItemFigure'

export default {
  name: 'EquipPlanner',
  components: {
    ItemFigure,
    PrincessPlate,
    EditableItemFigure
  },
  data () {
    return {
      step: 1,
      fromProfile: false,
      mainPiece: false,
      editing: false,
      pending: false,
      completed: false,
      summary: false,
      syncModifySelected: false,
      syncModifyProfile: false,
      searchbox: '',
      itemAmount: 1,
      times: 0,
      bonus2x: false,
      bonus3x: false,
      lootsTotal: {},
      comments: [],
      rewards: [],
      quests: [],
      requirement: {},
      mergedReq: {},
      reqPieces: {},
      stamina: 0,
      ngFlag: false,
      rules: {
        required: value => !!value || '数量不能为空',
        range: value => value > 0 || '数量不能为负',
      }
    }
  },
  computed: {
    storagedPrincess () {
      return this.profile?.princess && Object.prototype.toString.call(this.profile.princess) === '[object Object]' ? Object.keys(this.profile.princess).map(x => Number(x)) : []
    },
    fullPrincess () {
      return this.$store.getters.princessIdList.map(x => Number(x))
    },
    profile () {
      return this.$store.state.profile[this.$store.state.activeProfile]
    },
    startbutton () {
      let text = '开始计算'
      if (this.pending && !this.completed) text = '正在扫荡……'
      if (this.completed && !this.pending) text = '已完成'
      return text
    },
    dim5Group () {
      return {
        rFrom: this.$store.state.rankFrom,
        rTo: this.$store.state.rankTo,
        eFrom: this.$store.state.equipSelectedFrom,
        eTo: this.$store.state.equipSelectedTo,
        chara: this.$store.state.lastUpdatedChara
      }
    },
    fullItem () {
      return this.$store.getters.equipmentIdListEX.map(x => Number(x)).sort((x, y) => y - x)
    },
    filtedItem () {
      return this.searchbox === '' ? [] : this.fullItem.filter(x => this.$store.getters.getEquipmentData(x)?.equipment_name.match(this.searchbox))
    },
    multiplier () {
      if (!this.bonus2x && !this.bonus3x) return 1
      if (this.bonus2x) return 2
      if (this.bonus3x) return 3
      return null
    },
    ngComment () {
      return `未来视的生效范围：【Rank ${this.$store.state.maxRank + 1} 以内】<br>请注意：启用未来视后，在计算装备获取时，会解除限制【不超过第 ${this.$store.state.furthestArea} 章】<br>与此同时，解除限制会导致计算量增加从而使得【CPU 消耗上升】，开始模拟后【可能】会造成浏览器响应迟缓的现象，请耐心等待`
    }
  },
  watch: {
    ngFlag (val) {
      this.$store.commit('updateState', { key: 'ngFlag', value: val })
    },
    lootsTotal () {
      document.getElementById('planner-container').scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      })
    },
    dim5Group: {
      handler (cur, prev) {
        if (this.syncModifyProfile || this.syncModifySelected) {
          let charaList = []
          if (this.syncModifySelected) {
            charaList = [...charaList, ...Object.keys(this.requirement).filter(x => x !== 'manual')]
          }
          if (this.syncModifyProfile) {
            charaList = [...charaList, ...this.storagedPrincess]
          }
          charaList.push(cur.chara)
          charaList = Array.from(new Set(charaList.map(x => Number(x))))
          for (const chara of charaList) {
            this.equips4Promotion({
              chara: chara,
              rFrom: cur.rFrom,
              rTo: cur.rTo,
              eFrom: cur.eFrom,
              eTo: cur.eTo
            })
          }
        } else {
          if (Object.keys(cur).filter(x => cur[x] !== prev[x]).length) {
            this.equips4Promotion({...cur})
          }
        }
      },
      deep: true
    },
    requirement: {
      handler () {
        this.mergeRequirements()
      },
      deep: true
    },
    mergedReq: {
      handler (val) {
        this.reqPieces = {}
        for (const itemid of Object.keys(val)) {
          if (!this.isCraft(Number(itemid))) {
            if (Object.prototype.hasOwnProperty.call(this.reqPieces, itemid)) {
              this.reqPieces[itemid] += val[itemid]
            } else {
              this.$set(this.reqPieces, itemid, val[itemid])
            }
          } else {
            if (this.mainPiece) {
              const craftby = this.findCraft(itemid)
              craftby.forEach(item => {
                if ((item[0] - itemid) % 10000 === 0) {
                  if (Object.prototype.hasOwnProperty.call(this.reqPieces, item[0])) {
                    this.reqPieces[item[0]] += item[1] * val[itemid]
                  } else {
                    this.$set(this.reqPieces, item[0], item[1] * val[itemid])
                  }
                }
              })
            } else {
              const craftby = this.craftBy(Number(itemid))
              craftby.forEach(item => {
                if (Object.prototype.hasOwnProperty.call(this.reqPieces, item[0])) {
                  this.reqPieces[item[0]] += item[1] * val[itemid]
                } else {
                  this.$set(this.reqPieces, item[0], item[1] * val[itemid])
                }
              })
            }
          }
        }
      },
      deep: true
    },
    mainPiece () {
      this.mergeRequirements()
    },
    bonus2x (val) {
      if (val) this.bonus3x = false
    },
    bonus3x (val) {
      if (val) this.bonus2x = false
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
    questName (id) {
      for (const diff of Object.values(this.$store.getters.getQuestDataByDiff)) {
        for (const quest of diff) {
          if (quest.quest_id === id) return quest.quest_name
        }
      }
    },
    charaName (id) {
      return this.$store.getters.getUnitData(id)?.unit_name ?? '其他'
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
      this.$set(this.requirement, 'manual', {...this.requirement.manual, ...{ [id]: Number(amount) }})
      this.itemAmount = 1
    },
    onRemove (id) {
      if (this.requirement.manual) this.$delete(this.requirement.manual, id)
      this.itemAmount = 1
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
      const equipSource = this.$store.getters.getEquipmentSource(id)
      equipSource.forEach(source => {
        source.quest.forEach(quest => {
          if (this.ngFlag) {
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
          } else {
            if (quest.area_id < 13000 && quest.area_id % 1000 <= this.$store.state.furthestArea) {
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
        for (const rewardgroup of Object.values(rewards)) {
          for (const reward of rewardgroup) {
            if (!reward.itemid) continue
            if (Object.prototype.hasOwnProperty.call(items, String(reward.itemid))) {
              source.efficiency += (reward.drop_count * reward.itemid * reward.odds) / this.$store.getters.getQuestData(source.id).stamina
              source.times = !source.times || source.times > items[String(reward.itemid)] ? items[String(reward.itemid)] : source.times
            }
          }
        }
      })
      return sources.sort((x, y) => y.efficiency - x.efficiency)   
    },
    async batchGathering () {
      this.pending = true
      while (Object.keys(this.reqPieces).length > 0) {
        const item = this.sortByAmount(this.reqPieces)[0]
        const amount = this.reqPieces[item]

        const targetQuest = this.questPriority(this.parseSourcesEfficiency(item, amount), this.reqPieces)[0]
        await this.sleep(500)
        
        const once = this.lootSimulation({
          questid: targetQuest.id,
          times: targetQuest.times,
          multiplier: this.multiplier
        })
        
        for (const loot of Object.keys(once.loots)) {
          if (Object.prototype.hasOwnProperty.call(this.reqPieces, loot)) {
            if (this.reqPieces[loot] - once.loots[loot] > 0) {
              this.reqPieces[loot] -= once.loots[loot]
            } else {
              this.$delete(this.reqPieces, loot)
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
      this.summary = true
      this.completed = true
    },
    equips4Promotion ({ chara, rFrom, rTo, eFrom, eTo }) {
      if (!chara) return
      const promotion = this.ngFlag ? JSON.parse(JSON.stringify(this.$store.getters.getUnitPromotionFullNG(chara))) : JSON.parse(JSON.stringify(this.$store.getters.getUnitPromotionFull(chara)))
      const maxRank = this.ngFlag ? this.$store.state.maxRank + 1 : this.$store.state.maxRank
      for (const promote of Object.values(promotion)) {
        delete promote.promotion_level
        delete promote.unit_id
      }
      rFrom = Number(rFrom)
      rTo = Number(rTo)
      eFrom = rFrom ? eFrom.map(x => promotion[rFrom] ? promotion[rFrom][`equip_slot_${x + 1}`] : 999999) : eFrom
      eTo = rTo ? eTo.map(x => promotion[rTo] ? promotion[rTo][`equip_slot_${x + 1}`] : 999999) : eTo
      const checkValid = () => {
        if (rFrom && rTo) {
          if (rFrom < 1 || rFrom > maxRank) return false
          if (rTo < 1 || rTo > maxRank) return false
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
    findEquipment (id) {
      return this.$store.getters.getEquipmentData(id)
    },
    findCraft (id) {
      return this.$store.getters.getEquipmentCraftBy(id)
    },
    isCraft (id) {
      return this.findEquipment(id)?.craft_flg === 1
    },
    _craft (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (this.isCraft(arr[i][0])) {
          arr[i] = this._craft(this.findCraft(arr[i][0]))
        }
      }
      return arr
    },
    craftBy (id) {
      const by = this._craft(this.findCraft(id)).flat(Infinity)
      const item = [], amount = [], combined = []
      for (let i = 0; i < by.length; i = i + 2) {
        if (item.indexOf(by[i]) !== -1) {
          amount[item.indexOf(by[i])] += by[i + 1]
        } else {
          item.push(by[i])
          amount.push(by[i + 1])
        }
      }
      for (let i = 0; i < item.length; i++) {
        combined.push([item[i], amount[i]])
      }
      return combined      
    },
    lootSimulation ({ questid, times = 1, multiplier = 1 }) {
      const rewards = this.$store.getters.getQuestRewardById(questid)
      const stamina = this.$store.getters.getQuestData(questid).stamina
      const loots = {}
      const lootDivider = (reward) => {
        const arr = [0]
        let odds = 0
        for (let i = 0; i < reward.length; i++) {
          odds += reward[i].odds
          arr.push(odds)
        }
        return arr
      }
      for (let t = 0; t < times; t++) {
        rewards.forEach(reward => {
          const divider = lootDivider(reward)
          const rand = Math.random() * divider[divider.length - 1]
          for (let i = 0; i < divider.length - 1; i++) {
            if (rand >= divider[i] && rand < divider[i + 1]) {
              if (reward[i].itemid && reward[i].reward_num) {
                if (Object.prototype.hasOwnProperty.call(loots, reward[i].itemid)) {
                  loots[reward[i].itemid] += reward[i].reward_num * multiplier
                } else {
                  loots[reward[i].itemid] = reward[i].reward_num * multiplier
                }
              }
              break
            }
          }
        }) 
      }
      
      return {
        loots,
        stamina,
        times
      }
    },
    reInit () {
      this.step = 1
      this.fromProfile = false
      this.mainPiece = false
      this.editing = false
      this.pending = false
      this.completed = false
      this.summary = false
      this.searchbox = ''
      this.itemAmount = 1
      this.times = 0
      this.bonus2x = false
      this.bonus3x = false
      this.lootsTotal = {}
      this.comments = []
      this.rewards = []
      this.quests = []
      this.requirement = {}
      this.mergedReq = {}
      this.reqPieces = {}
      this.stamina = 0
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('updateState', { key: 'ngFlag', value: false })
    next()
  }
}
</script>
