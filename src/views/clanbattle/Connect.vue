<template>
  <v-container>
    <router-view v-if="loaded" />
  </v-container>
</template>

<script>
export default {
  name: 'Connect2ClanBattle',
  data () {
    return {
      loaded: false
    }
  },
  computed: {
    tableData () {
      return this.$store.state.database.outdated
    }
  },
  watch: {
    tableData (cur) {
      if (cur) {
        this.mixinTableData('enemy_parameter')
        this.loaded = true
      }
    }
  },
  mounted () {
    this.$store.dispatch('loadObjects', { file: '/cached/1/master/enemy_parameter.json', database: 'outdated' })
  },
  methods: {
    mixinTableData (table) {
      const data = this.$store.state.database.outdated[table]
      for (const primaryKey of Object.keys(data)) {
        this.$store.commit('insertDatabaseRow', {
          key: primaryKey,
          value: data[primaryKey],
          database: 'master',
          table: table
        })
      }
    }
  }
}
</script>
