// 导入示例的XML文本
import qrDiagram from '../resources/qr-code.bpmn';

import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';


var bpmnViewer = new BpmnViewer({
  container: '#canvas',
  /* 取消注释可以给所有的overlays添加默认配置
  overlays: {
    defaults: {
      show: { minZoom: 1 },
      scale: true
    }
  }
  */
});


// 导入qr图表

bpmnViewer.importXML(qrDiagram).then(function() {

  var canvas = bpmnViewer.get('canvas'),
      overlays = bpmnViewer.get('overlays');


  // 缩放到适应视图
  canvas.zoom('fit-viewport');

  // 给 node 附加 overlay
  overlays.add('SCAN_OK', 'note', {
    position: {
      bottom: 0,
      right: 0
    },
    html: '<div class="diagram-note">Mixed up the labels?</div>'
  });


  // 配置scale为false使用不可缩放的overlay
  overlays.add('START_PROCESS', 'note', {
    position: {
      bottom: 0,
      right: 0
    },
    scale: false,
    html: '<div class="diagram-note">I don\'t scale</div>'
  });

  // 配置 scale={ min: 1 }，当缩放小于100%时不会继续缩放
  overlays.add('SCAN_QR_CODE', 'note', {
    position: {
      bottom: 0,
      right: 0
    },
    scale: { min: 1 },
    html: '<div class="diagram-note">I don\'t shrink beyond 100%</div>'
  });



  // 配置 show={ minZoom: 0.6 }，当缩放级别小于0.6时自动隐藏
  overlays.add('END_PROCESS', 'note', {
    position: {
      bottom: 0,
      right: 0
    },
    show: {
      minZoom: 0.7
    },
    html: '<div class="diagram-note">I hide at low zoom levels</div>'
  });

}).catch(function(err) {

  console.error('无法导入 BPMN 2.0 图表', err);
});
