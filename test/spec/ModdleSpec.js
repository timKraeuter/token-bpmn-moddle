"use strict";

var readFile = require("../helper").readFile,
  createModdle = require("../helper").createModdle;

var BpmnModdle = require("bpmn-moddle");

var tokenDescriptor = require("../../resources/token.json");

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

    xit("should ignore id property on camunda:FormField", async function () {
      var xml = readFile("test/fixtures/xml/camunda-formField-ids.bpmn");

      var moddle = createModdle();

      // when
      var { elementsById, warnings } = await moddle.fromXML(
        xml,
        "bpmn:Definitions",
      );

      // then
      expect(warnings).to.be.empty;
      expect(elementsById).not.to.have.property("variableA");
    });
  });
});
