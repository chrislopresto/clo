@chrislopresto/clo
==================

Personal CLI for Chris LoPresto

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@chrislopresto/clo.svg)](https://npmjs.org/package/@chrislopresto/clo)
[![CircleCI](https://circleci.com/gh/chrislopresto/clo/tree/master.svg?style=shield)](https://circleci.com/gh/chrislopresto/clo/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/@chrislopresto/clo.svg)](https://npmjs.org/package/@chrislopresto/clo)
[![License](https://img.shields.io/npm/l/@chrislopresto/clo.svg)](https://github.com/chrislopresto/clo/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @chrislopresto/clo
$ clo COMMAND
running command...
$ clo (-v|--version|version)
@chrislopresto/clo/0.0.0 darwin-x64 node-v10.13.0
$ clo --help [COMMAND]
USAGE
  $ clo COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`clo hello [FILE]`](#clo-hello-file)
* [`clo help [COMMAND]`](#clo-help-command)

## `clo hello [FILE]`

describe the command here

```
USAGE
  $ clo hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ clo hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/chrislopresto/clo/blob/v0.0.0/src/commands/hello.ts)_

## `clo help [COMMAND]`

display help for clo

```
USAGE
  $ clo help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_
<!-- commandsstop -->
