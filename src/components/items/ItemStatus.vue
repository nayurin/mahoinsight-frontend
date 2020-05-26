<template>
  <v-container
    v-if="Object.keys(status()).length"
    fluid
  >
    <v-card
      class="pa-0"
      outlined
    >
      <v-row dense>
        <v-col
          align-self="start"
          class="pa-0"
        >
          <v-list-item
            v-for="(value, key) in status()"
            :key="key"
            class="ml-4 pa-0"
          >
            <v-btn
              small
              color="primary"
              v-text="key"
            />
            <v-btn
              text
              small
              v-text="value"
            />
            <v-icon>mdi-chevron-double-right</v-icon>
            <v-btn
              text
              small
              v-text="value * 2" 
            />
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'ItemStatus',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      status() {
        const status = {
          生命值: parseFloat(this.item.detail.hp),
          物理攻击力: parseFloat(this.item.detail.atk),
          魔法攻击力: parseFloat(this.item.detail.magic_str),
          物理防御力: parseFloat(this.item.detail.def),
          魔法防御力: parseFloat(this.item.detail.magic_def),
          物理暴击: parseFloat(this.item.detail.physical_critical),
          魔法暴击: parseFloat(this.item.detail.magic_critical),
          生命值自动回复: parseFloat(this.item.detail.wave_hp_recovery),
          技能值自动回复: parseFloat(this.item.detail.wave_energy_recovery),
          回避: parseFloat(this.item.detail.dodge),
          物理穿透: parseFloat(this.item.detail.physical_penetrate),
          魔法穿透: parseFloat(this.item.detail.magic_penetrate),
          生命值吸收: parseFloat(this.item.detail.life_steal),
          回复量上升: parseFloat(this.item.detail.hp_recovery_rate),
          技能值上升: parseFloat(this.item.detail.energy_recovery_rate),
          技能值消耗降低: parseFloat(this.item.detail.energy_reduce_rate),
          命中: parseFloat(this.item.detail.accuracy)
        }
        for (const key of Object.keys(status)) {
          if (status[key] === 0) {
            delete status[key]
          }
        }
        return status
      }
    }
  }
</script>