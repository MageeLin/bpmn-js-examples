import inherits from 'inherits';

import Viewer from 'bpmn-js/lib/Viewer';

import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';

import CustomLoggingModule from './features/logging';


/**
 * 一个viewer，包含了navigation和其他自定义的功能
 *
 * @param {Object} options
 */
export default function CustomViewer(options) {
  Viewer.call(this, options);
}

inherits(CustomViewer, Viewer);

CustomViewer.prototype._customModules = [
  ZoomScrollModule,
  MoveCanvasModule,
  CustomLoggingModule
];

// 给视图添加modules
CustomViewer.prototype._modules = [].concat(
  Viewer.prototype._modules,
  CustomViewer.prototype._customModules
);