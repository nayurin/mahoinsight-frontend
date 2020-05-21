<template>
  <div class="item-main">
    <div>
    </div>
    <div class="item-box">
      <h2
        v-text="itemName()"
      ></h2>
      <div class="item-img">
        <img
          :src="itemImgSrc()"
          :alt="itemName()"
        >
      </div>
      <div class="item-detail">
        <h4>道具详情</h4>
        <p
          v-html="itemDescription()"
        ></p>
      </div>
      <div class="item-prop">
        <h4>道具属性</h4>
        <div>
          <div
            v-for="(value, key) in itemStatus()"
            :key="key"
          >
            <span
              v-text="key"
            >
            </span>
            <span
              v-text="value"
            >
          </span>
          </div>
        </div>
      </div>
    </div>
    <div class="item-2-princess">
      <div class="item-requirement">
        <h2>角色需求</h2>
      </div>
      <div class="item-princess-list">
        角色列表
        <div
          v-for="(value, key) in findPromote()"
          :key="key"
        >
          <span
            v-text="value[0]">
          </span>
          <span
            v-text="value[1]">
          </span>
        </div>
      </div>
    </div>
    <div class="item-craft">
      <h2>道具合成所需素材</h2>
      <div
        v-for='item of this.itemCraftBy()'
        :key='item[0]'
      >
        <ItemFigure
          :item='findItem(item[0])'
          zoomRatio='0.5'
        />
        <span>
          *{{ item[1] }}
        </span>
      </div>
    </div>
    <div class="item-rewardinfo">
      <h2>素材掉落来源</h2>
      <table>
        <tr
          v-for="(q, i) in this.findQuest()"
          :key="i"
        >
          <div
            v-for="(_q, j) in q.quest"
            :key="j"
          >
            <td>{{ q.odds }} - {{_q.quest_name}}</td>
          </div>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import ItemFigure from '@/components/ItemFigure'

export default {
  name: 'ItemDetail',
  components: {
    ItemFigure
  },
  computed: {
  },
  methods: {
    findItem (id) {
      for (const item of Object.values(this.$store.state.item)) {
        if (item.id === id) {
          return item
        }
      }
      return null
    },
    findPromote () {
      const ret = []
      for (const chara of Object.keys(this.$store.state.chara)) {
        for (const promoteLevel of Object.keys(this.$store.state.chara[chara].promotion_info)) {
          for (let i = 1; i <= 6; i++) {
            if (this.$store.state.chara[chara].promotion_info[promoteLevel]['equip_slot_' + i] === this.itemId()) {
              ret.push([chara, promoteLevel])
            }
          }
        }
      }
      return ret
    },
    findQuest () {
      return !this.itemCraftBy() ? this.thisItem().source : this.findItem(this.itemCraftBy()[0][0]).source
    },
    thisItem () {
      return this.$store.state.item[this.$route.params.itemName]
    },
    itemId () {
      return this.thisItem().id
    },
    itemName () {
      return this.thisItem().detail.equipment_name
    },
    itemDescription () {
      return this.thisItem().detail.description.replace(/\\n/g, '<br/>')
    },
    itemImgSrc () {
      return `/image/equipments/icon_equipment_${this.thisItem().id}.png`
    },
    itemCraftBy () {
      return this.thisItem().craft_by
    },
    itemStatus () {
      const status = {
        生命值: parseFloat(this.thisItem().detail.hp),
        物理攻击力: parseFloat(this.thisItem().detail.atk),
        魔法攻击力: parseFloat(this.thisItem().detail.magic_str),
        物理防御力: parseFloat(this.thisItem().detail.def),
        魔法防御力: parseFloat(this.thisItem().detail.magic_def),
        物理暴击: parseFloat(this.thisItem().detail.physical_critical),
        魔法暴击: parseFloat(this.thisItem().detail.magic_critical),
        生命值自动回复: parseFloat(this.thisItem().detail.wave_hp_recovery),
        技能值自动回复: parseFloat(this.thisItem().detail.wave_energy_recovery),
        回避: parseFloat(this.thisItem().detail.dodge),
        物理穿透: parseFloat(this.thisItem().detail.physical_penetrate),
        魔法穿透: parseFloat(this.thisItem().detail.magic_penetrate),
        生命值吸收: parseFloat(this.thisItem().detail.life_steal),
        回复量上升: parseFloat(this.thisItem().detail.hp_recovery_rate),
        技能值上升: parseFloat(this.thisItem().detail.energy_recovery_rate),
        技能值消耗降低: parseFloat(this.thisItem().detail.energy_reduce_rate),
        命中: parseFloat(this.thisItem().detail.accuracy)
      }
      for (const key of Object.keys(status)) {
        if (status[key] === 0) {
          delete status[key]
        }
      }
      return status
    }
  },
  created () {
    if (!Object.keys(this.$store.state.item).length) {
      this.$store.commit('loadObjects', 'item')
    }
    if (!Object.keys(this.$store.state.chara).length) {
      this.$store.commit('loadObjects', 'chara')
    }
    if (!Object.keys(this.$store.state.quest).length) {
      this.$store.commit('loadObjects', 'quest')
    }
  }
}
</script>

<style scoped>

</style>
