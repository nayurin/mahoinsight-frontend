<template>
  <div class="chara-main">
    <div class="chara-intro">
      <h3
        v-html="princessIntro()"
      ></h3>
    </div>
    <div class="chara-img">
      <h4>角色立绘</h4>
      <img
        :src="princessImage()"
      >
      <p v-html="thisPrincess().status.comment.replace(/\\n/g, '<br/>')"></p>
    </div>
    <div class="chara-profile">
      <h4>角色介绍</h4>
      <div>
        <div
          v-for="(value, key) in princessProfile()"
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
    <div class="chara-rank">
      <h4>装备一览</h4>
      <div>
        <button
          v-for="(value, key) in princessPromotion()"
          :key="key"
          @click="onClick(key)"
        >Rank {{ key }}</button>
        <br/>
        <PrincessEquipment
          :equips="princessPromotion()[rank]"
        />
      </div>
    </div>
    <div class="chara--attack-pattern">
      <h4>行动模式</h4>
      <p>起手</p>
      <span
        v-for="(value, i) in princessAttackPattern()[0]"
        :key="i"
      >
        <SkillFigure
          :id="APSkill()[value]"
          zoomRatio="0.5"
        />
      →
      </span>
      <p>循环</p>
      <span
        v-for="(value, i) in princessAttackPattern()[1]"
        :key="i + 20"
      >
      →
        <SkillFigure
          :id="APSkill()[value]"
          zoomRatio="0.5"
        />
      </span>
      <span>↻</span>
    </div>
    <div>专用装备</div>
    <div class="chara-skill">
      <h4>角色技能</h4>
      <div
        v-for="(value, key) in princessSkill()"
        :key="key"
      >
        <span
          v-text="key"
        ></span>
        <SkillFigure
          :id="String(value.icon)"
        />
        <span
          v-text="value.name"
        ></span>
        <span
          v-text="value.description"
        ></span>
      </div>
    </div>
    <div class="chara-status">
      <h4>角色属性</h4>
      <span>角色等级</span>
      <!-- <input
        type="text"
        oninput="value=value.replace(/[^\d]/g,'')"
        οnkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
      > -->
      <input
        type="number"
        min=1
        max=200
        v-model="statusLevel"
      >
      <br/>
      <span>Rank</span>
      <input type="number"
        min=1
        max=16
        v-model="statusRank"
      >
      <br/>
      <span>星级</span>
      <div id="stars">
        <div
          v-for="j in 5"
          :key="j"
          @mouseenter="onMouseEnter(j)"
          @mouseleave="onMouseLeave()"
          @click="onSelect(j)"
          :class="{'on':starSelect>=j}"
        ></div>
      </div>
      <br/>
      <div
        v-for="(value, key) in princessStatus(statusLevel, statusRank, starSelect)"
        :key="key"
      >
        <span>{{ key }}</span>
        <span>{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import PrincessEquipment from '@/components/PrincessEquipment'
import SkillFigure from '@/components/SkillFigure'

export default {
  name: 'PrincessDetail',
  components: {
    PrincessEquipment,
    SkillFigure
  },
  data () {
    return {
      rank: 8,
      statusRank: 8,
      statusLevel: 85,
      starSelect: -1,
      starFlag: false
    }
  },
  computed: {
  },
  methods: {
    onClick (rank) {
      this.rank = rank
    },
    onMouseEnter (n) {
      this.starSelect = !this.starFlag ? n : this.starSelect
    },
    onMouseLeave () {
      this.starSelect = !this.starFlag ? -1 : this.starSelect
    },
    onSelect (n) {
      this.starFlag = true
      this.starSelect = n
    },
    thisPrincess () {
      return this.$store.state.chara[this.$route.params.princessName]
    },
    princessId () {
      return this.thisPrincess().id
    },
    princessName () {
      return this.$route.params.princessName
    },
    princessIntro () {
      return this.thisPrincess().profile.self_text.replace(/\\n/g, '<br/>')
    },
    princessProfile () {
      return {
        角色名: this.thisPrincess().profile.fullname,
        年龄: this.thisPrincess().profile.age,
        生日: `${this.thisPrincess().profile.birth_month}月${this.thisPrincess().profile.birth_day}日`,
        身高: this.thisPrincess().profile.height,
        体重: this.thisPrincess().profile.weight,
        血型: this.thisPrincess().profile.blood_type,
        爱好: this.thisPrincess().profile.favorite,
        简介: this.thisPrincess().profile.catch_copy,
        种族: this.thisPrincess().profile.race,
        所属: this.thisPrincess().profile.guild,
        声优: this.thisPrincess().profile.voice
      }
    },
    princessImage () {
      return `/image/character_stills/still_unit_${this.princessId().toString().replace(/01$/, '31')}.png`
    },
    princessAttackPattern () {
      const ap = [[], []]
      for (const key in this.thisPrincess().attack_pattern) {
        if (key.substr(0, 11) === 'atk_pattern' && this.thisPrincess().attack_pattern[key] !== 0) {
          ap[0].push(this.thisPrincess().attack_pattern[key])
        }
      }
      ap[1] = ap[0].splice(this.thisPrincess().attack_pattern.loop_start - 1, this.thisPrincess().attack_pattern.loop_end - 1)
      return ap
    },
    princessSkill () {
      const skill = {
        连结爆发: this.thisPrincess().skill.union_burst,
        技能1: this.thisPrincess().skill.skill_1,
        '技能1+': this.thisPrincess().skill.skill_1_evo,
        技能2: this.thisPrincess().skill.skill_2,
        EX技能: this.thisPrincess().skill.ex_skill,
        'EX技能+': this.thisPrincess().skill.ex_skill_evo
      }
      for (const key of Object.keys(skill)) {
        if (skill[key] === 0) {
          delete skill[key]
        }
      }
      return skill
    },
    princessPromotion () {
      return this.thisPrincess().promotion_info
    },
    princessRarityStatus (rarity, type) {
      return this.thisPrincess().growth.rarity[rarity][type]
    },
    princessPromotionStatus (rank, type) {
      return rank === 1 ? 0 : this.thisPrincess().growth.promotion[rank][type]
    },
    princessStatus (level, rank, rarity) {
      return rarity === -1 ? {
        生命值: 0,
        物理攻击力: 0,
        魔法攻击力: 0,
        物理防御力: 0,
        魔法防御力: 0,
        物理暴击: 0,
        魔法暴击: 0,
        生命值自动回复: 0,
        技能值自动回复: 0,
        回避: 0,
        物理穿透: 0,
        魔法穿透: 0,
        生命值吸收: 0,
        回复量上升: 0,
        技能值上升: 0,
        技能值消耗降低: 0,
        命中: 0
      } : {
        生命值: Math.round(this.princessRarityStatus(rarity, 'hp') + this.princessPromotionStatus(rank, 'hp') + this.princessRarityStatus(rarity, 'hp_growth') * (parseInt(level) + parseInt(rank))),
        物理攻击力: Math.round(this.princessRarityStatus(rarity, 'atk') + this.princessPromotionStatus(rank, 'atk') + this.princessRarityStatus(rarity, 'atk_growth') * (parseInt(level) + parseInt(rank))),
        魔法攻击力: Math.round(this.princessRarityStatus(rarity, 'magic_str') + this.princessPromotionStatus(rank, 'magic_str') + this.princessRarityStatus(rarity, 'magic_str_growth') * (parseInt(level) + parseInt(rank))),
        物理防御力: Math.round(this.princessRarityStatus(rarity, 'magic_def') + this.princessPromotionStatus(rank, 'magic_def') + this.princessRarityStatus(rarity, 'magic_def_growth') * (parseInt(level) + parseInt(rank))),
        魔法防御力: Math.round(this.princessRarityStatus(rarity, 'def') + this.princessPromotionStatus(rank, 'def') + this.princessRarityStatus(rarity, 'def_growth') * (parseInt(level) + parseInt(rank))),
        物理暴击: Math.round(this.princessRarityStatus(rarity, 'physical_critical') + this.princessPromotionStatus(rank, 'physical_critical') + this.princessRarityStatus(rarity, 'physical_critical_growth') * (parseInt(level) + parseInt(rank))),
        魔法暴击: Math.round(this.princessRarityStatus(rarity, 'magic_critical') + this.princessPromotionStatus(rank, 'magic_critical') + this.princessRarityStatus(rarity, 'magic_critical_growth') * (parseInt(level) + parseInt(rank))),
        生命值自动回复: Math.round(this.princessRarityStatus(rarity, 'wave_hp_recovery') + this.princessPromotionStatus(rank, 'wave_hp_recovery') + this.princessRarityStatus(rarity, 'wave_hp_recovery_growth') * (parseInt(level) + parseInt(rank))),
        技能值自动回复: Math.round(this.princessRarityStatus(rarity, 'wave_energy_recovery') + this.princessPromotionStatus(rank, 'wave_energy_recovery') + this.princessRarityStatus(rarity, 'wave_energy_recovery_growth') * (parseInt(level) + parseInt(rank))),
        回避: Math.round(this.princessRarityStatus(rarity, 'dodge') + this.princessPromotionStatus(rank, 'dodge') + this.princessRarityStatus(rarity, 'dodge_growth') * (parseInt(level) + parseInt(rank))),
        物理穿透: Math.round(this.princessRarityStatus(rarity, 'physical_penetrate') + this.princessPromotionStatus(rank, 'physical_penetrate') + this.princessRarityStatus(rarity, 'physical_penetrate_growth') * (parseInt(level) + parseInt(rank))),
        魔法穿透: Math.round(this.princessRarityStatus(rarity, 'magic_penetrate') + this.princessPromotionStatus(rank, 'magic_penetrate') + this.princessRarityStatus(rarity, 'magic_penetrate_growth') * (parseInt(level) + parseInt(rank))),
        生命值吸收: Math.round(this.princessRarityStatus(rarity, 'life_steal') + this.princessPromotionStatus(rank, 'life_steal') + this.princessRarityStatus(rarity, 'life_steal_growth') * (parseInt(level) + parseInt(rank))),
        回复量上升: Math.round(this.princessRarityStatus(rarity, 'hp_recovery_rate') + this.princessPromotionStatus(rank, 'hp_recovery_rate') + this.princessRarityStatus(rarity, 'hp_recovery_rate_growth') * (parseInt(level) + parseInt(rank))),
        技能值上升: Math.round(this.princessRarityStatus(rarity, 'energy_recovery_rate') + this.princessPromotionStatus(rank, 'energy_recovery_rate') + this.princessRarityStatus(rarity, 'energy_recovery_rate_growth') * (parseInt(level) + parseInt(rank))),
        技能值消耗降低: Math.round(this.princessRarityStatus(rarity, 'energy_reduce_rate') + this.princessPromotionStatus(rank, 'energy_reduce_rate') + this.princessRarityStatus(rarity, 'energy_reduce_rate_growth') * (parseInt(level) + parseInt(rank))),
        命中: Math.round(this.princessRarityStatus(rarity, 'accuracy') + this.princessPromotionStatus(rank, 'accuracy') + this.princessRarityStatus(rarity, 'accuracy_growth') * (parseInt(level) + parseInt(rank)))
      }
    },
    APSkill () {
      return {
        1: [null, 'phy', 'mag'][this.thisPrincess().status.atk_type],
        1001: [null, 'ap_phy_1', 'ap_magic_1'][this.thisPrincess().status.atk_type],
        1002: [null, 'ap_phy_2', 'ap_magic_2'][this.thisPrincess().status.atk_type]
      }
    }
  },
  created () {
    if (!Object.keys(this.$store.state.item).length) {
      this.$store.commit('loadObjects', 'item')
    }
    if (!Object.keys(this.$store.state.chara).length) {
      this.$store.commit('loadObjects', 'chara')
    }
    // if (!Object.keys(this.$store.state.quest).length) {
    //   this.$store.commit('loadObjects', 'quest')
    // }
    // console.log(this.thisPrincess())
    // console.log(this.princessSkill())
  }
}
</script>

<style scoped>
#stars .on{
  background: url(/image/bg/star_on.png) no-repeat;
  background-size: 32px;
}
#stars div{
  width: 36px;
  height: 36px;
  float: left;
  background: url(/image/bg/star_off.png) no-repeat;
  background-size: 32px;
}
#stars div:hover{
  background-size: 36px;
  cursor: pointer;
}
</style>
