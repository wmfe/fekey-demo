import Vue from  'vue';

import Index from './components/index';

var app = new Vue({
  el: '#app',
  methods: {

  },
  components: {
    Index: Index,
    App: require('./component/index').default
  },
  created() {
    console.log('created');
  }
});