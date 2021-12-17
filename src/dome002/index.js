import React from "react";
import G6 from '@antv/g6'
import { Button, Select } from 'antd';
import 'antd/dist/antd.css';
import DragComponent from './component/dragComponent';
import { SOURCE_NODE_DATA } from '../data';
import './style.css';

const Option = Select.Option;
let addedCount = 1;
export default class DOME extends React.Component {
    constructor() {
        super();
        this.state = {
            initData: {
                nodes: SOURCE_NODE_DATA,
                // nodes: [
                //     // 内置节点-配置手册：https://www.yuque.com/antv/g6/internal-node
                //     {
                //         id: 'start', // 节点的唯一标识
                //         x: 300, // 节点横坐标
                //         y: 200, // 节点的纵坐标
                //         shape: "ellipse", // 节点的形状【rect：矩形， ellipse: 椭圆形，diamond：菱形，circle：圆形。。。】
                //         size: [80,50], // 节点的大小，不同形状的节点值不同，number||[]
                //         label: 'START',
                //         // anchorPoints: [[1, 0.5], [0.5, 1]],
                //         anchorPoints: [
                //             [1, 0.5, {type: 'circle', style: {stroke: 'red', fill: 'white'}}],
                //             [0.5, 1, {type: 'rect', style: {stroke: 'blue', fill: 'white'}}]
                //         ],
                //         style: { // 包裹样式属性的字段，style与其他属性在数据结构上并行
                //             // fill: 'red', // 样式属性，元素的填充色
                //             stroke: "green", // 样式属性，元素的描边色
                //             fontSize: 5
                //         },
                //         labelCfg: {
                //             style: {
                //                 fontSize: 15,
                //                 // shadowOffsetX: 5, // 阴影
                //                 // shadowOffsetY: 5,
                //                 // shadowColor: 'blue',
                //                 // shadowBlur: 5
                //             }
                //         }
                //     },
                //     {
                //         id: 'end',
                //         x: 500,
                //         y: 500,
                //         shape: "ellipse",
                //         size: [80,50],
                //         // anchorPoints: [[0, 0.5], [0.5, 0]],
                //         anchorPoints: [
                //             [0, 0.5, {type: 'circle', style: {stroke: 'red', fill: 'white'}}],
                //             [0.5, 0, {type: 'rect', style: {stroke: 'blue', fill: 'white'}}]
                //         ],
                //         label: 'END',
                //         style: { // 包裹样式属性的字段，style与其他属性在数据结构上并行
                //             // fill: 'red', // 样式属性，元素的填充色
                //             stroke: "green", // 样式属性，元素的描边色
                //             fontSize: 5
                //         },
                //         labelCfg: {
                //             style: {
                //                 fontSize: 15,
                //             }
                //         }
                //     }
                // ],
                edges: [
                    // 表示一条从 开始节点 连接到 结束节点 的边
                    // 内置边-配置手册：https://www.yuque.com/antv/g6/internal-edge
                    {
                        source: 'start',
                        target: 'end',
                        // 该边连入 source 点的第 0 个 anchorPoint，
                        sourceAnchor: 0,
                        // 该边连入 target 点的第 0 个 anchorPoint，
                        targetAnchor: 1,
                        shape: 'cubic-vertical', // 连线的类型 polyline、cubic-vertical
                        label: 'polyline',
                        lineAppendWidth: 100,
                        style: {
                            endArrow: true,
                            stroke: 'blue', // 边的填充颜色
                            lineWidth: 3, // 边的宽度
                        },
                        labelCfg: { // 文本配置项
                            style: {
                                fontSize: 18, // 文本的字体大小
                                fill: 'red', // 文本的填充颜色
                                stroke: 'yellow', // 文字边框颜色
                                lineWidth: 5 // 文字边框的宽度
                            }
                        }
                    },
                ]
            }
        }
    }
    componentDidMount() {
        // 初始化自定义交互行为
        this.registerBehavior();
        // 初始化自定义节点
        // this.registerNode();
        // 初始化自定义边
        this.registerEdge();
        // 初始化并渲染画布
        this.display();
        // 画布平移初始化
        this.initMoveCanvas();
    }

