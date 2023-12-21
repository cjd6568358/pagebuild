import { computed, toRef, toValue } from 'vue';
window.moduleStore = {
    moduleId: {
        abc: toRef("abc666"),
        bbb: toRef("bbb999")
    }
}
const valueParse = (value) => {
    const reg = new RegExp(`(let|const),(.*)`);
    let result = value.match(reg);
    if (result === null) {
        return toRef(value)
    }
    if (result[1] === "const") {
        return computed(() => {
            return result[2].replace(/\${(.*)}/g, function () {
                const [moduleId, key] = arguments[1].split(".")
                return toValue(window.moduleStore[moduleId][key])
            })
        })
    } else {
        return toRef(result[2].replace(/\${(.*)}/g, function () {
            const [moduleId, key] = arguments[1].split(".")
            return toValue(window.moduleStore[moduleId][key])
        }))
    }
}

export {
    valueParse
}