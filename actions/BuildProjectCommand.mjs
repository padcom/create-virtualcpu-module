import { Action } from './Action.mjs'
import { print, println, execute } from '../utils.mjs'

export class BuildProjectCommand extends Action {
  constructor() {
    super('build-project-command')
  }

  async execute(options) {
    print('Building...')
    await execute('npm run build')
    println('ok')

    return { projectBuilt: true }
  }
}