    // 画布平移初始化
    initMoveCanvas = () => {
        const LEFT = document.getElementById('LEFT');
        const RIGHT = document.getElementById('RIGHT');
        const BOTTOM = document.getElementById('BOTTOM');
        const TOP = document.getElementById('TOP');
        LEFT.onmousedown = (e) => {
            e.preventDefault();
            let loop = setInterval(() => {
                this.graph.translate(-5,0);
            },30);
            document.onmouseup = () => {
                clearInterval(loop);
            }
        }
        RIGHT.onmousedown = (e) => {
            e.preventDefault();
            let loop = setInterval(() => {
                this.graph.translate(5,0);
            },30);
            document.onmouseup = () => {
                clearInterval(loop);
            }
        }
        BOTTOM.onmousedown = (e) => {
            e.preventDefault();
            let loop = setInterval(() => {
                this.graph.translate(0,5);
            },30);
            document.onmouseup = () => {
                clearInterval(loop);
            }
        }
        TOP.onmousedown = (e) => {
            e.preventDefault();
            let loop = setInterval(() => {
                this.graph.translate(0,-5);
            },30);
            document.onmouseup = () => {
                clearInterval(loop);
            }
        }
    }

    // 自定义节点
    registerNode = () => {
        G6.registerNode('node-diamond', {
            option: {
                style: {},
                stateStyles: {
                    hover: {},
                    selected: {}
                }
            }
        }, 'diamond');
    };

    // 自定义边
    registerEdge = () => {
        G6.registerEdge('edge-line', {

        },''); // 继承某个内置边
    };

    test = () => {
       console.log('this.graph=>', this.graph);
        // this.graph.group.addShape('rect', {
        //     attrs: {
        //         x: 150,
        //         y: 150,
        //         width: 150,
        //         height: 150,
        //         stroke: 'black',
        //         radius: [2, 4]
        //     }
        // });
    }

