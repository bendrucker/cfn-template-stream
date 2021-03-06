# cfn-template-stream [![tests](https://github.com/bendrucker/cfn-template-stream/workflows/tests/badge.svg)](https://github.com/bendrucker/cfn-template-stream/actions?query=workflow%3Atests)

> Streamingly read/parse/stringify CloudFormation templates


## Install

```
$ npm install --save cfn-template-stream
```


## Usage

```js
var cfnTemplate = require('cfn-template-stream')

cfnTemplate.fromFile('./my-template.yml')
  .pipe(ObjectTransform())
  .pipe(cfnTemplate.Stringify('.yml'))
  .pipe(fs.createWriteStream('./my-template-transformed.yml'))
```

## API

#### `template.Parse(extension)` -> `stream.Transform`

Returns a transform stream that receives template strings in the specified format and emits parsed template objects.

##### extension

*Required*  
Type: `string`

The file extension, either `.json` or `.yml`.

#### `template.fromFile(filename)` -> `stream.Readable`

Returns a readable stream that auto-detects the file type from the `filename` and pipes the data to `template.Parse`.

##### filename

*Required*  
Type: `string`

The path to a `.json` or `.yml` file.

#### `template.Stringify(extension)` -> `stream.Transform`

Returns a transform stream that receives template object chunks and emits template strings.

##### extension

*Required*  
Type: `string`

The file extension, either `.json` or `.yml`.


## License

MIT © [Ben Drucker](http://bendrucker.me)
