//自己额外增加的配置文件,修改脚手架的配置

module.exports = {
    publicPath:'./',  //路径  相对路径
    productionSourceMap:false,   //不生成map文件加快打包速度
    configureWebpack:{  // 希望覆盖webpack的配置
        externals:{  //哪些模块不需要打包
            // 左边是模块的名字,标准名字  右边是在代码中使用的名字
            vue:'Vue',
            vuex:'Vuex',
            'vue-router':'VueRouter',
            'element-ui':'ELEMENT', //Element-ui内部使用的名字是ELEMENT
            axios:'axios',
            moment:'moment'
        }
    }
}

/*

cdn加速   即内容分发网络
    概念: 第三方模块抽取出来,使用cdn的方式引入网络地址,打包的时候忽略这些文件

    步骤:
        1.找到cdn服务器地址,vue、vue-router、vuex、axios、moment、Element-ui 
        2.在public/index.html中设置打包忽略第三方模块即可

    好处:
        1.打包的结果比之前笑了1MB多
        2.加载的速度会更快一些

    缺点:
        1.增加请求的次数
        2.请求的服务器不是自己的



*/


