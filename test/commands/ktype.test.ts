import * as Config from '@oclif/config'
import {expect} from '@oclif/test'
import {loadConfig} from '@oclif/test/lib/load-config'
import * as childProcess from 'child_process'
import * as fs from 'fs'
import * as sinon from 'sinon'

import Ktype from '../../src/commands/ktype'

describe('run', () => {
  let config: Config.IConfig
  let sandbox: sinon.SinonSandbox
  let fsStub: sinon.SinonStub
  let childProcessStub: sinon.SinonStub
  let cmd: Ktype

  beforeEach(async () => {
    sandbox = sinon.createSandbox()
    config = await Config.load(loadConfig.root)
    sandbox.stub(config, 'home').value('/Users/jacopastorius')
    fsStub = sandbox.stub(fs, 'existsSync')
    childProcessStub = sandbox.stub(childProcess, 'execSync')
    cmd = new Ktype([], config)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('runs the dfu-util command for a theme', async () => {
    fsStub.withArgs('/Users/jacopastorius/Dropbox (Personal)/ktype/bass-kiibohd.dfu.bin').returns(true)
    cmd.argv = ['bass']
    await cmd.run()
    expect(childProcessStub.calledOnce).equal(true)
  })
})
