import { test } from '@rstest/playwright';
import {
  runRsbuildBuildTest,
  runRsbuildDevServerTest,
} from './rsbuild-test-helper.ts';

test('should render page as expected', async ({ page }) => {
  await runRsbuildDevServerTest(
    {
      metaUrl: import.meta.url,
      version: 'v2',
    },
    page,
  );
});

test('should build succeed', async ({ page }) => {
  await runRsbuildBuildTest(
    {
      metaUrl: import.meta.url,
      version: 'v2',
    },
    page,
  );
});
