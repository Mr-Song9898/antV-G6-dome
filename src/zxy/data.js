export const SOURCE_NODE_DATA = [ // eslint-disable-line
  {
    id: 'begin-1',
    type: 'rect',
    shape: 'rect',
    label: '开始',
    style: {
      radius: 15,
    },
    x: 150,
    y: 150,
    stateStyles: {
      'node-name': 'begin',
    },
  },
  {
    id: 'execute-1',
    type: 'rect',
    shape: 'rect',
    label: '流程',
    x: 150,
    y: 250,
    stateStyles: {
      'node-name': 'execute',
    },
  },
  {
    id: 'contain-1',
    type: 'diamond',
    shape: 'diamond',
    label: '条件',
    size: [100, 60],
    x: 150,
    y: 350,
    style: {
      radius: 10,
    },
    stateStyles: {
      'node-name': 'contain',
    },
  },
  {
    id: 'end-1',
    type: 'rect',
    shape: 'rect',
    label: '结束',
    style: {
      radius: 15,
    },
    x: 150,
    y: 450,
    stateStyles: {
      'node-name': 'end',
    },
  },
];
