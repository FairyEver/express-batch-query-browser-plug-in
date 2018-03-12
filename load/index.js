import './style/bootstrap.min.css'
import './style/plug-in.scss'

import log from './lib/log'
import readExcel from './lib/readExcel'

// 面板显示
let panelShow = true

// 单号
let ids = []

// 进度条
let progress = null

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
            <div id="progressPanel" style="display: none;">
                <p>进度</p>
                <div class="progress">
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
        // 切换查询按钮的状态
        const startSearchBtnToggle = (open, length = 0) => {
            if (open) {
                $('#startSearchBtn')
                    .removeAttr('disabled')
                    .removeClass('btn-secondary')
                    .addClass('btn-success')
                    .text(`开始查询 ${length} 条单号`)
            } else {
                $('#startSearchBtn')
                    .attr('disabled', 'true')
                    .removeClass('btn-success')
                    .addClass('btn-secondary')
                    .text(`查询`)
            }
        }
        // 禁用查询按钮
        startSearchBtnToggle(false)
        // 获取文件
        const file = $('#excelUploader').get(0).files[0]
        if (file) {
            readExcel (file)
                .then (res => {
                    console.log(res)
                    startSearchBtnToggle(true, res.results.length)
                    progress.setBarMax(res.results.length)
                    progress.show()
                })
                .catch (err => {
                    log(err)
                })
        } else {
            alert('文件读取失败')
        }
    })
}

class Progress {
    constructor () {
        this.panel = $('#progressPanel')
        this.bar = $('#progress-bar')
        this.max = 0
        this.min = 0
        this.now = 0
    }
    show () {
        this.panel.show()
    }
    hide () {
        this.panel.hide()
    }
    setBarMax (max) {
        this.max = max
        this.bar.attr('aria-valuemax', max)
    }
    setBarNow (now) {
        this.now = now
        this.bar.attr('aria-valuenow', now)
        this.bar.css('width', Math.round((this.now / (this.max - this.min)) * 100) + '%')
    }
}

// jquery加载后执行
$(() => {
    // 将操作界面添加到页面
    domCreat()
    progress = new Progress()
    // 操作页面中的函数 载入数据
    loadData()
})