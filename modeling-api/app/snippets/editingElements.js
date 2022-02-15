import diagram from '../../resources/editingElements.bpmn';

function fn(modeler) {
  /**
   * 现在来看一下如何编辑已存在的 elements
   *
   * 本示例使用到的模块如下：
   *
   * * ElementFactory: 创建新的 shape 和 connection.
   * * ElementRegistry: 图表中所有 shape 和 connection 的仓库.
   * * Modeling: 进行 modeling 的主模块
   *
   * 我们将会使用这些模块来更新两个已存在 shape 的属性
   */

  // (1) 获取模块
  const bpmnFactory = modeler.get('bpmnFactory'),
        elementRegistry = modeler.get('elementRegistry'),
        modeling = modeler.get('modeling');

  // (2) 获取 shapes
  const startEvent = elementRegistry.get('StartEvent_1'),
        exclusiveGateway = elementRegistry.get('ExclusiveGateway_1'),
        sequenceFlow = elementRegistry.get('SequenceFlow_3'),
        task = elementRegistry.get('Task_1');

  // (3) 使用 `updateProperties` 改变 start event 的  `name` 属性
  modeling.updateProperties(startEvent, { name: 'Foo' });

  // (4) 改变一个 gateway 的 `defaultFlow` 属性
  modeling.updateProperties(exclusiveGateway, {
    default: sequenceFlow.businessObject
  });

  // (5) 改变一个 task 为多示例
  const multiInstanceLoopCharacteristics = bpmnFactory.create('bpmn:MultiInstanceLoopCharacteristics');

  modeling.updateProperties(task, {
    loopCharacteristics: multiInstanceLoopCharacteristics
  });
}

export default {
  id: 'editingElements',
  name: 'Editing Elements',
  description: 'How to edit existing elements.',
  diagram,
  fn
};