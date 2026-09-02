// Configuration guide: https://rstack.rs/config
import { define } from 'rstack';
import { pluginUnpluginVue } from '../../src/index.ts';

define.app({
  plugins: [pluginUnpluginVue()],
});
