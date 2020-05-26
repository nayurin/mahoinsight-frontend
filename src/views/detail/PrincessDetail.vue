<template>
  <v-container fluid>
    <PrincessBanner
      :princess="thisPrincess()"
    />
    <v-row>
      <v-col cols="10">
        <PrincessCard
          :princess="thisPrincess()"
        />
      </v-col>
      <v-col cols="2">
        <PrincessProfile
          :princess="thisPrincess()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <PrincessAP
          :princess="thisPrincess()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        col=6
      >
        <PrincessEquipment
          :princess="thisPrincess()"
        />
      </v-col>
      <v-col
        col=6
      >
        <PrincessStatus
          :princess="thisPrincess()"
        />
      </v-col>
    </v-row>
    <v-row
      v-if="Object.prototype.hasOwnProperty.call(thisPrincess(), 'unique_equipment')"
    >
      <v-col>
        <PrincessUniqueEquipment
          :princess="thisPrincess()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <PrincessSkill
          :princess="thisPrincess()"
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
  methods: {
    thisPrincess () {
      return this.$store.getters.getPrincessByName(this.princessName())
    },
    princessId () {
      return this.thisPrincess().id
    },
    princessName () {
      return this.$route.params.princessName
    }
  },
  created () {
    // console.log(this.thisPrincess().skill)
  }
}
</script>
