const args = require('minimist')(process.argv.slice(2))
const { fork } = require('child_process')

const watching = !!args['watch']

/** @type {import('child_process').ChildProcess} */
let childServerProcess
function startServer() {
  console.log('server started')
  childServerProcess = fork('./bundle/server.js')
}
function restartServer() {
  if (childServerProcess.exitCode === null) {
    childServerProcess.on('close', startServer)
    console.log('shutting down server')
    childServerProcess.kill()
  } else {
    startServer()
  }
}

require('esbuild')
  .build({
    entryPoints: ['./src/index.ts'],
    outfile: 'bundle/server.js',
    platform: 'node',
    target: 'node14',
    mainFields: ['esbuild', 'main', 'module'],
    bundle: true,
    watch: watching && {
      onRebuild(error, result) {
        if (error) console.error('watch build failed:', error)
        else {
          console.log('watch build succeeded')
          restartServer()
        }
      },
    },
  })
  .then(({ stop }) => {
    process.on('beforeExit', () => {
      stop()
      childServerProcess.kill()
    })
    console.log('build succeeded')
    if (watching) {
      console.log('watch mode started')
      startServer()
    }
  })