    // G6中的自定义交互行为Behavior
    registerBehavior = () => {
        // 鼠标移入移出 事件 可被内置交互行为 activate-relations
        // activeState: 'active' 活跃状态下的样式
        // inactiveState： 'inactive' 非活跃下的样式
        G6.registerBehavior('activite-mouse', {
            getEvents() {
                return {
                    'node:mouseenter': 'nodeOnMouseEnter',
                    'node:mouseleave': 'nodeOnMouseLeave',
                    'edge:mouseenter': 'edgeOnMouseEnter',
                    'edge:mouseLeave': 'edgeOnMouseLeave',
                }
            },
            nodeOnMouseEnter(e) {
                e.preventDefault();
                const node = e.item;
                this.graph.setItemState(node, 'hover', true);
            },
            nodeOnMouseLeave(e) {
                e.preventDefault();
                const node = e.item;
                this.graph.setItemState(node, 'hover', false);
            },
            edgeOnMouseEnter(e) {
                e.preventDefault();
                const node = e.item;
                this.graph.setItemState(node, 'hover', true);
            },
            edgeOnMouseLeave(e) {
                e.preventDefault();
                const node = e.item;
                this.graph.setItemState(node, 'hover', false);
            }
        });

        // 点击选中
        G6.registerBehavior('activite-select', {
            getEvents() {
                return {
                    'node:click': 'nodeOnClick', // 单击选中，再次单击取消选中
                    'node:dblclick': 'nodeOnDblClick', // TODO 双击可做其他操作，比如删除
                    'canvas:click': 'canvasOnClick', // TODO 点击找不到各个节点对象
                }
            },
            nodeOnClick(e) {
                e.preventDefault();
                const node = e.item;
                this.graph.setItemState(node, 'selected', !node.hasState('selected'));
            },
            nodeOnDblClick(e) {
                e.preventDefault();
                const node = e.item;
                this.graph.setItemState(node, 'selected', false);
            },
            canvasOnClick(e) {
                this.removeNodesState();
                if (this.shouldUpdate(e)) {
                }
            },
            removeNodesState() {
                const graph = this.graph;
                graph.findAllByState('selected').forEach(item => {
                    graph.setItemState(item, 'selected', false);
                })
            }
        });
        G6.registerBehavior('activite-drag', {
            getEvents() {
                return {
                  'node:click': 'onNodeClick',
                  'canvas:click': 'onCanvasClick'
                };
            },
            onNodeClick(e) {
                console.log('e==>', e);
                const graph = this.graph;
                const item = e.item;
                if (item.hasState('hover')) {
                    graph.setItemState(item, 'hover', false);
                    return;
                }
                if (!this.multiple) {
                    this.removeNodesState()
                }
                graph.setItemState(item, 'hover', true);
            },
            onCanvasClick(e) {
                if (this.shouldUpdate(e)) {
                    this.removeNodesState();
                }
            },
            shouldUpdate () {
                return true;
            },
            removeNodesState() {
                const graph = this.graph;
                graph.findAllByState('hover').forEach(item => {
                    graph.setItemState(item, 'hover', false);
                });
            },
        });
        G6.registerBehavior('activate-edit', {
            getEvents(){
                return {
                    'node:dblclick': 'onNodeDblClick',
                    'node:click': 'onNodeClick',
                    'mousemove': 'onMousemove',
                    'canvas:click': 'onEdgeClick',
                    'edge:click': 'edgeOnClick'
                }
            },
            checkEdge(edge){
                const graph = this.graph;
                const nodes = graph.getNodes();
                const edges = graph.getEdges();
                console.log('edge==>>', edge);
                console.log('nodes==>>', nodes);
                console.log('edges==>>', edges);
                // 首先判断是不是连接的自己
                let isPass = true;
                if (edge && edge._cfg && edge._cfg.target && edge._cfg.source && edge._cfg.target.id === edge._cfg.source.id) {
                    isPass = false;
                    console.log('连接了自己===>>>', isPass);
                } else {
                    // 最后判断连接是不是已经存在
                    if (edges && edges.length > 0) {
                        let index = edges.findIndex(item => ((item._cfg.target.id === edge._cfg.target.id && item._cfg.source.id === edge._cfg.source.id) || (item._cfg.source.id === edge._cfg.target.id && item._cfg.target.id === edge._cfg.source.id)));
                        if (index !== -1 && index !== edges.length -1) {
                            // 找到所有线中和这条线重复的线，且不是最后一条线，因为最后一条线是当前这条线
                            isPass = false;
                            console.log('存在重复的线===>>>', isPass);
                        }
                    }
                }
                return isPass;
            },
            onNodeClick(e) {
                e.preventDefault();
                const node = e.item;
                const graph = this.graph;
                const model = node.getModel();
                // console.log('model=>', model);
                // console.log('this.edge=>', this.edge);
                // console.log('this.graph.getEdges()=>', graph.getEdges());
                // console.log('this.graph.node()=>', graph.getNodes());
                // console.log('this.edge=>', graph.findAll('edge', edge => {
                //     console.log('edge+>', edge);
                // }));
                const basicNode = node.getModel().basicNode;
                if (!basicNode) {
                    if (this.addingEdge && this.edge) {
                        graph.updateItem(this.edge, {
                            target: model.id
                        });
                        // graph.setItemState(this.edge, 'selected', true);
                        if (!this.checkEdge(this.edge)) {
                            graph.removeItem(this.edge);
                        }
                        this.edge = null;
                        this.addingEdge = false;
                        console.log('this.edge==>1', this.addingEdge, this.edge);
                    } else {
                        console.log('this.edge==>2', this.addingEdge, this.edge);
                        this.edge = graph.addItem('edge', {
                            source: model.id,
                            shape: 'cubic-vertical',
                            // shape: 'polyline',
                            // sourceAnchor: 0,
                            // targetAnchor: 0,
                            label: 'cubic-vertical',
                            target: {
                                x: e.x,
                                y: e.y
                            },
                            style: {
                                stroke: 'green',
                                lineWidth: 3,
                                endArrow: true
                            },
                            labelCfg: {
                                style: {
                                    stroke: 'yellow',
                                    lineWidth: 1
                                }
                            },
                        });
                        this.addingEdge = true;
                    }
                }
            },
            edgeOnClick(e){
                e.preventDefault();
                const currentEdge = e.item;
                const graph = this.graph;
                // 拖拽过程中，点击会点击到新增的边上
                if (this.addingEdge && this.edge === currentEdge) {
                    graph.removeItem(this.edge);
                    this.edge = null;
                    this.addingEdge = false;
                }
            },
            onNodeDblClick(e) {
                e.preventDefault();
                const graph = this.graph;
                const node = e.item;
                const mode = node.getModel();
                const basicNode = node.getModel().basicNode;
                if (basicNode) {
                    const currentMode = {
                        x: 300,
                        y: 300,
                        basicNode: false,
                        id: `node-${addedCount}`,
                    };
                    graph.addItem('node', { ...mode, ...currentMode });
                    addedCount ++;
                }
            },
            // 判断是否点击锚点
            isClickAnchorPoint(e) {
                const { item = {}, canvasX, canvasY } = e;
                const anchorPointSize = 8;
                const anchorPoints = item.getLinkPoint({ x: canvasX, y: canvasY });
                if (canvasX < anchorPoints.x + anchorPointSize && canvasX > anchorPoints.x - anchorPointSize && canvasY < anchorPoints.y + anchorPointSize && canvasY > anchorPoints.y - anchorPointSize) {
                    return true;
                } else {
                    return false;
                }
            },
            // 鼠标当前点击的节点位置
            onPaintClick(e) {
                const node = e.item;
                const graph = this.graph;
                // console.log('e=>', graph.findAll('node', node => node.get('model').basicNode));
                // console.log('e=>', graph.find('node', node => node.getModel().basicNode));
                // console.log('getModel=>', node.getModel());
                const point = {
                    x: e.x,
                    y: e.y,
                };
                const mode = node.getModel();
                if (this.addingEdge && this.edge) {
                    graph.updateItem(this.edge, {
                        target: mode.id
                    });
                    this.edge = null;
                    this.addingEdge = false;
                } else {
                    // 在图上新增一条边，结束点是鼠标当前的节点位置
                    // 可以配置线的属性
                    this.edge = graph.addItem('edge', {
                        source: mode.id,
                        target: point,
                        shape: 'polyline', // 形状折线
                        label: 'label',
                        style: {
                            stroke: 'yellow',
                            lineWidth: 5
                        },
                        labelCfg: {
                            style: {
                                stroke: 'yellow',
                                lineWidth: 1
                            }
                        }
                    });
                    this.addingEdge = true;
                }
            },
            onMousemove(e) {
                const point = { x: e.x, y: e.y };
                if (this.addingEdge && this.edge) {
                    this.graph.updateItem(this.edge, {
                        target: point
                    });
                }
            },
            onEdgeClick (e) {
                const currentEdge = e.item;
                if (this.addingEdge && this.edge === currentEdge) {
                    this.graph.removeItem(this.edge);
                    this.edge = null;
                    this.addingEdge = false;
                }
            }
        });
    }

