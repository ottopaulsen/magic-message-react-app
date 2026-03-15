import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { transform } from 'rolldown/experimental'

// Vite 8 uses Rolldown which excludes .js files from JSX transformation by default.
// This plugin pre-transforms .js source files containing JSX before the native
// builtin:vite-transform plugin processes them.
function jsxInJsPlugin() {
  return {
    name: 'jsx-in-js',
    enforce: 'pre',
    async transform(code, id) {
      if (id.includes('node_modules')) return null
      const cleanId = id.split('?')[0]
      if (!cleanId.endsWith('.js') || cleanId.endsWith('.jsx')) return null
      const result = await transform(id, code, {
        lang: 'jsx',
        jsx: {
          runtime: 'automatic',
          importSource: 'react',
        },
      })
      return { code: result.code, map: result.map }
    },
  }
}

export default defineConfig({
  plugins: [jsxInJsPlugin(), react()],
  optimizeDeps: {
    rolldownOptions: {
      moduleTypes: { '.js': 'jsx' },
      transform: {
        jsx: { runtime: 'automatic', importSource: 'react' },
      },
    },
  },
})
