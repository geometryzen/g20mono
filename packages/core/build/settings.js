import esbuildPluginTsc from 'esbuild-plugin-tsc';

export function createBuildSettings(options) {
    return {
        entryPoints: ['src/main.ts'],
        outfile: 'www/main.js',
        bundle: true,
        sourcemap: true,
        plugins: [
            esbuildPluginTsc({
                force: true,
//                tsconfigPath:"./build/tsconfig.json"
            }),
        ],
        ...options
    };
}