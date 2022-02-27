# bpmn-js 打包示例

此示例演示如何添加和使用 [Webpack](https://webpack.js.org) 打包 [bpmn-js](https://github.com/bpmn-io/bpmn-js)为 node 风格的 Web 应用。

## 关于

此示例使用 bpmn-js 将[披萨协作图](http://demo.bpmn.io/s/pizza-collaboration)嵌入到 Web 应用中。

![示例截图](./resources/screenshot.png '示例应用截图')

## 用法总结

通过 [npm](http://npmjs.org)安装 bpmn-js

```
npm install --save bpmn-js
```

在你的应用中使用它

```javascript
import BpmnViewer from 'bpmn-js';

var viewer = new BpmnViewer({
  container: '#canvas',
});

viewer
  .importXML(pizzaDiagram)
  .then(function (result) {
    const { warnings } = result;

    console.log('成功 !', warnings);

    viewer.get('canvas').zoom('fit-viewport');
  })
  .catch(function (err) {
    const { warnings, message } = err;

    console.log('出错了:', warnings, message);
  });
```

使用 webpack 打包 `src/app.js` 文件为浏览器可用的形式

```
webpack ./src/app.js -o public/app.bundled.js --mode development
```

想学习更多的打包选项，查看 [webpack-cli documentation](https://webpack.js.org/api/cli/).

**注意:** 你也可以使用其他的 ES 模块打包工具，比如[Rollup](https://rollupjs.org)。也可以使用 Browserify，但必须通过全局 babelify 转换进行正确配置。

## 构建示例

通过如下方式安装项目依赖

```
npm install
```

若要在`public`文件夹中创建示例，请运行

```
npm run all
```

## 许可证

MIT
