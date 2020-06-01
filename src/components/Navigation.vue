<template>
  <v-list>
    <v-list-group
      v-if="isDetailPage"
      :prepend-icon="parent.meta.icon"
      value="true"
    >
      <template v-slot:activator>
        <v-list-item dense>
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

    <v-list-item
      v-else
      :key="route.name"
      dense
      :class="isActive"
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
          卡片: ["#item-card", "mdi-checkerboard"],
          合成: ["#item-craft", "mdi-flask"],
          需求角色: ["#item-requirement", "mdi-chess-queen"],
          素材来源: ["#item-source", "mdi-treasure-chest"],
        },
        Princess: {
          立绘: ["#princess-card", "mdi-face-woman"],
          介绍: ["#princess-profile", "mdi-comment-edit"],
          行动模式: ["#princess-ap", "mdi-rotate-right"],
          装备: ["#princess-equipment", "mdi-puzzle"],
          属性: ["#princess-status", "mdi-hexagon-multiple"],
          专用装备: ["#princess-ue", "mdi-puzzle-star"],
          技能: ["#princess-skill", "mdi-variable"]
        }
      }
    }
  },
  computed: {
    isActive() {
      return this.route.path === this.$route.path ? {
        "v-list-item--active": true,
      } : ''
    },
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
    }
  },
  methods: {
    navigate (route) {
      if (route.path !== this.$router.currentRoute.path){
        this.$router.push({
          name: route.name
        })
      }
    },
    scroll (selector) {
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
