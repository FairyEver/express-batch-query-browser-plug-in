import './style/bootstrap.min.css'
import './style/plug-in.scss'

import readExcel from './lib/readExcel'

// 进度条类
import Progress from './lib/ClassProgress'

// 控制类
import Control from './lib/ClassControl'

// 面板显示
let panelShow = true

// 进度条
let progress = null

// 控制类
let control = null

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
            </div>
            <div id="progress-panel" style="display: none;">
                <p id="progress-title">进度</p>
                <div class="progress mb-3">
                    <div
                        id="progress-bar"
                        class="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="0"
                        style="width: 0%">
                    </div>
                </div>
                <div id="control-panel" style="display: none;">
                    <button id="control-startButton" type="button" class="btn btn-light">开始</button>
                </div>
            </div>
        </div>
    </div>
    `.trim()))
    // 面板切换按钮
    $('#panelToggleButton').on('click', () => {
        if (panelShow) {
            panelShow = false
            $('#panelBody').hide()
            $('#panelToggleButton').text('显示')
        } else {
            panelShow = true
            $('#panelBody').show()
            $('#panelToggleButton').text('隐藏')
        }
    })
    // Excel载入
    $('#excelUploader').on('change', () => {
        // 获取文件
        const file = $('#excelUploader').get(0).files[0]
        if (file) {
            readExcel (file)
                .then (res => {
                    // 实例化进度条对象
                    progress = new Progress()
                    progress.setBarMax(res.results.length)
                    // 实例化控制类
                    control = new Control()
                })
                .catch (err => {
                    console.log(err)
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
    // 操作页面中的函数 载入数据
    loadData()
})