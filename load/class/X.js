import domStr from './dom'
export default class X {
    constructor () {
        // 在页面上添加面板
        $('body').append($(domStr))
        // 注册
        this.cache()
        this.register()
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
    // 缓存元素
    cache () {
        this.$panel = $('#panel')
        this.$panelToggleBtn = $('#panelToggleBtn')
        this.$uploader = $('#uploader')
    }
    // 注册事件
    register () {
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
            var reader = new FileReader();
            reader.readAsText(file, 'utf-8');
            reader.onload = function (e) {
                var fileText = e.target.result.split("\n");
                console.log(fileText)
            }
        })
    }
}