<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12 col-lg-6">
        <v-card>
          <v-row>
            <v-col class="d-flex flex-row align-center">
              <v-card-title>
                加入我们
              </v-card-title>
              <v-btn
                rounded
                class="mx-2"
                @click="onClick(projecturl)"
              >
                <v-icon>mdi-github</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider />
          <v-card-text>
            本项目为非盈利性开源项目。如果您拥有以下技能并且有意愿协助开发，欢迎联系我们。
          </v-card-text>
          <v-list>
            <v-list-item
              v-for="item in skill"
              :key="item"
              dense
              v-text="item"
            />
          </v-list>
        </v-card>
      </v-col>
      <v-col class="col-12 col-lg-6">
        <v-card>
          <v-card-title>
            联系我们
          </v-card-title>
          <v-divider />
          <v-card-text>
            对本站有任何建议，欢迎联系站长或移步NGA讨论帖。
          </v-card-text>
          <v-row no-gutters>
            <v-col>
              <v-chip
                label
                dark
                class="ma-3"
              >
                <v-icon left>
                  mdi-qqchat
                </v-icon>
                Group 863491954
              </v-chip>
              <v-chip
                label
                dark
                class="ma-3"
                @click="onClick(topicurl)"
              >
                <v-icon left>
                  mdi-chat-processing
                </v-icon>
                NGA讨论帖
              </v-chip>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-footer
      absolute
      class="text-caption"
    >
      本网站是由 公主连结! Re:Dive 爱好者与社区开发者自制，网站所涉及的公司名称、商标、产品等均为其各自所有者的资产，仅供识别。
      <br>
      网站内使用的游戏素材，仅用于更好地表现游戏资料，其版权、商标权及其他知识产权属于原内容提供者（Cygames / BiliBili Games）。
    </v-footer>
  </v-container>
</template>

<script>
export default {
  name: 'Joinus',
  data () {
    return {
      projecturl: "https://github.com/nayurin/mahoinsight-frontend",
      topicurl: "https://nga.178.com/read.php?tid=22164632",
      skill: ['Vue.js', 'Vuetify @ Vue.js', 'Node.js', 'UI/UX 设计']
    }
  },
  methods: {
    onClick (url) {
      window.open(url, '_blank')
    }
  }
}
</script>
