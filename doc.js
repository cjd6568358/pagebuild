const moduleMap = { ['moduleId']: { config: {}, store: {} } }

const moduleConfig = {
    // 组件key，一旦生成不可更改
    id: 'moduleId',
    // 模块别名，用于编辑器快速定位选择
    name: 'label',
    tag: 'e2e-tabs',
    // 参考elementui组件属性
    properties: {
        "placeholder": `let,${moduleId.abc}||123`,
        "permissionKey": `const,${moduleId.abc}||123`
    },
    view: {
        // 布局容器特有 
        layout: { type: 'flow/flex/grid', },
        // 动态加载<style id='moduleId'>(支持scss),通过moduleId实现scoped 
        style: '',
        vIf: '${moduleId}.bool',
        vShow: '${moduleId}.visible',
    },
    controller: {
        actions: ['LOAD_DATA', "OPEN_NEW_BLANK", "ROUTER_TO", "SUBMIT"],
        // 对外提供的能力 
        expose: ['RELOAD_DATA', "REFRESH"],
        mounted() {
            // 加载<style id='moduleId'> // call customMethod
        },
        unmounted() {
            // 卸载<style id='moduleId'> // call customMethod 
            // dispatch action 
            await dispatch({ moduleId: 'moduleId2', eventId: 'RELOAD_DATA', params: {} });
        },
        // 自定义function，通过new Function(funStr)动态生成,fun.bind(moduleConfig)绑定当前作用域 
        customMethods: {},
    },
    // 布局容器特有,子模块
    children: [],
};
const page.json = { id: "uuid", desc: "", version: "", componentVersions: {}, moduleConfig: {} }
// 路由跳转拦截beforeUpdate,加载新的page.json
// 表单数据如何搜集？form节点provide fieldChange 表单项inject 如果是只读调用fieldChange/支持读写就设置在本地
// 组件版本管理：
// 1.参考GIT，小版本直接升级，大版本不兼容开新站
// 2.参考npm,每次发布保存当前页面每个组件版本号，每个组件都是npm包。框架按照组件版本号加载组件， // 编辑器检测到新版本提示升级(优势：1.按需加载2.类似yarn.lock锁死组件版本，不用担心后期运行不了) // 页面Config版本管理：每次发布保存config,提供发布历史回滚

// 明道云为什么不做自定义选项级联？
// 1.产品思路不一致，90%表单选项需求都是最简单的固定数据源，满足大部分客户需求就可以了。其他表单组件数据源也是如此，要么固定值，
// 要么固定从某张表里取出。
// 2.如果需要实现自定义选项级联，就需要自定义数据来源接口和参数，还需要统一返回值数据结构，对配置人员技术要求比较高 // 如何实现？ // 1.定义组件必填props和"LOAD_DATA"action的url，运行时监听相应属性拼接action的params,在LOAD_DATA中请求数据源