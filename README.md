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
* [`clo echo [TEXT]`](#clo-echo-text)
* [`clo git:config`](#clo-gitconfig)
* [`clo help [COMMAND]`](#clo-help-command)
* [`clo vs [NAME]`](#clo-vs-name)

## `clo echo [TEXT]`

describe the command here

```
USAGE
  $ clo echo [TEXT]

OPTIONS
  -f, --font=font
  -h, --help       show CLI help
```

_See code: [src/commands/echo.ts](https://github.com/chrislopresto/clo/blob/v0.0.0/src/commands/echo.ts)_

## `clo git:config`

Commands for git config

```
USAGE
  $ clo git:config

OPTIONS
  -h, --help                      show CLI help
  -s, --signingKey=personal|work  (required) rcm tag to use for signingkey

EXAMPLES
  $ clo git:config --signingKey=personal
  $ clo git:config -s work
```

_See code: [src/commands/git/config.ts](https://github.com/chrislopresto/clo/blob/v0.0.0/src/commands/git/config.ts)_

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

## `clo vs [NAME]`

Commands for VS Code

```
USAGE
  $ clo vs [NAME]

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ clo vs chrislopresto
```

_See code: [src/commands/vs.ts](https://github.com/chrislopresto/clo/blob/v0.0.0/src/commands/vs.ts)_
<!-- commandsstop -->
