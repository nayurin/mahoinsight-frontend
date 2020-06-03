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
          cols="auto"
          lg="5"
        />
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
    }
  }
}
</script>
