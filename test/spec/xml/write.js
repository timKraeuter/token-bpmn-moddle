"use strict";

var Helper = require("../../helper");

xdescribe("write", function () {
  var moddle = Helper.createModdle();

  async function write(element) {
    return await moddle.toXML(element, { preamble: false });
  }

  describe("should export types", function () {
    it("Field#stringValue", async function () {
      // given
      var fieldElem = moddle.create("camunda:Field", {
        name: "Field_1",
        stringValue: "myFieldValue",
      });

      var expectedXML =
        '<camunda:field xmlns:camunda="http://camunda.org/schema/1.0/bpmn" ' +
        'name="Field_1" stringValue="myFieldValue" />';

      // when
      var { xml } = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });

    it("Field#string", async function () {
      // given
      var fieldElem = moddle.create("camunda:Field", {
        name: "Field_1",
        string: "myStringValue",
      });

      var expectedXML =
        '<camunda:field xmlns:camunda="http://camunda.org/schema/1.0/bpmn" name="Field_1">' +
        "<camunda:string>myStringValue</camunda:string>" +
        "</camunda:field>";

      // when
      var { xml } = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });

    it("Field#expression", async function () {
      // given
      var fieldElem = moddle.create("camunda:Field", {
        name: "Field_1",
        expression: "${myExpressionValue}",
      });

      var expectedXML =
        '<camunda:field xmlns:camunda="http://camunda.org/schema/1.0/bpmn" name="Field_1">' +
        "<camunda:expression>${myExpressionValue}</camunda:expression>" +
        "</camunda:field>";

      // when
      var { xml } = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });

    it("UserTask#formRefBinding", async function () {
      // given
      var element = moddle.create("bpmn:UserTask", {
        "camunda:formRefBinding": "latest",
      });

      var expectedXML =
        '<bpmn:userTask xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:camunda="http://camunda.org/schema/1.0/bpmn" ' +
        'camunda:formRefBinding="latest" />';

      // when
      var { xml } = await write(element);

      // then
      expect(xml).to.eql(expectedXML);
    });

    it("Process#ProcessInstance", async function () {
      // given
      var element = moddle.create("bpmn:Process", {
        runningProcess: ["1", "2", "3"],
      });

      var expectedXML =
        '<bpmn:process xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:camunda="http://camunda.org/schema/1.0/bpmn">' +
        "<camunda:runningProcess>1</camunda:runningProcess>" +
        "<camunda:runningProcess>2</camunda:runningProcess>" +
        "<camunda:runningProcess>3</camunda:runningProcess></bpmn:process>";

      // when
      var { xml } = await write(element);

      // then
      expect(xml).to.eql(expectedXML);
    });
  });
});
