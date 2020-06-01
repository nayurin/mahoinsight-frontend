<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="6"
        class="pa-0"
      >
        <ItemCard
          :item="thisItem"
        />
      </v-col>
      <v-col
        v-if="thisItem.detail.craft_flg === 1"
        cols="6"
        class="pa-2"
      >
        <ItemCraft
          :item="thisItem"
        />
      </v-col>
    </v-row>
    <v-row>
      <ItemRequirement
        :item="thisItem"
      />
    </v-row>
    <v-row>
      <ItemSource
        :item="thisItem"
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
    thisItem () {
      return this.$store.getters.getItemByName(this.itemName)
    },
    itemName () {
      return this.$route.params.itemName
    },
  }
}
</script>
