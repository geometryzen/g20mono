/* eslint-disable no-console */
import esbuild from 'esbuild';
import { createBuildSettings } from './settings.js';

const settings = createBuildSettings({
    sourcemap: true,
    banner: {
        js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`,
    }
});

const ctx = await esbuild.context(settings);

await ctx.watch();

const { host, port } = await ctx.serve({
    port: 5500,
    servedir: 'www',
    fallback: "www/index.html"
});

// eslint-disable-next-line no-undef
console.log(`** Live Development Server is listening on ${host}:${port}, open your browser on http://localhost:${port}/ **`);