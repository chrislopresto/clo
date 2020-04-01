import * as Config from '@oclif/config'
import {expect} from '@oclif/test'
import {loadConfig} from '@oclif/test/lib/load-config'
import * as childProcess from 'child_process'
import * as fs from 'fs'
import * as sinon from 'sinon'

import GitConfig from '../../../src/commands/git/config'

describe('git:config', () => {
  let config: Config.IConfig
  let sandbox: sinon.SinonSandbox
  let readFileSyncStub: sinon.SinonStub
  let childProcessStub: sinon.SinonStub
  let cmd: GitConfig
  let gitConfig = `[user]\n
  name = Jaco Pastorius\n
  `
  let gitConfigLocal = `[user]\n
  email = jaco@jacopastorius.com\n
  signingkey = F0F8FCB77612188F\n
`

  beforeEach(async () => {
    sandbox = sinon.createSandbox()
    config = await Config.load(loadConfig.root)
    sandbox.stub(config, 'home').value('/Users/jacopastorius')
    readFileSyncStub = sandbox.stub(fs, 'readFileSync')
    childProcessStub = sandbox.stub(childProcess, 'execSync')
    readFileSyncStub.withArgs('/Users/jacopastorius/.dotfiles/tag-personal/gitconfig').returns([gitConfig, gitConfig])
    readFileSyncStub.withArgs('/Users/jacopastorius/.dotfiles/tag-personal/gitconfig.local').returns([gitConfigLocal, gitConfigLocal])
    readFileSyncStub.callThrough()
    cmd = new GitConfig([], config)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('edits local git user config for an rcm tag', () => {
    cmd.argv = ['--signingKey', 'personal']
    cmd.run()
    expect(childProcessStub.calledWith('git config --local user.name "Jaco Pastorius"')).equal(true)
    expect(childProcessStub.calledWith('git config --local user.email "jaco@jacopastorius.com"')).equal(true)
    expect(childProcessStub.calledWith('git config --local user.signingkey F0F8FCB77612188F')).equal(true)
  })

  it('gets the signing key from a gitconfig.local for a tag', () => {
    expect(cmd.signingKey('personal')).equals('F0F8FCB77612188F')
  })

  it('gets the email from a gitconfig.local for a tag', () => {
    expect(cmd.email('personal')).equals('jaco@jacopastorius.com')
  })

  it('gets the name from a gitconfig for a tag', () => {
    expect(cmd.name('personal')).equals('Jaco Pastorius')
  })
})
