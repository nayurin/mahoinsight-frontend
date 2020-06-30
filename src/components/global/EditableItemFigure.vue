<template>
  <v-dialog
    v-model="editing"
    :width="$store.state.mobile ? '350' : '380'"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-card
        outlined
        v-bind="attrs"
        v-on="on"
      >
        <ItemFigure
          :id="id"
          no-route
          zoom-ratio="0.5"
        >
          <template v-slot:inner>
            <slot name="inner" />
          </template>
        </ItemFigure>
      </v-card>
    </template>
    <v-card>
      <v-row
        no-gutters
        class="my-3"
      >
        <v-col
          class="col-auto pa-5"
        >
          <ItemFigure
            :id="id"
            no-route
            zoom-ratio="0.8"
          />
        </v-col>
        <v-col>
          <v-card-title>
            {{ $store.getters.getItemNameById(id) }}
          </v-card-title>
          <v-card-subtitle
            v-text="comment"
          />
        </v-col>
      </v-row>
      <slot name="content" />
      <v-card-actions class="justify-center">
        <v-btn
          color="light-gray"
          @click="onUpdate"
        >
          <v-icon left>
            mdi-text-box-plus-outline
          </v-icon>
          修改
        </v-btn>
        <v-btn
          color="light-gray"
          @click="onRemove"
        >
          <v-icon left>
            mdi-text-box-remove-outline
          </v-icon>
          删除
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ItemFigure from '@/components/global/ItemFigure'

export default {
  name: 'EditableItemFigure',
  components: {
    ItemFigure
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      editing: false
    }
  },
  computed: {
    comment () {
      return this.$store.getters.getItemById(this.id) ? this.$store.getters.getItemById(this.id).detail.description.replace(/\\n/g, '') : ''
    }
  },
  methods: {
    onUpdate () {
      this.$emit('update')
      this.editing = false
    },
    onRemove () {
      this.$emit('remove')
      this.editing = false
    }
  }
}
</script>
