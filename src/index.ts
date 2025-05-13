import type { RsbuildPlugin } from '@rsbuild/core';
import type { Options } from 'unplugin-vue/api';
import { parseVueRequest } from 'unplugin-vue/api';
import RspackPluginVue from 'unplugin-vue/rspack';

// const require = createRequire(import.meta.url);

export type PluginUnpluginVueOptions = {
  unpluginVueOptions?: Options;
};

const isVirtualModule = (request?: string) => {
  if (!request) return false;

  return request.includes('/node_modules/.virtual');
};

const isScopedStyle = (request?: string) => {
  if (!request) return false;

  const { query } = parseVueRequest(request);
  return query.type === 'style' || query.lang === 'css';
};

export const pluginUnpluginVue = ({
  unpluginVueOptions,
}: PluginUnpluginVueOptions = {}): RsbuildPlugin => ({
  name: 'plugin-unplugin-vue',
  setup(api) {
    const callerName = api.context.callerName;
    const isRslib = callerName === 'rslib';

    api.modifyRspackConfig((config) => {
      // Not using webpack-chain here.
      // https://github.com/neutrinojs/webpack-chain/issues/352
      config.plugins?.push(RspackPluginVue(unpluginVueOptions));
    });

    api.modifyBundlerChain((config, { CHAIN_ID }) => {
      const baseRule = config.module.rules.get(CHAIN_ID.RULE.CSS);
      baseRule.enforce('post');
      config.resolve.extensions.add('.vue');
    });

    // Rslib bundleless specific config, will only be used in bundleless mode
    if (isRslib) {
      api.modifyRspackConfig((config) => {
        if (Array.isArray(config.externals)) {
          config.externals.unshift(async (data, callback) => {
            const { request, context } = data;
            let result = false;

            if (isVirtualModule(request) || isVirtualModule(context)) {
              result = true;
            } else if (isScopedStyle(request)) {
              result = true;
            }

            if (result) {
              return callback(undefined, false);
            }
          });
        }
      });

      api.processAssets({ stage: 'additional' }, ({ assets, compilation }) => {
        for (const key of Object.keys(assets)) {
          if (isVirtualModule(key)) {
            compilation.deleteAsset(key);
          }
        }
      });

      //   api.modifyBundlerChain((config, { CHAIN_ID }) => {
      //     const cssRule = config.module.rules.get(CHAIN_ID.RULE.CSS);
      //     const vueCssRule = config.module
      //       .rule('vue-scoped-css')
      //       .test((value) => {
      //         const matched = /lang\.css$/.test(value);
      //         if (matched) {
      //         }
      //         return isStyle(value);
      //       })
      //       .before(CHAIN_ID.RULE.CSS)
      //       .merge(cssRule.entries());
      //     const ruleId = CHAIN_ID.RULE.CSS;
      //     const rule = config.module.rule(ruleId);
      //     const rspackPath = require.resolve('@rspack/core');
      //     // TODO: hard coded loader path
      //     const loaderPath = path.resolve(rspackPath, '../cssExtractLoader.js');
      //     if (rule.uses.has(CHAIN_ID.USE.MINI_CSS_EXTRACT)) {
      //       rule
      //         .use(CHAIN_ID.USE.MINI_CSS_EXTRACT)
      //         .loader(loaderPath)
      //         .options({});
      //     }
      //     for (const use of cssRule.uses.values()) {
      //       vueCssRule.use(use.name).merge(use.entries());
      //     }
      //   });
    }
  },
});
