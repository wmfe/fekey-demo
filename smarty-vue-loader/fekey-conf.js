/**
 * @file fekey-vue-smarty-demo
 */

var path = require('path');

fis.require('smarty')(fis);
fis.require('vue')(fis);


/**
 * 设置namespace
 */
fis.set('namespace', 'nerve_bmbackend');

fis.set('project.ignore', fis.get('project.ignore').concat(['output/**', 'DS_store', 'fekey-conf.js']));

/**
 * [_DEPLOY_ROOT_RULES 各文件发布路径]
 * @type {Object}
 */
var _DEPLOY_ROOT_RULES = {
    '*': {
        deploy: 'webroot',
        release: '/${static}/${namespace}/$0'
    },

    '(**.tpl)': {
        deploy: 'template',
        release: '/${namespace}/$1'
    },

    '/(config)/(**)': {
        deploy: '',
        release: '/$1/${namespace}/$2'
    },

    '${namespace}-map.json': {
        deploy: 'data/smarty',
        release: '/config/$0'
    }
};

/**
 * optimizer 压缩文件plugin
 */

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});

/**
 * 指定less插件
 */
fis.match('*.less', {
    parser: fis.plugin('less'),
    rExt: '.css',
    isCssLike: true
});

/**
 * 指定es6插件
 */
fis.set('project.fileType.text', 'es6,jsx');

/**
 * 设置js模块化
 */

fis.match('static/libs/*.js', {
    isMod: false,
    optimizer: null
});


/**
 * 设置debug方式
 */
fis.media('debug').match('*.{js,jsx,css,less,png}', {
    optimizer: null,
    useHash: false,
    useSprite: false,
    domain: null
});

fis.set('project.fileType.text', 'vue');
if (fis.require.paths && fis.require.paths.length) {
    fis.require.paths.splice(1, 0, path.join(__dirname, 'node_modules'));
}
fis.hook('commonjs', {
    extList: ['.js', '.jsx', '.es', '.ts', '.tsx', 'es6', '.vue']
});

fis.match('**.js', {
    useHash: true,
    optimizer: fis.plugin('uglify-js'),
    rExt: '.js',
    parser: fis.plugin('babel-5.x', {
        blacklist: [
            'regenerator'
        ],
        stage: 3
    }),
    isMod: true
});


fis.match('**.{css,less}', {
    useHash: true,
    optimizer: fis.plugin('clean-css')
});