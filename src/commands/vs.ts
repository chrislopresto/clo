import {Command, flags} from '@oclif/command'
import {execSync} from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

export default class Vs extends Command {
  static description = 'Commands for VS Code'

  static examples = [
    '$ clo vs chrislopresto',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'name'}]

  async run() {
    let {args} = this.parse(Vs)
    this.log(`code ${this.target(args.name)}`)
    execSync(`code ${this.target(args.name)}`, {stdio: 'inherit'})
  }

  private target(name?: string) {
    return name ? this.targets(name).find(f => fs.existsSync(f)) : '.'
  }

  private targets(name: string) {
    return [
      path.join(this.config.home, '.vscode/workspaces', `${name}.code-workspace`),
      path.join(this.config.home, '.vscode/workspaces/private', `${name}.code-workspace`)
    ]
  }
}
