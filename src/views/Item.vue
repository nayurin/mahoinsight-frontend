<template>
  <v-container fluid>
    <v-card>
      <v-card-title>装备列表</v-card-title>
      <v-row no-gutters>
        <v-toolbar
          color="gray"
          flat
          class="pa-0"
        >
          <v-text-field
            v-model="searchbox"
            class="mx-0"
            flat
            hide-details
            label="输入装备名称"
            prepend-inner-icon="mdi-magnify"
            solo-inverted
            clearable
            @click:clear="searchbox = ''"
          />
        </v-toolbar>
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="auto"
          class="px-4 py-2"
        >
          <v-btn
            color="primary"
            class="ma-2"
            @click="onClick2Cancel()"
            v-text="`清除筛选`"
          />
        </v-col>
        <v-col cols="auto">
          <v-btn-toggle
            v-model="filter"
            tile
            group
            dense
            multiple
            color="red"
            class="d-flex flex-wrap py-4"
          >
            <v-btn
              v-for="(desc, name) in btns"
              :key="name"
              small
              color="blue-gray darken-1"
              :value="name"
              class="ma-2"
              v-text="desc"
            />
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-card>
    <ItemFilter
      :filter="filter"
      :search="searchbox"
    />
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
      filter: [],
      btns: {
        physical_critical: '物理暴击',
        magic_critical: '魔法暴击',
        dodge: '回避',
        accuracy: '命中',
        life_steal: '生命值吸收',
        hp_recovery_rate: '回复量上升',
        energy_recovery_rate: '技能值上升',
        energy_reduce_rate: '技能值消耗降低',
        wave_hp_recovery: '生命值自动回复',
        wave_energy_recovery: '技能值自动回复',
        physical_penetrate: '物理穿透',
        magic_penetrate: '魔法穿透'
      },
      searchbox: ''
    }
  },
  methods: {
    onClick2Cancel () {
      this.filter = []
    }
  },
  mounted () {
    // console.log(this.$store.getters.getCharaStoryStatusEX({
    //   name: '日和莉（新年）'
    // }))
    // console.log(this.$store.getters.getUnitSkillDataEX(100101))
    // console.log(this.$store.getters.getUnitSkillData(100101))
    // console.log(this.$store.getters.getQuestsByAreaId(11001))
  }
}
</script>
