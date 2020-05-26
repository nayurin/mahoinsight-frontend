<template>
  <v-container>
    <v-card>
      <v-card-title
        class="pa-4 pb-0"
      >{{ itemName() }}</v-card-title>
      <v-row
        dense
        class="d-flex align-center justify-start"
      >
        <v-col
          cols="auto"
        >
          <v-card
            outlined
            max-width=300
            class="ml-3 d-flex align-center justify-center"
          >
            <v-avatar
              tile
              size="128"
              class="ml-4 pa-0"
            >
              <v-img
                :src="src()"
              />
            </v-avatar>
            <v-card-text
              class="pa-2"
              v-html="desc()"
              align="center"
            />
          </v-card>
        </v-col>
        <v-col lg=6>
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
  methods: {
    itemName () {
      return this.item.detail.equipment_name
    },
    src () {
      return `/image/equipments/icon_equipment_${this.item.id}.png`
    },
    desc () {
      return this.item.detail.description.replace(/\\n/g, '')
    }
  }
}
</script>
