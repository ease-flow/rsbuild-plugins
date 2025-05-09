import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  external: [
    '@rsbuild/core',
    '@babel/parser',
    '@babel/traverse',
    '@babel/types',
    '@babel/generator',
    '@vue/compiler-sfc',
    'typescript',
  ],
  dts: true,
  format: ['esm', 'cjs'],
})
