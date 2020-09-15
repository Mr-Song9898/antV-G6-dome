state:
1、某个交互节点动作要改变节点或者边的样式和属性
2、呈现给用户的内容会根据数据改变（如1代表成功，0代表失败）
交互模式Mode
1、切换mode
    graph.setMode("edit");
2、编辑已有的Mode
    添加Behavior(内置Behavior或自定义Behavior)
    graph.addBehaviors(drag-canvas, edit);
    添加名为drag-canvas的行为，并定义个性化配置
    graph.addBehaviors({ type: drag-canvas, diraction: both });
    添加多个行为
    graph.addBehaviors([drag-canvas, zoom-canvas], edit);
    移除已有的Behavior
    graph.removeBehaviors(drag-canvas, edit);
3、自定义交互行为Behavior
    G6.registerBehavior
