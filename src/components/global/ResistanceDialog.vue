<template>
  <v-dialog
    v-model="dialogEnemyResistance"
    width="400"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="purple darken-3 ma-4"
        class="white--text mr-8"
        :small="$store.state.mobile ? true : false"
        v-bind="attrs"
        v-on="on"
      >
        显示抗性
        <v-icon right>
          mdi-skull-outline
        </v-icon>
      </v-btn>
    </template>
    <v-card
      class="d-flex flex-wrap"
    >
      <v-row no-gutters>
        <v-col
          v-for="(value, key) in resistance"
          :key="key"
          cols="4"
        >
          <v-list-item dense>
            <v-chip
              small
              label
              color="primary"
              v-text="key"
            />
            <v-chip
              label
              outlined
              small
              :color="value !== 0 ? 'red' : ''"
              v-text="value"
            />
          </v-list-item>
        </v-col>
      </v-row>
      <v-card-actions v-if="$store.state.mobile">
        <v-btn
          color="blue darken-1"
          text
          @click="dialogEnemyResistance = false"
          v-text="`关闭`"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ResistanceDialog',
  props: {
    resistid: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      dialogEnemyResistance: false
    }
  },
  computed: {
    resistance () {
      return this.$store.getters.getResistData(this.resistid)
    }
  }
}
</script>
