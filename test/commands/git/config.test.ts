import * as Config from '@oclif/config'
import {expect, test} from '@oclif/test'
import {loadConfig} from '@oclif/test/lib/load-config'
import * as childProcess from 'child_process'
import * as fs from 'fs'
import * as sinon from 'sinon'

import GitConfig from '../../../src/commands/git/config'

let config: Config.IConfig
let sandbox = sinon.sandbox.create()
let readFileSyncStub: sinon.SinonStub
let childProcessStub: sinon.SinonStub
let cmd: GitConfig

describe('run', () => {
  beforeEach(async () => {
    config = await Config.load(loadConfig.root)
    sandbox.stub(config, 'home').value('/Users/jacopastorius')
    readFileSyncStub = sandbox.stub(fs, 'readFileSync')
    childProcessStub = sandbox.stub(childProcess, 'execSync')
    cmd = new GitConfig([], config)
    readFileSyncStub.withArgs('/Users/jacopastorius/.dotfiles/tag-personal/gitconfig').returns(`[user]\n
  name = Jaco Pastorius\n
  email = jaco@jacopastorius.com\n
`)
    readFileSyncStub.withArgs('/Users/jacopastorius/.dotfiles/tag-personal/gitconfig.local').returns(`[user]\n
  signingkey = F0F8FCB77612188F\n
`)
  })

  afterEach(() => {
    sandbox.restore()
  })

  test
    .stdout()
    .command(['git:config', '--signing', 'personal'])
    .it('edits local git user config for an rcm tag', () => {
      expect(childProcessStub.calledWith('git config --local user.name "Jaco Pastorius"')).equal(true)
      expect(childProcessStub.calledWith('git config --local user.email "jaco@jacopastorius.com"')).equal(true)
      expect(childProcessStub.calledWith('git config --local user.signingkey "F0F8FCB77612188F')).equal(true)
    })
})

describe('user config', () => {
  beforeEach(async () => {
    config = await Config.load(loadConfig.root)
    sandbox.stub(config, 'home').value('/Users/jacopastorius')
    readFileSyncStub = sandbox.stub(fs, 'readFileSync')
    cmd = new GitConfig([], config)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('gets the signing key from a gitconfig.local for a tag', () => {
    readFileSyncStub.withArgs('/Users/jacopastorius/.dotfiles/tag-personal/gitconfig.local').returns(`[user]\n
  signingkey = F0F8FCB77612188F\n
`)
    expect(cmd.signingKey('personal')).equals('F0F8FCB77612188F')
  })

  it('gets the email from a gitconfig for a tag', () => {
    readFileSyncStub.withArgs('/Users/jacopastorius/.dotfiles/tag-personal/gitconfig').returns(`[user]\n
  name = Jaco Pastorius\n
  email = jaco@jacopastorius.com\n
`)
    expect(cmd.email('personal')).equals('jaco@jacopastorius.com')
  })

  it('gets the name from a gitconfig for a tag', () => {
    readFileSyncStub.withArgs('/Users/jacopastorius/.dotfiles/tag-personal/gitconfig').returns(`[user]\n
  name = Jaco Pastorius\n
  email = jaco@jacopastorius.com\n
`)
    expect(cmd.name('personal')).equals('Jaco Pastorius')
  })
})
