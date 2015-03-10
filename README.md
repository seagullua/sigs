# Sigs - Signals and Slots for JavaScript

Simple signals and slots system inspired from Qt.

```npm install sigs```

## Quick Example

```var Signal = require('sigs');

//Create event
var onSomeEvent = new Signal();

//Connect some functions to event
onSomeEvent.connect(function(data){
	console.log("Data: ", data);
});

//Connect by function name
onSomeEvent.connect(console.log);


onSomeEvent.emit("HELLO");
```