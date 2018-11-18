import {Command, flags} from '@oclif/command'
import {execSync} from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

type RcmTag = 'personal' | 'work'
const SIGNING_KEY_REGEX = /^\s+signingkey = ([A-F0-9]+)$/gm
const EMAIL_REGEX = /^\s+email = (([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}))$/gm
const NAME_REGEX = /^\s+name = ([a-zA-Z ]+)$/gm

export default class Config extends Command {
  static description = 'Commands for git config'

  static examples = [
    '$ clo git config --signing=personal',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    signingKey: flags.string({
      char: 's',
      description: 'rcm tag to use for signingkey',
      options: ['personal', 'work'],
      required: true
    })
  }

  async run() {
    let {flags} = this.parse(Config)
    let rcmTag = flags.signingKey as RcmTag
    let commands = [
      `git config --local user.name "${this.name(rcmTag)}"`,
      `git config --local user.email "${this.email(rcmTag)}"`,
      `git config --local user.signingkey ${this.signingKey(rcmTag)}`,
    ]

    commands.map(command => {
      this.log(command)
      execSync(command)
    })
  }

  signingKey(tag: RcmTag) {
    let gitConfigLocalPath = path.join(this.config.home, '.dotfiles', `tag-${tag}`, 'gitconfig.local')
    let gitConfigLocal = fs.readFileSync(gitConfigLocalPath, {encoding: 'utf8'})
    let signingKeyResult = SIGNING_KEY_REGEX.exec(gitConfigLocal)
    return signingKeyResult ? signingKeyResult[1] : null
  }

  email(tag: RcmTag) {
    let gitConfigLocalPath = path.join(this.config.home, '.dotfiles', `tag-${tag}`, 'gitconfig')
    let gitConfigLocal = fs.readFileSync(gitConfigLocalPath, {encoding: 'utf8'})
    let emailResult = EMAIL_REGEX.exec(gitConfigLocal)
    return emailResult ? emailResult[1] : null
  }

  name(tag: RcmTag) {
    let gitConfigLocalPath = path.join(this.config.home, '.dotfiles', `tag-${tag}`, 'gitconfig')
    let gitConfigLocal = fs.readFileSync(gitConfigLocalPath, {encoding: 'utf8'})
    let name = NAME_REGEX.exec(gitConfigLocal)
    return name ? name[1] : null
  }
}
