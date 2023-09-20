"use strict";

var Helper = require("../../helper");

describe("write", function () {
  var moddle = Helper.createModdle();

  async function write(element) {
    return await moddle.toXML(element, { preamble: false });
  }

  describe("should export", function () {
    it("tokens with attributes", async function () {
      // given
      const extensionElements = moddle.create("bpmn:ExtensionElements", {
        values: [
          moddle.create("bt:Token", { id: "1", shouldExist: false }),
          moddle.create("bt:Token", { id: "2" }),
        ],
      });

      const element = moddle.create("bpmn:Process", {
        extensionElements,
      });

      const expectedXML =
        '<bpmn:process xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bt="http://tk/schema/1.0/bt">' +
        "<bpmn:extensionElements>" +
        '<bt:token id="1" shouldExist="false" />' +
        '<bt:token id="2" />' +
        "</bpmn:extensionElements>" +
        "</bpmn:process>";

      // when
      const { xml } = await write(element);

      // then
      expect(xml).to.eql(expectedXML);
    });

    it("tokens with process snapshot references", async function () {
      // given
      const snapshot = moddle.create("bt:ProcessSnapshot", { id: "1" });
      const extensionElementsCollaboration = moddle.create(
        "bpmn:ExtensionElements",
        {
          values: [snapshot],
        },
      );

      const token = moddle.create("bt:Token", {
        id: "1",
        processSnapshot: snapshot,
      });
      const extensionElementsProcess = moddle.create("bpmn:ExtensionElements", {
        values: [token],
      });

      const defs = moddle.create("bpmn:Definitions", {
        rootElements: [
          moddle.create("bpmn:Collaboration", {
            extensionElements: extensionElementsCollaboration,
          }),
          moddle.create("bpmn:Process", {
            extensionElements: extensionElementsProcess,
          }),
        ],
      });

      const expectedXML =
        '<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bt="http://tk/schema/1.0/bt">' +
        "<bpmn:collaboration>" +
        "<bpmn:extensionElements>" +
        '<bt:processSnapshot id="1" />' +
        "</bpmn:extensionElements>" +
        "</bpmn:collaboration>" +
        "<bpmn:process>" +
        "<bpmn:extensionElements>" +
        '<bt:token id="1" processSnapshot="1" />' +
        "</bpmn:extensionElements>" +
        "</bpmn:process>" +
        "</bpmn:definitions>";

      // when
      const { xml } = await write(defs);

      // then
      expect(xml).to.eql(expectedXML);
    });

    it("process snapshots", async function () {
      // given
      const extensionElements = moddle.create("bpmn:ExtensionElements", {
        values: [
          moddle.create("bt:ProcessSnapshot", { id: "1", shouldExist: false }),
          moddle.create("bt:ProcessSnapshot", { id: "2" }),
        ],
      });
      const element = moddle.create("bpmn:Collaboration", {
        extensionElements,
      });

      const expectedXML =
        '<bpmn:collaboration xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bt="http://tk/schema/1.0/bt">' +
        "<bpmn:extensionElements>" +
        '<bt:processSnapshot id="1" shouldExist="false" />' +
        '<bt:processSnapshot id="2" />' +
        "</bpmn:extensionElements>" +
        "</bpmn:collaboration>";

      // when
      const { xml } = await write(element);

      // then
      expect(xml).to.eql(expectedXML);
    });
  });
});
