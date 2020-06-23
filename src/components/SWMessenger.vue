<template>
  <v-snackbar
    v-model="update.enabled"
    bottom
    color="blue-grey"
    timeout="-1"
  >
    <v-row
      align="center"
      class="mx-0"
    >
      <v-icon class="mr-4">
        mdi-file-check
      </v-icon>
      版本需要更新
      <v-spacer />

      <v-btn
        class="ml-4"
        color="primary"
        depressed
        :loading="update.loading"
        @click="updatenow"
      >
        <v-icon
          small
          class="mr-1"
        >
          mdi-refresh
        </v-icon>
        立即更新
      </v-btn>
    </v-row>
  </v-snackbar>
</template>

<script>
export default {
  name: "SWMessenger",
  data () {
    return {
      update: {
        enabled: false,
        loading: false,
      }
    }
  },
  created () {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.update.enabled = true
      })
    }
  },
  methods: {
    async updatenow() {
      this.update.loading = true
      await this.$workbox.messageSW({
        content: "skipwaiting" 
      })
    }
  }
}
</script>
