<template>
  <v-breadcrumbs
    class="pa-1 v-breadcrumbs--large"
    :items="items"
  >
    <template v-slot:divider>
      <v-icon color="secondary">mdi-chevron-right</v-icon>
    </template>
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        :disabled="item.disabled"
        @click="onClick(item.to)"
      >
        <a><span class="breadcrumbs--items" color="secondary">  
          {{ item.text }} 
        </span></a>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  data () {
    return {
      items: [
        {
          text: 'MahoMaho INSIGHT!! 真步真步视界术',
          disabled: false,
          to: { name: 'Home' }
        }
      ]
    }
  },
  watch: {
    $route () {
      this.items = [
        {
          text: 'MahoMaho INSIGHT!! 真步真步视界术',
          disabled: false,
          to: { name: 'Home' }
        }
      ]
      if (!this.$store.state.mobile) this.addBreadcrumbs()
    }
  },
  created () {
    if (!this.$store.state.mobile) this.addBreadcrumbs()
  },
  methods: {
    addBreadcrumbs () {
      let text = ''
      if (this.$route.meta.breadcrumb) {
        this.$route.meta.breadcrumb.map(x => {
          if (x.name.substring(0, 1) === ':') {
            text = this.$route.params[x.name.substring(1)]
          } else {
            for (const route of Object.values(this.$router.options.routes)) {
              if (route.children) {
                for (const child of Object.values(route.children)) {
                  if (child.name === x.name) {
                    text = child.meta.title
                  }
                }
              } else {
                if (route.name === x.name) {
                  text = route.meta.title
                }
              }
            }
          }
          this.items.push({
            text: text,
            to: x.to,
            disabled: x.disabled ? true : false
          })
        })
      }
    },
    onClick (route) {
      if (route.name === this.$route.name || route.path === this.$route.path || route === this.$route.name || route === this.$route.path) return
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
/*a:not(.v-breadcrumbs__item--disabled)>span.breadcrumbs--items {*/
/*  color: #F75194;*/
/*}*/

/*div.v-breadcrumbs__item--disabled span.breadcrumbs--items {*/
/*  color: hsla(0,0%,100%,.85);*/
/*}*/

span.breadcrumbs--items {
  font-size: 0.95em;
}
</style>
