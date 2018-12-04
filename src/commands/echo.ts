import {Command, flags} from '@oclif/command'
import * as figlet from 'figlet'
import * as gradientString from 'gradient-string'

type GradientAlias = 'atlas' | 'cristal' | 'teen' | 'mind' | 'morning' | 'vice' | 'passion' | 'fruit' | 'instagram' | 'retro' | 'summer' | 'rainbow' | 'pastel'

export default class Echo extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with string value (-f, --font)
    font: flags.string({char: 'f'}),
    // flag with string value (-g, --gradient)
    gradient: flags.string({char: 'g'}),
  }

  static args = [{name: 'text'}]

  async run() {
    const {args, flags} = this.parse(Echo)

    let text = args.text || 'echo'
    let font: figlet.Fonts = (flags.font as figlet.Fonts) || 'Doh'
    let gradient: GradientAlias = (flags.gradient as GradientAlias) || 'atlas'
    this.log(gradientString[gradient].multiline(figlet.textSync(text, font)))
  }
}
