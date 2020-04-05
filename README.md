# vue-element-quick-start
vue 3.0 框架，基于element UI的二次封装，可用于后台管理系统的快速搭建

# 注意
Vue需要使用Runtime+Compiler版本，在vue.config.js中进行相应设置

```javascript
configureWebpack: {
    resolve: {
        alias: {
        'vue$': 'vue/dist/vue.esm.js' 
        }
    }
},
```
# 功能列表

##  1. 指令弹窗

### 原弹窗触发流程：

vue页面内template编写弹窗代码，使用变量控制弹窗的展示隐藏

问题：
1. 页面内存在多个弹窗时，影响页面原有template代码，提高了代码复杂性
2. 弹窗内需要呼出另外一个弹窗，会出现弹窗内嵌套弹窗的冗杂情境



### 指令弹窗触发流程：

### main.js
```javascript
//绑定实例及原型
import veqs from './veqs';
veqs._bindInstance({
  id: 'app',
  autoBindComponents: true
});
Vue.prototype.veqs = veqs;
```

### App.Vue
```javascript
// 激活弹窗
let dialogConfig = {
    dialogType: 'aDialog',      // 弹窗组件名称
    item: {}
}
this.veqs._addDialogFunc(dialogConfig);

// 关闭弹窗
dialogConfig.close();
```

### 原理：根组件添加弹窗

### 步骤：
1. 获取所有vue组件
```javascript
const allFiles = require.context('./', true, /\.vue/);
let allComponents = [];
allFiles.keys().forEach(path => {
    const com = allFiles(path)
    let lastIndex = path.lastIndexOf('/');
    const comName = path.substring(lastIndex + 1).split('.vue')[0];
    if (comName) {
        allComponents.push({
            name: comName,
            path,
            component: com.default || com
        });
    }
})
```
2. 绑定全部组件 or 弹窗组件
```javascript
let _bindComponents = function(coms) {
    coms.map(item => {
        Vue.component(item.name, item.component)
    })
}
```
1. 根据v-for和component动态组件语法创建弹窗容器
```javascript
let dom = document.getElementById(this._veqsConfig.id);
const Dialogs = Vue.extend({
    template: 
        `<div>
            <component v-for="(dialog, index) in dialogs" v-if="dialog.isShow" :is="dialog.dialogType" :dialog="dialog"></component>
        </div>`,
    data() {
        return {
            dialogs: []
        }
    }
});
this._Dialogs = new Dialogs().$mount();
dom.appendChild(this._Dialogs.$el);
```
