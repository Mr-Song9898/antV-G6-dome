import React, { Component } from "react";
import { Icon } from "antd";
import './style.css';
export default class modeComponent extends Component {
    constructor() {
        super();
        this.state = {
            modeVisible: 'none'
        }
    }

    componentDidMount() {
     // 1、一定要绝对定位，脱离文档流才可以移动。
     //
     // 2、绑定拖拽的元素，移动和鼠标松开后是对document的绑定，因为移动的是整个div。
     //
     // 3、点击：a= 获取当前鼠标坐标、b =div距浏览器距离、c = 鼠标在div内部距离=a-b。

//     移动：通过  a - c 建立鼠标与div的关系，防止鼠标超出div
  //       拖拽状态 = 0鼠标在元素上按下的时候{
  //
  //           拖拽状态 = 1
  //
  //           记录下鼠标的x和y坐标
  //
  //           记录下元素的x和y坐标
  //
  //       }
  //
  //       鼠标在元素上移动的时候{
  //
  //           如果拖拽状态是0就什么也不做。
  //
  //           如果拖拽状态是1，那么
  //
  //           元素y = 现在鼠标y - 原来鼠标y + 原来元素y
  //
  //           元素x = 现在鼠标x - 原来鼠标x + 原来元素x
  //
  //       }
  //
  //       鼠标在任何时候放开的时候{
  //
  //           拖拽状态 = 0
  //
  //       }
        this.moveFuc()
    }

    moveFuc = () => {
        let mode = document.getElementById('mode');
        // let title = document.getElementById('title');
        let text = document.getElementById('text');
        text.onmousedown = function (e) {
            var event = e || window.event;  //兼容IE浏览器
            // 鼠标点击标题栏那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
            let diffX = event.clientX - mode.offsetLeft;
            let diffY = event.clientY - mode.offsetTop;
            if (typeof mode.setCapture !== 'undefined') {
                mode.setCapture();
            }
            document.onmousemove = function (e) {
                var event = e || window.event;
                let moveX = event.clientX - diffX;
                let moveY = event.clientY - diffY;
                if (moveX < 0) {
                    moveX = 0
                } else if (moveX > window.innerWidth - mode.offsetWidth) {
                    moveX = window.innerWidth - mode.offsetWidth
                }
                if (moveY < 0) {
                    moveY = 0
                } else if (moveY > window.innerHeight - mode.offsetHeight) {
                    moveY = window.innerHeight - mode.offsetHeight
                }
                mode.style.left = moveX + 'px';
                mode.style.top = moveY + 'px'
            }
            document.onmouseup = function (e) {
                this.onmousemove = null;
                this.onmouseup = null;
                //修复低版本ie bug
                if (typeof mode.releaseCapture != 'undefined') {
                    mode.releaseCapture();
                }
            }
        }
    }

    render() {
        return (
            <div id={'mode'} className={'mode'} style={{ top: '20%', left: '50%', display: `${this.state.modeVisible}` }}>
                <div id={'title'} className={"mode-title"}>
                    <div id={'text'} className={'mode-title-text'}>Here is the title</div>
                    <Icon className={"icon"} type={"plus"} onClick={() => { this.setState({ modeVisible: 'none' }) }} />
                </div>
            </div>
        );
    }
}
