<template>
  <v-dialog
    v-model="editing"
    :width="$store.state.mobile ? '350' : '380'"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-card
        v-bind="attrs"
        v-on="on"
      >
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-img
              :src="src"
              :alt="name"
              :style="style"
              v-bind="attrs"
              v-on="on"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0 align-center justify-center"
                >
                  <v-progress-circular
                    indeterminate
                    color="pink"
                  />
                </v-row>
              </template>
            </v-img>
          </template>
          <span
            v-html="comment"
          />
        </v-tooltip>
      </v-card>
    </template>
    <v-card>
      <v-row no-gutters>
        <v-col
          class="col-auto pa-5"
        >
          <PrincessFigure
            :id="id"
            :zoom-ratio="this.$store.state.mobile ? '0.33' : '0.5'"
          />
        </v-col>
        <v-col>
          <v-card-title>
            {{ $store.getters.getUnitBackground(id) }}
          </v-card-title>
          <v-card-subtitle>
            {{ $store.getters.getUnitProfile(id).voice }}
          </v-card-subtitle>
          <v-chip
            v-show="syncflag"
            label
            color="success"
            class="text--white font-weight-thin mx-3"
          >
            同步修改：已启用
          </v-chip>
        </v-col>
      </v-row>

      <v-row
        v-if="stars"
        no-gutters
        class="d-flex align-center"
      >
        <v-rating
          v-model="btnrarity"
          dense
          hover
          small
          color="yellow darken-2"
          class="mx-5"
        />
      </v-row>

      <v-row
        v-if="equips"
        no-gutters
        class="my-6 mb-2"
      >
        <v-col>
          <v-text-field
            v-model="rank"
            dense
            :rules="[rules.required, rules.range]"
            label="当前 Rank 和装备配置"
            prefix="Rank"
            class="mx-5"
          >
            <template
              v-if="!$store.state.mobile"
              v-slot:append
            >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    small
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
                <span
                  v-html="commentFromto('none')"
                />
              </v-tooltip>
            </template>
          </v-text-field>
          <EquipmentSelector
            :id="id"
            class="mx-5"
          />
        </v-col>
      </v-row>

      <v-row
        v-if="pieces"
        no-gutters
      >
        <v-col class="col-4 pa-5">
          <ItemFigure
            :id="memorypieceid"
            :zoom-ratio="this.$store.state.mobile ? '0.33' : '0.5'"
          />
          <v-text-field
            v-model="memorypiece"
            label="记忆碎片"
          />
        </v-col>
        <v-col class="col-4 pa-5">
          <ItemFigure
            :id="Number(999999)"
            :zoom-ratio="this.$store.state.mobile ? '0.33' : '0.5'"
          />
          <v-text-field
            v-model="purememorypiece"
            disabled
            label="纯净记忆碎片"
          />
        </v-col>
      </v-row>

      <v-row
        v-if="fromto"
        no-gutters
      >
        <v-col class="my-6">
          <v-text-field
            v-model="rankfrom"
            dense
            :rules="[rules.required, rules.range]"
            label="From"
            prefix="Rank"
            class="mx-5"
          >
            <template
              v-if="!$store.state.mobile"
              v-slot:append
            >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    small
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
                <span
                  v-html="commentFromto('from')"
                />
              </v-tooltip>
            </template>
          </v-text-field>
          <EquipmentSelector
            :id="id"
            from
            class="mx-5"
          />
        </v-col>
        <v-col class="my-6">
          <v-text-field
            v-model="rankto"
            dense
            :rules="[rules.required, rules.range]"
            label="To"
            prefix="Rank"
            class="mx-5"
          >
            <template
              v-if="!$store.state.mobile"
              v-slot:append
            >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    small
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
                <span
                  v-html="commentFromto('to')"
                />
              </v-tooltip>
            </template>
          </v-text-field>
          <EquipmentSelector
            :id="id"
            to
            class="mx-5"
          />
        </v-col>
      </v-row>

      <v-card-actions class="justify-center">
        <v-btn
          color="light-gray"
          @click="onUpdate"
        >
          <v-icon left>
            mdi-text-box-plus-outline
          </v-icon>
          保存
        </v-btn>
        <v-btn
          color="light-gray"
          @click="onRemove"
        >
          <v-icon left>
            mdi-text-box-remove-outline
          </v-icon>
          删除
        </v-btn>
        <v-btn
          color="light-gray"
          @click="onCancel"
        >
          <v-icon left>
            mdi-close-box-outline
          </v-icon>
          取消
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import PrincessFigure from '@/components/global/PrincessFigure'
import ItemFigure from '@/components/global/ItemFigure'
import EquipmentSelector from '@/components/global/EquipmentSelector'

