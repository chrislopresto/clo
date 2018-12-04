import {Command, flags} from '@oclif/command'
import * as figlet from 'figlet';
import * as gradient from 'gradient-string';

export default class Echo extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with string value (-f, --font)
    font: flags.string({char: 'f'}),
  }

  static args = [{name: 'text'}]

  async run() {
    const {args, flags} = this.parse(Echo)

    let text = args.text || 'echo'
    let font: figlet.Fonts = (flags.font as figlet.Fonts) || 'Doh'
    this.log(gradient.atlas.multiline(figlet.textSync(text, font)))
  }
}
