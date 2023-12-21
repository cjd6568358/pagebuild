<template>
    <el-button :key="moduleId" type="primary">{{ placeholder }}</el-button>
    {{ permissionKey }}
</template>
<script>
import { valueParse } from "../../utils/index"
export default {
    name: "E2eButton",
    props: {
        config: {
            type: Object,
            default: () => {
                return {
                    id: 'moduleId1',
                    properties: {
                        "placeholder": "let,${moduleId.abc}",
                        "permissionKey": "const,${moduleId.bbb}",
                        "label": "777"
                    },
                }
            }
        }
    },
    data() {
        return {
            ccc: "2222"
        }
    },
    setup(props, ctx) {
        let { id: moduleId, properties, view, controller, children } = props.config
        let values = Object.keys(properties).reduce((prev, key) => ({ ...prev, [key]: valueParse(properties[key]) }), {})
        // 注册store
        window.moduleStore[moduleId] = values
        return { moduleId, ...values }
    },
    mounted() {
    },
    methods: {

    }
}
</script>
<style></style>