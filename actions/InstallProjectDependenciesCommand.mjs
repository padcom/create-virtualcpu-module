import { Action } from './Action.mjs'
import { print, println, execute } from '../utils.mjs'

export class InstallProjectDependenciesCommand extends Action {
  constructor() {
    super('install-project-dependencies-command')
  }

  async execute(options) {
    print('Installing dependencies...')
    await execute('npm install --save-peer vue@3.2')
    await execute('npm install --save-dev vite@3.0 @vitejs/plugin-vue@3.0')
    await execute('npm install --save-dev rollup-plugin-peer-deps-external')
    await execute('npm install --save-dev concurrently serve')
    println('ok')

    return { projectDependenciesInitialized: true }
  }
}
