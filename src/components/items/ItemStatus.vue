<template>
  <v-container
    v-if="Object.keys(status).length"
    fluid
  >
    <v-card
      class="pa-0"
      outlined
    >
      <v-row dense>
        <v-col
          align-self="start"
          class="pa-0"
        >
          <v-list-item
            v-for="(value, key) in status"
            :key="key"
            class="ml-4 pa-0"
          >
            <v-btn
              small
              color="primary"
              v-text="key"
            />
            <v-btn
              text
              small
              v-text="value"
            />
            <v-icon>mdi-chevron-double-right</v-icon>
            <v-btn
              text
              small
              v-text="value * 2" 
            />
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'ItemStatus',
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    computed: {
      status () {
        return this.$store.getters.getEquipmentStatsById(this.id, false)
      }
    }
  }
</script>
