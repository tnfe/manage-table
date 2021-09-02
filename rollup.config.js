import typescript from 'rollup-plugin-typescript';
// import { terser } from 'rollup-plugin-terser';

const plugins = [
  typescript({
    exclude: 'node_modules/**',
    typescript: require('typescript'),
  }),
  // terser()
]

module.exports = {
  input: 'src/lib/index.ts',
  external: ['react', 'antd/es/table/Table', 'antd', '@ant-design/icons', 'react-beautiful-dnd'],
  plugins,
  output: [{
    file: "dist/index.js",
    format: 'cjs',
    // 添加globals
    globals: {
      react: 'React',
      antd: 'antd',
      'antd/es/table/Table': 'antd/es/table/Table',
      '@ant-design/icons': '@ant-design/icons',
      'react-beautiful-dnd': 'react-beautiful-dnd',
    }
  }, {
    file: "es/index.js",
    format: 'es',
    // 添加globals
    globals: {
      react: 'React',
      antd: 'antd',
      'antd/es/table/Table': 'antd/es/table/Table',
      '@ant-design/icons': '@ant-design/icons',
      'react-beautiful-dnd': 'react-beautiful-dnd',
    }
  }]
};
