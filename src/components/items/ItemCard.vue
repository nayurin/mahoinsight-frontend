<template>
  <v-container class="pa-2">
    <v-card>
      <v-card-title
        id="item-card"
        class="pa-4 pb-0"
      >
        {{ itemName }}
      </v-card-title>
      <v-row
        dense
        class="d-flex align-center justify-start"
      >
        <v-col
          cols="auto"
        >
          <v-card
            outlined
            max-width="300"
            class="ml-3 mb-2 d-flex align-center justify-center"
          >
            <v-avatar
              tile
              size="128"
              class="ml-4 pa-0"
            >
              <v-img
                :src="src"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0 align-center justify-center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    />
                  </v-row>
                </template>
              </v-img>
            </v-avatar>
            <v-card-text
              class="pa-2"
              align="center"
              v-html="desc"
            />
          </v-card>
        </v-col>
        <v-col>
          <ItemStatus
            :item="item"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import ItemStatus from '@/components/items/ItemStatus'
export default {
  name: 'ItemCard',
  components: {
    ItemStatus
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    itemName () {
      return this.item.detail.equipment_name
    },
    src () {
      return `${this.$store.state.CDNBaseURL}/image/equipments/icon_equipment_${this.item.id}.png`
    },
    desc () {
      return this.item.detail.description.replace(/\\n/g, '')
    }
  }
}
</script>
