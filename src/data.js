export const SOURCE_NODE_DATA = [ // eslint-disable-line
  {
    id: 'begin',
    type: 'rect',
    shape: 'rect',
    label: '开始',
    basicNode: true,
    style: {
      radius: 15,
      stroke: 'green',
      lineWidth: 2,
      cursor: 'pointer'
    },
    labelCfg: {
      style: {
        fill: '#000', // 字体颜色
        lineWidth: 1, //
        fontSize: 12,
        cursor: 'pointer'
      }
    },
    x: 150,
    y: 150,
    // stateStyles: {
    //   'node-name': 'begin',
    // },
    anchorPoints: [
      [0.5, 0, {type: 'circle', shape: 'in', style: {stroke: 'red', fill: 'white'}}],
      [1, 0.5, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}],
      [0.5, 1, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}],
      [0, 0.5, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}]
    ]
  },
  {
    id: 'execute',
    type: 'rect',
    shape: 'rect',
    label: '流程',
    basicNode: true,
    x: 150,
    y: 250,
    style: {
      radius: 0,
      stroke: 'green',
      lineWidth: 2,
      cursor: 'pointer'
    },
    labelCfg: {
      style: {
        fill: '#000', // 字体颜色
        lineWidth: 1, //
        fontSize: 12,
        cursor: 'pointer'
      }
    },
    // stateStyles: {
    //   'node-name': 'execute',
    // },
    anchorPoints: [
      [0.5, 0, {type: 'circle', shape: 'in', style: {stroke: 'red', fill: 'white'}}],
      [1, 0.5, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}],
      [0.5, 1, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}],
      [0, 0.5, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}]
    ]
  },
  {
    id: 'contain',
    type: 'diamond',
    shape: 'diamond',
    label: '条件',
    size: [100, 60],
    basicNode: true,
    x: 150,
    y: 350,
    style: {
      stroke: 'green',
      lineWidth: 2,
      cursor: 'pointer'
    },
    labelCfg: {
      style: {
        fill: '#000', // 字体颜色
        lineWidth: 1, //
        fontSize: 12,
        cursor: 'pointer'
      }
    },
    // stateStyles: {
    //   'node-name': 'contain',
    // },
    anchorPoints: [
      [0.5, 0, {type: 'circle', shape: 'in', style: {stroke: 'red', fill: 'white'}}],
      [1, 0.5, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}],
      [0.5, 1, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}],
      [0, 0.5, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}]
    ]
  },
  {
    id: 'end',
    type: 'rect',
    shape: 'rect',
    label: '结束',
    basicNode: true,
    style: {
      radius: 15,
      stroke: 'green',
      lineWidth: 2,
      cursor: 'pointer'
    },
    labelCfg: {
      style: {
        fill: '#000', // 字体颜色
        lineWidth: 1, //
        fontSize: 12,
        cursor: 'pointer'
      }
    },
    x: 150,
    y: 450,
    // stateStyles: {
    //   'node-name': 'end',
    // },
    anchorPoints: [
      [0.5, 0, {type: 'circle', shape: 'in', style: {stroke: 'red', fill: 'white'}}],
      [1, 0.5, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}],
      [0.5, 1, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}],
      [0, 0.5, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}]
    ]
  },
];
