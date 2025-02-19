# bpmn-js interaction example

一个示例，展示了使用 [bpmn-js](https://github.com/bpmn-io/bpmn-js) 实现用户与 BPMN 关系图交互的不同方法。

[__尝试__](https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/master/interaction/index.html).


## 关于

嵌入一个 BPMN viewer，打开一个 BPMN 2.0 图表并记录用户交互。


## 用法总结

You may attach interaction event listeners to a BPMN viewer/modeler as soon as
it has a diagram loaded:


```javascript
var viewer = new BpmnJS({ container: SOME_CONTAINER });

try {
	await viewer.importXML(diagramXM);

	// diagram is loaded, add interaction to it now
	// see below for options
	// ...
} catch (err) {
	console.error('Error happened: ', err);
}
```

Two options exists for making your diagram interactive.


### Hook into diagram events

Use the `eventBus` service to hook into `element.*` interaction events.
[bpmn-js](https://github.com/bpmn-io/bpmn-js) makes sure the events are
properly dispatched, even if the user works on a touch device.

```javascript
var eventBus = viewer.get('eventBus');

// you may hook into any of the following events
var events = [
  'element.hover',
  'element.out',
  'element.click',
  'element.dblclick',
  'element.mousedown',
  'element.mouseup'
];

events.forEach(function(event) {

  eventBus.on(event, function(e) {
    // e.element = the model element
    // e.gfx = the graphical element

    log(event, 'on', e.element.id);
  });
});
```


### Directly attach listener to DOM

You have more control on which elements you would like to address by directly
attaching listeners to the underlying DOM (i.e. HTML/SVG) nodes.

You can do so by searching for selectors like `[data-element-id=ID_OF_ELEMENT]`:

```javascript
// each model element a data-element-id attribute attached to
// it in HTML

// select the end event
var endEventNode = document.querySelector('[data-element-id=END_EVENT]');
endEventNode.addEventListener('click', function(e) {
  alert('clicked the end event!');
});
```

Both options allow you to intercept user interaction with the diagram and
handle it accordingly.


## Run this Example

Download and open the [example HTML page](https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/master/interaction/index.html).
