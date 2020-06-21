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
      :value="route.name === 'About' ? '' : 'true'"
    >
      <template v-slot:activator>
        <v-list-item
          class="pa-0"
          dense
        >
          <v-list-item-icon>
            <div
              v-if="route.meta.icon"
              :class="'pcr-icon '+route.meta.icon"
            />
            <!--            <v-icon v-text="child.meta.icon" />-->
          </v-list-item-icon>
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
          <div
            v-if="route.meta.icon"
            :class="'pcr-icon '+child.meta.icon"
          />
          <!--          <v-icon v-text="child.meta.icon" />-->
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
        <div
          v-if="route.meta.icon"
          :class="'pcr-icon '+route.meta.icon"
        />
        <!--        <v-icon v-text="route.meta.icon" />-->
      </v-list-item-icon>
      <v-list-item-title color="primary">
        {{ route.meta.title }}
      </v-list-item-title>
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
      }
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
<style lang="scss">
  .pcr-icon {
    width: 44px;
    height: 30px;
    background: url('../../public/image/common/AtlasCommon.png') no-repeat;
  }
  .pcr-icon-home {
    
    background-position: 76.144% 26.457%;
    background-size: 670px 768px;
  }
  .pcr-icon-item {
    background-position: 47.204% 13.059%;
    background-size: 1024px 1024px;
  }
  .pcr-icon-princesses {
    background-position: 54.162% 20.827%;
    background-size: 800px 768px;
  }
  .pcr-icon-quests {
    background-position: 62.614% 15.185%;
    background-size: 768px 768px;
  }
  .pcr-icon-battle {
    background-position: 76.446% 52.634%;
    background-size: 650px 650px;
  }
  .pcr-icon-batte-rank-calculation {
    background-position: -0.5% 7.712%;
    background-size: 1024px 1150px;
  }
  .pcr-icon-team-battle {
    background-position: 0 14.964%;
    background-size: 650px 650px;
  }
  .pcr-icon-team-battle-arrange {
    background-position: 97.793% 29.298%;
    background-size: 768px 768px;
  }
  .pcr-icon-about-us {
    background-position: 73.044% 15.482%;
    background-size: 900px 900px;
  }
  .pcr-icon-join-us {
    background-position: 15.789% 56.877%;
    background-size: 512px 512px;
  }
  .pcr-icon-report {
    background-position: 9.509% 62.12%;
    background-size: 550px 512px;
  }
  .pcr-icon-friend-link {
    background-position: 14.214% 29.259%;
    background-size: 1100px 1100px;
  }
</style>
