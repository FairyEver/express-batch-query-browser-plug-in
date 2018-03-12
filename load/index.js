import './style/bootstrap.min.css'
import './style/plug-in.scss'

import log from './lib/log'
import readExcel from './lib/readExcel'

let x = {
    panelShow: true,
    dom: {}
}

// 将操作界面添加到页面
const domCreat = () => {
    $('body').append($(`
    <div class="x">
        <div class="x-header">
            批量操作
            <span class="toggle" id="panelToggleButton">隐藏</span>
        </div>
        <div class="x-body" id="panelBody">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">选择单号文件</span>
                </div>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="upload">
                    <label class="custom-file-label" for="upload">请选择保存单号的 .xlsx 文件</label>
                </div>
            </div>
            <p>进度</p>
            <div class="progress">
                <div
                    class="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width: 75%">
                </div>
            </div>
        </div>
    </div>
    `.trim()))
}
// 将页面元素注册到缓存
const domCache = () => {
    // id的可以这样注册
    [
        'panelToggleButton',
        'panelBody',
        'upload'
    ].forEach(e => {
        x.dom[e] = $(`#${e}`)
    })
}
// 给页面元素注册事件
const domRegistMethod = () => {
    // 面板切换按钮
    x.dom.panelToggleButton.on('click', () => {
        if (x.panelShow) {
            x.dom.panelBody.hide()
            x.panelShow = false
            x.dom.panelToggleButton.text('显示')
        } else {
            x.dom.panelBody.show()
            x.panelShow = true
            x.dom.panelToggleButton.text('隐藏')
        }
    })
    // 打开Excel文件输入框
    x.dom.upload.on('change', () => {
        const file = x.dom.upload.get(0).files[0]
        if (file) {
            readExcel(file)
                .then(res => {
                    console.log(res)
                })
        } else {
            alert('文件读取失败')
        }
    })
}

// jquery加载后执行
$(() => {
    // 将操作界面添加到页面
    domCreat()
    // 将页面元素注册到缓存
    domCache()
    // 给页面元素注册事件
    domRegistMethod()
    // 操作页面中的函数 载入数据
    loadData()
})