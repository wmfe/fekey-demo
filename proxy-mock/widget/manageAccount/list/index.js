/**
 * @author xincheng.xu
 * @file 查看企业账号列表
 * @version 1.0.0
 */

/**
 * @static
 * @description 引用模板文件
 */

require('nerve_cfecommon:static/utils/vue-ajax.js');

var Index = require('./homepage.vue');

module.exports = {

    init: function(res) {
        /**
         * @description 页面所有数据
         * @type {object}
         */
        var app = new Vue({
          el: '#content',
          methods: {
            getMockData: () => {
              $.ajax({
                url: '/api/manageaccount/list',
                type: 'get',
                dataType: 'json',
                success: (res) => {
                  console.log('~~~~~')
                }
              })
            }
          },
          components: {
            Index: Index
          },
          created() {
            this.getMockData()
          }
        });
    }
};