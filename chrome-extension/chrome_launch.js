#!/usr/bin/env node

const chromeLaunch = require("chrome-launch");

const TEST_URL = "about:blank";

chromeLaunch(TEST_URL, ["--load-extension=" + __dirname + "/extension/"]);
