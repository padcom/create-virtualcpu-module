import { Action } from './Action.mjs'
import { print, println, execute, withPackageJson, setNpmRc } from '../utils.mjs'

export class InitNpmProjectCommand extends Action {
  constructor() {
    super('init-npm-project-command')
  }

  async execute(options) {
    print('Initializing project...')
    await execute('npm init -y')
    await setNpmRc('engine-strict', true)
    const nodeVersion = await execute('node --version')
    const npmVersion = await execute('npm --version')
    withPackageJson(packageJson => {
      const name = packageJson.name
      packageJson.name = `@padcom/${name}`
      packageJson.version = '0.0.0'
      packageJson.keywords = [ 'virtualcpu' ]
      packageJson.main = 'dist/index.js'
      // packageJson.types = 'dist/index.d.ts'
      packageJson.files = [ './dist' ]
      packageJson.engines = {
        node: `>=${nodeVersion.trim()}`,
        npm: `>=${npmVersion.trim()}`,
      }
      packageJson.repository = {
        type: 'git',
        url: `https://github.com/padcom/${name}`
      }
      packageJson.bugs = {
        url: `https://github.com/padcom/${name}/issues`
      }
      packageJson.funding = {
        type: 'patreon',
        url: 'https://www.patreon.com/padcom'
      }
    })
    println('ok')

    return { npmProjectInitialized: true }
  }
}
