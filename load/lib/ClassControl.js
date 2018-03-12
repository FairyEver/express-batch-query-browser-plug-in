export default class Control {
    constructor ({progress}) {
        // 注册元素
        this.panel = $('#control-panel')
        this.startBtn = $('#control-startButton')
        // 按钮绑定事件
        this.startBtn.on('click', () => {
        })
        // 显示
        this.show()
    }
    show () {
        this.panel.show()
    }
}