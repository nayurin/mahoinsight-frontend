<template>
  <v-container fluid>
    <PrincessBanner
      :princess="princess"
    />
    <v-row>
      <v-col cols="10">
        <PrincessCard
          :princess="princess"
        />
      </v-col>
      <v-col cols="2">
        <PrincessProfile
          :princess="princess"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <PrincessAP
          :princess="princess"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        col=6
      >
        <PrincessEquipment
          :princess="princess"
        />
      </v-col>
      <v-col
        col=6
      >
        <PrincessStatus
          :princess="princess"
        />
      </v-col>
    </v-row>
    <v-row
      v-if="Object.prototype.hasOwnProperty.call(princess, 'unique_equipment')"
    >
      <v-col>
        <PrincessUniqueEquipment
          :princess="princess"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <PrincessSkill
          :princess="princess"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PrincessEquipment from '@/components/princesses/PrincessEquipment'
import PrincessBanner from '@/components/princesses/PrincessBanner'
import PrincessProfile from '@/components/princesses/PrincessProfile'
import PrincessCard from '@/components/princesses/PrincessCard'
import PrincessAP from '@/components/princesses/PrincessAP'
import PrincessStatus from '@/components/princesses/PrincessStatus'
import PrincessUniqueEquipment from '@/components/princesses/PrincessUniqueEquipment'
import PrincessSkill from '@/components/princesses/PrincessSkill'

export default {
  name: 'PrincessDetail',
  components: {
    PrincessEquipment,
    PrincessBanner,
    PrincessProfile,
    PrincessCard,
    PrincessAP,
    PrincessStatus,
    PrincessUniqueEquipment,
    PrincessSkill
  },
  computed: {
    princess () {
      return this.$store.getters.getPrincessByName(this.name)
    },
    name () {
      return this.$route.params.princessName
    }
  },
  // created () {
  //   console.log(this.princess)
  // }
}
</script>
