<template>
  <v-card>
    <v-card-title id="princess-profile">
      角色介绍
    </v-card-title>
    <v-simple-table
      dark
    >
      <tbody>
        <tr
          v-for="(value, key) in profile"
          :key="key"
        >
          <td class="profile-text">
            {{ key }}
          </td>
          <td class="profile-text">
            {{ value }}
          </td>
        </tr>
        <tr>
          <td class="profile-text">
            碎片
          </td>
          <td>
            <v-row no-gutters>
              <v-col
                v-for="(item, i) in getFragSource"
                :key="i"
                class="col-12 pa-0 ma-0"
              >
                <v-btn
                  outlined
                  small
                  class="px-3 my-1"
                  :disabled="Object.prototype.toString.call(item)== '[object Object]' ? false : true"
                  :to="Object.prototype.toString.call(item)== '[object Object]' ? item.route : ''"
                  v-text="Object.prototype.toString.call(item)== '[object Object]' ? item.name : item"
                />
              </v-col>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: 'PrincessProfile',
  props: {
    princess: {
        type: Object,
        required: true
      }
  },
  computed: {
    profile () {
      return {
        全名: this.princess.profile.fullname,
        年龄: this.princess.profile.age,
        生日: `${this.princess.profile.birth_month}月${this.princess.profile.birth_day}日`,
        身高: this.princess.profile.height,
        体重: this.princess.profile.weight,
        血型: this.princess.profile.blood_type,
        爱好: this.princess.profile.favorite,
        简介: this.princess.profile.catch_copy,
        种族: this.princess.profile.race,
        所属: this.princess.profile.guild,
        声优: this.princess.profile.voice
      }
    },
    getFragSource () {
      const fragId = (this.princess.id - this.princess.id % 100) / 100 + 30000
      const source = []
      for (const key of Object.keys(this.$store.state.charaFragByTokens)) {
        if (this.$store.state.charaFragByTokens[key].includes(fragId)) source.push(key)
      }
      for (const quest of Object.keys(this.$store.state.quest.hard)) {
        for (const reward of Object.values(this.$store.state.quest.hard[quest].reward_info)) {
          for (let i = 1; i <= 5; i++) {
            if (reward[`reward_id_${i}`] === fragId) {
              source.push({
                name: `${this.$store.state.quest.hard[quest].quest_info.quest_name} (H)`,
                route: {'path': '/quest', 'query': {'questid': this.$store.state.quest.hard[quest].id}}
              })
            }
          }
        }
      }
      return source.length ? source : ['暂无获取途径']
    }
  }
}
</script>

<style scoped>
  td.profile-text {
    font-size: 0.8em !important;
  }
</style>
