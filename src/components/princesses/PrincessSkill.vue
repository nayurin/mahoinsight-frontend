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
              :figure="String(skillData(value).icon_type)"
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
            v-text="skillData(value).name"
          />
          <v-divider />
          <v-card-text
            class="body-2 pa-1"
            v-text="skillData(value).description"
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
import ActionParser from '@/models/skill/ActionParser'

export default {
  name: 'PrincessSkill',
  components: {
    SkillFigure
  },
  props: {
    id: {
      type: Number,
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
        连结爆发: this.$store.getters.getUnitSkillData(this.id).union_burst,
        '连结爆发+': this.$store.getters.getUnitSkillData(this.id).union_burst_evolution,
        技能1: this.$store.getters.getUnitSkillData(this.id).main_skill_1,
        '技能1+': this.$store.getters.getUnitSkillData(this.id).main_skill_evolution_1,
        技能2: this.$store.getters.getUnitSkillData(this.id).main_skill_2,
        EX技能: this.$store.getters.getUnitSkillData(this.id).ex_skill_1,
        'EX技能+': this.$store.getters.getUnitSkillData(this.id).ex_skill_evolution_1
      }
      for (const key of Object.keys(skill)) {
        if (skill[key] === 0) {
          delete skill[key]
        }
      }
      return skill
    },
    skillData (skill) {
      return this.$store.getters.getSkillData(skill)
    },
    skillDetail (skill) {
      const detail = []
      let desc = ''
      skill = this.skillData(skill)
      for (let i = 1; i <= 7; i++) {
        const action = this.$store.getters.getSkillAction(skill[`action_${i}`])
        const dependAction = this.$store.getters.getSkillAction(skill[`depend_action_${i}`]) ?? 0
        desc = action ? this.skillActionDetail(action, dependAction) : ''
        if (desc && desc.detail) detail.push(desc.detail.replace(/\$t/g, desc.target))
      }
      for (let i = 0; i < detail.length; i++) {
        detail[i] = `(${i + 1}) ${detail[i]}`
      }
      return detail.join('<br>')
    },
    skillActionDetail (action, dependAction) {
      return ActionParser.getSkillActionDetails({
        action: action,
        dependAction: dependAction,
        unitLevel: this.$store.getters.curLevel,
        unitAtk: this.$store.state.curAtk.atk,
        unitMAtk: this.$store.state.curAtk.magic_str,
        skillLevel: this.$store.getters.curLevel
      })
    }
  }
}
</script>
