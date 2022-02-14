// 使用stringify来获取pizzaDiagram的文本
import pizzaDiagram from '../resources/pizza-collaboration.bpmn';


// 确保通过 npm install --save bpmn-js 将 bpmn-js添加到项目依赖项中
import BpmnViewer from 'bpmn-js';

var viewer = new BpmnViewer({
  container: '#canvas'
});


viewer.importXML(pizzaDiagram).then(function(result) {

  const { warnings } = result;

  console.log('success !', warnings);

  viewer.get('canvas').zoom('fit-viewport');
}).catch(function(err) {

  const { warnings, message } = err;

  console.log('出错了:', warnings, message);
});
