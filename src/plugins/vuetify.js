import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    default: 'light',
    dark:false,
    light: true,
    themes:{
      light:{
        primary: '#5a96f7',
        headerText:'#fff',
        menuText: '#F75194',
        menuBg: '#F75194',
        secondary: '#5a96f7',
        accent: colors.indigo.base, // #3F51B5
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      }
    },
  },
});
