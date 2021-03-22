<template>
  <v-container>
    <v-card-title
      v-text="!this.$store.state.activeProfile ? '角色管理 [ 无激活档案 ]' : `角色管理 [ ${this.$store.state.activeProfile} ]`"
    />
    <v-row
      v-if="this.$store.state.activeProfile"
    >
      <v-row>
        <v-col cols="3">
          <v-select
            v-model="sortBy"
            label="排序方式"
            :items="sortOptions"
            item-text="state"
            item-value="abbr"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(item, i) in sortedPrincess"
          :key="i"
          class="col-auto"
        >
          <PrincessPlate
            :id="Number(item)"
            zoom-ratio="0.5"
            stars
            pieces
            equips
          />
        </v-col>
      </v-row>
    </v-row>
    <v-row
      v-else
      class="d-flex justify-center"
    >
      <v-btn
        @click="addNewProfile"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        创建新的档案
      </v-btn>
    </v-row>
    <v-row
      v-if="this.$store.state.activeProfile"
      no-gutters
    >
      <v-row>
        <v-card-title>
          添加角色
        </v-card-title>
      </v-row>
      <v-row>
        <v-col
          v-for="(item, i) in unStoragedPrincess"
          :key="i"
          class="col-auto"
        >
          <PrincessPlate
            :id="Number(item)"
            zoom-ratio="0.5"
            stars
            pieces
            equips
          />
        </v-col>
      </v-row>
    </v-row>
    <v-row
      v-else
    >
      <v-card-text class="text-center">
        在添加角色前请先创建或激活一个档案
      </v-card-text>
    </v-row>
  </v-container>
</template>

<script>
import PrincessPlate from '@/components/global/PrincessPlate'

export default {
  name: 'ProfilePrincess',
  components: {
    PrincessPlate
  },
  data () {
    return {
      storage: window.localStorage,
      profile: {},
      sortBy: 'default',
      sortOptions: [
        { state: '默认', abbr: 'default' },
        { state: 'Rank降序', abbr: 'rankdsc' }
      ]
    }
  },
  computed: {
    storagedPrincess () {
      return this.profile[this.$store.state.activeProfile] && this.profile[this.$store.state.activeProfile].princess && Object.prototype.toString.call(this.profile[this.$store.state.activeProfile].princess) === '[object Object]' ? Object.keys(this.profile[this.$store.state.activeProfile].princess).map(x => Number(x)) : []
    },
    sortedPrincess () {
      let prcmap = this.profile[this.$store.state.activeProfile] && this.profile[this.$store.state.activeProfile].princess && Object.prototype.toString.call(this.profile[this.$store.state.activeProfile].princess) === '[object Object]' ? this.profile[this.$store.state.activeProfile].princess : {}
      if (this.sortBy == 'rankdsc') {
        let tmp = Object.entries(prcmap).map(kv => [Number(kv[1].rank), Number(kv[0])])
        tmp.sort((b, a) => (a[0] - b[0] || (a[0] == b[0] && a[1] - b[1])))
        return tmp.map(x => x[1])
      }
      // default
      return Object.keys(prcmap).map(x => Number(x))
    },
    unStoragedPrincess () {
      return this.$store.getters.princessIdList.map(x => Number(x)).filter(x => !this.storagedPrincess.includes(x))
    }
  },
  mounted () {
    window.addEventListener('setItemEvent', this.loadActiveProfile)
    this.loadActiveProfile()
  },
  methods: {
    loadActiveProfile () {
      if (!this.storage.getItem('active')) {
        return
      } else {
        this.profile = {}
        this.$store.commit('updateState', { key: 'activeProfile', value: this.storage.getItem('active') })
        const value = this.storage.getItem(this.$store.state.activeProfile)
        try {
          this.$set(this.profile, this.$store.state.activeProfile, JSON.parse(value))
        } catch {
          return
        }
        this.$store.commit('updateState', { key: 'profile', value: this.profile })
      }
    },
    addNewProfile ({ data = {} }) {
      let seq
      for (seq = 1; Object.keys(this.profile).includes(`Profile ${seq}`); seq++) {
        continue
      }
      this.$setLSItem({
        key: `Profile ${seq}`,
        value: data
      })
      if (!this.storage.getItem('active')) {
        this.$setLSItem({
          key: 'active',
          value: `Profile ${seq}`
        })
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('updateState', { key: 'equipSelected', value: [] })
    this.$store.commit('updateState', { key: 'curRank', value: 0 })
    next()
  }
}
</script>
