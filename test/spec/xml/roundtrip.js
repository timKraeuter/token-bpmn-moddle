"use strict";

var readFile = require("../../helper").readFile,
  createModdle = require("../../helper").createModdle;

describe("import -> export roundtrip", function () {
  function stripSpaces(xml) {
    return xml
      .replace(/\n|\r/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/\s\/>/g, "/>")
      .replace(/>\s+</g, "><");
  }

  function validateExport(file) {
    return async function () {
      var xml = stripSpaces(readFile(file));

      var moddle = createModdle();

      var { rootElement: definitions } = await moddle.fromXML(
        xml,
        "bpmn:Definitions",
      );

      var { xml: savedXML } = await moddle.toXML(definitions);

      savedXML = stripSpaces(savedXML);

      expect(savedXML).to.eql(xml);
    };
  }

  describe("should keep token attributes", function () {
    it(
      "tokens at activities and sequence flows",
      validateExport("test/fixtures/xml/simple.bpmn"),
    );

    xit(
      "running processes",
      validateExport("test/fixtures/xml/inputOutput-nestedList.bpmn"),
    );
  });
});
