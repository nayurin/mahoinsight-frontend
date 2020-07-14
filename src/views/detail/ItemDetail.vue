<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        lg="6"
        class="pa-0"
      >
        <ItemCard
          :id="equipId"
        />
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="pa-2"
      >
        <ItemCraft
          :id="equipId"
        />
      </v-col>
    </v-row>
    <v-row>
      <ItemRequirement
        :id="equipId"
      />
    </v-row>
    <v-row>
      <ItemSource
        :id="equipId"
      />
    </v-row>
  </v-container>
</template>

<script>
import ItemCard from '@/components/items/ItemCard'
import ItemCraft from '@/components/items/ItemCraft'
import ItemRequirement from '@/components/items/ItemRequirement'
import ItemSource from '@/components/items/ItemSource'

export default {
  name: 'ItemDetail',
  components: {
    ItemCard,
    ItemCraft,
    ItemRequirement,
    ItemSource
  },
  computed: {
    equipId () {
      return this.$store.getters.getEquipmentIdByName(this.equipName)
    },
    equipName () {
      return this.$route.params.itemName
    }
  }
}
</script>
