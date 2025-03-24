import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import react from '@vitejs/plugin-react-swc';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';
import { fetchIcon } from 'cdn-icon-fetch';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const envVariables = loadEnv(mode, process.cwd());
    return {
        plugins: [react(), splitVendorChunkPlugin(), fetchIcon("77")],
        publicDir: 'public',
        define: {
            // Inject environment variables into the client-side code
            'process.env': {
                VITE_DCL_DEFAULT_ENV: envVariables.VITE_DCL_DEFAULT_ENV,
                VITE_BASE_URL: envVariables.VITE_BASE_URL
            },
            global: {}
        },
        resolve: {
            alias: {
                util: 'rollup-plugin-node-polyfills/polyfills/util',
                assert: 'rollup-plugin-node-polyfills/polyfills/assert',
                assets: '/src/assets',
                components: '/src/components',
                containers: '/src/containers',
                contracts: '/src/contracts',
                helpers: '/src/helpers',
                hooks: '/src/hooks',
                providers: '/src/providers',
            }
        },
        server: {
            open: true, // Automatically open the browser
            proxy: {
            },
            hmr: {
                overlay: false, // Disable HMR overlay (not recommended for production)
            }
        },
        optimizeDeps: {
            esbuildOptions: {
                loader: {
                    '.js': 'jsx' // Allow parsing of JSX syntax in .js files
                },
                define: {
                    global: 'globalThis' // Change Node.js global to browser globalThis
                },
                plugins: [
                    NodeGlobalsPolyfillPlugin({ buffer: true, process: false }),
                    NodeModulesPolyfillPlugin()
                ]
            }
        },
        build: {
            commonjsOptions: {
                transformMixedEsModules: true // Allow CommonJS modules to be used with ES modules
            },
            rollupOptions: {
                plugins: [rollupNodePolyFill()] // Polyfills for Node.js built-ins
            },
            sourcemap: true // Enable sourcemaps for debugging
        },
        ...(command === 'build' ? { base: envVariables.VITE_BASE_URL } : undefined) // Set base URL for production
    };
});