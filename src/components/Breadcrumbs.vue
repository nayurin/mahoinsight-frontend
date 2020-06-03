<template>
  <v-breadcrumbs
    large
    class="pa-1"
    :items="items"
  >
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
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
          disabled:  false,
          href: '/'
        }
      ]
    }
  },
  watch: {
    $route () {
      this.items = [
        {
          text: 'MahoMaho INSIGHT!! 真步真步视界术',
          disabled:  false,
          href: '/'
        }
      ]
      this.addBreadcrumbs()
    }
  },
  created () {
    this.addBreadcrumbs()
  },
  methods: {
    addBreadcrumbs () {
      let text = '', href = ''
      if (this.$route.meta.breadcrumb) {
        this.$route.meta.breadcrumb.map(x => {
          if (x.substring(0, 1) === ':') {
            text = this.$route.params[x.substring(1)]
            href = this.$route.path
          } else {
            for (const route of Object.values(this.$router.options.routes)) {
              if (route.children) {
                for (const child of Object.values(route.children)) {
                  if (child.name === x) {
                    text = child.meta.title
                    href = child.path
                  }
                }
              } else {
                if (route.name === x) {
                  text = route.meta.title
                  href = route.path
                }
              }
            }
          }
          this.items.push({
            text: text,
            href: href
          })
        })
      }
      this.items.reverse()[0]['disabled'] = true
      this.items.reverse()
    },
  }
}
</script>
