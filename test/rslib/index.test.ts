import fs from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { build } from '@rslib/core';
import { pluginUnpluginVue } from '../../src';

const __dirname = dirname(fileURLToPath(import.meta.url));

test('ESM should build succeed', async ({ page }) => {
  await build({
    root: __dirname,
    lib: [
      {
        format: 'esm',
        plugins: [pluginUnpluginVue()],
        output: {
          target: 'web',
          externals: ['vue'],
        },
      },
    ],
  });

  const distFiles = await fs.promises.readdir(`${__dirname}/dist`);
  expect(distFiles.sort()).toEqual(['index.css', 'index.js']);

  for (const file of ['index.css', 'index.js']) {
    const content = await fs.promises.readFile(
      `${__dirname}/dist/${file}`,
      'utf-8',
    );
    expect(content).toMatchSnapshot(file);
  }
});
