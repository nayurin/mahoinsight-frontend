<template>
  <v-row
    id="princess-ap"
    no-gutters
  >
    <v-col
      v-for="(ap, i) in AP"
      :key="i"
      class="col-12"
    >
      <v-card>
        <v-card-title
          v-text="AP.length === 1 ? '行动模式' : `行动模式 ${i + 1}`"
        />
        <v-row>
          <v-col
            class="col-12 col-lg-auto"
          >
            <v-card
              outlined
              class="mx-3"
            >
              <v-card-text
                class="pa-2"
                v-text="`入场`"
              />
              <v-row
                class="pa-2 mx-auto"
              >
                <SkillFigure
                  v-for="(value, j) in ap.start"
                  :key="j"
                  :figure="APSkillSuffix[value]"
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
            class="col-12 col-lg-auto"
          >
            <v-card
              outlined
              class="mx-3"
            >
              <v-card-text 
                class="pa-2"
              >
                循环
              </v-card-text>
              <v-row
                class="pa-2 mx-auto"
              >
                <SkillFigure
                  v-for="(value, j) in ap.loop"
                  :key="j"
                  :figure="APSkillSuffix[value]"
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
    </v-col>
  </v-row>
</template>

<script>
import SkillFigure from '@/components/global/SkillFigure'

export default {
  name: 'PrincessAP',
  components: {
    SkillFigure
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    AP () {
      const AP = []
      for (const ap of this.$store.getters.getUnitAttackPattern(this.id)) {
        const pattern = {
          start: [],
          loop: []
        }
        for (let i = 1; i < ap.loop_start; i++) {
          pattern.start.push(ap[`atk_pattern_${i}`])
        }
        for (let i = ap.loop_start; i <= ap.loop_end; i++) {
          pattern.loop.push(ap[`atk_pattern_${i}`])
        }
        AP.push(pattern)
      }
      return AP
    },
    APSkillSuffix () {
      return {
        1: [null, 'phy', 'mag'][this.$store.getters.getUnitData(this.id).atk_type],
        1001: [null, 'ap_phy_1', 'ap_magic_1'][this.$store.getters.getUnitData(this.id).atk_type],
        1002: [null, 'ap_phy_2', 'ap_magic_2'][this.$store.getters.getUnitData(this.id).atk_type]
      }
    }
  }
}
</script>
