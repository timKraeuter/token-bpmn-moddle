"use strict";

var Helper = require("../../helper");

describe("write", function () {
  var moddle = Helper.createModdle();

  async function write(element) {
    return await moddle.toXML(element, { preamble: false });
  }

  describe("should export", function () {
    it("tokens", async function () {
      // given
      const element = moddle.create("bpmn:Process", {
        artifacts: [moddle.create("bt:Token"), moddle.create("bt:Token")],
      });

      const expectedXML =
        '<bpmn:process xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bt="http://tk/schema/1.0/bt">' +
        "<bt:token /><bt:token />" +
        "</bpmn:process>";

      // when
      const { xml } = await write(element);

      // then
      expect(xml).to.eql(expectedXML);
    });

    it("process snapshots", async function () {
      // given
      const element = moddle.create("bpmn:Collaboration", {
        artifacts: [
          moddle.create("bt:ProcessSnapshot"),
          moddle.create("bt:ProcessSnapshot"),
        ],
      });

      const expectedXML =
        '<bpmn:collaboration xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bt="http://tk/schema/1.0/bt">' +
        "<bt:processSnapshot /><bt:processSnapshot />" +
        "</bpmn:collaboration>";

      // when
      const { xml } = await write(element);

      // then
      expect(xml).to.eql(expectedXML);
    });
  });
});
