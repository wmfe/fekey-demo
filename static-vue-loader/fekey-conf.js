fis.require('vue')(fis);

var path = require('path');

// 需要构建的文件
fis.set('project.ignore', fis.get('project.ignore').concat(['output/**', 'DS_store', 'fekey-conf.js']));

// 禁用components，启用node_modules
fis.unhook('components');
fis.hook('node_modules');

// 所有js文件
fis.match('**.js', {
  isMod: true,
  rExt: 'js',
  useSameNameRequire: true,
  optimizer: fis.plugin('uglify-js'),
  useHash: true
});


// 发布
fis.match('(**)', {
  release: '$1'
});

fis.match('(components/**.css)', {
  release: 'static/$1',
  useHash: true
});

//模块文件
fis.match('**.js', {
  parser: [
    fis.plugin('babel-6.x')
  ]
});

// 页面直接引入的文件，不进行模块require包装
fis.match('index.js', {
  isMod: false
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