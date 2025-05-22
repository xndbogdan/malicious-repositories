import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths'
import babelMacros from 'vite-plugin-babel-macros';
import proc from 'vite-tsconsole-log';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'dist',
    },
    plugins: [
      babelMacros(), 
      {
        name: 'treat-js-files-as-jsx',
        async transform(code, id) {
          if (!id.match(/src\/.*\.js$/)) return null;
          return transformWithEsbuild(code, id, {
            loader: 'jsx',
            jsx: 'automatic',
          });
        },
      },
      react(),
      proc(),
      viteTsconfigPaths()
    ],
    define: {
      'process.env': {},
    },
    publicDir: 'public',
    server: {
        open: true, // Automatically open the browser
        proxy: {
        },
        hmr: {
            overlay: true, // Disable HMR overlay (not recommended for production)
        },
        host:"127.0.0.1"
    },

    resolve: {
        alias: {
            abis: '/src/abis',
            assets: '/src/assets',
            components: '/src/components',
            config: '/src/config',
            domain: '/src/domain',
            fonts: '/src/fonts',
            img: '/src/img',
            lib: '/src/lib',
            locales: '/src/locales',
            pages: '/src/pages',
            styles: '/src/styles'
        }
    },

    optimizeDeps: {
        esbuildOptions: {
            loader:{
                '.js': 'jsx',
                '.ts': 'tsx'
            }
        },
        include: [
          "react-dom",
          "react-icons/hi",
          "@lingui/react",
          "@ethersproject/providers"
        ]
    }
  };
});