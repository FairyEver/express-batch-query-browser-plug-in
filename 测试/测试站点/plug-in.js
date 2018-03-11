let x = {
    panelShow: true,
    dom: {}
}

// 等待
const sleep = async (time = 0) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
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
                <input type="file" class="custom-file-input" id="inputGroupFile01">
                <label class="custom-file-label" for="inputGroupFile01">请选择保存单号的 .xlsx 文件</label>
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
        'panelBody'
    ].forEach(e => {
        x.dom[e] = $(`#${e}`)
    })
}
// 给页面元素注册事件
const domRegistMethod = () => {
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
}

// jquery加载后执行
$(async () => {
    // 将操作界面添加到页面
    domCreat()
    // 将页面元素注册到缓存
    domCache()
    // 给页面元素注册事件
    domRegistMethod()
})