    // 切换模式
    changeModeType = (value) => {
        let graph = this.graph;
        switch (value) {
            case "DEFAULT":
                graph.setMode('default');
                break;
            case "EDIT":
                graph.setMode('edit');
                break;
            case "ADDEDGE":
                graph.setMode('addEdge');
                break;
            default:
                break;
        }
    }

    // 鼠标点击节点，隐藏该节点
    clickHide = () => {
        let graph = this.graph;
        graph.on('node:dblclick', ev => {
            const node = ev.item;
            console.log('before hide(), the nodevisible = ', node.get('visible'));
            node.hide();
            graph.paint(); // 仅重新绘制画布，当设置了元素样式或状态后，通过调用paint()方法，让修改生效
            console.log('after hide(), the node visible = ', node.get('visible'));
        });
        // 鼠标点击边，隐藏该边
        graph.on('edge:click', ev => {
            const edge = ev.item;
            console.log('before hide(), the edge visible = ', edge.get('visible'));
            edge.hide();
            graph.paint();
            console.log('after hide(), the edge visible = ', edge.get('visible'));
        });

        // 鼠标点击画布，显示所有节点和边
        graph.on('canvas:click', ev => {
            const nodes = graph.getNodes();
            const edges = graph.getEdges();
            nodes.forEach(node => {
                node.show();
            });
            edges.forEach(edge => {
                edge.show();
            });
            graph.paint();
        });
    }

    // 节点或者边在交互模式下的状态激活与关闭
    // graph.on在回调函数中使定义的交互状态hover或其他状态生效
    activateState = () => {
        let graph = this.graph;

        graph.on('node:mouseenter', evt => {
            const { item } = evt;
            graph.setItemState(item, 'hover', true)
        })

        graph.on('node:mouseleave', evt => {
            const { item } = evt;
            graph.setItemState(item, 'hover', false) // hover为nodeStateStyles中的属性，可自定义，best语义话
        })

        graph.on('edge:mouseenter', evt => {
            const { item } = evt;
            graph.setItemState(item, 'hover', true)
        })

        graph.on('edge:mouseleave', evt => {
            const { item } = evt;
            graph.setItemState(item, 'hover', false)
        })

        // // 自定义交互状态
        // // Behavior
        // // 在自定义Behavior中使定义的交互状态selected生效
        // G6.registerBehavior('edgeClick', {
        //     getEvents() {
        //         return {
        //             'node:click': 'onClick'
        //         };
        //     },
        //     onClick(e) {
        //         e.preventDefault();
        //         if (!this.shouldUpdate.call(this, e)) {
        //             return;
        //         }
        //         const { item } = e;
        //         const graph = this.graph;
        //         graph.setItemState(item, 'selected', true)
        //     }
        // })
    }

