import {expect, test} from '@oclif/test'

const trimEachLine = (multilineString: string) => multilineString.split('\n').filter((s: string) => s !== '').map((s: string) => s.trim()).join()

describe('echo', () => {
  test
    .stdout()
    .command(['echo'])
    .it('runs echo', ctx => {
      expect(trimEachLine(ctx.stdout)).to.contain(trimEachLine(`
                                       hhhhhhh
                                       h:::::h
                                       h:::::h
                                       h:::::h
    eeeeeeeeeeee        cccccccccccccccch::::h hhhhh          ooooooooooo
  ee::::::::::::ee    cc:::::::::::::::ch::::hh:::::hhh     oo:::::::::::oo
 e::::::eeeee:::::ee c:::::::::::::::::ch::::::::::::::hh  o:::::::::::::::o
e::::::e     e:::::ec:::::::cccccc:::::ch:::::::hhh::::::h o:::::ooooo:::::o
e:::::::eeeee::::::ec::::::c     ccccccch::::::h   h::::::ho::::o     o::::o
e:::::::::::::::::e c:::::c             h:::::h     h:::::ho::::o     o::::o
e::::::eeeeeeeeeee  c:::::c             h:::::h     h:::::ho::::o     o::::o
e:::::::e           c::::::c     ccccccch:::::h     h:::::ho::::o     o::::o
e::::::::e          c:::::::cccccc:::::ch:::::h     h:::::ho:::::ooooo:::::o
 e::::::::eeeeeeee   c:::::::::::::::::ch:::::h     h:::::ho:::::::::::::::o
  ee:::::::::::::e    cc:::::::::::::::ch:::::h     h:::::h oo:::::::::::oo
    eeeeeeeeeeeeee      cccccccccccccccchhhhhhh     hhhhhhh   ooooooooooo
`))
    })

  test
    .stdout()
    .command(['echo', 'Moo', '--font', 'rectangles'])
    .it('runs echo Moo --font rectangles', ctx => {
      expect(trimEachLine(ctx.stdout)).to.contain(trimEachLine(`
 _____
|     |___ ___
| | | | . | . |
|_|_|_|___|___|
`))
    })
})
