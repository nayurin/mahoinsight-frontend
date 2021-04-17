<template>
  <v-container class="pa-2">
    <v-card>
      <v-card-title
        id="item-card"
        class="pa-4 pb-0"
      >
        {{ equipName }}
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
                <template #placeholder>
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
            :id="id"
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
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    equip () {
      return this.$store.getters.getEquipmentData(this.id)
    },
    equipName () {
      return this.equip.equipment_name
    },
    src () {
      return `${this.$store.state.CDNBaseURL}/image/equipments/icon_equipment_${this.id}.png`
    },
    desc () {
      return this.equip.description.replace(/\\n/g, '')
    }
  }
}
</script>
