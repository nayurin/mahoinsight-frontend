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
    id: {
        type: Number,
        required: true
      }
  },
  computed: {
    profile () {
      const profile = this.$store.getters.getUnitProfile(this.id)
      return {
        全名: this.$store.getters.getUnitBackground(this.id),
        年龄: profile.age,
        生日: `${profile.birth_month}月${profile.birth_day}日`,
        身高: profile.height,
        体重: profile.weight,
        血型: profile.blood_type,
        爱好: profile.favorite,
        简介: profile.catch_copy,
        种族: profile.race,
        所属: profile.guild,
        声优: profile.voice
      }
    },
    getFragSource () {
      const fragId = (this.id - this.id % 100) / 100 + 30000
      const source = []
      for (const key of Object.keys(this.$store.state.charaFragByTokens)) {
        if (this.$store.state.charaFragByTokens[key].includes(fragId)) {
          source.push(key)
          break
        }
      }
      for (const quest of this.$store.getters.getQuestDataByDiff.hard) {
        for (const rewardgroup of this.$store.getters.getQuestRewardById(quest.quest_id)) {
          for (const reward of rewardgroup) {
            if (reward.itemid === fragId) {
              source.push({
                name: quest.quest_name,
                route: {'path': '/quest', 'query': {'questid': quest.quest_id }}
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
