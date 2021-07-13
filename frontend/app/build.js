const args = require('minimist')(process.argv.slice(2))
const esbuild = require('esbuild')
const { vanillaExtractPlugin } = require('@vanilla-extract/esbuild-plugin')

const watching = !!args['watch']

/** @type {esbuild.BuildOptions} */
const esbuildconfig = {
  entryPoints: ['./src/index.tsx'],
  outfile: 'public/bundle/index.js',
  platform: 'browser',
  minify: !watching,
  bundle: true,
  define: {
    'process.env.NODE_ENV': watching ? '"development"' : '"production"',
  },
  sourcemap: watching,
  plugins: [vanillaExtractPlugin()],
}

if (watching) {
  esbuild
    .serve({ servedir: 'public' }, esbuildconfig)
    .then(() => console.log('frontend server running on localhost:8000'))
} else {
  esbuild.build(esbuildconfig)
}
