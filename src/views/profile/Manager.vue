<template>
  <v-container>
    <v-card-title>
      用户档案管理
    </v-card-title>
    <v-row class="d-flex justify-center">
      <v-col class="col-5">
        <v-list-group
          v-for="(item, key) in profile"
          :key="key"
          :prepend-icon="isActive(key) ? 'mdi-check-bold' : ''"
          @click="exported = false"
        >
          <template v-slot:activator>
            <v-list-item
              class="pa-0"
              dense
            >
              <v-list-item-title class="text-center">
                {{ key }}
              </v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item>
            <v-row no-gutters>
              <v-col class="col-12">
                <v-card>
                  <v-card-text v-if="!edit">
                    已记录角色 {{ parseProfile(item).number }} 个，总星数 {{ parseProfile(item).rarity }}
                  </v-card-text>
                  <v-text-field
                    v-else
                    v-model="title"
                    label="档案名称"
                    class="ma-3"
                  />
                  <v-card
                    v-if="exported"
                    outlined
                  >
                    <v-sheet dark>
                      <v-textarea
                        auto-grow
                        dark
                        dense
                        disabled
                        outlined
                        class="caption"
                        :value="compress(item)"
                      />
                    </v-sheet>
                  </v-card>
                  <v-card-actions>
                    <v-btn
                      v-if="!isActive(key)"
                      text
                      color="primary"
                      @click="$setLSItem({ pos: '{}', key: 'active', value: key})"
                    >
                      激活
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="exported = !exported"
                    >
                      导出数据
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="edit = !edit; title = key"
                    >
                      编辑
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="removeProfile(key)"
                    >
                      移除
                    </v-btn>
                    <v-spacer
                      v-if="edit"
                    />
                    <v-btn
                      v-if="edit"
                      text
                      color="success"
                      @click="editProfileTitle(key, title)"
                    >
                      确认
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list-group>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-btn
        @click="addNewProfile"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        新增
      </v-btn>
    </v-row>

    <v-card-title>
      导入数据
    </v-card-title>
    <v-row class="d-flex justify-center">
      <v-col class="col-5">
        <v-textarea
          v-model="importdata"
          auto-grow
          clearable
          class="caption"
          label="可以导入其他来源的档案数据"
          hint="数据的格式是以逗号分隔的一串数字"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-btn
        @click="importProfile"
      >
        <v-icon left>
          mdi-shape-polygon-plus
        </v-icon>
        导入
      </v-btn>
    </v-row>

    <v-card-title>
      预设档案
    </v-card-title>
    <v-card-subtitle>
      可以生成一组带有默认规则的档案
    </v-card-subtitle>
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <span
          style="font-size: 0.8em;"
          class="mx-3"
        >
          角色星级
        </span>
        <v-btn-toggle
          v-model="rarity"
          mandatory
          shaped
        >
          <v-btn
            v-for="(icon, i) in btnicon"
            :key="i"
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center my-3">
      <v-btn disabled>
        添加全部角色
      </v-btn>
    </v-row>
    <v-row class="d-flex justify-center my-3">
      <v-btn
        @click="createDefaultProfile"
      >
        <v-icon left>
          mdi-check-bold
        </v-icon>
        创建
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import pako from 'pako'

export default {
  name: 'ProfileManager',
  data () {
    return {
      storage: window.localStorage,
      profile: {},
      active: null,
      edit: false,
      title: null,
      exported: false,
      importdata: null,
      rarity: 0,
      btnicon: ['mdi-star-off', 'mdi-numeric-1', 'mdi-numeric-2','mdi-numeric-3','mdi-numeric-4','mdi-numeric-5']
    }
  },
  watch: {
    active (val) {
      this.$store.commit('updateState', { key: 'activeProfile', value: val })
      this.$store.commit('updateState', { key: 'profile', value: this.profile })
    }
  },
  created () {
    window.addEventListener('setItemEvent', this.loadProfile)
    this.loadProfile()
  },
  methods: {
    isActive (name) {
      return name === this.active ? true : false
    },
    compress (data) {
      return data ? pako.deflate(JSON.stringify(data)) : null
    },
    decompress (data) {
      let result
      try {
        const arr = data.split(',').map(x => Number(x))
        result = pako.inflate(new Uint8Array(arr), { to: 'string' })
      } catch {
        result = null
      }
      return result
    },
    addNewProfile ({ data = {} }) {
      let seq
      for (seq = 1; Object.keys(this.profile).includes(`Profile ${seq}`); seq++) {
        continue
      }
      this.$setLSItem({
        key: `Profile ${seq}`,
        value: data
      })
      if (!this.storage.getItem('active')) {
        this.$setLSItem({
          key: 'active',
          value: `Profile ${seq}`
        })
      }
    },
    removeProfile (name) {
      this.$removeLSItem({
        key: name
      })
      if (this.storage.getItem('active') === name) {
        this.$setLSItem({
          key: 'active',
          value: ''
        })
      }
    },
    editProfileTitle (oldTitle, newTitle) {
      if (newTitle && newTitle !== oldTitle) {
        this.$setLSItem({
          key: `${newTitle}`,
          value: this.profile[oldTitle]
        })
        if (this.isActive(oldTitle)) {
          this.$setLSItem({
            key: 'active',
            value: newTitle
          })
        }
        this.$removeLSItem({
          key: oldTitle
        })
      }
      this.edit = false,
      this.title = null
    },
    loadProfile () {
      this.profile = {}
      for (let i = 0; i < this.storage.length; i++) {
        const value = this.storage.getItem(this.storage.key(i))
        try {
          this.$set(this.profile, this.storage.key(i), JSON.parse(value))
        } catch {
          continue
        }
      }
      this.active = this.storage.getItem('active') || ''
    },
    parseProfile (obj) {
      const number = obj.princess && Object.prototype.toString.call(obj.princess) === '[object Object]' ? Object.keys(obj.princess).length : 0
      let rarity = 0
      if (number) {
        for (const chara of Object.values(obj.princess)) {
          rarity += chara.rarity
        }
      }
      return {
        number,
        rarity
      }
    },
    importProfile () {
      const data = JSON.parse(this.decompress(this.importdata))
      if (Object.prototype.toString.call(data) !== '[object Object]') return
      this.addNewProfile({ data })
      this.importdata = null
    },
    createDefaultProfile () {
      const profile = {}
      profile.princess = {}
      for (const chara of Object.values(this.$store.state.chara)) {
        profile.princess[chara.id] = {
          name: chara.status.unit_name,
          rarity: this.rarity || chara.status.rarity,
          pieces: [0, 0],
          ue: false 
        }
      }
      this.addNewProfile({ data: profile })
    }
  }
}
</script>

<style scoped>
#exported-text {
  font-size: 0.6em;
}
</style>
