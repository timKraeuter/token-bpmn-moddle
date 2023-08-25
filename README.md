# token-bpmn-moddle

[![CI](https://github.com/timKraeuter/token-bpmn-moddle/actions/workflows/CI.yml/badge.svg)](https://github.com/timKraeuter/token-bpmn-moddle/actions/workflows/CI.yml)

This project defines the token and process namespace extensions for BPMN 2.0 as a [moddle](https://github.com/bpmn-io/moddle) descriptor.
We use processes and tokens to describe the state of running BPMN processes.

## Building the Project

Execute the test via

```
npm test
```

Perform a complete build of the application via

```
npm run all
```

Publish an npm module

```
npm login
npm publish --access public
```

## Acknowledgements

I used [camunda-bpmn-moddle](https://github.com/camunda/camunda-bpmn-moddle) as a starting point for this project.

## License

Use under the terms of the [MIT license](http://opensource.org/licenses/MIT).
