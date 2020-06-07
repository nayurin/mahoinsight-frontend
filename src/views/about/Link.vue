<template>
  <v-container>
    <v-card-title>友情链接</v-card-title>
    <v-row>
      <v-col
        v-for="(site, i) in sites"
        :key="i"
        class="col-12 col-lg-4"
      >
        <v-card>
          <v-card-title>
            {{ site.title }}
          </v-card-title>
          <v-card-text>
            <v-chip
              v-for="(label, j) in site.labels"
              :key="j"
              label
              dark
              small
              :color="labelcolor[label]"
              class="mx-1"
              v-text="label"
            />
          </v-card-text>
          <v-card-action>
            <v-row
              no-gutters
              justify="center"
            >
              <v-btn
                dark
                color="primary"
                :href="site.url"
                class="my-2"
                rounded
              >
                <v-icon>mdi-exit-to-app</v-icon>
              </v-btn>
            </v-row>
          </v-card-action>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Link',
  data () {
    return {
      sites: [
        {
          title: '干炸里脊资源站',
          url: 'https://redive.estertion.win',
          labels: ['游戏素材']
        },
        {
          title: '蘭德索爾圖書館',
          url: 'https://pcredivewiki.tw',
          labels: ['WIKI', 'TW']
        },
        {
          title: 'プリコネ攻略｜プリンセスコネクト！Re:Dive徹底解説',
          url: 'https://gamewith.jp/pricone-re',
          labels: ['WIKI', 'JP']
        }
      ],
      labelcolor: {
        游戏素材: 'amber darken-2',
        WIKI: 'cyan',
      }
    }
  }
}
</script>