export default {
  name: 'PrincessPlate',
  components: {
    PrincessFigure,
    ItemFigure,
    EquipmentSelector
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    zoomRatio: {
      type: String,
      default: '1'
    },
    stars: {
      type: Boolean,
      default: false
    },
    pieces: {
      type: Boolean,
      default: false
    },
    fromto: {
      type: Boolean,
      default: false
    },
    equips: {
      type: Boolean,
      default: false
    },
    syncflag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      origHeight: 256,
      origWidth: 512,
      rules: {
        required: value => !!value || 'Rank 不能为空',
        range: value => {
          const rank = this.$store.state.ngFlag ? this.$store.state.maxRank + 1 : this.$store.state.maxRank
          return value > 0 && value <= rank || '无效的 Rank 等级'
        }
      },
      editing: false,
      memorypiece: 0,
      purememorypiece: 0,
      btnrarity: 0,
      starsicon: ['mdi-numeric-1', 'mdi-numeric-2','mdi-numeric-3','mdi-numeric-4','mdi-numeric-5'],
      rank: 0,
      ue: false,
      prev: {},
      datasource: ''
    }
  },
  computed: {
    princess () {
      return this.$store.getters.getUnitData(this.id)
    },
    name () {
      return this.princess.unit_name
    },
    activeProfileChara () {
      return this.$store.state.profile[this.$store.state.activeProfile]?.princess ? this.$store.state.profile[this.$store.state.activeProfile]?.princess[String(this.id)] : null
    },
    rankfrom: {
      get () {
        return this.$store.state.context[this.id]?.rFrom ?? this.activeProfileChara?.rank ?? String(this.$store.state.maxRank)
      },
      set (val) {
        this.$store.commit('updateContext', { key: String(this.id), value: { rFrom: String(val) }})
      }
    },
    rankto: {
      get () {
        return this.$store.state.context[this.id]?.rTo ?? String(this.$store.state.maxRank)
      },
      set (val) {
        this.$store.commit('updateContext', { key: String(this.id), value: { rTo: String(val) }})
      }
    },
    src () {
      const rarity = this.activeProfileChara?.rarity ?? -1
      let id
      if (rarity === -1) {
        id = this.princess.rarity >= 3 ? this.id + 30 : this.id + 10
      } else if (rarity >= 0 && rarity < 3) {
        id = this.id + 10
      } else if (rarity >= 3 && rarity < 6) {
        id = this.id + 30
      } else if (rarity === 6) {
        id = this.id + 60
      } else {
        return null
      }
      return `${this.$store.state.CDNBaseURL}/image/character_plates/unit_plate_${id}.png`
    },
    style () {
      return {
        height: `${this.origHeight * parseFloat(this.zoomRatio)}px`,
        width: `${this.origWidth * parseFloat(this.zoomRatio)}px`
      }
    },
    memorypieceid () {
      return (this.id - this.id % 100) / 100 + 30000
    },
    comment () {
      if (this.activeProfileChara) {
        const curEquipment = this.activeProfileChara.equipment?.reduce((t, v) => {
          if (this.$store.getters.getEquipmentData(v)) t += `【${this.$store.getters.getEquipmentData(v).equipment_name}】`
          return t
        }, '') || '无'
        return `${this.name} ★ ${this.activeProfileChara.rarity}<br><br>Rank ${this.activeProfileChara.rank}<br>已装备：${curEquipment}<br>记忆碎片：${this.activeProfileChara.pieces[0]}<br>纯净记忆碎片：${this.activeProfileChara.pieces[1]}`
      } else {
        return `${this.name}<br><br>未记录角色信息`
      }
    }
  },
  watch: {
    rank (val) {
      this.$store.commit('updateState', { key: 'curRank', value: String(val) })
    },
    editing (val) {
      if (this.fromto) {
        if (val) {
          this.prev = this.$store.state.context[this.id] ? JSON.parse(JSON.stringify(this.$store.state.context[this.id])) : {
            rFrom: String(this.$store.state.maxRank),
            rTo: String(this.$store.state.maxRank),
            eFrom: [0, 1, 2, 3, 4, 5],
            eTo: [0, 1, 2, 3, 4, 5]
          }
        }
        this.$store.commit('updateContext', { key: String(this.id), value: {
          rFrom: String(this.rankfrom),
          rTo: String(this.rankto)
        }})
      } else {
        this.$store.commit('updateState', { key: 'curRank', value: String(this.rank) })
      }
      this.$store.commit('updateState', { key: 'lastUpdatedChara', value: String(this.id) })
    }
  },
  created () {
    this.syncData('btnrarity')
    this.syncData('pieces')
    if (this.fromto) {
      this.syncData('fromto')
    }
    if (this.equips) {
      this.syncData('equips')
    }
  },
  methods: {
    commentFromto (position) {
      let commentRank
      const commentEquip = '点击下方区域里的箭头按钮可以改变对应装备的存在状态：<br>【↖】，【↗】，【←】，【→】，【↙】，【↘】分别对应角色左上角，右上角，左边中间，右边中间，左下角，右下角的装备<br>'
      switch (position) {
        case 'from':
          commentRank = `【From】表示当前Rank，点击左侧区域修改`
          break
        case 'to':
          commentRank = `【To】表示目标Rank，点击左侧区域修改`
          break
        default:
          commentRank = ''
      }
      return commentRank ? `${commentRank}<br><br>${commentEquip}` : commentEquip
    },
    onUpdate () {
      const princess = this.$store.state.profile[this.$store.state.activeProfile]?.princess ?? {}
      if (!princess[String(this.id)]) princess[String(this.id)] = {}
      const data = princess[String(this.id)]

      data.name = this.name
      data.rarity = this.btnrarity
      data.pieces = [this.memorypiece, this.purememorypiece]
      data.ue = this.ue
      data.rank = this.fromto ? data.rank : this.rank
      data.equipment = this.fromto ?
        data.equipment :
        this.$store.state.equipSelected.map(x => String(this.$store.getters.getUnitPromotion(this.id, this.rank)[`equip_slot_${x + 1}`])).filter(x => x !== '999999')
      
      if (this.$store.state.profile[this.$store.state.activeProfile] && !this.fromto) {
        this.$setLSItem({
          profile: this.$store.state.activeProfile,
          key: 'princess',
          value: princess
        })
      }
      
      this.$store.commit('updateState', { key: 'lastUpdatedChara', value: String(this.id) })
      this.editing = false
    },
    onRemove () {
      if (this.fromto) {
        this.$store.commit('updateContext', { key: String(this.id), value: {
          rFrom: '-1',
          rTo: '-1'
        }})
        this.$store.commit('updateState', { key: 'lastUpdatedChara', value: String(this.id) })
      } else {
        if (this.$store.state.activeProfile) {
          this.$removeLSItem({
            profile: this.$store.state.activeProfile,
            path: ['princess', String(this.id)]
          })
        }
      }
      this.editing = false
    },
    onCancel () {
      if (this.fromto) {
        this.$store.commit('updateContext', { key: String(this.id), value: this.prev })
        this.$store.commit('updateState', { key: 'lastUpdatedChara', value: String(this.id) })
      }
      this.editing = false
    },
    syncData (param) {
      switch (param) {
        case 'btnrarity':
          this.btnrarity = this.activeProfileChara?.rarity ?? this.princess.rarity
          break
        case 'pieces':
          this.memorypiece = this.activeProfileChara?.princess ? this.activeProfileChara?.princess[String(this.id)]?.pieces[0] ?? '0' : '0'
          this.purememorypiece = this.activeProfileChara?.princess ? this.activeProfileChara?.princess[String(this.id)]?.pieces[0] ?? '0' : '0'
          break
        case 'fromto':
          this.$store.commit('updateContext', { key: String(this.id), value: {
            rFrom: this.activeProfileChara?.rank ?? String(this.$store.state.maxRank),
            rTo: String(this.$store.state.maxRank)
          }})
          break
        case 'equips':
          this.rank = this.activeProfileChara?.rank ?? this.$store.getters.curRank({})
          this.$store.commit('updateState', { key: 'curRank', value: String(this.rank) })
          break
        default:
          break
      }
    }
  }
}
</script>
