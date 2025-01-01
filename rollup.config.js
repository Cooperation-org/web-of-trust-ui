import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'react/jsx-runtime'
];

const plugins = [
  resolve({
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    preferBuiltins: true
  }),
  commonjs({
    include: /node_modules/,
    ignoreGlobal: true
  }),
  typescript({
    tsconfig: './tsconfig.build.json', // We'll create this
    declaration: true,
    declarationDir: 'dist',
    exclude: [
      '**/*.stories.tsx',
      '**/*.stories.ts',
      '**/*.test.tsx',
      '**/*.test.ts',
      'node_modules',
      '.storybook/**/*'
    ]
  }),
  terser()
];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
      exports: 'named'
    }
  ],
  plugins,
  external,
  onwarn(warning, warn) {
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || 
        warning.message.includes('use client')) {
      return;
    }
    warn(warning);
  }
};
