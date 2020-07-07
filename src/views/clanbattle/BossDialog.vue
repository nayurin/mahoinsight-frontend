<template>
  <v-dialog
    v-model="show"
    :width="$store.state.mobile ? '600' : '800'"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-sheet
        v-bind="attrs"
        v-on="on"
      >
        <v-tooltip
          top
          offset-overflow
        >
          <template v-slot:activator="{ on, attrs }">
            <v-img
              class="mx-4"
              :src="src(bossdetail.parameter.unit_id)"
              :alt="bossdetail.name"
              width="96"
              height="96"
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <span
            v-text="bossdetail.parameter.unit_name"
          />
        </v-tooltip>
      </v-sheet>
    </template>
    <v-card>
      <v-card-title>
        {{ bossdetail.parameter.name }}
      </v-card-title>
      <v-row
        v-for="(ap, i) in bossdetail.attackpattern"
        :key="i"
        no-gutters
      >
        <v-col class="col-12">
          <v-card-subtitle
            class="font-weight-bold"
            v-text="`攻击模式 ${i + 1}`"
          />
          <v-card-text
            v-html="parseAP(ap)"
          />
        </v-col>
      </v-row>
      <v-row
        v-for="(value, key) in skill(bossdetail.parameter)"
        :key="key"
        no-gutters
      >
        <v-col
          v-for="(comment, i) in skillSelector(value)"
          :key="i"
          class="col-12"
        >
          <v-card-subtitle
            class="font-weight-bold"
            v-text="i ? `${skillMap[key][0]} ${i}` : `${skillMap[key][0]}`"
          />
          <v-card-text
            v-html="comment"
          />
        </v-col>
      </v-row>
      <v-card-actions class="justify-center">
        <ResistanceDialog
          :resistance="resistance(bossdetail.resistance)"
        />
        <v-btn
          color="light-gray"
          @click="show = false"
        >
          <v-icon left>
            mdi-close-box-outline
          </v-icon>
          关闭
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ActionParser from '@/models/skill/ActionParser'
import ResistanceDialog from '@/components/global/ResistanceDialog'

