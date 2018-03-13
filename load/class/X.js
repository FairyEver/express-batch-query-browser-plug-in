import domStr from './dom'

import Csv from '../lib/csv'
import ExportCsv from '../lib/csvExport'

import rebind from './rebind'
import search from './search'

export default class X {
    constructor () {
        // 重新注册事件
        rebind()
        // 在页面上添加面板
        $('#ajaxdata').before($(domStr))
        // 需要查询的列表
        this.ids = [
            '630644632616',
            '630644632566',
            '630644632458',
            '630644632433',
            '630644632340',
            '630644632256',
            '630644625936',
            '630644625861',
            '630644625714',
            '630644619477',
            '630644619460',
            '630644619452'
        ]
        // 已经完成的
        this.finish = []
        // 注册
        this.cache()
        this.register()
        // 开发测试
        this.startSearch()
    }
    // 缓存元素
    cache () {
        // 原页面带的元素
        this.$ZTO_input = $('#txtJobNoList')
        // 新增的元素
        this.$panel = $('#panel')
        this.$panelToggleBtn = $('#panelToggleBtn')
        this.$uploader = $('#uploader')
        this.$control = $('#control')
        this.$startButton = $('#startButton')
        this.$downloadButton = $('#downloadButton')
    }
    // 注册事件
    register () {
        // 切换显示隐藏面板
        this.$panelToggleBtn.on('click', () => {
            if (this.$panel.is(":hidden")) {
                this.panelShow()
            } else {
                this.panelHide()
            }
        })
        // Excel载入
        this.$uploader.on('change', () => {
            const file = this.$uploader.get(0).files[0]
            const reader = new FileReader()
            reader.readAsText(file, 'utf-8')
            reader.onload = e => {
                this.ids = e.target.result.split("\n")
                if (this.ids.length > 0) {
                    this.$control.show()
                }
                console.log(this.ids)
            }
        })
        // 开始按钮
        this.$startButton.on('click', () => {
            this.startSearch()
        })
        // 下载按钮
        this.$downloadButton.on('click', () => {
            this.exportCSV()
        })
    }
    // 显示面板
    panelShow () {
        this.$panel.show()
        this.$panelToggleBtn.text('隐藏')
    }
    // 隐藏面板
    panelHide () {
        this.$panel.hide()
        this.$panelToggleBtn.text('显示')
    }
    // 开始搜索数据
    startSearch () {
        $("#txtJobNoList").val(this.ids[0])
        search()
            .then(() => {
                console.log('OK')
            })
    }
    // 将数据以CSV形式导出
    exportCSV () {
        // 合并参数
        const _params = {
            columns: [
                {label: '运单编号', prop: 'yundanbianhao'},
                {label: '订单编号', prop: 'dingdanbianhao'},
                {label: '订单时间', prop: 'dingdanshijian'},
                {label: '发件人(电话)', prop: 'fajianrendianhua'},
                {label: '发件人地址', prop: 'fajianrendizhi'},
                {label: '收件人(电话)', prop: 'shoujianrendianhua'},
                {label: '收件人地址', prop: 'shoujianrendizhi'},
                {label: '揽件人', prop: 'lanjianren'},
                {label: '收件网点', prop: 'shoujianwangdian'},
                {label: '订单来源', prop: 'dingdanlaiyuan'}
            ],
            data: [
                {
                    name: 'lucy',
                    age: 24
                  },
                  {
                    name: 'bob',
                    age: 26
                  }
            ],
            title: 'table',
            noHeader: false
        }
        // 生成数据
        const data = Csv(_params.columns, _params.data, {}, _params.noHeader)
        // 下载数据
        ExportCsv.download(_params.title, data)
    }
}