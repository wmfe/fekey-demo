var path = require('path');

// 需要构建的文件
fis.set('project.ignore', fis.get('project.ignore').concat(['output/**', 'DS_store', 'fekey-conf.js', 'zepto.js']));

// 所有js文件
fis.match('**.js', {
  useHash: true
});


// 发布
fis.match('/(mock)/(**.json)', {
  release: '/$1/$2'
});

// 打包
fis.match('::package', {
  postpackager: fis.plugin('loader')
});

// 部署
fis
  .media('local')
  .match('**', {
    deploy: fis.plugin('local-deliver', {
      to: path.join(__dirname, './output/')
    })
  });