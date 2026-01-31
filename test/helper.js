"use strict";

var fs = require("fs");

function readFile(filename) {
  return fs.readFileSync(filename, { encoding: "UTF-8" });
}

module.exports.readFile = readFile;

var { BpmnModdle } = require("bpmn-moddle");

var tokenDescriptor = require("../resources/token.json");

function createModdle() {
  return new BpmnModdle({
    token: tokenDescriptor,
  });
}

module.exports.createModdle = createModdle;
