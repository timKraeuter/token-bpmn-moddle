# token-bpmn-moddle

[![CI](../../workflows/CI/badge.svg)](https://github.com/timKraeuter/token-bpmn-moddle/actions/workflows/CI.yml)

This project defines the token and process namespace extensions for BPMN 2.0 as a [moddle](https://github.com/bpmn-io/moddle) descriptor.
We use processes and tokens to describe the state of running BPMN processes.

## Building the Project

To run the test suite that includes XSD schema validation you must have a Java JDK installed and properly exposed through the `JAVA_HOME` variable.

Execute the test via

```
npm test
```

Perform a complete build of the application via

```
npm run all
```

## Acknowledgements

I used [camunda-bpmn-moddle](https://github.com/camunda/camunda-bpmn-moddle) as a starting point for this project.

## License

Use under the terms of the [MIT license](http://opensource.org/licenses/MIT).
