/**
 * 利用AntV-G6开发
 * * */
import React from 'react';
import { Select, Card, Input, Button, Icon } from 'antd';
import 'antd/dist/antd.css';
import G6 from '@antv/g6';

import styles from './style.css';
import { SOURCE_NODE_DATA } from './data';

const Option = Select.Option;

class Process extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operateMode: 'default',
      data: {
        nodes: SOURCE_NODE_DATA,
        edges: {},
      },
      beginNodeNum: 1,
      executeNodeNum: 1,
      containNodeNum: 1,
      endNodeNum: 1,
      operationModalVisible: false,
      operateInfo: {},
      graphWidth: 1000,
      graphHeight: 800,
      detailNodeModal: false,
      detailEdgeModal: false,
      details: {},
    };
  }
  componentDidMount() {
    // 初始化G6的自定义事件
    this.initBehavior();
    // G6的graph实例需要DOM容器渲染完成才能使用，放在componentDidMount中
    this.renderGraph();
  }

  changeMode = (e) => {
    this.setState({
      operateMode: e,
      detailNodeModal: false,
      detailEdgeModal: false,
      details: {},
    });
    this.graph.setMode(e);
  };

  initBehavior = () => {
    const _this = this;

    G6.registerBehavior('detail-operate', {
      getEvents() {
        return {
          'node:click': 'nodeDetails',
          'edge:click': 'edgeDetails',
          'node:mouseenter': 'highLightNode',
          'node:mouseleave': 'showDefaultNode',
          'edge:mouseenter': 'highLightEdge',
          'edge:mouseleave': 'showDefaultEdge',
        };
      },

      // 详情模式下单击节点：查看此节点详细信息
      nodeDetails(e) {
        const { item = {} } = e;
        _this.setState({
          detailEdgeModal: false,
          detailNodeModal: true,
          details: item._cfg,
        });
      },

      // 详情模式下单击边：查看此边详细信息
      edgeDetails(e) {
        const { item = {} } = e;
        _this.setState({
          detailNodeModal: false,
          detailEdgeModal: true,
          details: item._cfg,
        });
      },

      // 详情模式下移入节点：高亮
      highLightNode(e) {
        const { item = {} } = e;
        const isSourceNode = _this.isSourceNode(item);
        if (!isSourceNode) {
          _this.graph.updateItem(item, {
            style: {
              fill: '#d3adf7',
            },
          });
        }
      },

      // 详情模式下移出节点：默认
      showDefaultNode(e) {
        const { item = {} } = e;
        const isSourceNode = _this.isSourceNode(item);
        if (!isSourceNode) {
          _this.graph.updateItem(item, {
            style: {
              fill: '#C6E5FF',
            },
          });
        }
      },

      highLightEdge(e) {
        const { item = {} } = e;
        this.graph.updateItem(item, {
          style: {
            lineWidth: 3,
            stroke: '#d3adf7',
          },
        });
      },

      showDefaultEdge(e) {
        const { item = {} } = e;
        this.graph.updateItem(item, {
          style: {
            lineWidth: 2,
            stroke: '#000',
          },
        });
      },
    });

    G6.registerBehavior('edit-operate', {
      // 设定编辑模式下的节点操作
      getEvents() {
        return {
          'node:dragstart': 'moveNode',
          'node:drag': 'dragNode',
          'node:dragend': 'canNodeHere',
          'node:mouseenter': 'mouseEnterNode',
          'node:mouseleave': 'mouseLeaveNode',
          'node:click': 'clickNodeEdit',
          'node:dblclick': 'editNodeDetails',
          'mousemove': 'connectEdge',
          'edge:click': 'onEdgeClick',
        };
      },

      // 编辑模式下开始拖拽节点：判断是否为源节点，如果是源节点则拖出一个新节点，否则仅移动
      moveNode(e) {
        const { item = {} } = e;
        const isSourceNode = _this.isSourceNode(item);
        if (isSourceNode) {
          _this.moveFormSourceNode(item);
        }
      },

      // 编辑模式下拖拽节点：判断是否有边
      dragNode(e) {
        const { item = {} } = e;
        if (item.getEdges().length > 0) {
          // 当前被拖拽的节点有关联的边，更新该条边的位置和折线
          // 当前被拖拽节点的id和边的source与target作比较，是起始点还是中止点
          item.getEdges().forEach((itm) => {
            const startPosition = itm.getSource().getLinkPointByAnchor(itm._cfg.sourceAnchorIndex);
            const endPosition = itm.getTarget().getLinkPointByAnchor(itm._cfg.targetAnchorIndex);
            if (itm._cfg.sourceAnchorIndex === 1 || itm._cfg.sourceAnchorIndex === 3) {
              _this.graph.updateItem(itm, {
                style: {
                  path: [
                    ['M', startPosition.x, startPosition.y],
                    ['L', endPosition.x, startPosition.y], // 二分之一处
                    ['L', endPosition.x, endPosition.y],
                  ],
                },
              });
            } else {
              _this.graph.updateItem(itm, {
                style: {
                  path: [
                    ['M', startPosition.x, startPosition.y],
                    ['L', startPosition.x, startPosition.y + (Math.abs(startPosition.y - endPosition.y) / 2)], // 二分之一处
                    ['L', endPosition.x, startPosition.y + (Math.abs(startPosition.y - endPosition.y) / 2)],   // 二分之一处
                    ['L', endPosition.x, endPosition.y],
                  ],
                },
              });
            }
          });
        }
      },

      // 编辑模式下放开节点：判断是否在画布中，如果不是则扩大画布
      canNodeHere(e) {
        const { canvasX, canvasY } = e;
        const graphWidth = _this.graph.cfg && _this.graph.cfg.width;
        const graphHeight = _this.graph.cfg && _this.graph.cfg.height;
        if (canvasX + 100 > graphWidth || canvasY + 100 > graphHeight) {
          _this.graph.changeSize(canvasX > graphWidth ? canvasX + 100 : graphWidth, canvasY > graphHeight ? canvasY + 100 : graphHeight);
          console.log(canvasX, canvasY, graphWidth, graphHeight);
          _this.setState({
            graphHeight: _this.graph.cfg.height,
            graphWidth: _this.graph.cfg.width,
          });
        }
      },

      // 编辑模式下鼠标移过节点：判断是否为源节点，如果不是源节点则显示锚点位置和操作指引
      mouseEnterNode(e) {
        const { item = {} } = e;
        const isSourceNode = _this.isSourceNode(item);
        if (!isSourceNode) {
          _this.showNodeOperation(item);
        }
      },

      // 编辑模式下鼠标移出节点：隐藏锚点和操作指引
      mouseLeaveNode(e) {
        const { item = {} } = e;
        _this.hideLinkPoints(item);
      },

      // 编辑模式下点击节点：不是源节点且是锚点，则可以拉出连线，否则无效
      clickNodeEdit(e) {
        const { item = {} } = e;
        const isSourceNode = _this.isSourceNode(item);
        const isClickAnchorPoint = _this.isClickAnchorPoint(e);
        if (!isSourceNode && isClickAnchorPoint) {
          // 开启一条连线
          _this.clickAnchorPoint(e);
        }
      },

      // 编辑模式下双击节点：显示内容编辑框
      editNodeDetails(e) {
        const { item = {} } = e;
        const isSourceNode = _this.isSourceNode(item);
        const model = item.getModel();
        if (!isSourceNode) {
          _this.setState({
            operateInfo: model,
            operationModalVisible: true,
          });
        }
      },

      connectEdge(e) {
        // 当前鼠标移过的位置
        const endPosition = { x: e.x, y: e.y };
        if (_this.addingEdge && _this.edge) {
          // 找到起始点和当前点，设立折点的位置
          const startPosition = _this.edge.getSource().getLinkPointByAnchor(_this.edge._cfg.sourceAnchorIndex);
          if (_this.edge._cfg.sourceAnchorIndex === 1 || _this.edge._cfg.sourceAnchorIndex === 3) {
            _this.graph.updateItem(_this.edge, {
              style: {
                path: [
                  ['M', startPosition.x, startPosition.y],
                  ['L', endPosition.x, startPosition.y], // 二分之一处
                  ['L', endPosition.x, endPosition.y],
                ],
              },
            });
          } else {
            _this.graph.updateItem(_this.edge, {
              style: {
                path: [
                  ['M', startPosition.x, startPosition.y],
                  ['L', startPosition.x, startPosition.y + (Math.abs(startPosition.y - endPosition.y) / 2)], // 二分之一处
                  ['L', endPosition.x, startPosition.y + (Math.abs(startPosition.y - endPosition.y) / 2)],   // 二分之一处
                  ['L', endPosition.x, endPosition.y],
                ],
              },
            });
          }
        }
      },

      onEdgeClick(e) {
        const currentEdge = e.item;
        if (_this.addingEdge && _this.edge === currentEdge) {
          _this.graph.removeItem(_this.edge);
          _this.edge = null;
          _this.addingEdge = false;
        }
      },
    });
  };

  initSourceNode = () => {
    // 给源节点们增加isSource为true的状态
    const sourceNodeArr = ['begin-1', 'execute-1', 'contain-1', 'end-1'];
    sourceNodeArr.forEach((item) => {
      this.graph.setItemState(this.graph.findById(item), 'isSource', true);
    });
  };

  isSourceNode = (item) => {
    // 判断是否为源节点
    if (item._cfg.states.includes('isSource')) {
      return true;
    } else {
      return false;
    }
  };

  isClickAnchorPoint = (e) => {
    // 判断是否点击锚点
    const { item = {}, canvasX, canvasY } = e;
    const anchorPointSize = 8;
    const anchorPoints = item.getLinkPoint({ x: canvasX, y: canvasY });
    if (canvasX < anchorPoints.x + anchorPointSize && canvasX > anchorPoints.x - anchorPointSize && canvasY < anchorPoints.y + anchorPointSize && canvasY > anchorPoints.y - anchorPointSize) {
      return true;
    } else {
      return false;
    }
  };

  // 是否两个锚点间已有一条边
  hadEdge = (source, targetModel) => {
    // 当前的起始点和目标点
    const sourceId = source._cfg.id;
    const targetId = targetModel.id;
    const edges = this.graph.getEdges();
    let flag = true;
    edges.forEach((item) => { // eslint-disable-line
      // 已有的起始点和目标点
      if (item._cfg.targetNode) {
        const { _cfg: { source: { _cfg: { id: itemSourceId } } } } = item;
        const { _cfg: { target: { _cfg: { id: itemTargetId } } } } = item;
        if ((itemSourceId === sourceId && itemTargetId === targetId) || (itemSourceId === targetId && itemTargetId === sourceId)) {
          // 两个节点之间已有连线
          flag = false;
        }
      }
    });
    return flag;
  };

  moveFormSourceNode = (item) => {
    // 复制一个相同的节点作为源节点，此节点的isSource置为true
    const { _cfg = {} } = item;
    const { stateStyles = {} } = _cfg.model;
    const { id, ...newNode } = _cfg.model;
    this.setState({
      // 记录当前节点类型数量加1
      [`${stateStyles['node-name']}NodeNum`]: this.state[`${stateStyles['node-name']}NodeNum`] + 1,
    }, () => {
      newNode.id = `${stateStyles['node-name']}-${this.state[`${stateStyles['node-name']}NodeNum`]}`;
    });
    this.graph.addItem('node', newNode);
    this.graph.setItemState(newNode.id, 'isSource', true);
    this.graph.setItemState(item, 'isSource', false);
  };

  showNodeOperation = (item) => {
    const { _cfg = {} } = item;
    const { id, ...updateNode } = _cfg.model;
    updateNode.id = id;
    // 增加连线锚点
    updateNode.anchorPoints = [[0.5, 0], [1, 0.5], [0.5, 1], [0, 0.5]];
    updateNode.linkPoints = {
      top: true,
      right: true,
      bottom: true,
      left: true,
      size: 8,
      lineWidth: 1,
      fill: '#fff',
      stroke: '#1890FF',
    };
    // 增加移动光标
    updateNode.style = {
      ...updateNode.style,
      cursor: 'move',
    };
    this.graph.updateItem(id, updateNode);
  };

  hideLinkPoints = (item) => {
    const { _cfg = {} } = item;
    const { id, linkPoints, ...updateNode } = _cfg.model;
    updateNode.linkPoints = {
      top: false,
      right: false,
      bottom: false,
      left: false,
    };
    this.graph.updateItem(id, updateNode);
  };

  // 点击了锚点，开启一条连线
  clickAnchorPoint = (e) => {
    const { item = {}, canvasX, canvasY } = e;
    // 获取点击位置最近的锚点作为起始点
    const point = { x: e.x, y: e.y };
    const model = item.getModel();
    if (this.addingEdge && this.edge) {
      // 校验source和target之间是否已有一条边
      const hadEdge = this.hadEdge(this.edge._cfg.source, model);
      if (hadEdge) {
        const endPointIndex = item.getLinkPoint({ x: canvasX, y: canvasY }).anchorIndex; // 结束点的锚点序号
        this.graph.updateItem(this.edge, {
          target: model.id,
          targetAnchor: endPointIndex,
        });
        // 已经正在连线
        this.addingEdge = false;
      } else {
        // 这两个之间已有一条边，无法重复连接
        const removeEdgeId = this.edge._cfg.id;
        this.graph.removeItem(removeEdgeId);
        this.addingEdge = false;
      }
    } else {
      // 新增一条连线
      const startPointIndex = item.getLinkPoint({ x: canvasX, y: canvasY }).anchorIndex;
      this.edge = this.graph.addItem('edge', {
        type: 'polyline',
        source: model.id,
        target: point,
        sourceAnchor: startPointIndex,
        style: {
          endArrow: true,
          lineWidth: 2,
          stroke: '#000',
        },
      });
      this.addingEdge = true;
    }
  };

  quitNodeDetails = () => {
    this.setState({
      operateInfo: {},
      operationModalVisible: false,
    });
  };

  save = () => {
    console.log('查看数据');
    console.log(this.graph.cfg);
  };

  handleChange = (e) => {
    const { operateInfo } = this.state;
    const result = operateInfo;
    const id = operateInfo.id;
    result.label = e.target.value;
    this.graph.updateItem(id, result);
    this.setState({
      operateInfo: result,
    });
  };

  removeNode = () => {
    const { operateInfo } = this.state;
    const id = operateInfo.id;
    this.graph.removeItem(id);
    this.quitNodeDetails();
  };

  renderGraph = () => {
    // 渲染整个画布
    const graph = new G6.Graph({
      container: 'mountNode',
      width: 800,
      height: 600,
      modes: {
        // 默认模式
        default: ['drag-node', 'edit-operate'],
        detail: ['detail-operate'],
      },
    });

    this.graph = graph;
    graph.data(this.state.data);
    graph.render();

    // 初始化源节点状态
    this.initSourceNode();
  };

  render() {
    const { operateMode = 'default', operateInfo = {}, operationModalVisible, graphHeight, graphWidth, detailNodeModal, detailEdgeModal, details } = this.state;
    return (
      <div>
        <div className={styles['operation-mode']}>
          <span>操作模式：</span>
          <Select
            value={operateMode}
            style={{ width: 200 }}
            onChange={this.changeMode}
          >
            <Option key="default" value="default">编辑模式</Option>
            <Option key="detail" value="detail">查看模式</Option>
          </Select>
          {/*<Button type="primary" onClick={this.save} style={{ marginLeft: 80 }}>保存</Button>*/}
        </div>
        <div className={styles['operation-area']}>
          <div className={styles['main-div']} style={{ height: graphHeight, width: graphWidth }}>
            <div id="mountNode">
              <div />
            </div>
          </div>
          {
            operationModalVisible &&
            <Card className={styles['operation-card']}>
              <div>
                <Icon onClick={this.quitNodeDetails} type="double-left" style={{ fontSize: 18, cursor: 'pointer' }} />
              </div>
              <div>
                <span>节点id：{operateInfo.id}</span>
              </div>
              <div>
                <span>节点名称：</span>
                <Input value={operateInfo.label} onChange={this.handleChange} />
              </div>
              {
                operateInfo.type === 'diamond' &&
                <div>
                  <div>
                    <span>YES条件：</span>
                    <Input />
                  </div>
                  <div>
                    <span>NO条件：</span>
                    <Input />
                  </div>
                </div>
              }
              <div className={styles['button-style']}>
                <Button type="danger" onClick={this.removeNode}>删除节点</Button>
              </div>
            </Card>
          }
          {
            detailNodeModal &&
            <Card title="详细信息" className={styles['operation-card']}>
              <p>id：{details.id}</p>
              <p>文字内容：{details.model.label}</p>
              <p>坐标：{`(${details.model.x}, ${details.model.y})`}</p>
              <p>是否为源节点：{details.states.length > 0 ? '是' : '否'}</p>
              <p>连线数量：{details.edges.length}</p>
              <div className={styles['button-style']}>
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({
                      detailNodeModal: false,
                      details: {},
                    });
                  }}
                >返回</Button>
              </div>
            </Card>
          }
          {
            detailEdgeModal &&
            <Card title="详细信息" className={styles['operation-card']}>
              <p>id：{details.id}</p>
              <p>起始坐标：{`(${details.source.getLinkPointByAnchor(details.sourceAnchorIndex).x}, ${details.source.getLinkPointByAnchor(details.sourceAnchorIndex).y})`}</p>
              <p>终点坐标：{`(${details.target.getLinkPointByAnchor(details.targetAnchorIndex).x}, ${details.target.getLinkPointByAnchor(details.targetAnchorIndex).y})`}</p>
              <p>线条颜色：{details.originStyle.stroke}</p>
              <div className={styles['button-style']}>
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({
                      detailEdgeModal: false,
                      details: {},
                    });
                  }}
                >返回</Button>
              </div>
            </Card>
          }
        </div>
      </div>
    );
  }
}

export default Process;
