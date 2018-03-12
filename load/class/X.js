import domStr from './dom'
export default class X {
    constructor () {
        // 在页面上添加面板
        $('body').append($(domStr))
        // 需要查询的列表
        this.ids = []
        // 已经完成的
        this.finish = []
        // 注册
        this.cache()
        this.register()
    }
    // 缓存元素
    cache () {
        this.$panel = $('#panel')
        this.$panelToggleBtn = $('#panelToggleBtn')
        this.$uploader = $('#uploader')
        this.$progress = $('#progress')
        this.$progressTitle = $('#progressTitle')
        this.$progressBar = $('#progressBar')
        this.$control = $('#control')
        this.$startButton = $('#startButton')
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
                    this.$progress.show()
                    this.$control.show()
                }
            }
        })
        // 开始按钮
        this.$startButton.on('click', () => {
            // this.finishLength ++
            // this.progressUpdate()
            this.finish.push({
                name: 'liyang'
            })
            this.progressUpdate()
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
    // 更新进度条
    progressUpdate () {
        const n = Math.round(this.finish.length / this.ids.length * 100)
        this.$progressBar.css('width', `${n}%`)
    }
}