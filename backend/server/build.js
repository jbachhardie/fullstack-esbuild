const args = require('minimist')(process.argv.slice(2))
const { fork } = require('child_process')
const dotenv = require('dotenv')

const watching = !!args['watch']

/** @type {import('child_process').ChildProcess} */
let childServerProcess
function startServer() {
  console.log('server started')
  const { parsed, error } = dotenv.config()
  if (error) {
    console.error('Failed to parse env file', error)
    process.exit(1)
  } else {
    childServerProcess = fork('./bundle/server.js', {
      env: parsed,
    })
  }
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
