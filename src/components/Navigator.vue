<template>
  <v-list>
    <v-list-group
      v-if="isDetailPage"
      :prepend-icon="parent.meta.icon"
      value="true"
    >
      <template v-slot:activator>
        <v-list-item
          class="pa-0"
          dense
        >
          <v-list-item-title>{{ parent.meta.title }}</v-list-item-title>
        </v-list-item>
      </template>
      <v-list-item
        v-for="(value, key) in resolvedAnchor"
        :key="key"
        dense
        @click="scroll(value[0])"
      >
        <v-list-item-title
          class="text-center"
          v-text="key"
        />
        <v-list-item-icon>
          <v-icon v-text="value[1]" />
        </v-list-item-icon>
      </v-list-item>
    </v-list-group>

    <v-list-group
      v-else-if="route.children"
      :prepend-icon="route.meta.icon"
      :value="extend.includes(route.name) ? 'true' : ''"
    >
      <template v-slot:activator>
        <v-list-item
          class="pa-0"
          dense
        >
          <v-list-item-title>
            {{ route.meta.title }}
          </v-list-item-title>
        </v-list-item>
      </template>
      <v-list-item
        v-for="(child, i) in visibleChild(route.children)"
        :key="i"
        dense
        :class="isActive(child.name)"
        @click="navigate(child)"
      >
        <v-list-item-title
          class="text-center"
          v-text="child.meta.title"
        />
        <v-list-item-icon>
          <v-icon v-text="child.meta.icon" />
        </v-list-item-icon>
      </v-list-item>
    </v-list-group>

    <v-list-item
      v-else
      :key="route.name"
      dense
      :class="isActive(route.name)"
      @click="navigate(route)"
    >
      <v-list-item-icon>
        <v-icon v-text="route.meta.icon" />
      </v-list-item-icon>
      <v-list-item-title>{{ route.meta.title }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    route: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      anchor: {
        Item: {
          返回列表: ["back-to-the-list--item", "mdi-arrow-left-drop-circle"],
          卡片: ["#item-card", "mdi-checkerboard"],
          合成: ["#item-craft", "mdi-flask"],
          需求角色: ["#item-requirement", "mdi-chess-queen"],
          素材来源: ["#item-source", "mdi-treasure-chest"],
        },
        Princess: {
          返回列表: ["back-to-the-list--princess", "mdi-arrow-left-drop-circle"],
          立绘: ["#princess-card", "mdi-face-woman"],
          介绍: ["#princess-profile", "mdi-comment-edit"],
          剧情奖励: ["#princess-story-bonus", "mdi-star-face"],
          行动模式: ["#princess-ap", "mdi-rotate-right"],
          装备: ["#princess-equipment", "mdi-puzzle"],
          属性: ["#princess-status", "mdi-hexagon-multiple"],
          专用装备: ["#princess-ue", "mdi-puzzle-star"],
          技能: ["#princess-skill", "mdi-variable"]
        }
      },
      extendsDefault: ['Arena', 'ClanBattle']
    }
  },
  computed: {
    isDetailPage () {
      return this.parent && this.route.name === this.parent.name ? true : false
    },
    parent () {
      if (this.$route.meta.parent) {
        const parent = this.$route.meta.parent
        for (const route of Object.values(this.$router.options.routes)) {
          if (route.name === parent) {
            return route
          }
        }
      }
      return null
    },
    resolvedAnchor () {
      return this.anchor[this.parent.name]
    },
    extend () {
      const extend = this.extendsDefault
      if (this.$route.matched.length > 1) {
        extend.push(this.$route.matched[0].name)
      }
      return extend
    }
  },
  methods: {
    isActive (name) {
      return name === this.$route.name && !this.$route.meta.hidden ? {
        "v-list-item--active": true
      } : ''
    },
    visibleChild (routes) {
      return routes.filter(x => !x.meta.hidden)
    },
    navigate (route) {
      const fullpath = route.path.substring(0, 1) === '/' ? true : false
      if (fullpath) {
        if (route.path !== this.$router.currentRoute.path){
          this.$router.push({
            name: route.name
          })
        }
      } else {
        if (route.path !== this.$router.currentRoute.path.split('/').pop()) {
          this.$router.push({
            name: route.name
          })
        }
      }
    },
    scroll (selector) {
      if (selector.match(/(.*)--(.*)/) && selector.match(/(.*)--(.*)/)[2] === 'item') {
        this.$router.push({
          name: 'Item'
        })
      } else if (selector.match(/(.*)--(.*)/) && selector.match(/(.*)--(.*)/)[2] === 'princess') {
        this.$router.push({
          name: 'Princess'
        })
      }
      if (document.querySelector(selector)) {
        document.querySelector(selector).scrollIntoView({
          behavior: "smooth",
          block: "center"
        })
      }
    }
  }
}
</script>
