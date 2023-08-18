"use strict";

const readFile = require("../../helper").readFile,
  createModdle = require("../../helper").createModdle;

describe("read", function () {
  describe("should read extensions", function () {
    const moddle = createModdle();

    function read(xml, root, opts) {
      return moddle.fromXML(xml, root, opts);
    }

    function fromFile(file, root, opts) {
      const contents = readFile("test/fixtures/xml/" + file);
      return read(contents, root, opts);
    }

    it("read running processes", async function () {
      // given
      const file = "process-instance.part.bpmn";

      // when
      const { rootElement: serviceTask } = await fromFile(file, "bpmn:Process");

      // then
      expect(serviceTask).to.jsonEqual({
        $type: "bpmn:Process",
        runningProcess: ["1", "2", "3"],
      });
    });

    it("read activity tokens", async function () {
      // given
      const file = "activity-token.part.bpmn";

      // when
      const { rootElement: serviceTask } = await fromFile(
        file,
        "bpmn:Activity",
      );

      // then
      expect(serviceTask).to.jsonEqual({
        $type: "bpmn:Activity",
        token: ["1", "2", "3"],
      });
    });

    it("read sequence flow tokens", async function () {
      // given
      const file = "sequenceFlow-token.part.bpmn";

      // when
      const { rootElement: serviceTask } = await fromFile(
        file,
        "bpmn:SequenceFlow",
      );

      // then
      expect(serviceTask).to.jsonEqual({
        $type: "bpmn:SequenceFlow",
        token: ["1", "2", "3"],
      });
    });
  });
});
