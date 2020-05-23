<template>
  <v-container id="quest-main">
    <div class="container">
      <div id="quest-normal">
        <h4>普通模式</h4>
        <v-tab class="quest--area-tabs-main">
          <ul class="quest--area-tabs-list">
            <li
              :class="key==areaSelected ? 'active' : ''"
              v-for="(value, key) in this.normal"
              :key="key"
              @click="onAreaSelected(key)"
              v-text="getAreaName(key)"
            >
            </li>
          </ul>
        </v-tab>
        <div class="quest--mission-tabs-main">
          <ul class="quest--mission-tabs-list horizontal-tb">
            <li
              v-for="(value, i) in normal[areaSelected]"
              :key="i"
              :class="value==questSelected ? 'active' : ''"
              @click="onQuestSelected(value)"
              v-text="parseInt(value)"
            >
            </li>
          </ul>
        </div>
        <div class="quest--info-container div-inline">

        </div>
      </div>
      <div id="quest-hard">
        <h4>困难模式</h4>
      </div>
    </div>
  </v-container>
</template>

<script>
// import ObjectBox from '@/util/ObjectBox'
// import ItemFigure from '@/components/ItemFigure'

export default {
  name: 'Quest',
  components: {
    // ItemFigure
  },
  data () {
    return {
      normal: {},
      hard: {},
      other: {},
      areaSelected: 0,
      questSelected: 0
    }
  },
  computed: {
  },
  methods: {
    onAreaSelected (area) {
      this.areaSelected = area
    },
    onQuestSelected (quest) {
      this.questSelected = quest
    },
    allQuest () {
      return this.$store.state.quest
    },
    listQuest () {
      if (Object.prototype.hasOwnProperty.call(this.normal, this.areaSelected)) return this.normal[this.areaSelected]
      else if (Object.prototype.hasOwnProperty.call(this.hard, this.areaSelected)) return this.hard[this.areaSelected]
      else if (Object.prototype.hasOwnProperty.call(this.other, this.areaSelected)) return this.other[this.areaSelected]
      else return null
    },
    listArea (dif) {
      Object.keys(this.$store.state.quest[dif]).map(quest => {
        const areaId = String(quest).substr(0, 5)
        const questSeq = String(quest).substr(-3)
        if (!this[dif][areaId]) {
          this[dif][areaId] = [questSeq]
        } else {
          this[dif][areaId].push(questSeq)
        }
      })
    },
    getAreaName (areaid) {
      for (const i in this.allQuest().area) {
        if (this.allQuest().area[i].area_id === parseInt(areaid)) return this.allQuest().area[i].area_name
      }
    }
  },
  created () {
    if (!Object.keys(this.$store.state.item).length) {
      this.$store.commit('loadObjects', 'item')
    }
    // if (!Object.keys(this.$store.state.chara).length) {
    //   this.$store.commit('loadObjects', 'chara')
    // }
    if (!Object.keys(this.$store.state.quest).length) {
      this.$store.commit('loadObjects', 'quest')
    }
    this.listArea('normal')
    this.listArea('hard')
    this.listArea('other')
    console.log(this.allQuest())
    console.log(this.normal)
  }
}

</script>

<style scoped>
  .roundedRectangle {
    height: 30px;
    width: 100px;
    margin-top: 100px;
    background: rgb(88, 221, 214);
    border-width: 3px;
    /*边缘的宽度，如果要分别设置可以这样：border-width: 15px 5px 15px 5px;依次为上、右、下、左 */
    border-style: solid;
    border-radius: 5px;
    /*圆角的大小*/
    border-color: #000 #000 #000 #000;
    /*边框颜色，依次为上、右、下、左 */
  }

  .roundedRectangle span {
    margin: 5px;
    padding: 20px;
    text-align: center;
    font-size: 16px;
    letter-spacing: 8px;
    float: left;
  }

  .container {
    margin-left: 100px;
    margin-right: 100px;
  }

  .div-inline {
    display: inline-block;
  }

  .quest--area-tabs-main {
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    margin: 0;
  }

  .quest--area-tabs-main>div {
    padding: 10px;
  }

  .quest--area-tabs-list {
    width: 98.3%;
    background: #f5f7fa;
    overflow: hidden;
    padding-inline-start: 20px;
  }

  .quest--area-tabs-list li {
    float: left;
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    border: 1px solid transparent;
    margin-bottom: -1px;
    cursor: pointer;
  }

  .quest--area-tabs-list li.active {
    color: #409eff;
    background-color: #fff;
    border-right-color: #dcdfe6;
    border-left-color: #dcdfe6;
    white-space: nowrap;
    position: relative;
    transition: transform .3s;
    z-index: 2;
  }

  .quest--area-tabs-list li:first-child {
    margin-left: -1px;
  }

  .quest--area-tabs-list li:last-child {
    margin-right: -1px;
  }

  .quest--mission-tabs-main {
    width: 60px;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    margin: 0;
  }

  .quest--mission-tabs-list {
    width: 60px;
    background: #f5f7fa;
    overflow: hidden;
    padding-inline-start: 0px;
  }

  .quest--mission-tabs-list li {
    /* float: top; */
    /* padding: 0 20px; */
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    border: 1px solid transparent;
    margin-bottom: -1px;
    cursor: pointer;
    text-align: center;
    writing-mode: horizontal-tb;
  }

  .quest--mission-tabs-list li:hover {
    font-weight: 600;
    background-color: #fff;
  }

  .quest--mission-tabs-list li.active {
    color: #409eff;
    background-color: #fff;
    border-right-color: #dcdfe6;
    border-left-color: #dcdfe6;
    white-space: nowrap;
    position: relative;
    transition: transform .3s;
    z-index: 2;
  }
  /* .vertical-lr li{
    writing-mode: lr-tb;
  } */
  /* #quest-mission {
    width: 40px;
    height: 300px;
    margin: 0 auto;
    background-color: #ddd;
  }

  .quest--mission-tabs-main {
    height: 100%;
    line-height: 50px;
    background-color: #999;
    padding: 0;
  }

  .quest--mission-tabs-main ul li{ display:block;margin:10px 0; width:100%;text-align: center;color: #fff; cursor: pointer;}
  .quest--mission-tabs-main ul li a{text-decoration: none;color: #fff;}
  .e_tab_bd{ margin: 3%;}

  .quest--mission-tabs-list li.active{
    background-color: #337ab7;
    border-radius: 1px;
  } */

  /* .fade-transition {
    transition: opacity 0.3s ease;
  }

  .fade-enter,
  .fade-leave {
    opacity: 0;
  }

  .fa{
    width: 0;
    height: 0;
    border-top: 25px solid transparent;
    border-right: 25px solid #fff;
    border-bottom: 25px solid transparent;
  }

  .fa2{
    display:block;
    border-color: transparent #fff transparent transparent;
    border-style: dashed solid dashed dashed;
    border-width: 25px;
  } */
</style>
