# bpmn-js colors

此示例演示如何向使用 [bpmn-js](https://github.com/bpmn-io/bpmn-js) 呈现的 BPMN 图表添加颜色。

[**尝试**](https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/master/colors/index.html).

## 关于

该示例演示了如何向 BPMN 图添加颜色的多种不同方法。

![demo application screenshot](./screenshot.png 'Screenshot of the example application')

存在以下选项：

- [bpmn-js colors](#bpmn-js-colors)
  - [关于](#关于)
  - [使用总结](#使用总结)
  - [添加颜色](#添加颜色)
    - [选项 1: 通过 Overlay 修改颜色](#选项-1-通过-overlay-修改颜色)
    - [选项 2: 通过 BPMN 2.0 扩展来修改颜色](#选项-2-通过-bpmn-20-扩展来修改颜色)
    - [选项 3: 通过 Marker + CSS 样式来修改颜色](#选项-3-通过-marker--css-样式来修改颜色)
    - [选项 4: 通过自定义渲染器修改颜色](#选项-4-通过自定义渲染器修改颜色)
  - [运行示例](#运行示例)
  - [许可证](#许可证)

See below for details on each of the approaches.

## 使用总结

Include [bpmn-js](https://github.com/bpmn-io/bpmn-js) and set it up [pre-packaged](../pre-packaged) or [via npm](../bundling):

```javascript
var diagramXML = '在这里放置 BPMN 2.0 process XML 文本';

var viewer = new BpmnJS({ container: '#diagram' });
```

## 添加颜色

### 选项 1: 通过 Overlay 修改颜色

> 此示例假定你已安装 [jQuery](http://jquery.com/).

如下所示，再 HTML 文件中添加 CSS 代码片段

```css
.highlight-overlay {
  background-color: green; /* 将element填充为绿色 */
  opacity: 0.4;
  pointer-events: none; /*无pointer事件，允许单击element */
}
```

现在，将具有给定 class 的 overlay HTML 元素附加到指定 elements 上：

```javascript
await viewer.importXML(diagramXML);

var overlays = viewer.get('overlays');
var elementRegistry = viewer.get('elementRegistry');

var shape = elementRegistry.get('UserTask_1');

var $overlayHtml = $('<div class="highlight-overlay">').css({
  width: shape.width,
  height: shape.height,
});

overlays.add('UserTask_1', {
  position: {
    top: -5,
    left: -5,
  },
  html: $overlayHtml,
});
```

### 选项 2: 通过 BPMN 2.0 扩展来修改颜色

如果希望颜色成为 BPMN 2.0 图表的一部分，则可以使用内置的 BPMN 2.0 颜色扩展。

要添加颜色，使用 modeler 并调用 `Modeling#setColor` API 为 BPMN 元素指定 stroke 和 fill：

```javascript
var bpmnModeler = ...;
var modeling = bpmnModeler.get('modeling');

var elementsToColor = [ element1, element2 ];

// 设置颜色
modeling.setColor(elementsToColor, {
  stroke: '#00ff00',
  fill: '#ffff00'
});

// 移除之前设置的颜色
modeling.setColor(elementsToColor, null);
```

这些颜色保留在 BPMN 2.0 图表中，并由 BPMN viewer 显示。

有关此功能的更多详细信息，请阅读此[博客文章](https://bpmn.io/blog/posts/2016-colors-bpmn-js.html)。

### 选项 3: 通过 Marker + CSS 样式来修改颜色

将如下所示的 CSS 代码段添加到 HTML 文件中：

```css
.highlight:not(.djs-connection) .djs-visual > :nth-child(1) {
  fill: green !important; /* 将element填充为绿色 */
}
```

该代码段可确保具有 `highlight` class 的元素获得 `green` 的 SVG 填充。

导入后，将 `highlight` class 作为 element marker 添加到希望看到的颜色为绿色的每个 element 中：

```javascript
await viewer.importXML(diagramXML);

var canvas = viewer.get('canvas');

canvas.addMarker('UserTask_1', 'highlight');
```

### 选项 4: 通过自定义渲染器修改颜色

查看 [bpmn-js-task-priorities](https://github.com/bpmn-io/bpmn-js-task-priorities) 获取示例，该示例提供[自定义渲染器](https://github.com/bpmn-io/bpmn-js-task-priorities/blob/master/lib/priorities/ColorRenderer.js)来动态为 shapes 和 connections 填充颜色。

## 运行示例

下载[示例图](https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/master/colors/index.html)并在 Web 浏览器中打开它。

## 许可证

MIT
