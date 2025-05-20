import * as __WEBPACK_EXTERNAL_MODULE_vue__ from "vue";
const _00_2Fplugin_vue_2Fexport_helper = (sfc, props)=>{
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props)target[key] = val;
    return target;
};
const _sfc_main = {};
const _hoisted_1 = {
    class: "content"
};
function _sfc_render(_ctx, _cache) {
    return (0, __WEBPACK_EXTERNAL_MODULE_vue__.openBlock)(), (0, __WEBPACK_EXTERNAL_MODULE_vue__.createElementBlock)("div", _hoisted_1, _cache[0] || (_cache[0] = [
        (0, __WEBPACK_EXTERNAL_MODULE_vue__.createElementVNode)("h1", null, "Rsbuild with Vue", -1),
        (0, __WEBPACK_EXTERNAL_MODULE_vue__.createElementVNode)("p", null, "Start building amazing things with Rsbuild.", -1)
    ]));
}
const App = /*#__PURE__*/ _00_2Fplugin_vue_2Fexport_helper(_sfc_main, [
    [
        'render',
        _sfc_render
    ],
    [
        '__scopeId',
        "data-v-e8dc78e7"
    ]
]);
(0, __WEBPACK_EXTERNAL_MODULE_vue__.createApp)(App).mount('#root');
