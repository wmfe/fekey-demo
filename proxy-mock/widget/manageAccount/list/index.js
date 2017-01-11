/**
 * @author xincheng.xu
 * @file 查看企业账号列表
 * @version 1.0.0
 */

/**
 * @static
 * @description 引用模板文件
 */

module.exports = {
    getMockData: function () {
      $.ajax({
        url: '/api/manageaccount/list',
        type: 'get',
        dataType: 'json',
        success: (res) => {
          console.log(res)
        }
      })
    },

    init: function(res) {
      this.getMockData()
    }
};