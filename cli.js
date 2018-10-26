#!/usr/bin/env node

const {lintExperiments} = require("./lib");

const argv = process.argv.slice(2);

lintExperiments(...argv);
