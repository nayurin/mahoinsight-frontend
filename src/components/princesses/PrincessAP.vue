<template>
  <v-card>
    <v-card-title id="princess-ap">
      行动模式
    </v-card-title>
    <v-row>
      <v-col cols="6">
        <v-card outlined>
          <v-card-text
            class="pa-2"
            v-text="`入场`"
          />
          <v-row
            class="pa-2 mx-auto"
          >
            <SkillFigure
              v-for="(value, i) in AP()[0]"
              :id="APSkillSuffix()[value]"
              :key="i"
              zoom-ratio="0.45"
            >
              <template v-slot:afterImage>
                <v-icon>mdi-chevron-double-right</v-icon>
              </template>
            </SkillFigure>
          </v-row>
        </v-card>
      </v-col>
      <v-col
        cols="6"
      >
        <v-card outlined>
          <v-card-text 
            class="pa-2"
          >
            循环
          </v-card-text>
          <v-row
            class="pa-2 mx-auto"
          >
            <SkillFigure
              v-for="(value, i) in AP()[1]"
              :id="APSkillSuffix()[value]"
              :key="i"
              zoom-ratio="0.45"
            >
              <template v-slot:beforeImage>
                <v-icon>mdi-chevron-double-right</v-icon>
              </template>
            </SkillFigure>
            <v-icon>mdi-rotate-right</v-icon>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import SkillFigure from '@/components/global/SkillFigure'
export default {
  name: 'PrincessAP',
  components: {
    SkillFigure
  },
  props: {
    princess: {
      type: Object,
      required: true
    }
  },
  methods: {
    AP () {
      const ap = [[], []]
      for (const key in this.princess.attack_pattern) {
        if (key.substr(0, 11) === 'atk_pattern' && this.princess.attack_pattern[key] !== 0) {
          ap[0].push(this.princess.attack_pattern[key])
        }
      }
      ap[1] = ap[0].splice(this.princess.attack_pattern.loop_start - 1, this.princess.attack_pattern.loop_end - 1)
      return ap
    },
    APSkillSuffix () {
      return {
        1: [null, 'phy', 'mag'][this.princess.status.atk_type],
        1001: [null, 'ap_phy_1', 'ap_magic_1'][this.princess.status.atk_type],
        1002: [null, 'ap_phy_2', 'ap_magic_2'][this.princess.status.atk_type]
      }
    }
  }
}
</script>
