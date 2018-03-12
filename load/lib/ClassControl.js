export default class Control {
    constructor () {
        this.panel = $('#control-panel')
        this.startBtn = $('#control-startButton')
        this.show()
        this.startBtn.on('click', () => {
            console.log('Hello')
        })
    }
    show () {
        this.panel.show()
    }
}