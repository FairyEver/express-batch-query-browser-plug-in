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
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="excelUploader">
                    <label class="custom-file-label" for="excelUploader">载入 .xlsx 文件</label>
                </div>
                <div class="input-group-append">
                    <button id="startSearchBtn" class="btn btn-secondary" type="button" disabled>查询</button>
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
        'excelUploader',
        'startSearchBtn'
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
    // Excel载入
    x.dom.excelUploader.on('change', () => {
        // 切换查询按钮的状态
        const startSearchBtnToggle = (open, length = 0) => {
            if (open) {
                x.dom.startSearchBtn
                    .removeAttr('disabled')
                    .removeClass('btn-secondary')
                    .addClass('btn-success')
                    .text(`开始查询 ${length} 条单号`)
            } else {
                x.dom.startSearchBtn
                    .attr('disabled', 'true')
                    .removeClass('btn-success')
                    .addClass('btn-secondary')
                    .text(`查询`)
            }
        }
        // 禁用查询按钮
        startSearchBtnToggle(false)
        // 获取文件
        const file = x.dom.excelUploader.get(0).files[0]
        if (file) {
            readExcel (file)
                .then (res => {
                    console.log(res)
                    startSearchBtnToggle(true, res.results.length)
                })
                .catch (err => {
                    log(err)
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