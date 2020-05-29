<template>
  <v-container fluid>
    <v-card-title>装备列表</v-card-title>
    <v-row>
      <v-col
        cols="12"
        class="py-2"
      >
        <v-btn
          color="primary"
          @click="onClick2Cancel()"
          v-text="`清除筛选`"
        />
        <v-btn-toggle
          v-model="filter"
          tile
          color="deep-purple accent-3"
          group
          multiple
        >
          <v-btn value="physical_critical">物理暴击</v-btn>
          <v-btn value="magic_critical">魔法暴击</v-btn>
          <v-btn value="dodge">回避</v-btn>
          <v-btn value="accuracy">命中</v-btn>
          <v-btn value="life_steal">生命值吸收</v-btn>
          <v-btn value="hp_recovery_rate">回复量上升</v-btn>
          <v-btn value="energy_recovery_rate">技能值上升</v-btn>
          <v-btn value="energy_reduce_rate">技能值消耗降低</v-btn>
          <v-btn value="wave_hp_recovery">生命值自动回复</v-btn>
          <v-btn value="wave_energy_recovery">技能值自动回复</v-btn>
          <v-btn value="physical_penetrate">物理穿透</v-btn>
          <v-btn value="magic_penetrate">魔法穿透</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <ItemFilter :filter="filter" />
  </v-container>
</template>

<script>
import ItemFilter from '@/components/items/ItemFilter'

export default {
  name: 'Item',
  components: {
    ItemFilter
  },
  data () {
    return {
      filter: []
    }
  },
  methods: {
    onClick2Cancel () {
      this.filter = []
    }
  }
}
</script>
