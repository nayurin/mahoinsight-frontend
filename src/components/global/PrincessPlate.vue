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
            :princess="princess"
            :zoom-ratio="this.$store.state.mobile ? '0.33' : '0.5'"
          />
        </v-col>
        <v-col>
          <v-card-title>
            {{ princess.profile.fullname }}
          </v-card-title>
          <v-card-subtitle>
            {{ princess.profile.voice }}
          </v-card-subtitle>
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
          />
          <EquipmentSelector
            from
            :princess="princess"
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
          />
          <EquipmentSelector
            to
            :princess="princess"
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
    }
  },
  data () {
    return {
      origHeight: 256,
      origWidth: 512,
      rules: {
        required: value => !!value || 'Rank 不能为空',
        range: value => value > 0 && value <= this.$store.state.maxRank || '无效的 Rank 等级',
      },
      editing: false,
      memorypiece: 0,
      purememorypiece: 0,
      btnrarity: 0,
      starsicon: ['mdi-numeric-1', 'mdi-numeric-2','mdi-numeric-3','mdi-numeric-4','mdi-numeric-5'],
      rankfrom: 0,
      rankto: 0,
      ue: false
    }
  },
  computed: {
    princess () {
      return this.$store.getters.getPrincessById(this.id)
    },
    name () {
      return this.princess.status.unit_name
    },
    src () {
      const rarity = this.rarity
      let id
      if (rarity === -1) {
        id = this.princess.status.rarity >= 3 ? this.princess.id + 30 : this.princess.id + 10
      } else if (rarity >= 0 && rarity < 3) {
        id = this.princess.id + 10
      } else if (rarity >= 3 && rarity < 6) {
        id = this.princess.id + 30
      } else if (rarity === 6) {
        id = this.princess.id + 60
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
      return this.$store.state.profile.princess && this.$store.state.profile.princess[String(this.id)] ? this.$store.state.profile.princess[String(this.id)].rarity : -1
    },
    memorypieceid () {
      return (this.princess.id - this.princess.id % 100) / 100 + 30000
    },
    comment () {
      if (this.$store.state.profile.princess && this.$store.state.profile.princess[String(this.id)]) {
        return `${this.$store.state.profile.princess[String(this.id)].name}<br><br>★ ${this.$store.state.profile.princess[String(this.id)].rarity}<br>记忆碎片：${this.$store.state.profile.princess[String(this.id)].pieces[0]}<br>纯净记忆碎片：${this.$store.state.profile.princess[String(this.id)].pieces[1]}`
      } else {
        return `${this.$store.getters.getPrincessById(this.id).status.unit_name}<br><br>未记录角色信息`
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
    onUpdate () {
      const profile = this.$store.state.profile
      if (!profile.princess) profile.princess = {}
      if (!profile.princess[String(this.princess.id)]) profile.princess[String(this.princess.id)] = {}

      const data = profile.princess[String(this.princess.id)]
      data.name = this.princess.status.unit_name
      data.rarity = this.btnrarity + 1
      data.pieces = [this.memorypiece, this.purememorypiece]
      data.ue = this.ue
      
      this.$setLSItem({
        profile: this.$store.state.activeProfile,
        key: 'princess',
        value: profile.princess
      })

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
        this.$removeLSItem({
          profile: this.$store.state.activeProfile,
          path: ['princess', String(this.princess.id)]
        })
      }
      this.editing = false
    },
    syncData (param) {
      switch (param) {
        case 'btnrarity':
          if (this.rarity === -1) {
            this.btnrarity = this.princess.status.rarity - 1
          } else {  
            this.btnrarity = this.rarity - 1
          }
          break
        case 'pieces':
          try {
            this.memorypiece = this.$store.state.profile.princess[String(this.id)].pieces[0]
            this.purememorypiece = this.$store.state.profile.princess[String(this.id)].pieces[1]
          } catch {
            return
          }
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
