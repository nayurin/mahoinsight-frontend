<template>
  <div class="text-center">
    <v-dialog
      v-model="dialogEnemyDetail"
      :width="$store.state.mobile ? '300' : '600'"
      :scrollable="$store.state.mobile ? true : false"
    >
      <template v-slot:activator="{ on }">
        <v-card
          class="ml-1 mr-1"
          v-on="on"
        >
          <v-img
            class="pa-4"
            :src="src"
            :alt="name"
            :style="style"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0 align-center justify-center"
              >
                <v-progress-circular
                  indeterminate
                  color="red"
                />
              </v-row>
            </template>
          </v-img>
          <v-row
            class="d-flex justify-center align-center"
            no-gutters
          >
            <v-btn
              :color="atkType === 1 ? 'pink' : 'indigo'"
              small
              block
              class="pa-0 white--text"
              v-text="name"
            />
          </v-row>
        </v-card>
      </template>
      <v-card>
        <v-row
          class="d-flex align-center"
          no-gutters
        >
          <v-card-title
            class="ma-4 ml-4 pa-0"
            v-text="info.name"
          />
          <v-chip
            :color="atkType === 1 ? 'pink' : 'indigo'"
            label
            small
            class="white--text"
            v-text="atkType === 1 ? '物理' : '魔法'"
          />
          <v-card-actions
            v-if="$store.state.mobile"
            class="ml-auto"
          >
            <v-btn
              color="blue darken-1"
              text
              @click="dialogEnemyDetail = false"
              v-text="`关闭`"
            />
          </v-card-actions>
        </v-row>
        <v-row no-gutters>
          <v-col
            class="d-flex flex-row flex-wrap ma-0 pa-4 align-center col-12 col-lg-auto"
          >
            <v-img
              :src="src"
              :alt="name"
              contain
              max-width="128"
            />
            <ResistanceDialog
              :resistid="resistance"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-card-text 
            class="font-weight-thin pa-0 ma-4"
            v-text="comment"
          />
        </v-row>
        <v-row
          no-gutters
          class="pb-4"
        >
          <v-col
            v-for="(value, key) in status"
            :key="key"
            class="d-flex flex-row flex-wrap pa-0"
            cols="6"
            lg="4"
          >
            <v-list-item
              class="ml-4 mr-4 pa-0"
              dense
            >
              <v-chip
                small
                label
                color="primary"
                v-text="key"
              />
              <v-chip
                label
                outlined
                small
                v-text="value"
              />
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ResistanceDialog from '@/components/global/ResistanceDialog'

export default {
  name: 'EnemyFigure',
  components: {
    ResistanceDialog
  },
  props: {
    enemyid: {
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
      origHeight: 128,
      origWidth: 128,
      dialogEnemyDetail: false,
      dialogEnemyResistance: false
    }
  },
  computed: {
    unitid () {
      return this.info.unit_id
    },
    name () {
      return this.info.name
    },
    src () {
      let baseid
      switch (String(this.unitid)[0]) {
        case '6':
          baseid = (this.unitid - this.unitid % 100) / 100 - 5000
          return `${this.$store.state.CDNBaseURL}/image/enemies/shadow/icon_shadow_${baseid * 100 + 31}.png`
        default:
          return `${this.$store.state.CDNBaseURL}/image/enemies/icon_unit_${this.unitid}.png`
      }
    },
    style () {
      return {
        height: `${this.origHeight * parseFloat(this.zoomRatio)}px`,
        width: `${this.origWidth * parseFloat(this.zoomRatio)}px`
      }
    },
    info () {
      return this.$store.getters.getEnemyParameter(this.enemyid)
    },
    atkType () {
      return this.$store.getters.getUnitEnemyData(this.unitid).atk_type
    },
    comment () {
      return this.$store.getters.getUnitEnemyData(this.unitid).comment.replace(/\\n/g, '')
    },
    resistance () {
      return this.info.resist_status_id
    },
    status () {
      return this.info ? {
        等级: this.info.level,
        生命值: this.info.hp,
        索敌半径: this.$store.getters.getUnitEnemyData(this.unitid).search_area_width,
        物理攻击力: this.info.atk,
        魔法攻击力: this.info.magic_str,
        物理防御力: this.info.def,
        魔法防御力: this.info.magic_def,
        物理暴击: this.info.physical_critical,
        魔法暴击: this.info.magic_critical,
        命中: this.info.accuracy,
        回避: this.info.dodge,
        物理穿透: this.info.physical_penetrate,
        魔法穿透: this.info.magic_penetrate,
        回复量上升: this.info.hp_recovery_rate,
        技能值上升: this.info.energy_recovery_rate,
        生命值吸收: this.info.life_steal,
        技能值消耗降低: this.info.energy_reduce_rate
      } : null
    }
  }
}
</script>
