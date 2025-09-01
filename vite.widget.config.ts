import { defineConfig } from 'vite'
// eslint-disable-next-line import/no-unresolved
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  define: {
    // Replace common process.env.* usages with safe values for the browser.
    // Many libraries check process.env.NODE_ENV to enable/disable debug behavior.
    'process.env.NODE_ENV': JSON.stringify('production'),
    // provide a fallback for other process.env.* accesses
    'process.env': JSON.stringify({ NODE_ENV: 'production' })
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'src/widget.tsx'),
      name: 'VaultriceWidget',
      formats: ['es'],            // <-- build ES module
      fileName: 'voting'         // will output dist/voting.js (ES module)
    },
    // lib: {
    //   entry: path.resolve(__dirname, 'src/widget.tsx'),
    //   name: 'VaultriceWidget',   // global name in IIFE
    //   formats: ['iife'],
    //   fileName: 'widget'
    // },
    // rollupOptions: {
    //   output: {
    //     // Prepend a tiny shim so `process` exists in the browser global scope.
    //     // Use globalThis to be robust across environments.
    //     banner:
    //       `(function(){\n` +
    //       `  try{ if (typeof globalThis.process === 'undefined') globalThis.process = { env: { NODE_ENV: 'production' } }; }catch(e){}\n` +
    //       `})();\n`
    //   }
    //   // no externals - we bundle everything
    // },
    minify: true,
    sourcemap: false,
    target: 'es2018'
  }
})