    // 渲染画布
    display = () => {
        const graph = new G6.Graph({
            modes: {
                // default: [ 'drag-canvas', 'zoom-canvas', 'click-select' ], // 画布可拖拽、可缩放
                default: [ 'drag-canvas', 'activite-select', 'drag-node' ], // 画布可拖拽、可缩放
                edit: [ 'drag-canvas', 'drag-node',
                    {
                        type: 'brush-select', // 拖动框选节点
                        trigger: 'shift',
                        includeEdegs: true,
                        brushStyle: {
                            // fill: "red",
                            stroke: '#faf', // 拖动框线的颜色
                            lineWidth: 2, // 拖动框线的宽度
                        }
                    },
                    {
                        type: 'activate-relations',
                        activeState: 'hover',
                        inactiveState: 'inactive',
                        resetSelected: false
                    }
                ],
                addEdge: ['activate-edit', 'click-select', 'drag-node']
            },
            // modes: { // 交互模式
            //     default: [
            //         // {
            //         //     type: 'zoom-canvas', // 画布可缩放
            //         //     sensitivity: 5, // 灵敏度1-10 默认5
            //         // },
            //         // {
            //         //     type: 'drag-canvas', // 画布可拖拽
            //         //     direction: 'both' // 方向x,y,both,默认both
            //         // },
            //         {
            //             type: 'drag-node', // 节点可拖拽
            //             delegateStyle: { strokeOpacity: 0.6, fillOpacity: 0.6 }, // 拖拽时的绘图属性
            //             updateEdge: true, // 是否同时更新与之相连的线。默认true
            //             enableDelegate: false, // 元素还是框框代替，默认false
            //             direction: 'both' // 方向x,y,both,默认both
            //         },
            //         {
            //             type: 'click-select', // 点击选中节点
            //             multiple: true, // 是否多选
            //             // trigger: 'q', // 指定按住哪个键进行多选（不怎么灵敏）
            //         },
            //         // {
            //         //     type: 'tooltip', // 节点的提示
            //         //     formatText(mode) {
            //         //         console.log('mode',mode);
            //         //         return mode.label;
            //         //     },
            //         // },
            //         // {
            //         //     type: 'edge-tooltip',
            //         //     formatText(model) {
            //         //         console.log('model=>', model);
            //         //         return "这是连线"
            //         //     }
            //         // },
            //         {
            //             type: 'activate-relations', // activate-relations当鼠标移到某个节点时，凸显该节点以及与其直接关联的节点和连线
            //             trigger: 'mouseenter',
            //         },
            //         {
            //             type: 'brush-select', // 拖动框选节点
            //             trigger: 'shift',
            //             includeEdegs: true,
            //             brushStyle: {
            //                 // fill: "red",
            //                 stroke: '#faf', // 拖动框线的颜色
            //                 lineWidth: 2, // 拖动框线的宽度
            //             }
            //         },
            //         {
            //             type: 'collapse-expand-group', // 可展开和隐藏节点，
            //             trigger: 'dblclick' // 触发方式dblclick、click
            //         },
            //     ],
            //     // brush: [
            //     //     {
            //     //         type: 'brush-select',
            //     //         trigger: 'drag'
            //     //     },
            //     // ]
            // },
            container: 'context', // 指定的挂载容器
            width: 1400, // 容器的宽度
            height: 800, // 容器的高度
            // fill: 'red',
            // fitView: true, // 是否将图适配到画布大小，可以防止超出画布或留白太多
            // fitViewPadding: 20, // [上，右，下，左] 画布上的四周留白宽度
            // animate: false, // 是否启用图的动画
            // defaultNode: {
            //     size: 5, // 节点的大小
            //     style: {
            //         fill: '#a3baff', // 节点的填充颜色coral
            //         stroke: '#666', // 节点描边的颜色
            //         lineWidth: 1, // 节点描边的粗细
            //     },
            //     labelCfg: {
            //         style: {
            //             fill: 'green', // 节点标签文字的颜色
            //             // stroke: 'red', // 标签文字的描边颜色
            //             // lineWidth: 4 // 标签文字的描边的粗细
            //         }
            //     }
            // }, // 节点默认属性。包括节点的一般属性和样式属性
            // defaultEdge: {
            //     style: {
            //         stroke: '#666', // 边的描边颜色
            //         opacity: 0.6, // 边的透明度
            //     },
            //     labelCfg: {
            //         autoRotate: true // 边上的标签文本根据边的方向旋转
            //     }
            // }, // 边的默认属性，包括边的一般属性和样式属性
            nodeStateStyles: {
                hover: { // 名字可自定义，但是要个graph.on中需要激活的名字保持一致
                    // fontSize: 20,
                    fill: "yellow", // 填充颜色
                    lineWidth: 3, // 线的宽度
                    stroke: 'red', // 线的颜色
                },
                selected: {
                    fill: "yellow",
                    lineWidth: 3,
                    stroke: 'red',
                },
                inactive: {
                    fill: '#aaa',
                    stroke: '#ccc',
                    opacity: 0.5
                }
            }, // 节点在默认状态下外，其他状态下的样式属性（style）,例如鼠标放置（hover）、选中（select）等状态。
            edgeStateStyles: {
                hover: {
                    stroke: 'red',
                    lineWidth: 6
                },
                selected: {
                    // fill: 'yellow', 不好用
                    stroke: 'red',
                    // fontSize: 10, // 不能用
                    lineWidth: 6
                },
                inactive: {
                    stroke: '#ccc',
                    opacity: 0.5
                }
            }, // 边在除默认状态下，其他状态下的样式属性（style）例如鼠标放置（hover）、选中（select）等状态。
        });
        this.graph = graph;
        const remoteData = {...this.state.initData};
        // 设置各个节点的样式，以及在各个状态下节点的KeyShape的样式
        // graph.node()必须在render()之前调用，否则不起作用
        // graph.edge()必须在render()之前调用，否则不起作用
        // graph.node(node => {
        //     return {
        //         id: node.id,
        //         shape: 'rect',
        //         style: {
        //             fill: 'blue'
        //         }
        //     };
        // });
        // const nodes = remoteData.nodes;
        // (nodes || []).forEach(node => {
        //     if (node.class) {
        //         node.shape = "ellipse";
        //     } else {
        //         node.shape = 'rect';
        //         node.size = [80, 30];
        //     }
        // });
        this.graph.data(remoteData || []);
        this.graph.render();
        this.graph.setMode('addEdge');
    }

