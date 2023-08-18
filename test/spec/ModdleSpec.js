"use strict";

const BpmnModdle = require("bpmn-moddle");
const tokenDescriptor = require("../../resources/token.json");

describe("token-bpmn-moddle", function () {
  describe("schema", function () {
    it("should provide model", function () {
      // then
      expect(tokenDescriptor).to.exist;

      expect(tokenDescriptor.uri).to.eql("http://tk/schema/1.0/token");
      expect(tokenDescriptor.prefix).to.eql("token");
    });
  });

  describe("behavior", function () {
    it("should extend bpmn-moddle", function () {
      // given
      var moddle = new BpmnModdle({
        camunda: tokenDescriptor,
      });

      // when
      var serviceTask = moddle.create("bpmn:Activity");

      // then
      expect(serviceTask.$instanceOf("token:Token")).to.be.true;
    });
  });
});
