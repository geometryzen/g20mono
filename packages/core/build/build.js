import * as esbuild from 'esbuild';
import { createBuildSettings } from './settings.js';

const settings = createBuildSettings({ minify: false });

await esbuild.build(settings);