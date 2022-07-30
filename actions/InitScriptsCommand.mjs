import { Action } from './Action.mjs'
import { print, println, withPackageJson } from '../utils.mjs'

import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

export class InitScriptsCommand extends Action {
  constructor() {
    super('init-scripts-command')
  }

  async #calculateNextAwailableBasePort(path) {
    const modules = [ ...await readdir(path, { withFileTypes: true })]
      .map(module => module.name)
      .filter(name => name.startsWith('virtualcpu-'))

    const packages = await Promise.all(
      modules
        .map(module => `${path}/${module}/package.json`)
        .filter(filename => existsSync(filename))
        .map(async (filename) => JSON.parse(await readFile(filename)))
    )

    const versions = packages
      .map(pkg => pkg.scripts['serve'])
      .map(script => /serve -p (\d+) ./.exec(script))
      .filter(match => match)
      .map(match => match[1])
      .map(version => parseInt(version))
      .filter(version => version < 3500)

    return versions.reduce((acc, version) => Math.max(acc, version)) + 1
  }

  async execute(options) {
    print('Adding start and build scripts...')
    options.basePort = await this.#calculateNextAwailableBasePort('..')
    options.vitePort = options.basePort + 1000
    await withPackageJson(packageJson => {
      packageJson.scripts['start'] = 'concurrently "npm run build:watch" "npm run serve" "npm run dev"'
      packageJson.scripts['serve'] = `serve -p ${options.basePort} .`
      packageJson.scripts['prepublishOnly'] = 'npm install && npm run build'
      packageJson.scripts['clean'] = 'rm -rf dist'
      packageJson.scripts['purge'] = 'git clean -xdf'
      packageJson.scripts['build'] = 'vite build --config vite-lib.config.js'
      packageJson.scripts['build:watch'] = 'npm run build -- --watch'
      packageJson.scripts['dev'] = 'vite .'
    })
    println('ok')

    return { scriptsInitialized: true }
  }
}
