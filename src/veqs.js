import Vue from 'vue';

/**
 * 组件相关,获取项目内所有组件
*/
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
/**
 * 组件注册为全局组件
 * coms：组件数组
*/
let _bindComponents = function(coms) {
    coms.map(item => {
        Vue.component(item.name, item.component)
    })
}

/**
 * 将组件数组转换为组件对象
 * coms：组件数组
*/
let _coms2Obj = function(coms) {
    let obj = {};
    coms.map(com => {
        obj[com.name] = com.component
    })
    return obj;
};

export default {
    name: 'veqs',
    /**
     * 配置项
     * */ 
    _veqsConfig: {
        // 根组件id
        id: 'app',
        // 自动绑定组件，设置成false时需要制定dialogPath
        autoBindComponents: true,
        // 弹窗文件夹路径
        dialogPath: 'dialogs'
    },
    /**
     * 弹窗组件
    */
    _Dialogs: '',
    /**
     * 弹窗数组
    */
    // _dialogs: [],
    /**
     * 根据路径(文件名)获取组件列表
     * path：路径
     * fileName：文件名
    */
    _getComponentsByPath(path, fileName) {
        if (path == '@') {
            return allComponents;
        }
        let components = allComponents.filter(component => {
            return component.path.includes(path);
        })
        if (fileName) {
            components = components.filter(component => {
                return component.name == fileName
            })
        }
        return components;
    },
    /**
     * 绑定实例
     * veqsConfig：基础配置
    */
    _bindInstance(veqsConfig) {
        this._veqsConfig = Object.assign(this._veqsConfig, veqsConfig, {});
        if (veqsConfig.autoBindComponents) {
            _bindComponents(allComponents);
        } else {    // 只绑定框架需要相关组件：弹窗
            let coms = this._getComponentsByPath(this._veqsConfig.dialogPath);
            _bindComponents(coms);
        }
        this._AppendDialogCom();
    },
    /**
     * 添加弹窗组件
    */
   _AppendDialogCom() {
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
    },
    /**
     * 新增弹窗
     * dialogConfig属性
     *      dialogType: 弹窗类型，激活的弹窗名称
     *      item:       弹窗内部对象
     *      events:     弹窗内部事件集合 
    */
    _addDialogFunc(dialogConfig) {
        let _self = this;
        dialogConfig.isShow = true;
        dialogConfig.close = function() {
            _self._removeDialogFunc(dialogConfig);
        }
        this._Dialogs.dialogs.push(dialogConfig);
    },
    /**
     * 关闭弹窗
     * dialogConfig：弹窗
    */
    _removeDialogFunc(dialogConfig) {
        dialogConfig.isShow = false;
        this._Dialogs.dialogs = this._dialogs.filter(dialog => {
            return dialog.isShow;
        });
    }
};
