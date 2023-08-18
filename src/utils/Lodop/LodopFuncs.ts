import { Modal, message } from 'antd';
/* eslint-disable no-unused-vars */
let CreatedOKLodop7766: any = null;
let CLodopIsLocal;
// const path = require('path')
// const fs = require('fs')
/* eslint-disable */
//====判断是否需要 Web打印服务CLodop:===
//===(不支持插件的浏览器版本需要用它)===
export function needCLodop() {
  try {
    var ua = navigator.userAgent;
    if (ua.match(/Windows\sPhone/i)) return true;
    if (ua.match(/iPhone|iPod|iPad/i)) return true;
    if (ua.match(/Android/i)) return true;
    if (ua.match(/Edge\D?\d+/i)) return true;

    var verTrident = ua.match(/Trident\D?\d+/i);
    var verIE = ua.match(/MSIE\D?\d+/i);
    var verOPR = ua.match(/OPR\D?\d+/i);
    var verFF = ua.match(/Firefox\D?\d+/i);
    var x64 = ua.match(/x64/i);
    if (!verTrident && !verIE && x64) return true;
    else if (verFF) {
      verFF = verFF[0].match(/\d+/);
      // @ts-ignore
      if (verFF[0] >= 41 || x64) return true;
    } else if (verOPR) {
      verOPR = verOPR[0].match(/\d+/);
      // @ts-ignore
      if (verOPR[0] >= 32) return true;
    } else if (!verTrident && !verIE) {
      var verChrome = ua.match(/Chrome\D?\d+/i);
      if (verChrome) {
        verChrome = verChrome[0].match(/\d+/);
        // @ts-ignore
        if (verChrome[0] >= 41) return true;
      }
    }
    return false;
  } catch (err) {
    return true;
  }
}

//====页面引用CLodop云打印必须的JS文件,用双端口(8000和18000）避免其中某个被占用：====

export const getScripts = async () => {
  if (needCLodop()) {
    var src1 = 'http://localhost:8000/CLodopfuncs.js?priority=1&name=CLODOPA';
    var src2 = 'http://localhost:18000/CLodopfuncs.js?priority=0';

    var head =
      document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var oscript = document.createElement('script');
    oscript.src = src1;
    head.insertBefore(oscript, head.firstChild);
    oscript = document.createElement('script');
    oscript.src = src2;
    head.insertBefore(oscript, head.firstChild);
    CLodopIsLocal = !!(src1 + src2).match(/\/\/localho|\/\/127.0.0./i);
  }
};

const is32or64 = () => {
  var agent = navigator.userAgent.toLowerCase();
  var isMac = (function () {
    return /macintosh|mac os x/i.test(navigator.userAgent);
  })();
  if (agent.indexOf('win32') >= 0 || agent.indexOf('wow32') >= 0) {
    return 32;
  } else if (agent.indexOf('win64') >= 0 || agent.indexOf('wow64') >= 0) {
    return 64;
  }
  if (isMac) {
    return false;
  }
};

//====获取LODOP对象的主过程：====
export function getLodop(oOBJECT = undefined, oEMBED = undefined) {
  var LODOP;
  try {
    var ua = navigator.userAgent;
    var isIE = !!ua.match(/MSIE/i) || !!ua.match(/Trident/i);
    if (needCLodop()) {
      try {
        // @ts-ignore
        LODOP = getCLodop();
      } catch (err) {}
      if (!LODOP) {
        Modal.confirm({
          title: '提示',
          content: '暂未安装打印驱动，确定现在安装吗',
          okText: '确定',
          okType: 'primary',
          cancelText: '取消',
          className: 'tingzhiss',
          async onOk() {
            window.open('https://www.lodop.net/download.html');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    } else {
      var is64IE = isIE && !!ua.match(/x64/i);
      //=====如果页面有Lodop就直接使用，没有则新建:==========
      if (oOBJECT || oEMBED) {
        if (isIE) LODOP = oOBJECT;
        else LODOP = oEMBED;
      } else if (!CreatedOKLodop7766) {
        LODOP = document.createElement('object');
        // @ts-ignore
        LODOP.setAttribute('width', 0);
        // @ts-ignore
        LODOP.setAttribute('height', 0);
        LODOP.setAttribute('style', 'position:absolute;left:0px;top:-100px;width:0px;height:0px;');
        if (isIE) LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA');
        else LODOP.setAttribute('type', 'application/x-print-lodop');
        document.documentElement.appendChild(LODOP);
        CreatedOKLodop7766 = LODOP;
      } else {
        LODOP = CreatedOKLodop7766;
      }
    }
    //===如下空白位置适合调用统一功能(如注册语句、语言选择等):==
    LODOP.SET_LICENSES('', '4566CDC6D3FE8805CDAEBC2E3D535E6B7B9', '', '');
    console.log('>>>>>>>>LODOP', LODOP);
    return LODOP;
  } catch (err) {
    alert('getLodop出错:' + err);
  }
}
