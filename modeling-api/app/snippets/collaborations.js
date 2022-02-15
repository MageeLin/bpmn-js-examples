function fn(modeler) {
  /**
   * 到目前为止，我们已经使用了 processes，接下来看看 collaborations。
   *
   * 本示例使用到的模块如下：
   *
   * * ElementFactory: 创建新的 shape 和 connection.
   * * ElementRegistry: 图表中所有 shape 和 connection 的仓库.
   * * Modeling: 进行 modeling 的主模块
   *
   * 我们将使用这些模块创建participant，将其添加到图表中（从而将process转换为collaboration），创建lane并使用消息流连接参与者。
   */

  // (1) 获取模块
  const elementFactory = modeler.get('elementFactory'),
        elementRegistry = modeler.get('elementRegistry'),
        modeling = modeler.get('modeling');

  // (2) 获取存在的process和start event
  const process = elementRegistry.get('Process_1'),
        startEvent = elementRegistry.get('StartEvent_1');

  // (3)  使用 `createParticipantShape`创建新的 participant shape
  const participant = elementFactory.createParticipantShape({ type: 'bpmn:Participant' });

  // (4) 向图表中添加新的 participant，将 process 转换为 collaboration
  modeling.createShape(participant, { x: 400, y: 100 }, process);

  // 现在，已存在的 start event 成为了 participant 的子 shape
  console.log(startEvent.parent); // Shape { "type": "bpmn:Participant", ... }

  // (5) 创建一个 lane
  const lane = modeling.addLane(participant, 'bottom');

  // (6) 创建两个嵌套的 nested lanes
  modeling.splitLane(lane, 2);

  // (7) 创建一个其他的 participant shape（处于collapsed状态）
  const collapsedParticipant = elementFactory
    .createParticipantShape({ type: 'bpmn:Participant', isExpanded: false });

  // (8) 将新创建的participant添加到图表中
  modeling.createShape(collapsedParticipant, { x: 300, y: 500 }, process);

  // (9) 将两个 participant 通过 message flow 连接起来
  modeling.connect(collapsedParticipant, participant);
}

export default {
  id: 'collaborations',
  name: 'Collaborations',
  description: 'Working with collaborations.',
  fn
};