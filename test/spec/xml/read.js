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

        it("read process snapshot", async function () {
            // given
            const file = "snapshot.part.bpmn";

            // when
            const {rootElement: collaboration} = await fromFile(
                file,
                "bpmn:Collaboration",
            );

            // then
            expect(collaboration).to.jsonEqual({
                $type: "bpmn:Collaboration",
                id: "Collaboration_1qmax72",
                artifacts: [
                    {
                        $type: "bt:ProcessSnapshot",
                        id: "ProcessSnapshot_1eoyn6s",
                    },
                ],
            });
        });

        it("read tokens", async function () {
            // given
            const file = "token.part.bpmn";

            // when
            const {rootElement: process} = await fromFile(file, "bpmn:Process");

            // then
            expect(process).to.jsonEqual({
                $type: "bpmn:Process",
                id: "Process_1",
                isExecutable: false,
                artifacts: [
                    {
                        $type: "bt:Token",
                        id: "Token_0iuqd2g",
                        shouldExist: false

                    },
                    {
                        $type: "bt:Token",
                        id: "Token_1uiyzaw",
                    },
                ],
            });
        });
    });
});
