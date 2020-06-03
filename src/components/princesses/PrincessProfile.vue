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
          v-for="(value, key) in profile()"
          :key="key"
        >
          <td>
            {{ key }}
          </td>
          <td>
            {{ value }}
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
  methods: {
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
    }
  }
}
</script>
