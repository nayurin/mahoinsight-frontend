<template>
  <v-timeline
    align-top
    dense
    reverse
  >
    <v-timeline-item
      v-for="item in changelogs"
      :key="item.version"
      :color="item.color"
      fill-dot
      :icon="item.icon"
      :small="!item.current"
    >
      <v-card
        :class="{'elevation-9': item.active}"
        @click.native="item.active = !item.active"
      >
        <v-card-title>
          <span
            v-text="item.current ? `★${item.version}★` : item.version"
          />
          <v-spacer />
          <v-btn
            :color="item.active ? 'success' : ''"
            :input-value="item.active"
            text
            @click.stop="item.active = !item.active"
          >
            {{ timeFormatter(item.date) }}
            <v-icon
              small
              right
              v-text="item.active ? 'mdi-close' : 'mdi-history'"
            />
          </v-btn>
        </v-card-title>
        <v-expand-transition>
          <v-row
            v-if="item.active"
            no-gutters
          >
            <v-col>
              <v-divider />
              <v-card-text
                v-html="comment(item.logs)"
              />
            </v-col>
          </v-row>
        </v-expand-transition>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  name: 'Changelog',
  data () {
    return {
      category: {
        remove: {
          priority: 1,
          text: '移除'
        },
        bugfix: {
          priority: 2,
          text: '修复'
        },
        feature: {
          priority: 3,
          text: '新增'
        },
        improvement: {
          priority: 4,
          text: '优化'
        },
        refactor: {
          priority: 5,
          text: '重构'
        },
        other: {
          priority: 6,
          text: '其他'
        }
      },
      changelogs: [
        {
          current: true,
          version: '0.9.3',
          date: '2020-08-20T09:53:23.482Z',
          logs: [
            {
              content: '【绯红铠甲】的路由导航异常',
              type: 'bugfix'
            },
            {
              content: '【规划】无论哪个Rank都无法选取左上角装备的异常',
              type: 'bugfix'
            },
            {
              content: '【时间线】国服活动筛选异常',
              type: 'bugfix'
            },
            {
              content: '【规划】“应用到用户档案”功能',
              type: 'feature'
            }
          ]
        },
        {
          version: '0.9.2',
          date: '2020-08-11T06:06:42.083Z',
          logs: [
            {
              content: '角色属性计算异常',
              type: 'bugfix'
            },
            {
              content: '团队战Boss属性异常',
              type: 'bugfix'
            },
            {
              content: '来自数据库的静态数据重构为响应式数据',
              type: 'refactor'
            },
            {
              content: '角色管理页面删除功能异常',
              type: 'bugfix'
            },
            {
              content: '【能够合成的装备】显示Rank等级',
              type: 'improvement'
            },
            {
              content: '新增单元测试配置和相关用例',
              type: 'other'
            }
          ]
        },
        {
          version: '0.9.1',
          date: '2020-07-27T06:20:00.000Z',
          logs: [
            {
              content: '条件分支的动作解释',
              type: 'bugfix'
            },
            {
              content: '团队战boss技能的数据错误',
              type: 'bugfix'
            },
            {
              content: '【角色管理】新增保存装备功能',
              type: 'improvement'
            },
            {
              content: '【刷图规划】支持导入用户档案中的角色',
              type: 'improvement'
            }
          ]
        },
        {
          version: '0.9.0',
          date: '2020-07-23T03:00:00.000Z',
          logs: [
            {
              content: '数据缓存文件的构成形式并修改workbox最大可缓存文件大小以匹配新的完整数据缓存',
              type: 'refactor'
            },
            {
              content: '缓存数据导入、获取和调用的内部API以适应新的数据',
              type: 'refactor'
            },
            {
              content: '【更新记录】页，以查看版本更新和修改记录',
              type: 'feature'
            },
            {
              content: '【素材规划】页面新增【未来视】开关，支持比国服最新进度略微超前的素材规划',
              type: 'improvement'
            },
            {
              content: '素材规划中未能正确过滤【圣迹探索】关卡的异常',
              type: 'bugfix'
            },
            {
              content: '不能被合成的装备【设计图或碎片】显示【可以合成的装备】异常的问题',
              type: 'bugfix'
            },
            {
              content: '角色的【专用装备】不能正确被显示的异常',
              type: 'bugfix'
            }
          ]
        }
      ].map(x => {
        x.active = x.current ?? false
        x.color = x.current ? 'success' : 'amber darken-2'
        x.icon = x.current ? 'mdi-check' : 'mdi-dots-horizontal'
        return x
      })
    }
  },
  methods: {
    comment (items) {
      let count = 1
      items = JSON.parse(JSON.stringify(items)).sort((x, y) => this.category[x.type].priority - this.category[y.type].priority)
      const comment = items.reduce((t, v) => {
        t += `${count}.${this.category[v.type].text}：${v.content}<br>`
        count ++
        return t
      }, '')
      return comment.substring(0, comment.length - 4)
    },
    timeFormatter (date) {
      const offset = new Date().getTime() - new Date(date).getTime()
      const offsetabs = Math.abs(offset)
      let offsetconverted
      const timeunit = {
        hour: 60 * 60 * 1000,
        day: 60 * 60 * 24 * 1000,
        month: 60 * 60 * 24 * 30 * 1000,
        year: 60 * 60 * 24 * 30 * 12 * 1000
      }
    
      switch (true) {
        case offsetabs >= 0 && offsetabs < timeunit.day:
          offsetconverted = `${Math.floor(offsetabs / timeunit.hour)} 小时`
          break
        case offsetabs >= timeunit.day && offsetabs < timeunit.month:
          offsetconverted = `${Math.floor(offsetabs / timeunit.day)} 天`
          break
        case offsetabs >= timeunit.month && offsetabs < timeunit.year:
          offsetconverted = `${Math.floor(offsetabs / timeunit.month)} 月`
          break
        default:
          offsetconverted = `${Math.floor(offsetabs / timeunit.year)} 年`
      }
      return offset >= 0 ? `${offsetconverted}前` : `${offsetconverted}后`
    }
  }
}
</script>
