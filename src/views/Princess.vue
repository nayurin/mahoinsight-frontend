<template>
  <div>
    <h3>角色列表</h3>
    <div>
      <PrincessFigure
        v-for="chara of princess()"
        :key="chara.id"
        :princess="chara"
        zoomRatio="0.8"
      />
    </div>
  </div>
</template>

<script>
import PrincessFigure from '@/components/PrincessFigure'

export default {
  name: 'Princess',
  components: {
    PrincessFigure
  },
  methods: {
    princess () {
      return this.$store.state.chara
    }
  },
  created () {
    if (!Object.keys(this.princess()).length) {
      this.$store.commit('loadObjects', 'chara')
    }
  }
}
</script>

<style>

</style>