    render() {
        return (<div className={"body"}>
            <header className={'header'}>
                <Button onClick={this.display}>BEGIN</Button>
                <Button onClick={this.display}>RESET</Button>
                <Button onClick={this.test}>TEST</Button>
                <Button onClick={this.activateState}>ACTIVATE</Button>
                <Button onClick={this.clickHide}>clickHide</Button>
                <Select defaultValue={'ADDEDGE'} style={{ width: 100 }} placeholder={"请选择画布模式"} onChange={this.changeModeType}>
                    <Option value={"EDIT"}>EDIT</Option>
                    <Option value={"DEFAULT"}>DEFAULT</Option>
                    <Option value={"ADDEDGE"}>ADDEDGE</Option>
                </Select>
                {/*<Button type={'danger'} onClick={() => { this.graph.clear() }}>CLEAR</Button>*/}
                <Button type={'danger'} onClick={() => { this.graph.destroy() }}>DESTROY</Button>
                <Button onClick={() => { this.graph.focusItem('start') }}>focusItem</Button>
                <Button onClick={() => { this.graph.changeSize(1000, 800) }}>CANVASSIZE</Button>
                <Button id={"LEFT"} onMouseDown={() => { this.graph.translate(-10, 0) }}>LEFT</Button>
                <Button id={"RIGHT"} onMouseDown={() => { this.graph.translate(10, 0) }}>RIGHT</Button>
                <Button id={"BOTTOM"} onMouseDown={() => { this.graph.translate(0, 10) }}>BOTTOM</Button>
                <Button id={"TOP"} onMouseDown={() => { this.graph.translate(0, -10) }}>TOP</Button>
                <Button onClick={() => { console.log('this.graph.save()=>', this.graph.save()); }}>SAVE</Button>
                <Button onClick={() => { console.log('this.graph.downloadImage()=>', this.graph.downloadImage()); }}>DOWNLOADIMAGE</Button>
            </header>
            <DragComponent />
            {/*<div className={'configuration'}>*/}
            {/*</div>*/}
            <div id={'context'}></div>
        </div>)
    }
}
