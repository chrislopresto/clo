import * as Config from '@oclif/config'
import {expect} from '@oclif/test'
import {loadConfig} from '@oclif/test/lib/load-config'
import * as childProcess from 'child_process'
import * as fs from 'fs'
import * as sinon from 'sinon'

import Vs from '../../src/commands/vs'

let config: Config.IConfig
let sandbox = sinon.sandbox.create()
let fsStub: sinon.SinonStub
let childProcessStub: sinon.SinonStub
let cmd: Vs

describe('target', () => {
  beforeEach(async () => {
    config = await Config.load(loadConfig.root)
    sandbox.stub(config, 'home').value('/Users/jacopastorius')
    fsStub = sandbox.stub(fs, 'existsSync')
    childProcessStub = sandbox.stub(childProcess, 'execSync')
    cmd = new Vs([], config)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('opens the current directory if no name is specified', () => {
    cmd.run()
    expect(childProcessStub.calledWith('code .')).equal(true)
  })

  it('opens a workspace in VS Code', () => {
    fsStub.withArgs('/Users/jacopastorius/.vscode/workspaces/foo.code-workspace').returns(true)
    cmd.argv = ['foo']
    cmd.run()
    expect(childProcessStub.calledWith('code /Users/jacopastorius/.vscode/workspaces/foo.code-workspace')).equal(true)
  })

  it('opens a private workspace in VS Code', () => {
    fsStub.withArgs('/Users/jacopastorius/.vscode/workspaces/private/foo.code-workspace').returns(true)
    cmd.argv = ['foo']
    cmd.run()
    expect(childProcessStub.calledWith('code /Users/jacopastorius/.vscode/workspaces/private/foo.code-workspace')).equal(true)
  })
})
