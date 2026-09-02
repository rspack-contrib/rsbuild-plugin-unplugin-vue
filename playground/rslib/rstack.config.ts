// Configuration guide: https://rstack.rs/config
import { define } from 'rstack';
import { pluginUnpluginVue } from '../../src/index.ts';

define.lib({
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
