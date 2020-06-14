# PlistConverter
PlistConverter convert a Property List(Plist) expressed as an XML string into a JavaScript data structure.

The converter does not rely on any external libraries like jQuery.

Currently, the only conversion option is Plist to JSON.

## Usage
### Convert on the sample page
Open ` page/main.html ` in browser.

Write or paste Plist in the input text area and click the convert button.

### Embed in your project
Include ` converter.js ` via an HTML script tag.

``` js
const conv = new Converter(plistString) // plistString is a property list represented as an XML string
conv.convertJson()        // return JSON Object
conv.convertJsonString()  // return JSON String
```

## License
MIT License