import { defineConfig } from '@rsbuild/core';
import { pluginUnpluginVue } from 'rsbuild-plugin-unplugin-vue';

export default defineConfig({
  plugins: [pluginUnpluginVue()],
});
