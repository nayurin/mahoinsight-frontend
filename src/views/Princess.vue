<template>
  <v-container fluid>
    <v-card-title>角色列表</v-card-title>
    <v-row>
      <v-col
        cols="12"
        class="py-2"
      >
        <v-btn-toggle
          v-model="selected"
          tile
          color="deep-purple accent-3"
          group
          mandatory
        >
          <v-btn value="稀有度">
            稀有度
          </v-btn>
          <v-btn value="位置">
            位置
          </v-btn>
          <v-btn value="索敌半径" @click="saw = !saw">
            索敌半径
            <v-icon
              right
              v-text="saw ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            />
          </v-btn>
          <v-btn value="年龄" @click="age = !age">
            年龄
            <v-icon
              right
              v-text="age ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            />
          </v-btn>
          <v-btn value="身高" @click="height = !height">
            身高
            <v-icon
              right
              v-text="height ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            />
          </v-btn>
          <v-btn value="体重" @click="weight = !weight">
            体重
            <v-icon
              right
              v-text="weight ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            />
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <ListByRarity v-show="selected === '稀有度'" />
    <ListByPos v-show="selected === '位置'" />
    <SortPrincess v-show="selected === '年龄'" sortby="age" :sort="age" />
    <SortPrincess v-show="selected === '身高'" sortby="height" :sort="height" />
    <SortPrincess v-show="selected === '体重'" sortby="weight" :sort="weight" />
    <SortPrincess v-show="selected === '索敌半径'" sortby="saw" :sort="saw" />
  </v-container>
</template>

<script>
import ListByRarity from '@/components/princesses/ListByRarity'
import ListByPos from '@/components/princesses/ListByPos'
import SortPrincess from '@/components/princesses/SortPrincess'

export default {
  name: 'Princess',
  components: {
    ListByRarity,
    ListByPos,
    SortPrincess
  },
  data: () => ({
    selected: '稀有度',
    age: false,
    weight: false,
    height: false,
    saw: false
  })
}
</script>