export default {
  name: 'BossDialog',
  components: {
    ResistanceDialog
  },
  props: {
    bossdetail: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      show: false,
      skillMap: {
        union_burst: ['连结爆发', 'amber darken-3 white--amber-'],
        union_burst_evolution: ['连结爆发+', 'amber accent-3'],
        main_skill: ['主要技能', 'cyan accent-3'],
        main_skill_evolution: ['主要技能+', 'cyan darken-3 white--text'],
        sp_skill: ['SP技能', 'teal accent-3'],
        ex_skill: ['EX技能', 'lime lighten-2'],
        ex_skill_evolution: ['EX技能+', 'lime darken-3 white--text']
      }
    }
  },
  methods: {
    src (id) {
      return `${this.$store.state.CDNBaseURL}/image/enemies/icon_unit_${id}.png`
    },
    parseAP (obj) {
      const start = []
      const loop = []
      const apComment = (num) => {
        switch (true) {
          case num === 0:
            return
          case num === 1:
            return '普通攻击'
          case num > 1000 && num < 1020:
            return `技能 ${num % 100}`
          default:
            return
        }
      }

      for (let i = 1; i < obj.loop_start; i++) {
        const comment = apComment(obj[`atk_pattern_${i}`])
        if (comment) start.push(comment)
      }

      for (let i = obj.loop_start; i <= obj.loop_end; i++) {
        const comment = apComment(obj[`atk_pattern_${i}`])
        if (comment) loop.push(comment)
      }

      return `入场：${start.join('→')}<br>循环：${loop.join('→')}`
    },
    resistance (obj) {
      return {
        减速: obj.ailment_1,
        加速: obj.ailment_2,
        麻痹: obj.ailment_3,
        冻结: obj.ailment_4,
        束缚: obj.ailment_5,
        睡眠: obj.ailment_6,
        眩晕: obj.ailment_7,
        石化: obj.ailment_8,
        拘留α: obj.ailment_9, //拘留
        拘留β: obj.ailment_10, //拘留(造成伤害)
        毒: obj.ailment_11,
        烧伤: obj.ailment_12,
        诅咒: obj.ailment_13,
        魅惑: obj.ailment_14,
        黑暗: obj.ailment_15,
        沉默: obj.ailment_16,
        即死: obj.ailment_17,
        击退: obj.ailment_18,
        混乱: obj.ailment_19,
        猛毒: obj.ailment_20,
      }
    },
    skillSelector (value) {
      if (typeof(value) === 'string') {
        return [value]
      } else if (Object.prototype.toString.call(value) === '[object Object]') {
        return value
      }
    },
    skill (obj) {
      const skill = {
        union_burst: {},
        union_burst_evolution: {},
        main_skill: {},
        main_skill_evolution: {},
        sp_skill: {},
        ex_skill: {},
        ex_skill_evolution: {}
      }
      const skillType = [
        {
          name: 'union_burst',
          evo: 'union_burst_evolution',
          level: 'union_burst_level',
          count: 0
        },
        {
          name: 'main_skill',
          evo: 'main_skill_evolution',
          level: 'main_skill_lv',
          count: 10
        },
        {
          name: 'sp_skill',
          evo: null,
          level: null,
          count: 5
        },
        {
          name: 'ex_skill',
          evo: 'ex_skill_evolution',
          level: 'ex_skill_lv',
          count: 5
        }
      ]
      for (const type of skillType) {
        if (type.count) {
          for (let i = 1; i <= type.count; i++) {
            if (obj[`${type.name}_${i}`]) {
              skill[type.name][i] = this.skillDetail({
                skill: obj[`${type.name}_${i}`],
                unitLevel: obj.level,
                unitAtk: obj.atk,
                unitMAtk: obj.magic_str,
                skillLevel: obj[`${type.level}_${i}`] || obj.level
              })
            }

            if (obj[`${type.evo}_${i}`]) {
              skill[type.evo][i] = this.skillDetail({
                skill: obj[`${type.evo}_${i}`],
                unitLevel: obj.level,
                unitAtk: obj.atk,
                unitMAtk: obj.magic_str,
                skillLevel: obj[`${type.level}_${i}`] || obj.level
              })
            }
          }
        } else {
          if (obj[type.name]) {
            skill[type.name] = this.skillDetail({
              skill: obj[type.name],
              unitLevel: obj.level,
              unitAtk: obj.atk,
              unitMAtk: obj.magic_str,
              skillLevel: obj[type.level] || obj.level
            })
          }

          if (obj[type.evo]) {
            skill[type.evo] = this.skillDetail({
              skill: obj[type.evo],
              unitLevel: obj.level,
              unitAtk: obj.atk,
              unitMAtk: obj.magic_str,
              skillLevel: obj[type.level] || obj.level
            })
          }
        }
      }
      for (const skilltype of Object.keys(skill)) {
        if (!Object.keys(skill[skilltype]).length) {
          delete skill[skilltype]
        }
      }
      return skill
    },
    skillDetail ({ skill, unitLevel, unitAtk, unitMAtk, skillLevel }) {
      const detail = []
      let desc = ''
      if (!skill) {
        return null
      }
      for (let i = 1; i <= 7; i++) {
        const action = skill[`action_${i}`]
        const dependAction = skill[`depend_action_${i}`]
        desc = action ? 
          ActionParser.getSkillActionDetails({
            action: action,
            dependAction: dependAction,
            unitLevel: unitLevel,
            unitAtk: unitAtk,
            unitMAtk: unitMAtk,
            skillLevel: skillLevel
          }) :
          ''
        if (desc && desc.detail) detail.push(desc.detail.replace(/\$t/g, desc.target))
      }
      for (let i = 0; i < detail.length; i++) {
        detail[i] = `(${i + 1}) ${detail[i]}`
      }
      return detail.join('<br>')
    }
  }
} 
</script>
