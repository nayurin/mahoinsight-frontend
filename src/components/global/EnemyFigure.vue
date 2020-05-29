<template>
  <div class="text-center">
    <v-dialog
      v-model="dialogEnemyDetail"
      width=600
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
          />
          <v-row
            class="d-flex justify-center align-center"
            no-gutters
          >
            <v-btn
              v-text="name"
              :color="info.atk_type === 1 ? 'pink' : 'indigo'"
              small
              block
              class="pa-0 white--text"
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
            v-text="info.atk_type === 1 ? '物理' : '魔法'"
            :color="info.atk_type === 1 ? 'pink' : 'indigo'"
            label
            small
            class="white--text"
          />
        </v-row>
        <v-row no-gutters>
          <v-col
            class="d-flex flex-row mb-4 ml-4 mt-0 pa-0 align-center"
          >
            <v-img
              :src="src"
              :alt="name"
              contain
              width=128
            />
            <v-card-text 
              v-html="comment"
              class="font-weight-thin"
            />
            <v-dialog
              v-model="dialogEnemyResistance"
              width=400
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  v-text="`异常状态抗性`"
                  color="purple darken-3"
                  class="white--text mr-8"
                  v-on="on"
                />
              </template>
              <v-card
                class="d-flex flex-wrap"
              >
                <v-row no-gutters>
                  <v-col
                    v-for="(value, key) in resistance"
                    :key="key"
                    cols=4
                  >
                    <v-list-item dense>
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
                        v-html="value"
                        :color="value !== 0 ? 'red' : ''"
                      />
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="pb-4"
        >
          <v-col
            class="d-flex flex-row flex-wrap pa-0"
            cols="4"
            v-for="(value, key) in status"
            :key="key"
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
                v-html="value"
              />
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'EnemyFigure',
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
      return this.$store.getters.getQuestEnemyUnitIdByEnemyId(this.enemyid)
    },
    name () {
      return this.$store.getters.getQuestEnemyNameByEnemyId(this.enemyid)
    },
    src () {
      return `/image/enemies/icon_unit_${this.unitid}.png`
    },
    style () {
      return {
        height: `${this.origHeight * parseFloat(this.zoomRatio)}px`,
        width: `${this.origWidth * parseFloat(this.zoomRatio)}px`
      }
    },
    info () {
      return this.$store.getters.getQuestEnemyInfoByEnemyId(this.enemyid)
    },
    comment () {
      return this.info.comment.replace(/\\n/g, '<br/>')
    },
    resistance () {
      return this.$store.getters.getQuestEnemyResistanceByEnemyId(this.enemyid)
    },
    status () {
      return this.info ? {
        等级: this.info.level,
        生命值: this.info.hp,
        索敌半径: this.info.search_area_width,
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
