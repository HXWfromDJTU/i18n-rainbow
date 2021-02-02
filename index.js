const path = require('path')
const program = require('commander')
const vfs = require('vinyl-fs')
const sort = require('gulp-sort')
const scanner = require('i18next-scanner/lib')
const pkg = require('./package.json')
const _ = require('lodash')

const generateI18nextScannerConfig = require('./config/i18next-scanner.config')
