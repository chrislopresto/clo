import {Command, flags} from '@oclif/command'
import {execSync} from 'child_process'
import cli from 'cli-ux'
import * as fs from 'fs'
import * as path from 'path'

const KTYPE_DELAY_SECONDS = 2
const KTYPE_DELAY_MS = KTYPE_DELAY_SECONDS * 1000
const KTYPE_THEME_PATH = 'Dropbox (Personal)/ktype/'
const KTYPE_THEME_FILENAME_SUFFIX = '-kiibohd.dfu.bin'

export default class Ktype extends Command {
  static description = 'Flash the K-Type keyboard firmware with a new lighting theme. NOTE: dfu-util must be installed.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'theme'}]

  async run() {
    let {args} = this.parse(Ktype)
    let {theme} = args
    let themePath = this.themePath(theme)

    if (!this.themeExists(theme)) {
      return cli.error(`K-Type theme '${theme}' does not exist at '${themePath}'`)
    }

    cli.action.start(`Giving you ${KTYPE_DELAY_SECONDS} seconds to put the K-Type in flash mode (Fn-ESC)`)
    await cli.wait(KTYPE_DELAY_MS)
    cli.action.stop()

    let cmdString = this.cmd(args.theme)
    this.log(cmdString)
    execSync(cmdString, {stdio: 'inherit'})
  }

  private themeExists(theme: string) {
    return fs.existsSync(this.themePath(theme))
  }

  private cmd(theme: string) {
    return `dfu-util -D '${this.themePath(theme)}'`
  }

  private themePath(theme: string) {
    return path.join(this.config.home, KTYPE_THEME_PATH, `${theme}${KTYPE_THEME_FILENAME_SUFFIX}`)
  }
}
