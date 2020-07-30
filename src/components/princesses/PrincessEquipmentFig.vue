<template>
  <div
    class="equip-main"
    :class="$store.state.mobile ? 'mobile--background' : ''"
  >
    <div 
      class="equip-1st"
      :class="$store.state.mobile ? 'mobile--1st' : ''"
    >
      <ItemFigure
        :id="equips.equip_slot_1"
        zoom-ratio="0.625"
      />
    </div>
    <div
      class="equip-2nd"
      :class="$store.state.mobile ? 'mobile--2nd' : ''"
    >
      <ItemFigure
        :id="equips.equip_slot_2"
        zoom-ratio="0.625"
      />
    </div>
    <div
      class="equip-3rd"
      :class="$store.state.mobile ? 'mobile--3rd' : ''"
    >
      <ItemFigure
        :id="equips.equip_slot_3"
        zoom-ratio="0.625"
      />
    </div>
    <div
      class="equip-4th"
      :class="$store.state.mobile ? 'mobile--4th' : ''"
    >
      <ItemFigure
        :id="equips.equip_slot_4"
        zoom-ratio="0.625"
      />
    </div>
    <div
      class="equip-5th"
      :class="$store.state.mobile ? 'mobile--5th' : ''"
    >
      <ItemFigure
        :id="equips.equip_slot_5"
        zoom-ratio="0.625"
      />
    </div>
    <div
      class="equip-6th"
      :class="$store.state.mobile ? 'mobile--6th' : ''"
    >
      <ItemFigure
        :id="equips.equip_slot_6"
        zoom-ratio="0.625"
      />
    </div>
  </div>
</template>

<script>
import ItemFigure from '@/components/global/ItemFigure'

export default {
  name: 'PrincessFigure',
  components: {
    ItemFigure
  },
  props: {
    equips: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  .equip-main {
    position: relative;
    background-image: url(https://mahomaho-insight-cos-1302341499.cos.ap-shanghai.myqcloud.com/image/bg/bg_530011_front.png);
    background-size: cover;
    background-repeat: no-repeat;
    width: 512px;
    height: 512px;
  }

  .equip-1st {
    position: absolute;
    z-index: 1;
    left: 100px;
    top: 80px;
    display: inline-block;
  }

  .mobile--1st {
    left: 60px;
    top: 15px;
  }

  .equip-2nd {
    position: absolute;
    z-index: 1;
    right: 100px;
    top: 80px;
    display: inline-block;
  }

  .mobile--2nd {
    right: 60px;
    top: 15px;
  }

  .equip-3rd {
    position: absolute;
    z-index: 1;
    left: 40px;
    top: 215px;
    display: inline-block;
  }

  .mobile--3rd {
    left: 25px;
    top: 105px;
  }

  .equip-4th {
    position: absolute;
    z-index: 1;
    right: 40px;
    top: 215px;
    display: inline-block;
  }

  .mobile--4th {
    right: 25px;
    top: 105px;
  }

  .equip-5th {
    position: absolute;
    z-index: 1;
    left: 100px;
    bottom: 80px;
    display: inline-block;
  }

  .mobile--5th {
    left: 60px;
    bottom: 25px;
  }

  .equip-6th {
    position: absolute;
    z-index: 1;
    right: 100px;
    bottom: 80px;
    display: inline-block;
  }

  .mobile--6th {
    right: 60px;
    bottom: 25px;
  }

  .mobile--background {
    background-size: contain;
    width: 300px;
    height: 300px;
  }
</style>
