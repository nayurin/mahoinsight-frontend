<template>
  <v-dialog
    v-model="edit"
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
            />
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

      <v-row no-gutters>
        <v-btn-toggle
          v-model="btnrarity"
          mandatory
          shaped
          class="pa-5"
        >
          <v-btn
            v-for="(icon, i) in btnicon"
            :key="i"
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-row>

      <v-row no-gutters>
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
          @click="edit = false"
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

export default {
  name: 'PrincessPlate',
  components: {
    PrincessFigure,
    ItemFigure
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    zoomRatio: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      origHeight: 256,
      origWidth: 512,
      edit: false,
      memorypiece: 0,
      purememorypiece: 0,
      btnrarity: 0,
      btnicon: ['mdi-numeric-1', 'mdi-numeric-2','mdi-numeric-3','mdi-numeric-4','mdi-numeric-5']
    }
  },
  computed: {
    princess () {
      return this.$store.getters.getPrincessById(this.id)
    },
    name () {
      return this.princess.status.unit_name
    },
    src () {const rarity = this.rarity
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
  mounted () {
    this.syncData('btnrarity')
    this.syncData('pieces')
  },
  methods: {
    onUpdate () {
      const data = {
        name: this.princess.status.unit_name,
        rarity: this.btnrarity + 1,
        pieces: [this.memorypiece, this.purememorypiece],
        ue: false
      }
      const profile = this.$store.state.profile
      if (!profile.princess) profile.princess = {}
      profile.princess[String(this.princess.id)] = data
      this.$setLSItem({
        profile: this.$store.state.activeProfile,
        key: 'princess',
        value: profile.princess
      })
      this.edit = false
    },
    onRemove () {
      this.$removeLSItem({
        profile: this.$store.state.activeProfile,
        path: ['princess', String(this.princess.id)]
      })
      this.edit = false
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
        default:
          break
      }
    }
  }
}
</script>
