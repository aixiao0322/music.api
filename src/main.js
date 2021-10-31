import Vue from 'vue'
import App from './App.vue'

// 
import "@/mobile/flexible" // 适配
import "@/styles/reset.css" // 初始化样式

// router
import router from '@/router'
//  头部 底部
import { Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage, Cell, Icon, Search } from 'vant';
import {} from 'vant';

// 
import { recommendMusicAPI } from './api/index'
async function myFn() {
    const res = await recommendMusicAPI({ limit: 6 })
    console.log(res);
}
myFn();
// 
import { List } from 'vant';

Vue.use(List);

Vue.use(Col);
Vue.use(Row);
Vue.use(Icon)
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(Search)

// 
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);

// 
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')