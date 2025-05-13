import { defineConfig } from '@rslib/core';
import { pluginUnpluginVue } from 'rsbuild-plugin-unplugin-vue';

export default defineConfig({
  lib: [
    {
      // bundle
      format: 'esm',
      plugins: [pluginUnpluginVue()],
      output: {
        cleanDistPath: true,
        distPath: {
          root: 'dist/bundle',
        },
        target: 'web',
      },
    },
    {
      // bundleless
      bundle: false,
      format: 'esm',
      plugins: [pluginUnpluginVue()],
      output: {
        cleanDistPath: true,
        distPath: {
          root: 'dist/bundleless',
        },
        target: 'web',
      },
    },
  ],
});
