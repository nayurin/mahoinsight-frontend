<template>
  <v-card>
    <v-card-title>{{ ueName() }}</v-card-title>
    <v-card-subtitle>专用装备</v-card-subtitle>
    <v-card-text
      v-html="ueDesc()"
    />
  </v-card>
</template>

<script>
export default {
  name: 'PrincessUniqueEquipment',
  props: {
    princess: {
      type: Object,
      required: true
    }
  },
  methods: {
    ueName () {
      return this.base().equipment_name
    },
    ueDesc () {
      return this.base().description.replace(/\\n/g, '')
    },
    base () {
      return this.princess.unique_equipment.data
    },
    enhance () {
      return this.princess.unique_equipment.enhance_rate
    }
  }
}
</script>
