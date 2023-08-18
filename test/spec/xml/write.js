"use strict";

var Helper = require("../../helper");

describe("write", function () {
  var moddle = Helper.createModdle();

  async function write(element) {
    return await moddle.toXML(element, { preamble: false });
  }

  describe("should export", function () {
    it("running processes", async function () {
      // given
      const element = moddle.create("bpmn:Process", {
        runningProcess: ["1", "2", "3"],
      });

      const expectedXML =
        '<bpmn:process xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:token="http://tk/schema/1.0/token">' +
        "<token:runningProcess>1</token:runningProcess>" +
        "<token:runningProcess>2</token:runningProcess>" +
        "<token:runningProcess>3</token:runningProcess></bpmn:process>";

      // when
      const { xml } = await write(element);

      // then
      expect(xml).to.eql(expectedXML);
    });

    it("tokens at activities", async function () {
      // given
      const element = moddle.create("bpmn:Activity", {
        token: ["1", "2", "3"],
      });

      const expectedXML =
        '<bpmn:activity xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:token="http://tk/schema/1.0/token">' +
        "<token:token>1</token:token>" +
        "<token:token>2</token:token>" +
        "<token:token>3</token:token></bpmn:activity>";

      // when
      const { xml } = await write(element);

      // then
      expect(xml).to.eql(expectedXML);
    });

    it("tokens at sequence flows", async function () {
      // given
      const element = moddle.create("bpmn:SequenceFlow", {
        token: ["1", "2", "3"],
      });

      const expectedXML =
        '<bpmn:sequenceFlow xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:token="http://tk/schema/1.0/token">' +
        "<token:token>1</token:token>" +
        "<token:token>2</token:token>" +
        "<token:token>3</token:token></bpmn:sequenceFlow>";

      // when
      const { xml } = await write(element);

      // then
      expect(xml).to.eql(expectedXML);
    });
  });
});
