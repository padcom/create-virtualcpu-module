import { Action } from './Action.mjs'
import { print, println, copyFile, execute, mkdir, copyTemplateFile, withPackageJson } from '../utils.mjs'

export class CreateApplicationFilesCommand extends Action {
  constructor() {
    super('create-application-files-command')
  }

  async execute(options) {
    print('Creating application files...')
    await mkdir('public')
    await copyTemplateFile('vite.config.js', { vitePort: options.vitePort })
    await copyTemplateFile('vite-lib.config.js')
    await withPackageJson(async (pkg) => {
      await copyTemplateFile('index.html', { name: pkg.name.split('/')[1] })
    })
    await mkdir('src')
    await copyFile('index.js', `src/index.js`)
    await copyFile('main.js', `src/main.js`)
    await copyFile('App.vue', `src/App.vue`)
    await mkdir('src/components')
    await copyFile('Hello.vue', `src/components/Hello.vue`)
    await mkdir('src/composables')
    await copyFile('greeter.js', `src/composables/greeter.js`)
    println('ok')

    return { applicationFilesInitialized: true }
  }
}
