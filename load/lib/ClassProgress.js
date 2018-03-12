export default class Progress {
    constructor () {
        this.panel = $('#progress-panel')
        this.bar = $('#progress-bar')
        this.title = $('#progress-title')
        this.max = 0
        this.min = 0
        this.now = 0
        this.show()
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
        this.updateTitle()
    }
    updateTitle () {
        this.title.text(`${this.now} / ${this.max}`)
    }
}