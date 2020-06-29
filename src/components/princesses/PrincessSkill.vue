<template>
  <v-container
    class="pa-0"
  >
    <v-card-title id="princess-skill">
      角色技能
    </v-card-title>
    <v-card
      v-for="(value, key) in skill()"
      :key="key"
    >
      <v-row>
        <v-col
          cols="auto"
          class="d-flex justify-center pa-7"
        >
          <v-avatar
            tile
            size="80"
            class="align-self-center"
          >
            <SkillFigure
              :id="String(value.icon)"
              zoom-ratio="0.625"
            />
          </v-avatar>
        </v-col>
        <v-col
          cols="6"
          lg="5"
        >
          <v-btn
            small
            rounded
            :color="btnColor[key]"
            v-text="key"
          />
          <v-card-text
            class="title pa-1"
            v-text="value.name"
          />
          <v-divider />
          <v-card-text
            class="body-2 pa-1"
            v-text="value.description"
          />
        </v-col>
        <v-col
          cols="12"
          lg="5"
          class="d-flex align-center"
        >
          <v-card-text
            v-html="skillDetail(value)"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import SkillFigure from '@/components/global/SkillFigure'

export default {
  name: 'PrincessSkill',
  components: {
    SkillFigure
  },
  props: {
    princess: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      btnColor: {
        连结爆发: "amber darken-3 white--text",
        技能1: "cyan accent-3",
        '技能1+': "cyan darken-3 white--text",
        技能2: "teal accent-3",
        EX技能: "lime lighten-2",
        'EX技能+': "lime darken-3 white--text"
      }
    }
  },
  methods: {
    skill () {
      const skill = {
        连结爆发: this.princess.skill.union_burst,
        技能1: this.princess.skill.skill_1,
        '技能1+': this.princess.skill.skill_1_evo,
        技能2: this.princess.skill.skill_2,
        EX技能: this.princess.skill.ex_skill,
        'EX技能+': this.princess.skill.ex_skill_evo
      }
      for (const key of Object.keys(skill)) {
        if (skill[key] === 0) {
          delete skill[key]
        }
      }
      return skill
    },
    skillDetail (skill) {
      const detail = []
      let desc = ''
      if (!skill) {
        return null
      }
      for (let i = 0; i <= skill.actions.action_list.length; i++) {
        const action = skill.actions.action_list[i]
        if (action && action.description) {
          if (/\{0\}/.test(action.description)) {
            desc = action.description.replace(/\{0\}/, this.skillActionDetail(action).detail)
          } else {
            desc = `${action.description}${this.skillActionDetail(action).detail}`
          }
          detail.push(this.skillActionDetail(action).range ? `${desc} 范围【 ${action.target_range} 】` : desc)
        }
      }
      return detail.join('<br>')
    },
    skillActionDetail (action) {
      const level = this.$store.getters.curLevel
      const atk = this.$store.state.curAtk
      let total = 0, detail = ''
      const range = action.target_range > 0 ? action.target_range : 0
      switch (action.action_type) {
        case 1: // 造成伤害
          total = Number(action.action_value_1) + (Number(action.action_value_2) * level) + (Number(action.action_value_3) * atk)
          detail = action.target_range === -1 ?
          ` ${Math.ceil(total)} 【 ${action.action_value_1} + ${action.action_value_2}*技能等级 + ${action.action_value_3} *atk 】` :
          ` ${Math.ceil(total)} 【 ${action.action_value_1} + ${action.action_value_2}*技能等级 + ${action.action_value_3} *atk 】`
          break
        // case 2: // ?
        // case 3: // ?
        case 4: // 回复HP
          total = Number(action.action_value_2) + (Number(action.action_value_3) * level) + (Number(action.action_value_4) * atk)
          detail = ` ${Math.ceil(total)} 【 ${action.action_value_2} + ${action.action_value_3}*技能等级 + ${action.action_value_4}*atk 】`
          break
        case 6: // 改变护盾值
          total = Number(action.action_value_1) + (Number(action.action_value_2) * level)
          detail = ` ${Math.ceil(total)} 【 ${action.action_value_1} + ${action.action_value_2}*技能等级 】`
          break
        // case 7: // ?
        case 8: // 改变行动速度
          if (action.action_value_1 === 0) {
            detail = ` 持续【 ${action.action_value_3} 】秒`
          } else if (action.action_value_1 > 0 && action.action_value < 1) {
            detail = ` 行动速度降低至【 ${action.action_value_1} 】倍 持续【 ${action.action_value_3} 】秒`
          } else {
            detail = ` 行动速度提高至【 ${action.action_value_1} 】倍 持续【 ${action.action_value_3} 】秒`
          }
          break
        case 9: // 持续伤害
          total = Number(action.action_value_1) + (Number(action.action_value_2) * level)
          detail = ` ${Math.ceil(total)} 【 ${action.action_value_1} + ${action.action_value_2}*技能等级 】`
          break
        case 10: // 改变属性值
          total = Number(action.action_value_2) + (Number(action.action_value_3) * level)
          if (action.action_value_1 === 1) {
            detail = ` ${Math.ceil(total)} 【 ${action.action_value_2} + ${action.action_value_3}*技能等级 】 持续【 ${action.action_value_4} 】秒`
          } else if (action.action_value_1 === 2) {
            detail = ` 【变化率 ${Math.ceil(total)}%】 【 ${action.action_value_2}% + ${action.action_value_3}*技能等级 】 持续【 ${action.action_value_4} 】秒`
          }
          break
        case 11: // 赋予混乱
          detail = ` 持续【 ${action.action_value_1} 】秒` // 还有个action_value_3不知道是做什么的 推测为命中几率
          break
        case 12: // 赋予黑暗
          detail = ` 持续【 ${action.action_value_1} 】秒` // 还有个action_value_3不知道是做什么的 推测为命中几率
          break
        // case 14: // ??
        case 15: // 召唤
          detail = '' // action_value_3 action_value_5 action_value_6 action_value_7都不知道是做什么的
          break
        case 16: // 改变TP
          total = Number(action.action_value_1) + (Number(action.action_value_2) * level)
          detail = ` ${Math.ceil(total)} 【 ${action.action_value_1} + ${action.action_value_2}*技能等级 】`
          break
        // case 17: // ???
        // case 18: // ???
        case 20: // 挑衅
          total = Number(action.action_value_1) + (Number(action.action_value_2) * level)
          detail = ` 持续 ${total} 【 ${action.action_value_1} + ${action.action_value_2}*技能等级 】秒`
          break
        case 21: // 赋予自身无敌
          total = Number(action.action_value_1) + (Number(action.action_value_2) * level)
          detail = ` 持续 ${total} 【 ${action.action_value_1} + ${action.action_value_2}*技能等级 】秒`
          break
        // case 23: // ???
        // case 26: // ???
        // case 27: // ???
        // case 28: // ???
        // case 30: // ???
        // case 32: // ?
        case 33: // 召唤??
          total = Number(action.action_value_1) + (Number(action.action_value_2) * level)
          detail = ` ${Math.ceil(total)} 【 ${action.action_value_1} + ${action.action_value_2}*技能等级 】`
          break
        case 34: // 每次攻击时伤害增加
          total = Number(action.action_value_2) + (Number(action.action_value_3) * level)
          detail = ` ${Math.ceil(total)} 【 ${action.action_value_2} + ${action.action_value_3}*技能等级 】`
          break
        // case 35: // 英灵的加护?? 安2技能
        case 36: // 每秒伤害
          total = Number(action.action_value_1) + (Number(action.action_value_2) * level) + (Number(action.action_value_3) * atk)
          detail = ` ${Math.ceil(total)} 【 ${action.action_value_1} + ${action.action_value_2}*技能等级 + ${action.action_value_3} *atk 】`
          break
        case 37: // 区域HP持续回复
          total = Number(action.action_value_1) + (Number(action.action_value_2) * level) + (Number(action.action_value_3) * atk)
          detail = ` ${Math.ceil(total)} 【 ${action.action_value_1} + ${action.action_value_2}*技能等级 + ${action.action_value_3} *atk 】 持续【 ${action.action_value_5} 】秒 范围【 ${action.action_value_7} 】`
          break
        case 38: // 改变区域属性值
          total = Number(action.action_value_1) + (Number(action.action_value_2) * level)
          detail = ` ${Math.ceil(total)} 【 ${action.action_value_1} + ${action.action_value_2}*技能等级 】 持续【 ${action.action_value_3} 】秒` // 还有个action_value_5不知道是做什么的 推测是范围
          break
        // case 42: // ???
        // case 44: // ???
        // case 45: // ???
        case 48: // 每秒回复HP或TP
          total = Number(action.action_value_1) + (Number(action.action_value_2) * level) + (Number(action.action_value_3) * atk)
          detail = ` ${Math.ceil(total)} 【 ${action.action_value_1} + ${action.action_value_2}*技能等级 + ${action.action_value_3} *atk 】 持续【 ${action.action_value_5} 】秒`
          break
        case 50: // 范围防御上升
          total = Number(action.action_value_2) + (Number(action.action_value_3) * level)
          detail = ` ${Math.ceil(total)} 【 ${action.action_value_2} + ${action.action_value_3}*技能等级 】`
          break
        // case 53: // ???
        case 90: // EX技能:自身属性值提升
          total = Number(action.action_value_2) + (Number(action.action_value_3) * level)
          detail = ` ${Math.ceil(total)} 【 ${action.action_value_2} + ${action.action_value_3}*技能等级 】`
          break
        default:
          return
      }
      return {
        detail,
        range
      }
    }
  },
  mounted () {
    console.log(this.princess.skill)
  }
}
</script>
