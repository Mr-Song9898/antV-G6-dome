import React from "react";
import G6 from '@antv/g6'

export default class DOME extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        const graph = new G6.Graph({
            container: 'context',
            width: 1000,
            height: 600,
            renderer: 'svg',
            fitView: true,
            fitViewPadding: [ 20, 40, 50, 20 ]
        });
        let remoteData = {
            edges: data.edges,
            nodes: data.nodes,
        };
        graph.data(remoteData);
        graph.render();
    };



    render() {
        return (<div className={'page-body'}>
            <header className={'header'}></header>
            <section className={'section'}></section>
            <nav className={'nav'}>

            </nav>
            <div id={'context'}></div>
        </div>);
    }
}
