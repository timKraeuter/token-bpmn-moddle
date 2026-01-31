"use strict";

const { BpmnModdle } = require("bpmn-moddle");
const tokenDescriptor = require("../../resources/token.json");

describe("token-bpmn-moddle", function () {
  describe("schema", function () {
    it("should provide model", function () {
      // then
      expect(tokenDescriptor).to.exist;

      expect(tokenDescriptor.uri).to.eql("http://tk/schema/1.0/bt");
      expect(tokenDescriptor.prefix).to.eql("bt");
    });
  });

  describe("behavior", function () {
    it("should extend bpmn-moddle", function () {
      // given
      var moddle = new BpmnModdle({
        bt: tokenDescriptor,
      });

      // when
      var serviceTask = moddle.create("bpmn:Activity");

      // then
      expect(serviceTask.$instanceOf("bpmn:Activity")).to.be.true;
    });
  });
});
