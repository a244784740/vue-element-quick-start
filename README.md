# vue-element-quick-start
vue框架，基于element UI的二次封装，可用于后台管理系统的快速搭建

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

## 弹窗

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

