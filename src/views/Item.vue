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
            @click:clear="onSearchboxClearred()"
          />
        </v-toolbar>
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="12"
          class="px-4 py-2"
        >
          <v-btn
            color="primary"
            class="mr-2"
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
            <v-btn
              value="physical_critical"
              class="ma-0"
              v-text="`物理暴击`"
            />
            <v-btn
              value="magic_critical"
              class="ma-0"
              v-text="`魔法暴击`"
            />
            <v-btn
              value="dodge"
              class="ma-0"
              v-text="`回避`"
            />
            <v-btn
              value="accuracy"
              class="ma-0"
              v-text="`命中`"
            />
            <v-btn
              value="life_steal"
              class="ma-0"
              v-text="`生命值吸收`"
            />
            <v-btn
              value="hp_recovery_rate"
              class="ma-0"
              v-text="`回复量上升`"
            />
            <v-btn
              value="energy_recovery_rate"
              class="ma-0"
              v-text="`技能值上升`"
            />
            <v-btn
              value="energy_reduce_rate"
              class="ma-0"
              v-text="`技能值消耗降低`"
            />
            <v-btn
              value="wave_hp_recovery"
              class="ma-0"
              v-text="`生命值自动回复`"
            />
            <v-btn
              value="wave_energy_recovery"
              class="ma-0"
              v-text="`技能值自动回复`"
            />
            <v-btn
              value="physical_penetrate"
              class="ma-0"
              v-text="`物理穿透`"
            />
            <v-btn
              value="magic_penetrate"
              class="ma-0"
              v-text="`魔法穿透`"
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
      searchbox: ''
    }
  },
  methods: {
    onClick2Cancel () {
      this.filter = []
    },
    onSearchboxClearred () {
      this.searchbox = ''
    }
  }
}
</script>
