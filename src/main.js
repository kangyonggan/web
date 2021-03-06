import Vue from 'vue';
import '@/libs/common';
import '@/libs/util';
import '@/libs/env';
import '@/libs/http';
import router from './router';
import app from './views/app.vue';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import './components/index';
import store from './store';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import VueClipboard from 'vue-clipboard2';
import VueElementUISkeleton from 'vue-elementui-skeleton';

VueClipboard.config.autoSetContainer = true;

Vue.use(VueClipboard);
Vue.use(VueElementUISkeleton, {rows: 7});
Vue.use(ElementUI);
Vue.use(mavonEditor);

new Vue({
    router: router,
    store: store,
    render: h => h(app),
}).$mount('#app');
