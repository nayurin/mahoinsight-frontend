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
        <span
          class="title pl-5 pr-2"
        >
          ★
        </span>
        <v-btn-toggle
          v-model="btnrarity"
          mandatory
          shaped
          class="px-0"
        >
          <v-btn
            v-for="(icon, i) in starsicon"
            :key="i"
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </v-btn-toggle>
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
            @blur="rankfrom = rankfrom === '' ? $store.state.maxRank : rankfrom"
          >
            <template
              v-if="!$store.state.mobile"
              v-slot:append
            >
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
            @blur="rankto = rankto === '' ? $store.state.maxRank : rankto"
          >
            <template
              v-if="!$store.state.mobile"
              v-slot:append
            >
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
      rankfrom: 0,
      rankto: 0,
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
    profile () {
      return this.$store.state.profile
    },
    activeProfile () {
      return this.$store.state.activeProfile
    },
    src () {
      const rarity = this.rarity
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
    rarity () {
      return this.profile[this.activeProfile]?.princess && this.profile[this.activeProfile]?.princess[String(this.id)] ? this.profile[this.activeProfile].princess[String(this.id)].rarity : -1
    },
    memorypieceid () {
      return (this.id - this.id % 100) / 100 + 30000
    },
    comment () {
      if (this.profile[this.activeProfile]?.princess && this.profile[this.activeProfile]?.princess[String(this.id)]) {
        return `${this.name}<br><br>★ ${this.profile[this.activeProfile].princess[String(this.id)].rarity}<br>记忆碎片：${this.profile[this.activeProfile].princess[String(this.id)].pieces[0]}<br>纯净记忆碎片：${this.profile[this.activeProfile].princess[String(this.id)].pieces[1]}`
      } else {
        return `${this.name}<br><br>未记录角色信息`
      }
    }
  },
  watch: {
    rankfrom (val) {
      this.$store.commit('updateState', { key: 'rankFrom', value: String(val) })
    },
    rankto (val) {
      this.$store.commit('updateState', { key: 'rankTo', value: String(val) })
    },
    editing (val) {
      if (val) {
        if (this.fromto) {
          this.prev = {
            rFrom: this.$store.state.rankFrom,
            rTo: this.$store.state.rankTo,
            eFrom: this.$store.state.equipSelectedFrom,
            eTo: this.$store.state.equipSelectedTo
          }
        }
        this.$store.commit('updateState', { key: 'rankFrom', value: String(this.rankfrom) })
        this.$store.commit('updateState', { key: 'rankTo', value: String(this.rankto) })
        this.$store.commit('updateState', { key: 'lastUpdatedChara', value: this.id })
      }
    }
  },
  created () {
    this.syncData('btnrarity')
    this.syncData('pieces')
    if (this.fromto) {
      this.syncData('fromto')
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
          return
      }
      return `${commentRank}<br><br>${commentEquip}`
    },
    onUpdate () {
      const princess = this.profile[this.activeProfile]?.princess ?? {}
      if (!princess[String(this.id)]) princess[String(this.id)] = {}

      const data = princess[String(this.id)]
      data.name = this.name
      data.rarity = this.btnrarity + 1
      data.pieces = [this.memorypiece, this.purememorypiece]
      data.ue = this.ue
      
      if (this.activeProfile && !this.fromto) {
        this.$setLSItem({
          profile: this.activeProfile,
          key: 'princess',
          value: princess
        })
      }

      this.$store.commit('updateState', { key: 'lastUpdatedChara', value: this.id })
      this.$store.commit('updateState', { key: 'rankFrom', value: String(this.rankfrom) })
      this.$store.commit('updateState', { key: 'rankTo', value: String(this.rankto) })

      this.editing = false
    },
    onRemove () {
      if (this.fromto) {
        this.$store.commit('updateState', { key: 'lastUpdatedChara', value: this.id })
        this.$store.commit('updateState', { key: 'rankFrom', value: null })
        this.$store.commit('updateState', { key: 'rankTo', value: null })
      } else {
        if (this.$store.state.activeProfile) {
          this.$removeLSItem({
            profile: this.activeProfile,
            path: ['princess', String(this.id)]
          })
        }
      }
      this.editing = false
    },
    onCancel () {
      if (this.fromto) {
        this.$store.commit('updateState', { key: 'equipSelectedFrom', value: this.prev.eFrom })
        this.$store.commit('updateState', { key: 'equipSelectedTo', value: this.prev.eTo })
        this.$store.commit('updateState', { key: 'rankFrom', value: String(this.prev.rFrom) })
        this.$store.commit('updateState', { key: 'rankTo', value: String(this.prev.rTo) })
        this.$store.commit('updateState', { key: 'lastUpdatedChara', value: this.id })
      }
      this.editing = false
    },
    syncData (param) {
      switch (param) {
        case 'btnrarity':
          if (this.rarity === -1) {
            this.btnrarity = this.princess.rarity - 1
          } else {  
            this.btnrarity = this.rarity - 1
          }
          break
        case 'pieces':
          this.memorypiece = this.profile[this.activeProfile]?.princess ? this.profile[this.activeProfile]?.princess[String(this.id)]?.pieces[0] ?? '0' : '0'
          this.purememorypiece = this.profile[this.activeProfile]?.princess ? this.profile[this.activeProfile]?.princess[String(this.id)]?.pieces[0] ?? '0' : '0'
          break
        case 'fromto':
          this.rankfrom = this.$store.getters.curRank({ from: true })
          this.rankto = this.$store.getters.curRank({ to: true })
          this.$store.commit('updateState', { key: 'rankFrom', value: String(this.rankfrom) })
          this.$store.commit('updateState', { key: 'rankTo', value: String(this.rankto) })
          break
        default:
          break
      }
    }
  }
}
</script>
